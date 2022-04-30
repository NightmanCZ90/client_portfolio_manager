import { useMutation } from 'react-query'

import { RestApiError } from '../services/ApiClient'
import RestApiClient from '../services/RestApiClient'
import { ExecutionType, Transaction, TransactionType } from '../types/transaction'
import { Currency, CurrencyProps } from '../types/utility'
import { convertCurrencyDecimals } from '../utils/helpers'
import { usePortfolio } from './portfolios'

export const useCreateTransaction = (portfolioId: number) => {
  const { refetch } = usePortfolio(portfolioId);

  return useMutation<Transaction, RestApiError, {
    stockName: string,
    stockSector: string,
    transactionTime: string,
    transactionType: TransactionType,
    numShares: string,
    price: string,
    currency: Currency,
    execution: ExecutionType,
    commissions: string,
    notes: string,
    portfolioId: number,
  }>((formData) => {
    return RestApiClient.createTransaction({
      ...formData,
      // stockName: formData.stockName,
      // stockSector: formData.stockSector,
      // transactionTime: formData.transactionTime,
      // transactionType: formData.transactionType,
      numShares: convertCurrencyDecimals(Number(formData.numShares), CurrencyProps.NumShares, formData.currency, false),
      price: convertCurrencyDecimals(Number(formData.price), CurrencyProps.Price, formData.currency, false),
      // currency: formData.currency,
      // execution: formData.execution,
      commissions: formData.commissions ? convertCurrencyDecimals(Number(formData.commissions), CurrencyProps.Commissions, formData.currency, false) : 0,
      // notes: formData.notes,
      // portfolioId: formData.portfolioId,
    });
  }, {
    onSuccess: () => { refetch() }
  })
}

/**
 * Helper functions
 */

export const convertDecimalsForTransaction = (transaction: Transaction): Transaction => {
  return ({
    ...transaction,
    numShares: convertCurrencyDecimals(Number(transaction.numShares), CurrencyProps.NumShares, transaction.currency, true),
    price: convertCurrencyDecimals(Number(transaction.price), CurrencyProps.Price, transaction.currency, true),
    commissions: transaction.commissions ? convertCurrencyDecimals(Number(transaction.commissions), CurrencyProps.Commissions, transaction.currency, true) : 0,
  });
}
