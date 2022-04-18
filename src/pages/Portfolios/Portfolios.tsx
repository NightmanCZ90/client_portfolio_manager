import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import PortfolioCard from '../../components/PortfolioCard';
import { PrimaryButton } from '../../constants/components';
import { Dispatch, RootState } from '../../store/store';
import { Portfolio } from '../../types/portfolio';
import { generateInvestorName } from '../../utils/helpers';
import { StyledPortfolios, StyledPortfoliosContent, StyledPortfoliosHeader } from './Portfolios.styles';
import { useConfirmPortfolio, usePortfolios } from '../../hooks/portfolios';

interface PortfoliosProps extends PortfoliosConnect {

}

const Portfolios: React.FC<PortfoliosProps> = (props) => {
  const navigate = useNavigate();
  const { isLoading, data } = usePortfolios();
  const { mutate: confirmPortfolio, isLoading: loading } = useConfirmPortfolio();

  const { currentUser } = props;

  if (!currentUser) return null;

  const renderPortfoliosToConfirm = (portfolios?: Portfolio[]) => {
    if (!portfolios || portfolios.length === 0) return null;

    const handleConfirm = (event: React.MouseEvent<HTMLButtonElement>, portfolioId: number) => {
      event.preventDefault();
      event.stopPropagation();

      confirmPortfolio(portfolioId);
    }

    return portfolios.map(portfolio => (
      <div key={portfolio.id} className="card">
        <div className="text">
          <span>{generateInvestorName(portfolio.portfolioManager)}</span>
          &nbsp;
          <span>would like to share your managed portfolio with you.</span>
        </div>
        <Button disabled={loading} onClick={(event) => handleConfirm(event, portfolio.id)}>Confirm</Button>
      </div>
    ))
  }

  const renderPortfolioCards = (portfolios?: Portfolio[]) => {
    if (!portfolios || portfolios.length === 0) {
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
          <PrimaryButton onClick={() => navigate('/portfolios/create')} startIcon={<AddIcon />}>Add Portfolio</PrimaryButton>
        </div>
        {data?.unconfirmed && data?.unconfirmed?.length > 0 ? (
          <div className="portfolio-unconfirmed">
            {renderPortfoliosToConfirm(data?.unconfirmed)}
          </div>
        ) : null}
        <div className="portfolio-personal">
          <h2>Personal portfolios</h2>
          <div className="portfolio-cards">
            {isLoading ? 'loading' : renderPortfolioCards(data?.personal)}
          </div>
        </div>
        <div className="portfolio-managing">
          <h2>Managing portfolios</h2>
          <div className="portfolio-cards">
            {isLoading ? 'loading' : renderPortfolioCards(data?.managing)}
          </div>
        </div>
        <div className="portfolio-managed">
          <h2>Managed portfolios</h2>
          <div className="portfolio-cards">
            {isLoading ? 'loading' : renderPortfolioCards(data?.managed)}
          </div>
        </div>
      </StyledPortfoliosContent>
    </StyledPortfolios>
  )
}

type PortfoliosConnect = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

const mapState = (state: RootState) => ({
  currentUser: state.currentUser.user,
});

const mapDispatch = (dispatch: Dispatch) => ({
});

export default connect(mapState, mapDispatch)(Portfolios);
