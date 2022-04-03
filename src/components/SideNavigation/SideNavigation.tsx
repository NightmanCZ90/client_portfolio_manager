import { NavigationButton, StyledSideNavigation } from './SideNavigation.styles';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import DataSaverOffIcon from '@mui/icons-material/DataSaverOff';
import LogoutIcon from '@mui/icons-material/Logout';
import { Tooltip } from '@mui/material';

const SideNavigation: React.FC = () => {
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
            <PersonOutlineIcon />
          </NavigationButton>
        </Tooltip>

        <Tooltip title="Sign Out" placement="right" arrow>
          <NavigationButton>
            <LogoutIcon />
          </NavigationButton>
        </Tooltip>
      </div>

    </StyledSideNavigation>
  )
}

export default SideNavigation;
