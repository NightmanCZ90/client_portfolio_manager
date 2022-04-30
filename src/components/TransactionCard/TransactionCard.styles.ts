import { styled } from '@mui/system';

export const StyledTransactionCard = styled('div')`
  width: 100%;
  padding: 1rem;
  border-radius: 0.5rem;
  display: flex;
  background-color: var(--card-hover-verylight);

  .icon {
    display: flex;
    align-items: center;
    margin-right: 1rem;

    &.buy {
      color: var(--text-success);
    }

    &.sell {
      color: var(--text-error);
    }
  }

  .content {
    display: flex;
    flex-direction: column;
    width: 100%;

    .top {
      display: flex;
      justify-content: space-between;

      h3 {
        display: inline-block;
        margin-left: 1rem;
      }
    }

    .middle {
      display: flex;
      justify-content: space-between;

      .info {
        display: flex;
        flex-direction: row;
        .num-shares {
          margin-right: 1rem;
        }
      }


      .date {
        align-self: flex-end;
      }
    }
  }


  &:hover {
    background-color: var(--card-hover-light);
    /* opacity: 0.3; */
  }
`;

