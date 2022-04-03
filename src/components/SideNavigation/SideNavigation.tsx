import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import DataSaverOffIcon from '@mui/icons-material/DataSaverOff';
import LogoutIcon from '@mui/icons-material/Logout';
import { Tooltip } from '@mui/material';
import { connect } from 'react-redux';

import { Dispatch, RootState } from '../../store/store';
import { NavigationButton, StyledSideNavigation } from './SideNavigation.styles';

interface SideNavigationProps extends SideNavigationConnect {

}

const SideNavigation: React.FC<SideNavigationProps> = (props) => {
  const { signOut } = props;
  return (
    <StyledSideNavigation>

      <div className="navigation-main">
        <Tooltip title="Portfolios" placement="right" arrow>
          <NavigationButton>
            <DataSaverOffIcon />
          </NavigationButton>
        </Tooltip>
      </div>

      <div className="navigation-user">
        <Tooltip title="My Account" placement="right" arrow>
          <NavigationButton>
            <PersonOutlineIcon fontSize="medium" />
          </NavigationButton>
        </Tooltip>

        <Tooltip title="Sign Out" placement="right" arrow>
          <NavigationButton onClick={signOut}>
            <LogoutIcon />
          </NavigationButton>
        </Tooltip>
      </div>

    </StyledSideNavigation>
  )
}

type SideNavigationConnect = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

const mapState = (state: RootState) => ({
});

const mapDispatch = (dispatch: Dispatch) => ({
  signOut: dispatch.currentUser.signOut,
});

export default connect(mapState, mapDispatch)(SideNavigation);
