import { styled } from '@mui/system';

export const StyledCreatePortfolio = styled('div')`
  width: 100%;
`;

export const StyledCreatePortfolioHeader = styled('div')`
  height: 10rem;
  padding: 3rem 6rem 0 6rem;
  display: flex;
  justify-content: space-between;
  background-color: var(--color-header);

  .header-info {
    p {
      color: var(--color-header-subtitle);
    }
  }
`;

export const StyledCreatePortfolioContent = styled('div')`
  padding: 3rem 6rem;

  .owner-selection {
    min-height: 80.5px;
    padding: 1rem;
    border-radius: 1rem;
    background-color: var(--color-paper);
    transition: min-height 0.1s ease-out;

    .investor-selection {
      opacity: 0;
      display: none;
      transition: opacity 0.1s;
      padding-top: 1rem;

      .textfield-wrapper {
        width: 20rem;
        margin-right: 1rem;
      }

      & > span {
        margin-left: 2rem;
        align-self: center;

        &.error {
          color: var(--text-error);
        }
        &.success {
          color: var(--text-success);
        }
      }

    }

    &.managed {
      min-height: 152.5px;

      .investor-selection {
        display: flex;
        align-items: flex-start;
        opacity: 1;
        transition: opacity 0.3s;
      }
    }
  }

  form {
    margin-top: 2rem;
    width: 22rem;
    padding: 1rem;
    border-radius: 1rem;
    background-color: var(--color-paper);
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .portfolio-form--buttons {
      display: flex;
      justify-content: flex-end;
      margin-top: 2rem;
    }
  }
`;
