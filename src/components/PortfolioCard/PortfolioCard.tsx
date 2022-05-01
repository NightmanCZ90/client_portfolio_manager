import { Tooltip } from '@mui/material';
import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { formatterWithCurrency } from '../../App';
import { Portfolio } from '../../types/portfolio';
import { generateGreenRedClass, generateUserName } from '../../utils/helpers';
import { StyledPortfolioCard, StyledPortfolioCardContent, StyledPortfolioCardHeader } from './PortfolioCard.styles';

interface PortfolioCardProps {
  currency: string;
  portfolio: Portfolio;
}

const PortfolioCard: React.FC<PortfolioCardProps> = (props) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [cursor, setCursor] = useState<{ x: number, y: number }>({ x: 0, y: 0 });
  const {
    // currency,
    portfolio: {
      id,
      confirmed,
      name,
      user,
    }
  } = props;

  const onMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    let { left, top } = cardRef.current?.getBoundingClientRect() || {};

    if (left && top) {
      const x = (event.clientX - left) - 160;
      const y = (event.clientY - top) - 160;

      setCursor({ x, y });
    }
  }

  const unrealizedGains = 400;
  const realizedGains = 0;

  return (
    <StyledPortfolioCard onMouseMove={onMouseMove} ref={cardRef}>

      <Link to={`/portfolios/${id}`}>
        {user ? (
          <div className="investor">
            {!confirmed && (
              <Tooltip title="Portfolio is not yet confirmed by the investor.">
                <span className="not-confirmed" />
              </Tooltip>
            )}
            {generateUserName(user)}
          </div>
        ) : null}
        <StyledPortfolioCardHeader>
          <h2>{name}</h2>
          <h3>Portfolio</h3>
        </StyledPortfolioCardHeader>
        <StyledPortfolioCardContent>
          <div className="portfolio-gains">
            <div>
              <span>Unrealized gains</span>
              <span className={generateGreenRedClass(unrealizedGains)}>
                {formatterWithCurrency.format(unrealizedGains)}
              </span>
            </div>
            <div>
              <span>Realized gains</span>
              <span className={generateGreenRedClass(realizedGains)}>{formatterWithCurrency.format(realizedGains)}</span>
            </div>
          </div>
        </StyledPortfolioCardContent>
      </Link>

      <div className="cursor-bubble" style={{ left: cursor.x, top: cursor.y }}></div>

    </StyledPortfolioCard>
  )
}

export default PortfolioCard;
