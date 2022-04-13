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

  .portfolio-personal,
  .portfolio-managed {
    display: flex;
    flex-direction: column;
    margin-bottom: 2rem;

    .portfolio-cards {
      gap: 1.5rem;
      margin: 1.5rem 0;
      display: flex;
      flex-direction: row;
    }
  }
`;
