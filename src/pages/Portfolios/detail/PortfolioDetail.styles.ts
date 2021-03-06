import { styled } from '@mui/system';

export const StyledPortfolioDetail = styled('div')`
  width: 100%;
  position: relative;

  a.link-back {
    position: absolute;
    top: 0.5rem;
    left: 0.5rem;
  }
`;

export const StyledPortfolioDetailContent = styled('div')`
  padding: 3rem 6rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  section.portfolio {
    padding: 1rem;
    border-radius: 1rem;
    background-color: var(--color-paper);

    .portfolio-layout {
      // TODO: Remove after portfolio layout graph implementation
      .circle {
        height: 20rem;
        width: 20rem;
        border: 2rem solid violet;
        border-radius: 50%;
      }
    }
  }

  section.transactions {
    padding: 1rem;
    border-radius: 1rem;
    background-color: var(--color-paper);
    z-index: 2;
  }

  section.ownership-edit-button {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    .owner {
      padding: 1rem;
      border-radius: 1rem;
      background-color: var(--color-paper);

      h3 {

        span {
          margin-left: 0.5rem;
          color: var(--color-header-subinfo);
        }
      }
    }

    a {
      text-decoration: none;

      button {
        height: 100%;
      }
    }
  }


  section.portfolio-info {
    width: 22rem;
    padding: 1rem;
    border-radius: 1rem;
    background-color: var(--color-paper);
    display: flex;
    flex-direction: column;
  }
`;
