import { useState } from 'react';
import { sortTransactionsByDateAndId } from '../../hooks/transactions';
import { Transaction } from '../../types/transaction';
import TransactionCard from '../TransactionCard';
import { StyledTransactionList } from './TransactionList.styles';

interface TransactionListProps {
  transactions: Transaction[];
}

const TransactionList: React.FC<TransactionListProps> = (props) => {
  const [openId, setOpenId] = useState<number | null>(null);

  const { transactions } = props;

  const sortedTransactions = sortTransactionsByDateAndId(transactions);

  const renderTransactionCard = () => sortedTransactions?.map(transaction => (
    <TransactionCard
      key={transaction.id}
      transaction={transaction}
      openId={openId}
      setOpenId={setOpenId}
    />
  ));

  return (
    <StyledTransactionList>
      {sortedTransactions.length > 0 ?
        renderTransactionCard()
        : 'No transactions'}
    </StyledTransactionList>
  )
}

export default TransactionList;
