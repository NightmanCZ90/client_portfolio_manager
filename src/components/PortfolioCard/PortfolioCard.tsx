import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { formatter } from '../../App';
import { Portfolio } from '../../types/portfolio';
import { generateGreenRedClass, generateInvestorName } from '../../utils/helpers';
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
      name,
      user
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
            {generateInvestorName(user)}
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
                {formatter.format(unrealizedGains)}
              </span>
            </div>
            <div>
              <span>Realized gains</span>
              <span className={generateGreenRedClass(realizedGains)}>{formatter.format(realizedGains)}</span>
            </div>
          </div>
        </StyledPortfolioCardContent>
      </Link>

      <div className="cursor-bubble" style={{ left: cursor.x, top: cursor.y }}></div>

    </StyledPortfolioCard>
  )
}

export default PortfolioCard;
