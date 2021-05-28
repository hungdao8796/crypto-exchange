const TRANSACTION_TYPES : {
  DEPOSIT: string,
  WITHDRAWAL: string
} = {
  DEPOSIT: 'DEPOSIT',
  WITHDRAWAL: 'WITHDRAWAL'
}

const DATA_SOURCE_NAME : {
  TOKEN_NAME: string,
  TRANSACTION_TYPE: string,
  TIMESTAMP: string,
  AMOUNT: string
} = {
  TOKEN_NAME: 'token',
  TRANSACTION_TYPE: 'transaction_type',
  TIMESTAMP: 'timestamp',
  AMOUNT: 'amount'
}

export {
  TRANSACTION_TYPES,
  DATA_SOURCE_NAME
};
