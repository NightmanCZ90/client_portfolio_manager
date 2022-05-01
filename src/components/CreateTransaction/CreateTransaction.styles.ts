import { styled } from '@mui/system';

interface StyledCreateTransactionProps {
  readonly edit: number;
}

export const StyledCreateTransaction = styled('div')<StyledCreateTransactionProps>`

  form {
    padding: 1rem 0;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .required,
    .defaulted {
      display: flex;
      gap: 1rem;
    }

    .buttons {
      display: flex;
      justify-content: ${props => props.edit ? 'space-between' : 'flex-end'};

      .buttons-delete {
        display: flex;
        gap: 1rem;
      }
    }

    & > span {
      color: var(--text-error);
    }
  }
`;
