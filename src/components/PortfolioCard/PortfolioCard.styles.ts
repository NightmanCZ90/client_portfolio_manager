import { Card } from '@mui/material';
import { styled } from '@mui/system';

export const StyledPortfolioCard = styled(Card)`
  position: relative;
  width: 20rem;
  height: 30rem;

  a {
    position: absolute;
    width: 20rem;
    height: 30rem;
    padding: 1.5rem;
    z-index: 1;
    text-decoration: none;
    color: inherit;
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
