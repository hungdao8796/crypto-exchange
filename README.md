# Get Crypto Portfolio
Download your transactions csv file to `data` folder with name `transactions.csv` <br>
or define file path in `ENV.CSV_SOURCE` <br>

Currently, we only support transactions csv file with format
```
timestamp,transaction_type,token,amount

Notes:
-timestamp: Integer number of seconds since the Epoch
-transaction_type: Either a DEPOSIT or a WITHDRAWAL
-token: The token symbol
-amount: The amount transacted

E.g:
-1571967200,DEPOSIT,ETH,0.683640
-1571967189,WITHDRAWAL,ETH,0.493839
```

(Can get example csv file from [this](https://s3-ap-southeast-1.amazonaws.com/static.propine.com/transactions.csv.zip)) <br><br>

Build source code to common js
```
npm install
npm run build
```

Then install this app to global
```
npm install -g
```

Get your portfolio in USD without specific token or date
```
crypto-exchange
```

For usage information, try
```
crypto-exchange --help
```

# Example
Get your portfolio in USD with specific tokens, might include many tokens that separated by commas
```
crypto-exchange -t {TOKEN_LIST}

e.g:
crypto-exchange -t 'XRP,ETH'
crypto-exchange -t 'BTC'
```

Get your portfolio in USD with specific date
Date might match the [RFC 2822 Date time](https://datatracker.ietf.org/doc/html/rfc2822#section-3.3)
```
crypto-exchange -d {DATE}

e.g:
crypto-exchange -d '1996-08-07'
```

Get your portfolio with specific tokens and date
```
crypto-exchange -t {TOKEN_LIST} -d {DATE}

e.g:
crypto-exchange -t 'XRP,ETH'  -d '1996-08-07'
```


test commit