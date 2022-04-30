import UploadIcon from '@mui/icons-material/Upload';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

import { Transaction, TransactionType } from '../../types/transaction';
import { StyledTransactionCard } from './TransactionCard.styles';

interface TransactionCardProps {
  transaction: Transaction
}

const TransactionCard: React.FC<TransactionCardProps> = (props) => {
  const { transaction } = props;

  const getClass = () => {
    if (transaction.transactionType === TransactionType.Buy) return 'buy';
    if (transaction.transactionType === TransactionType.Sell) return 'sell';
  }

  const renderIcon = () => {
    if (transaction.transactionType === TransactionType.Buy) return <FileDownloadIcon fontSize="large" />;
    if (transaction.transactionType === TransactionType.Sell) return <UploadIcon fontSize="large" />;
  }

  const calculateTransactionCharge = () => {
    const result = transaction.numShares * transaction.price;
    if (transaction.transactionType === TransactionType.Buy) return -1 * result;
    if (transaction.transactionType === TransactionType.Sell) return 1 * result;
  }

  return (
    <StyledTransactionCard>
      <div className={`icon ${getClass()}`}>
        {renderIcon()}
      </div>
      <div className="content">
        <div className="top">
          <div className="type-name">
            {transaction.transactionType.toUpperCase()}
            <h3>{transaction.stockName}</h3>
          </div>
          {calculateTransactionCharge()}
          &nbsp;
          {transaction.currency}
        </div>
        <div className="middle">
          <div className="info">
            <div className="num-shares">
              {transaction.numShares}
              &nbsp;
              shares
            </div>
            <div className="price">
              {transaction.price}
              &nbsp;
              {transaction.currency}
            </div>
          </div>
          <div className="date">
            {new Date(transaction.transactionTime).toLocaleDateString()}
          </div>
        </div>
      </div>
    </StyledTransactionCard>
  )
}

export default TransactionCard;
