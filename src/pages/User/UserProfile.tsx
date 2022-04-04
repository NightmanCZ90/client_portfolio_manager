import { connect } from 'react-redux';
import { Dispatch, RootState } from '../../store/store';


interface UserProfileProps extends UserProfileConnect {

}

const UserProfile: React.FC<UserProfileProps> = (props) => {
  const { user } = props;

  return (
    <div>{user?.email}</div>
  )
}

type UserProfileConnect = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

const mapState = (state: RootState) => ({
  user: state.currentUser.user,
});

const mapDispatch = (dispatch: Dispatch) => ({
});

export default connect(mapState, mapDispatch)(UserProfile);
