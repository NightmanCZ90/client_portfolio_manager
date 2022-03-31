import { NavigationButton, StyledSideNavigation } from './SideNavigation.styles';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import DataSaverOffIcon from '@mui/icons-material/DataSaverOff';

const SideNavigation: React.FC = () => {
  return (
    <StyledSideNavigation>

      <NavigationButton>
        <DataSaverOffIcon />
      </NavigationButton>

      <NavigationButton>
        <PersonOutlineIcon />
      </NavigationButton>

    </StyledSideNavigation>
  )
}

export default SideNavigation;
