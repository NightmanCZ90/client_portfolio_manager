import { sortTransactionsByDateAndId } from '../../hooks/transactions';
import { Transaction } from '../../types/transaction';
import TransactionCard from '../TransactionCard';
import { StyledTransactionList } from './TransactionList.styles';

interface TransactionListProps {
  transactions: Transaction[];
}

const TransactionList: React.FC<TransactionListProps> = (props) => {

  const { transactions } = props;

  const sortedTransactions = sortTransactionsByDateAndId(transactions);

  const renderTransactionCard = () => sortedTransactions?.map(transaction => (
    <TransactionCard
      key={transaction.id}
      transaction={transaction}
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
