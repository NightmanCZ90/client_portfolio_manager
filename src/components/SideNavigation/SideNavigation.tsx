import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import DataSaverOffIcon from '@mui/icons-material/DataSaverOff';
import LogoutIcon from '@mui/icons-material/Logout';
import { Tooltip } from '@mui/material';
import { connect } from 'react-redux';

import { Dispatch, RootState } from '../../store/store';
import { NavigationButton, StyledSideNavigation } from './SideNavigation.styles';
import { NavigateFunction, useLocation, useNavigate } from 'react-router-dom';
import { useSignOut } from '../../hooks/auth';

type NavigationButtonProps = {
  icon: any;
  name: string;
  navigate: NavigateFunction;
  pathname: string;
  route: string;
  tooltipTitle: string;
}

const renderNavigationButton = ({ icon, name, navigate, pathname, route, tooltipTitle }: NavigationButtonProps) => {
  const active = pathname === route;

  const handlePageSelection = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!active) {
      event.preventDefault();
      event.stopPropagation();

      route && navigate(route);
    }
  }

  return (
    <Tooltip title={tooltipTitle} placement="right" arrow>
      <NavigationButton name={name} onClick={handlePageSelection}>
        {icon}
      </NavigationButton>
    </Tooltip>
  )
}

interface SideNavigationProps extends SideNavigationConnect {

}

const SideNavigation: React.FC<SideNavigationProps> = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { signout } = useSignOut();

  return (
    <StyledSideNavigation>

      <div className="navigation-main">
        {renderNavigationButton({ icon: <ShowChartIcon />, name: 'home', navigate, pathname, route: '/', tooltipTitle: 'Home' })}
        {renderNavigationButton({ icon: <DataSaverOffIcon />, name: 'portfolios', navigate, pathname, route: '/portfolios', tooltipTitle: 'Portfolios' })}
      </div>

      <div className="navigation-user">
        {renderNavigationButton({ icon: <PersonOutlineIcon fontSize="medium" />, name: 'userAccount', navigate, pathname, route: '/user', tooltipTitle: 'My Account' })}

        <Tooltip title="Sign Out" placement="right" arrow>
          <NavigationButton onClick={signout}>
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

});

export default connect(mapState, mapDispatch)(SideNavigation);
