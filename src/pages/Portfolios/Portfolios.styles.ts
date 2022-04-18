import { styled } from '@mui/system';

export const StyledPortfolios = styled('div')`
  width: 100%;
`;

export const StyledPortfoliosHeader = styled('div')`
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

  .header-user {
    p {
      color: var(--color-header-subinfo);
    }
  }
`;

export const StyledPortfoliosContent = styled('div')`
  padding: 3rem 6rem;

  .buttons-wrapper {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 2rem;
  }

  .portfolio-unconfirmed {
    margin-bottom: 2rem;

    .card {
      background-color: var(--color-paper);
      padding: 0.5rem 2rem;
      border-radius: 1rem;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }
  }

  .portfolio-personal,
  .portfolio-managed,
  .portfolio-managing {
    display: flex;
    flex-direction: column;
    margin-bottom: 2rem;

    .portfolio-cards {
      width: 100%;
      gap: 1.5rem;
      margin: 1.5rem 0;
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
    }
  }
`;
