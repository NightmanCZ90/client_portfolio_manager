import { styled } from '@mui/system';

export const StyledPortfolioDetail = styled('div')`
  width: 100%;
`;

export const StyledPortfolioDetailHeader = styled('div')`
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

export const StyledPortfolioDetailContent = styled('div')`
  padding: 3rem 6rem;

  .owner-selection {
    min-height: 80.5px;
    padding: 1rem;
    border-radius: 1rem;
    background-color: var(--color-paper);
    transition: min-height 0.1s ease-out;

    h3 {
      margin-bottom: 1rem;

      span {
        margin-left: 0.5rem;
        color: var(--color-header-subinfo);
      }
    }

    h4 {
      margin-bottom: 1rem;
    }

    .inputs-wrapper {
      display: flex;
      align-items: flex-start;

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
  }

  /* form {
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

    & > span {
      color: var(--text-error);
    }
  } */
`;
