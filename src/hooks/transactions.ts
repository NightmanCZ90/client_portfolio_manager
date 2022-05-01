import { useMutation } from 'react-query'

import { RestApiError } from '../services/ApiClient'
import RestApiClient from '../services/RestApiClient'
import { ExecutionType, Transaction, TransactionType } from '../types/transaction'
import { Currency } from '../types/utility'
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
      numShares: Number(formData.numShares),
      price: Number(formData.price),
      commissions: Number(formData.commissions),
    });
  }, {
    onSuccess: () => { refetch() }
  })
}

/**
 * Helper functions
 */
