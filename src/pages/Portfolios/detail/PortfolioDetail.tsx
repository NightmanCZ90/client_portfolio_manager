import { IconButton } from '@mui/material';
import { useMemo } from 'react';
import { connect } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import { PrimaryButton } from '../../../constants/components';
import { usePortfolio } from '../../../hooks/portfolios';
import { Dispatch, RootState } from '../../../store/store';
import { PortfolioOwnership } from '../../../types/portfolio';
import { generatePortfolioOwnership, generateUserName } from '../../../utils/helpers';
import { StyledPortfolioDetail, StyledPortfolioDetailHeader, StyledPortfolioDetailContent } from './PortfolioDetail.styles';

interface PortfolioDetailProps extends PortfolioDetailConnect {

}

const PortfolioDetail: React.FC<PortfolioDetailProps> = (props) => {
  const { id } = useParams();
  // TODO: use Portfolio with transactions
  const { data, isLoading } = usePortfolio(Number(id));

  const { currentUser } = props;

  const ownership = useMemo(() => generatePortfolioOwnership({ userId: currentUser?.id, portfolio: data }), [data, currentUser]);

  const renderOwnershipTitle = useMemo(() => {
    if (ownership === PortfolioOwnership.Managed || ownership === PortfolioOwnership.Unconfirmed) return `Managed by ${generateUserName(data?.portfolioManager)}`;
    if (ownership === PortfolioOwnership.Managing) return `Managing for ${generateUserName(data?.user)}`;
    return 'Personal';
  }, [ownership, data?.portfolioManager, data?.user]);

  if (isLoading) return <div>Loading</div>;

  if (!data) return <div>Nothing to display</div>;

  return (
    <StyledPortfolioDetail>

      <Link to={"/portfolios"} className="link-back">
        <IconButton>
          <ChevronLeftIcon />
        </IconButton>
      </Link>

      <StyledPortfolioDetailHeader>
        <div className="header-info">
          <h2>{data.name}</h2>
          <p>See your portfolio detail and add transactions</p>
        </div>
      </StyledPortfolioDetailHeader>
      <StyledPortfolioDetailContent>

        <section className="portfolio">
          <div className="portfolio-layout">
            {/* TODO: Remove to implement portfolio graph */}
            <div className="circle" />
          </div>
        </section>

        <section className="ownership-edit-button">
          <div className="owner">
            <h3>Portfolio ownership: <span>{renderOwnershipTitle}</span></h3>
          </div>

          <Link to={`/portfolios/${id}/edit`}>
            <PrimaryButton>
              Edit Portfolio
            </PrimaryButton>
          </Link>
        </section>

        <section className="portfolio-info">
          <h3>Portfolio information</h3>

          <div>
            {data.description || 'No description set'}
          </div>
          <div>
            {data.url || 'No url set'}
          </div>
        </section>
      </StyledPortfolioDetailContent>
    </StyledPortfolioDetail>
  )
}

type PortfolioDetailConnect = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

const mapState = (state: RootState) => ({
  currentUser: state.currentUser.user,
});

const mapDispatch = (dispatch: Dispatch) => ({
});

export default connect(mapState, mapDispatch)(PortfolioDetail);
