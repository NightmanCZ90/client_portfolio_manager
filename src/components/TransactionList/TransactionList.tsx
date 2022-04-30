import { Transaction } from '../../types/transaction';
import TransactionCard from '../TransactionCard';
import { StyledTransactionList } from './TransactionList.styles';

interface TransactionListProps {
  transactions: Transaction[];
}

const TransactionList: React.FC<TransactionListProps> = (props) => {

  const { transactions } = props;

  const renderTransactionCard = () => transactions?.map(transaction => (
    <TransactionCard
      key={transaction.id}
      transaction={transaction}
    />
  ));

  return (
    <StyledTransactionList>
      {transactions.length > 0 ?
        renderTransactionCard()
        : 'No transactions'}
    </StyledTransactionList>
  )
}

export default TransactionList;
