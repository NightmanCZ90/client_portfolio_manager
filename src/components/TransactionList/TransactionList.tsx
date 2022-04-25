import { Transaction } from '../../types/transaction';
import { StyledTransactionList } from './TransactionList.styles';

interface TransactionListProps {
  transactions: Transaction[];
}

const TransactionList: React.FC<TransactionListProps> = (props) => {

  const { transactions } = props;

  return (
    <StyledTransactionList>
      {transactions.map(transaction => (<div>{transaction.stockName}</div>))}
    </StyledTransactionList>
  )
}

export default TransactionList;
