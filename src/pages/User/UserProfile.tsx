import { CircularProgress, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { SubmitButton } from '../../constants/components';
import { Dispatch, RootState } from '../../store/store';
import { Role } from '../../types/user';
import { capitalizeFirst } from '../../utils/helpers';
import { StyledUserProfile, StyledUserProfileContent, StyledUserProfileHeader } from './UserProfile.styles';

const initialUserFormData = {
  email: '',
  firstName: '',
  lastName: '',
  role: Role.Investor,
}

const initialUserFormErrorsData = {
  email: '',
  firstName: '',
  lastName: '',
}

interface UserProfileProps extends UserProfileConnect {

}

const UserProfile: React.FC<UserProfileProps> = (props) => {
  const [userData, setUserData] = useState<typeof initialUserFormData>(initialUserFormData);
  const [userDataErrors, setUserDataErrors] = useState<typeof initialUserFormErrorsData>(initialUserFormErrorsData);

  const { error, loading, user } = props;

  useEffect(() => {
    if (user) {
      setUserData(user);
    }
  }, [user]);

  const handleChange = () => {

  }

  const { email, firstName, lastName } = userDataErrors;
  const isFormDataInvalid = Boolean(email) || Boolean(firstName) || Boolean(lastName);

  const handleSubmit = () => {

  }

  return (
    <StyledUserProfile>
      <StyledUserProfileHeader>
        <div className="header-info">
          <h2>User Profile</h2>
          <p>Manage your user information here</p>
        </div>
        <div className="header-user">
          <h2>{user?.email}</h2>
          <p>{capitalizeFirst(user?.role || '')}</p>
        </div>
      </StyledUserProfileHeader>
      <StyledUserProfileContent>
        <form onSubmit={handleSubmit}>
          <TextField
            required
            fullWidth
            id="first-name-input"
            label="First name"
            name="firstName"
            value={userData.firstName}
            error={Boolean(userDataErrors.firstName)}
            helperText={userDataErrors.firstName}
            onChange={handleChange}
          />
          <TextField
            required
            fullWidth
            id="last-name-input"
            label="Last name"
            name="lastName"
            value={userData.lastName}
            error={Boolean(userDataErrors.lastName)}
            helperText={userDataErrors.lastName}
            onChange={handleChange}
          />
          <div className="signup-form--buttons">
            <SubmitButton
              type="submit"
              disabled={isFormDataInvalid}
            >
              {loading ? (<CircularProgress size={24} />) : "Save"}
            </SubmitButton>
          </div>
          {error && <span>{error}</span>}
        </form>
      </StyledUserProfileContent>
    </StyledUserProfile>
  )
}

type UserProfileConnect = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

const mapState = (state: RootState) => ({
  error: state.currentUser.error,
  loading: state.currentUser.loading,
  user: state.currentUser.user,
});

const mapDispatch = (dispatch: Dispatch) => ({
});

export default connect(mapState, mapDispatch)(UserProfile);
