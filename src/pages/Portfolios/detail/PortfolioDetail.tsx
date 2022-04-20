import { CircularProgress, TextField } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { PrimaryButton } from '../../../constants/components';
import { portfolioDetailFormSchema } from '../../../constants/validations';

import { useLinkPortfolio, usePortfolio, useUnlinkPortfolio } from '../../../hooks/portfolios';
import { Dispatch, RootState } from '../../../store/store';
import { PortfolioOwnership } from '../../../types/portfolio';
import { generatePortfolioOwnership, generateUserName } from '../../../utils/helpers';
import { StyledPortfolioDetail, StyledPortfolioDetailHeader, StyledPortfolioDetailContent } from './PortfolioDetail.styles';

const initialPorfolioFormData = {
  email: '',
  name: '',
  description: '',
  color: '',
  url: '',
}

type initialPorfolioFormDataType = {
  email: string;
  name: string,
  description: string,
  color: string,
  url: string,
}

const initialPorfolioFormErrorsData = {
  email: '',
  name: '',
  description: '',
  color: '',
  url: '',
}

interface PortfolioDetailProps extends PortfolioDetailConnect {

}

const PortfolioDetail: React.FC<PortfolioDetailProps> = (props) => {
  const { id } = useParams();
  const { data, isLoading, isFetching } = usePortfolio(Number(id));
  const { mutate: linkPortfolio, isLoading: isLinkingLoading, error: linkingError } = useLinkPortfolio(Number(id));
  const { mutate: unlinkPortfolio, isLoading: isUnlinkingLoading, error: unlinkingError } = useUnlinkPortfolio(Number(id));
  const [portfolioData, setPortfolioData] = useState<initialPorfolioFormDataType>(initialPorfolioFormData);
  const [portfolioDataErrors, setPortfolioDataErrors] = useState<typeof initialPorfolioFormErrorsData>(initialPorfolioFormErrorsData);

  const { currentUser } = props;

  useEffect(() => {
    if (data) {
      setPortfolioData({
        /** Do not overwrite already written text when data finishes fetching */
        email: portfolioData.email || (data.pmId ? (data.user?.email || '') : ''),
        name: data.name,
        description: data.description || '',
        color: data.color || '#fff',
        url: data.url || '',
      });
    }
  }, [data]);


  const ownership = useMemo(() => generatePortfolioOwnership({ userId: currentUser?.id, portfolio: data }), [data?.userId, data?.pmId, currentUser]);

  const renderOwnershipTitle = useMemo(() => {
    if (ownership === PortfolioOwnership.Managed || ownership === PortfolioOwnership.Unconfirmed) return `Managed by ${generateUserName(data?.portfolioManager)}`;
    if (ownership === PortfolioOwnership.Managing) return `Managing for ${generateUserName(data?.user)}`;
    return 'Personal';
  }, [ownership, data?.portfolioManager, data?.user]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    portfolioDetailFormSchema(event.target.name).validate({ [event.target.name]: event.target.value })
      .then((value) => {
        setPortfolioDataErrors({ ...portfolioDataErrors, [event.target.name]: '' });
      })
      .catch((err) => {
        setPortfolioDataErrors({ ...portfolioDataErrors, [event.target.name]: err.message });
      });

    setPortfolioData({
      ...portfolioData,
      [event.target.name]: event.target.value,
    });
  }

  const handleLink = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const { email } = portfolioData;

    if (Boolean(portfolioDataErrors.email)) return;
    if (email && data) linkPortfolio({ portfolioId: data?.id, email });
  }

  if (isLoading) return <div>Loading</div>;

  if (!portfolioData) return <div>Nothing to display</div>;

  return (
    <StyledPortfolioDetail>
      <StyledPortfolioDetailHeader>
        <div className="header-info">
          <h2>{portfolioData.name}</h2>
          <p>Update your portfolio, assign it to investor or add transactions</p>
        </div>
      </StyledPortfolioDetailHeader>
      <StyledPortfolioDetailContent>

        <div className="owner-selection">
          <h3>Portfolio ownership: <span>{renderOwnershipTitle}</span></h3>

          {ownership === PortfolioOwnership.Personal && (
            <>
              <h4>Link to investor</h4>
              <div className="inputs-wrapper">
                <div className="textfield-wrapper">
                  <TextField
                    fullWidth
                    required
                    id="investor-email-input"
                    label="Investor email"
                    name="email"
                    value={portfolioData.email}
                    error={Boolean(portfolioDataErrors.email)}
                    helperText={portfolioDataErrors.email}
                    onChange={handleChange}
                  />
                </div>
                <PrimaryButton
                  disabled={!Boolean(portfolioData.email) || Boolean(portfolioDataErrors.email) || isLinkingLoading || isFetching}
                  size="large"
                  onClick={handleLink}
                >
                  {isLinkingLoading ? (<CircularProgress size={24} />) : "Link investor"}
                </PrimaryButton>

                {linkingError && <span className="error">{linkingError.message}</span>}
              </div>
            </>
          )}

          {ownership === PortfolioOwnership.Managed && (
            <>
              <h4>Unlink from portfolio</h4>
              <div className="inputs-wrapper">
                <PrimaryButton
                  disabled={isUnlinkingLoading || isFetching}

                  size="large"
                  onClick={() => unlinkPortfolio()}
                >
                  {isUnlinkingLoading ? (<CircularProgress size={24} />) : "Unlink from portfolio"}
                </PrimaryButton>

                {unlinkingError && <span className="error">{unlinkingError.message}</span>}
              </div>
            </>
          )}
        </div>
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
