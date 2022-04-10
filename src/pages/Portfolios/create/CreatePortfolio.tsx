import { ToggleButton, TextField, CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { Dispatch, RootState } from '../../../store/store';
import { CustomToggleButtonGroup, PrimaryButton } from '../../../constants/components';
import { StyledCreatePortfolio, StyledCreatePortfolioContent, StyledCreatePortfolioHeader } from './CreatePortfolio.styles';
import { portfolioCreationFormSchema } from '../../../constants/validations';

enum PortfolioVariant {
  Personal,
  Managed,
}

const initialPorfolioFormData = {
  investorEmail: '',
  investorId: null,
  name: '',
  description: '',
  color: '',
  url: '',
}

type initialPorfolioFormDataType = {
  investorEmail: string;
  investorId: number | null;
  name: string,
  description: string,
  color: string,
  url: string,
}

const initialPorfolioFormErrorsData = {
  investorEmail: '',
  name: '',
  description: '',
  color: '',
  url: '',
}

interface CreatePortfolioProps extends CreatePortfolioConnect {

}

const CreatePortfolio: React.FC<CreatePortfolioProps> = (props) => {
  const [portfolioVariant, setPortfolioVariant] = useState<PortfolioVariant>(PortfolioVariant.Personal);
  const [portfolioData, setPortfolioData] = useState<initialPorfolioFormDataType>(initialPorfolioFormData);
  const [portfolioDataErrors, setPortfolioDataErrors] = useState<typeof initialPorfolioFormErrorsData>(initialPorfolioFormErrorsData);

  const { checkInvestor, investorCheckError, investorCheckLoading, investorId, setInvestorCheckError } = props;

  // Remove this useEffect if removing checked investor is not wanted
  useEffect(() => {
    if (portfolioVariant === PortfolioVariant.Personal) {
      setPortfolioData({ ...portfolioData, investorEmail: '', investorId: null });
      setPortfolioDataErrors({ ...portfolioDataErrors, investorEmail: '' });
      setInvestorCheckError('');
    }
  }, [portfolioVariant]);

  useEffect(() => {
    if (investorId) {
      setPortfolioData({
        ...portfolioData,
        investorId,
      });
    }
  }, [investorId]);

  const handlePortfolioVariantSelection = (event: React.MouseEvent, value: PortfolioVariant) => {
    if (value !== null) {
      setPortfolioVariant(value);
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {

    if (event.target.name === 'investorEmail') {
      setInvestorCheckError('');
    }

    portfolioCreationFormSchema(event.target.name, portfolioVariant === PortfolioVariant.Managed).validate({ [event.target.name]: event.target.value })
      .then((value) => {
        setPortfolioDataErrors({ ...portfolioDataErrors, [event.target.name]: '' });
      })
      .catch((err) => {
        setPortfolioDataErrors({ ...portfolioDataErrors, [event.target.name]: err.message });
      });

    setPortfolioData({
      ...portfolioData,
      investorId: event.target.name === 'investorEmail' ? null : portfolioData.investorId,
      [event.target.name]: event.target.value,
    });
  }

  const handleInvestorCheck = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const { investorEmail } = portfolioData;
    setPortfolioData({
      ...portfolioData,
      investorId: null,
    });

    if (Boolean(portfolioDataErrors.investorEmail)) return;
    if (investorEmail) await checkInvestor({ investorEmail });
  }

  return (
    <StyledCreatePortfolio>
      <StyledCreatePortfolioHeader>
        <div className="header-info">
          <h2>Create Portfolio</h2>
          <p>Create new portfolio here and assign it to yourself or managed investor</p>
        </div>
      </StyledCreatePortfolioHeader>
      <StyledCreatePortfolioContent>
        <div className={`owner-selection ${portfolioVariant === PortfolioVariant.Managed ? 'managed' : ''}`}>
          <CustomToggleButtonGroup
            color="primary"
            value={portfolioVariant}
            exclusive
            onChange={handlePortfolioVariantSelection}
          >
            <ToggleButton value={PortfolioVariant.Personal}>Personal</ToggleButton>
            <ToggleButton value={PortfolioVariant.Managed}>Managed</ToggleButton>
          </CustomToggleButtonGroup>
          <div className="investor-selection">
            <div className="textfield-wrapper">
              <TextField
                color={portfolioData.investorId ? 'success' : undefined}
                focused={portfolioData.investorId ? true : undefined}
                fullWidth
                id="investor-email-input"
                label="Managed investor email"
                name="investorEmail"
                value={portfolioData.investorEmail}
                error={Boolean(portfolioDataErrors.investorEmail) || Boolean(investorCheckError)}
                helperText={portfolioDataErrors.investorEmail}
                onChange={handleChange}
              />
            </div>
            <PrimaryButton
              disabled={!Boolean(portfolioData.investorEmail) || Boolean(portfolioDataErrors.investorEmail)}
              size="large"
              onClick={handleInvestorCheck}
            >
              {investorCheckLoading ? (<CircularProgress size={24} />) : "Check user"}
            </PrimaryButton>

            {investorCheckError && <span className="error">{investorCheckError}</span>}
            {portfolioData.investorId && <span className="success">User is checked.</span>}

          </div>
        </div>
      </StyledCreatePortfolioContent>
    </StyledCreatePortfolio>
  )
}

type CreatePortfolioConnect = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

const mapState = (state: RootState) => ({
  investorCheckError: state.portfolios.investorCheckError,
  investorCheckLoading: state.portfolios.investorCheckLoading,
  investorId: state.portfolios.investorId,
});

const mapDispatch = (dispatch: Dispatch) => ({
  checkInvestor: dispatch.portfolios.checkInvestor,
  setInvestorCheckError: dispatch.portfolios.setInvestorCheckError,
});

export default connect(mapState, mapDispatch)(CreatePortfolio);
