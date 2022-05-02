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

export const useUpdateTransaction = (portfolioId: number) => {
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
    transactionId: number,
  }>((formData) => {
    return RestApiClient.updateTransaction(formData.transactionId, {
      ...formData,
      numShares: Number(formData.numShares),
      price: Number(formData.price),
      commissions: Number(formData.commissions),
    });
  }, {
    onSuccess: () => { refetch() }
  })
}

export const useDeleteTransaction = (portfolioId: number) => {
  const { refetch } = usePortfolio(portfolioId);

  return useMutation<Transaction, RestApiError, number>((transactionId) => {
    return RestApiClient.deleteTransaction(transactionId);
  }, {
    onSuccess: () => { refetch() }
  })
}

/**
 * Helper functions
 */

export const sortTransactionsByDateAndId = (transactions: Transaction[]) => {
  return transactions.sort((a, b) => new Date(b.transactionTime).getTime() - new Date(a.transactionTime).getTime() || b.id - a.id);
}
