import AddIcon from '@mui/icons-material/Add';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import PortfolioCard from '../../components/PortfolioCard';

import { PrimaryButton } from '../../constants/components';
import { Dispatch, RootState } from '../../store/store';
import { Portfolio } from '../../types/portfolio';
import { StyledPortfolios, StyledPortfoliosContent, StyledPortfoliosHeader } from './Portfolios.styles';

interface PortfoliosProps extends PortfoliosConnect {

}

const Portfolios: React.FC<PortfoliosProps> = (props) => {

  const { currentUser, getPortfolios, loading, personalPortfolios, managedPortfolios } = props;

  useEffect(() => {
    (async () => {
      await getPortfolios();
    })();
  }, []);

  if (!currentUser) return null;

  const renderPortfolioCards = (portfolios: Portfolio[]) => {
    if (portfolios.length === 0) {
      return <div>No Portfolios</div>
    }

    // TODO: split into two groups by investor and pm
    return portfolios.map(portfolio => (
      <PortfolioCard key={portfolio.id}
        portfolio={portfolio}
        currency={currentUser.currency}
      />
    ))
  }

  return (
    <StyledPortfolios>
      <StyledPortfoliosHeader>
        <div className="header-info">
          <h2>Your Portfolios</h2>
          <p>Create and update your portfolios here</p>
        </div>
        <div className="header-user">
          <h2>Your portfolios value</h2>
          <p>13.000 $</p>
        </div>
      </StyledPortfoliosHeader>
      <StyledPortfoliosContent>
        <div className="buttons-wrapper">
          <PrimaryButton startIcon={<AddIcon />}>Add Portfolio</PrimaryButton>
        </div>
        <div className="portfolio-personal">
          <h2>Personal portfolios</h2>
          <div className="portfolio-cards">
            {loading ? 'loading' : renderPortfolioCards(personalPortfolios)}
          </div>
        </div>
        <div className="portfolio-managed">
          <h2>Managed portfolios</h2>
          <div className="portfolio-cards">
            {loading ? 'loading' : renderPortfolioCards(managedPortfolios)}
          </div>
        </div>
      </StyledPortfoliosContent>
    </StyledPortfolios>
  )
}

type PortfoliosConnect = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

const mapState = (state: RootState) => ({
  error: state.portfolios.error,
  loading: state.portfolios.loading,
  personalPortfolios: state.portfolios.personal,
  managedPortfolios: state.portfolios.managed,
  currentUser: state.currentUser.user,
});

const mapDispatch = (dispatch: Dispatch) => ({
  getPortfolios: dispatch.portfolios.getPortfolios,
});

export default connect(mapState, mapDispatch)(Portfolios);
