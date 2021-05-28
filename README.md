# Question 2 - Get Crypto Portfolio
Download your transactions csv file to `data` folder with name `transactions.csv` <br>
or define file path in `ENV.CSV_SOURCE` <br>
(Can get example csv file from [this](https://s3-ap-southeast-1.amazonaws.com/static.propine.com/transactions.csv.zip)) <br><br>

Build source code to common js
```
npm install
npm run build
```

Get your portfolio without specific token or date
```
npm run start
```

Get your portfolio with specific tokens, might include many tokens that separated by commas
```
npm run start token={TOKEN_LIST}

e.g:
npm run start token='XRP,ETH'
```

Get your portfolio with specific date
Date might match the [RFC 2822 Date time](https://datatracker.ietf.org/doc/html/rfc2822#section-3.3)
```
npm run start date={DATE}

e.g:
npm run start date='1996-08-07'
```

Get your portfolio with specific tokens and date
```
npm run start token={TOKEN_LIST} date={DATE}

e.g:
npm run start token='XRP,ETH'  date='1996-08-07'
```
