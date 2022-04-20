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

  const renderOwnershipManagement = () => {
    const ownershipManagement = {
      personal: {
        title: 'Link to investor',
        showTextfield: true,
        textFieldDisabled: false,
        submitDisabled: !Boolean(portfolioData.email) || Boolean(portfolioDataErrors.email) || isLinkingLoading || isFetching,
        onClick: handleLink,
        submitText: 'Link investor',
        loading: isLinkingLoading,
        error: linkingError,
      },
      managed: {
        title: 'Unlink from portfolio',
        showTextfield: false,
        textFieldDisabled: true,
        submitDisabled: isUnlinkingLoading || isFetching,
        onClick: () => unlinkPortfolio(),
        submitText: 'Unlink from portfolio',
        loading: isUnlinkingLoading,
        error: unlinkingError,
      },
      managing: {
        title: 'Unlink investor from portfolio',
        showTextfield: true,
        textFieldDisabled: true,
        submitDisabled: isUnlinkingLoading || isFetching,
        onClick: () => unlinkPortfolio(),
        submitText: 'Unlink investor',
        loading: isUnlinkingLoading,
        error: unlinkingError,
      },
      unconfirmed: {
        title: 'Unlink from portfolio',
        showTextfield: false,
        textFieldDisabled: true,
        submitDisabled: isUnlinkingLoading || isFetching,
        onClick: () => unlinkPortfolio(),
        submitText: 'Unlink from portfolio',
        loading: isUnlinkingLoading,
        error: unlinkingError,
      }
    }

    return (
      <>
        <h4>{ownershipManagement[ownership].title}</h4>
        <div className="inputs-wrapper">
          {ownershipManagement[ownership].showTextfield && (
            <div className="textfield-wrapper">
              <TextField
                fullWidth
                required
                disabled={ownershipManagement[ownership].textFieldDisabled}
                id="investor-email-input"
                label="Investor email"
                name="email"
                value={portfolioData.email}
                error={Boolean(portfolioDataErrors.email)}
                helperText={portfolioDataErrors.email}
                onChange={handleChange}
              />
            </div>
          )}
          <PrimaryButton
            disabled={ownershipManagement[ownership].submitDisabled}
            size="large"
            onClick={ownershipManagement[ownership].onClick}
          >
            {ownershipManagement[ownership].loading ? (<CircularProgress size={24} />) : ownershipManagement[ownership].submitText}
          </PrimaryButton>

          {ownershipManagement[ownership].error?.message && <span className="error">{ownershipManagement[ownership].error?.message}</span>}
        </div>
      </>
    )
  }

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
          <h3>Portfolio ownership: <span>{renderOwnershipTitle}</span>{isFetching ? <CircularProgress size={16} /> : null}</h3>

          {renderOwnershipManagement()}
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
