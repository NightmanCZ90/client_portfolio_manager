import UploadIcon from '@mui/icons-material/Upload';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { AccordionDetails, AccordionSummary } from '@mui/material';

import { Transaction, TransactionType } from '../../types/transaction';
import { StyledTransactionCard } from './TransactionCard.styles';
import CreateTransaction from '../CreateTransaction';
import { useState } from 'react';
import { formatterWithCurrency } from '../../App';

interface TransactionCardProps {
  transaction: Transaction;
  openId: number | null;
  setOpenId: React.Dispatch<React.SetStateAction<number | null>>;
}

const TransactionCard: React.FC<TransactionCardProps> = (props) => {
  const { openId, setOpenId, transaction } = props;

  const getClass = () => {
    if (transaction.transactionType === TransactionType.Buy) return 'buy';
    if (transaction.transactionType === TransactionType.Sell) return 'sell';
  }

  const renderIcon = () => {
    if (transaction.transactionType === TransactionType.Buy) return <FileDownloadIcon fontSize="large" />;
    if (transaction.transactionType === TransactionType.Sell) return <UploadIcon fontSize="large" />;
  }

  const calculateTransactionCharge = () => {
    let price = 0;
    if (transaction.transactionType === TransactionType.Buy) price = -1 * transaction.price;
    if (transaction.transactionType === TransactionType.Sell) price = 1 * transaction.price;
    return formatterWithCurrency.format(transaction.numShares * price);
  }

  const handleAccordionOpen = () => {
    if (openId === transaction.id) setOpenId(null);
    if (openId !== transaction.id) setOpenId(transaction.id);
  }

  return (
    <StyledTransactionCard expanded={openId === transaction.id} onChange={handleAccordionOpen}>
      <AccordionSummary
        aria-controls="update-transaction-content"
        id="update-transaction-header"
      >
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
      </AccordionSummary>

      <AccordionDetails>
        <CreateTransaction
          portfolioId={transaction.portfolioId}
          transaction={transaction}
        />
      </AccordionDetails>
    </StyledTransactionCard>
  )
}

export default TransactionCard;
