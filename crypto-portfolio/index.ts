#!/usr/bin/env node
import dotenv from 'dotenv';
import parse from 'csv-parse';
import fs from 'fs';
import axios from 'axios';
import moment from 'moment';
// @ts-ignore
import yargs from 'yargs';
import { TRANSACTION_TYPES, DATA_SOURCE_NAME } from './constants.js';

dotenv.config();

// const dataLink : string = process.env.CSV_SOURCE || 'data/transactions.csv';
const appArguments : {
  token?: string,
  date?: string,
  sourcePath?: string
} = yargs
  .option("t", {
    alias: "token",
    describe: "List Token Name",
    type: "string"
  })
  .option("d", {
    alias: "date",
    describe: "Specific date to get the portfolio. Date might match the [RFC 2822 Date time]",
    type: "string"
  })
  .options("s", {
    alias: "sourcePath",
    describe: "Path to the transactions list sources",
    type: "string"
  })
  .argv;

// Check if we have headers or not, so that we can start handling data source
let hasHeader : boolean = false;
// List of headers, or properties of each transaction
const headers : Array<string> = [];
// Current portfolio in token amount
const portfolio : {} = {};
// Current portfolio in USD
const portfolioInUsd : {} = {};

// Calculate the portfolio tokens based on each transaction represented by data row in csv file
const onHandlingSource = (
  data: Array<string>,
  predefinedTokens : Array<string> = [],
  predefinedDate: undefined | number
) => {
  if (!hasHeader) {
    // First row must always be the list headers
    // -> represent the data type of each transaction (token name, transaction type, amount, timestamp)
    headers.push(...data);
    hasHeader = true;
  } else {
    /*
      Map the data row to transaction object, with keys are the 'headers'.
      Even though we do not need to map the data row the object,
      we can still get the data of each transaction based on the index in the 'row' array.
      However, the data source can be changed, display orders can be changed.
      So mapping the object by headers name and using the constant DATA_SOURCE_NAME to extract the details are more efficient
     */
    const mappedData = headers.reduce((finalData, currentHeader, index) => ({
      ...finalData,
      [currentHeader]: data[index]
    }), {});

    const tokenName = mappedData[DATA_SOURCE_NAME.TOKEN_NAME];

    // Check if current transaction token is in the desired list
    const isTokenIncluded = !predefinedTokens.length || predefinedTokens.includes(tokenName);
    // Check if current transaction timestamp before the desired portfolio date
    const isTransactionDateIncluded = predefinedDate === undefined || predefinedDate >= mappedData[DATA_SOURCE_NAME.TIMESTAMP];

    // If the current transaction satisfies the predefined conditions, calculate the current transaction to portfolio
    if (isTokenIncluded && isTransactionDateIncluded) {
      if (portfolio[tokenName] === undefined) {
        portfolio[tokenName] = 0.0;
      }

      const value = portfolio[tokenName];
      const transactionType = mappedData[DATA_SOURCE_NAME.TRANSACTION_TYPE];

      // Calculate the portfolio based on transaction type
      if (transactionType === TRANSACTION_TYPES.DEPOSIT) {
        // Deposit means we must add the transaction amount to the current amount
        portfolio[tokenName] = Number(value) + Number(mappedData[DATA_SOURCE_NAME.AMOUNT]);
      } else if (transactionType === TRANSACTION_TYPES.WITHDRAWAL) {
        // Vice versa, Withdrawal means we must subtract the transaction amount from the current amount
        portfolio[tokenName] = Number(value) - Number(mappedData[DATA_SOURCE_NAME.AMOUNT]);
      }
    }
  }
};

// After finish reading all the transactions, calculate the value of owned tokens to USD
const onFinishFileReading = () => {
  // Get list token in portfolio
  const ownedTokens = Object.keys(portfolio).join(',');

  // Make request to get the current exchange rate of token to USD
  axios.get(`https://min-api.cryptocompare.com/data/pricemulti?fsyms=${ownedTokens}&tsyms=USD`)
    .then(({ data }) => {
      Object.keys(portfolio).forEach((token) => {
        portfolioInUsd[token] = `${(portfolio[token] * data[token]['USD']).toFixed(4)} (USD)`;
      });

      // log the portfolio out
      console.log(portfolioInUsd);
    });
};

export default (() => {

  const predefinedTokens = appArguments.token ? appArguments.token.split(',') : [];
  const predefinedDate = appArguments.date !== undefined ? Number(moment(appArguments.date).format('x')) : undefined;

  // Start reading data source file
  const dataLink = appArguments.sourcePath || process.env.CSV_SOURCE || 'data/transactions.csv';
  fs.createReadStream(dataLink)
  .pipe(parse())
  .on('data', (row : Array<string>) => {
    onHandlingSource(row, predefinedTokens, predefinedDate);
  })
  .on('end', onFinishFileReading);
})();
