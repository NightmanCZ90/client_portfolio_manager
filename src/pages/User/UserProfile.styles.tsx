import { styled } from '@mui/system';

export const StyledUserProfile = styled('div')`
  width: 100%;
`;

export const StyledUserProfileHeader = styled('div')`
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

export const StyledUserProfileContent = styled('div')`
  padding-top: 3rem;
  padding-left: 6rem;

  form {
    width: 20rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .signup-form--buttons {
      display: flex;
      justify-content: flex-end;
      margin-top: 2rem;
    }
  }
`;
