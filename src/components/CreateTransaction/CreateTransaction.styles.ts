import { styled } from '@mui/system';

export const StyledCreateTransaction = styled('div')`

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
  }
`;
