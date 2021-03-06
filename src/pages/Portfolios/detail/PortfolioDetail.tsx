import { Accordion, AccordionDetails, AccordionSummary, IconButton } from '@mui/material';
import { useMemo, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { SecondaryButton } from '../../../constants/components';
import { usePortfolio } from '../../../hooks/portfolios';
import { Dispatch, RootState } from '../../../store/store';
import { PortfolioOwnership } from '../../../types/portfolio';
import { generatePortfolioOwnership, generateUserName } from '../../../utils/helpers';
import { StyledPortfolioDetail, StyledPortfolioDetailContent } from './PortfolioDetail.styles';
import CreateTransaction from '../../../components/CreateTransaction';
import TransactionList from '../../../components/TransactionList';

interface PortfolioDetailProps extends PortfolioDetailConnect {

}

const PortfolioDetail: React.FC<PortfolioDetailProps> = (props) => {
  const { id } = useParams();
  const { data, isLoading } = usePortfolio(Number(id));
  const [createTransactionOpen, setCreateTransactionOpen] = useState<boolean>(false);

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

      <StyledPortfolioDetailContent>

        <section className="portfolio">
          <div className="portfolio-layout">
            {/* TODO: Remove to implement portfolio graph */}
            <div className="circle" />
          </div>
        </section>

        <Accordion expanded={createTransactionOpen} onChange={() => setCreateTransactionOpen(!createTransactionOpen)}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="create-transaction-content"
            id="create-transaction-header"
          >
            <h3>Create Transaction</h3>
          </AccordionSummary>

          <AccordionDetails>
            <CreateTransaction
              portfolioId={Number(id)}
            />
          </AccordionDetails>
        </Accordion>

        <section className="transactions">
          <h3>Transactions</h3>
          <TransactionList
            transactions={data.transactions || []}
          />
        </section>

        <section className="ownership-edit-button">
          <div className="owner">
            <h3>Portfolio ownership: <span>{renderOwnershipTitle}</span></h3>
          </div>

          <Link to={`/portfolios/${id}/edit`}>
            <SecondaryButton>
              Edit Portfolio
            </SecondaryButton>
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
