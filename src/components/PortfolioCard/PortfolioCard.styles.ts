import { Card } from '@mui/material';
import { styled } from '@mui/system';

export const StyledPortfolioCard = styled(Card)`
  position: relative;
  min-width: 20rem;
  height: 30rem;

  a {
    position: absolute;
    width: 20rem;
    height: 30rem;
    padding: 1.5rem;
    z-index: 1;
    text-decoration: none;
    color: inherit;

    .investor {
      position: absolute;
      top: 0rem;
      right: 0rem;
      display: flex;
      align-items: center;
      padding: 0.1rem 0.5rem 0.1rem 5rem;
      background: linear-gradient(to right, transparent, var(--card-investor) 30%);
      font-weight: 300;
      font-size: 14px;

      span.not-confirmed {
        display: inline-block;
        margin-right: 0.5rem;
        width: 0.8rem;
        height: 0.8rem;
        border-radius: 50%;
        background-color: var(--text-error);
      }
    }
  }

  .cursor-bubble {
    position: absolute;
    top: 0;
    left: 0;
    background-color: #fff;
    width: 20rem;
    height: 20rem;
    border-radius: 50%;
    transition: opacity 400ms ease, transform 400ms ease;
    opacity: 0;
    transform: translate3d(0, 0, 0) scale(0);
  }

  &:hover {
    background-color: var(--card-hover);
    cursor: pointer;

    .investor {
      background: linear-gradient(to right, transparent, var(--card-investor-hover) 30%);
      color: var(--card-investor);
    }

    h3 {
      color: var(--secondary-text);
    }

    .cursor-bubble {
      opacity: 0.2;
      transform: translate3d(0, 0, 0) scale(1);
    }
  }
`;

export const StyledPortfolioCardHeader = styled('div')`
  margin-bottom: 1rem;
  z-index: 1;

  h2 {
    line-height: 1;
  }
  h3 {
    font-weight: 300;
    color: var(--color-header-subinfo);
  }
`;
export const StyledPortfolioCardContent = styled('div')`
  z-index: 1;

  .portfolio-gains {
    div {
      display: flex;
      justify-content: space-between;

      span:nth-of-type(2) {
        &.green {
          color: var(--color-profit);
        }
        &.red {
          color: var(--color-loss);
        }
      }
    }
  }
`;
