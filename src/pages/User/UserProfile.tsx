import { CircularProgress, TextField } from '@mui/material';
import { useState } from 'react';
import { connect } from 'react-redux';
import { SubmitButton } from '../../constants/components';
import { userFormSchema } from '../../constants/validations';
import { Dispatch, RootState } from '../../store/store';
import { Role } from '../../types/user';
import { capitalizeFirst } from '../../utils/helpers';
import { StyledUserProfile, StyledUserProfileContent, StyledUserProfileHeader } from './UserProfile.styles';

const initialUserFormData = {
  firstName: '',
  lastName: '',
  role: Role.Investor,
}

const initialUserFormErrorsData = {
  firstName: '',
  lastName: '',
}

interface UserProfileProps extends UserProfileConnect {

}

const UserProfile: React.FC<UserProfileProps> = (props) => {
  const [userData, setUserData] = useState<typeof initialUserFormData>(props.user || initialUserFormData);
  const [userDataErrors, setUserDataErrors] = useState<typeof initialUserFormErrorsData>(initialUserFormErrorsData);

  const { error, loading, updateUser, user } = props;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {

    userFormSchema(event.target.name).validate({[event.target.name]: event.target.value})
      .then((value) => {
        setUserDataErrors({ ...userDataErrors, [event.target.name]: ''});
      })
      .catch((err) => {
        setUserDataErrors({ ...userDataErrors, [event.target.name]: err.message});
      });

    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
  }

  const { firstName, lastName } = userDataErrors;
  const isFormDataInvalid = Boolean(firstName) || Boolean(lastName);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (isFormDataInvalid) return;

    if (user) await updateUser({ ...user, ...userData });
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
  updateUser: dispatch.currentUser.updateUser,
});

export default connect(mapState, mapDispatch)(UserProfile);
