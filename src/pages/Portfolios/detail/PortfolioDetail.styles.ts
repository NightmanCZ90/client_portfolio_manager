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
    margin-top: 2rem;
    width: 22rem;
    padding: 1rem;
    border-radius: 1rem;
    background-color: var(--color-paper);
    display: flex;
    flex-direction: column;
    gap: 1rem;

    /* .portfolio-name {
      font-size: 32px;
    } */

    /* .portfolio-form--buttons {
      display: flex;
      justify-content: flex-end;
      margin-top: 2rem;
    }

    & > span {
      color: var(--text-error);
    } */
  }
`;
