import { useMutation } from 'react-query'

import { RestApiError } from '../services/ApiClient'
import RestApiClient from '../services/RestApiClient'
import { ExecutionType, Transaction, TransactionType } from '../types/transaction'

export const useCreateTransaction = () => {

  return useMutation<Transaction, RestApiError, {
    symbol: string,
    sector: string,
    time: string,
    type: TransactionType,
    numShares: string,
    price: string,
    currency: string,
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
      numShares: Number(formData.numShares) * 100,
      price: Number(formData.price) * 10000,
      currency: formData.currency,
      execution: formData.execution,
      commissions: formData.commissions ? Number(formData.commissions) * 100 : 0,
      notes: formData.notes,
      portfolioId: formData.portfolioId,
    });
  })
}
