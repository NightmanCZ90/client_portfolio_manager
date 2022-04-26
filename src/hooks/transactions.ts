import { useMutation } from 'react-query'

import { RestApiError } from '../services/ApiClient'
import RestApiClient from '../services/RestApiClient'
import { ExecutionType, Transaction, TransactionType } from '../types/transaction'
import { Currency, CurrencyProps } from '../types/utility'
import { convertCurrencyDecimals } from '../utils/helpers'

export const useCreateTransaction = () => {

  return useMutation<Transaction, RestApiError, {
    symbol: string,
    sector: string,
    time: string,
    type: TransactionType,
    numShares: string,
    price: string,
    currency: Currency,
    execution: ExecutionType,
    commissions: string,
    notes: string,
    portfolioId: number,
  }>((formData) => {
    return RestApiClient.createTransaction({
      stockName: formData.symbol,
      stockSector: formData.sector,
      transactionTime: formData.time,
      transactionType: formData.type,
      numShares: convertCurrencyDecimals(Number(formData.numShares), CurrencyProps.NumShares, formData.currency, false),
      price: convertCurrencyDecimals(Number(formData.price), CurrencyProps.Price, formData.currency, false),
      currency: formData.currency,
      execution: formData.execution,
      commissions: formData.commissions ? convertCurrencyDecimals(Number(formData.commissions), CurrencyProps.Commissions, formData.currency, false) : 0,
      notes: formData.notes,
      portfolioId: formData.portfolioId,
    });
  })
}
