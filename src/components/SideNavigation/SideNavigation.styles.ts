import { IconButton } from '@mui/material';
import { styled } from '@mui/system';

export const StyledSideNavigation = styled('div')`
  position: sticky;
  top: 0;
  background-color: #423c3c;
  width: 3.5rem;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .navigation-main {
    button {
      margin-bottom: 0.5rem;
    }
  }
  .navigation-user {
    button {
      margin-top: 0.5rem;
    }
  }
`;

export const NavigationButton = styled(IconButton)`
  color: #fff;

  &:hover {
    color: #f9ba48;
  }
`;
