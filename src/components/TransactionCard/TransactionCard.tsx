import { Transaction, TransactionType } from '../../types/transaction';
import { StyledTransactionCard } from './TransactionCard.styles';

interface TransactionCardProps {
  transaction: Transaction
}

const TransactionCard: React.FC<TransactionCardProps> = (props) => {
  const { transaction } = props;

  const calculateTransactionCharge = () => {
    const result = transaction.numShares * transaction.price;
    if (transaction.transactionType === TransactionType.Buy) return -1 * result;
    if (transaction.transactionType === TransactionType.Sell) return 1 * result;
  }

  return (
    <StyledTransactionCard>
      <div>
        {transaction.transactionType}
        {calculateTransactionCharge()}
      </div>
      <div>
        {transaction.numShares}
        {transaction.price}
      </div>
    </StyledTransactionCard>
  )
}

export default TransactionCard;
