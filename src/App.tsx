import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import './App.css';

import SideNavigation from './components/SideNavigation';
import useAxiosPrivate from './hooks/useAxiosPrivate';
import { useBootstrap } from './hooks/useBootstrap';
import Home from './pages/Home';
import SignIn from './pages/User/SignIn';
import SignUp from './pages/User/SignUp';
import UserProfile from './pages/User/UserProfile';
import { Dispatch, RootState } from './store/store';
import { Token } from './types/user';

interface AppProps extends AppConnect {

}

const App: React.FC<AppProps> = (props) => {
  const [showLogin, setShowLogin] = useState<boolean>(true);
  useAxiosPrivate();
  useBootstrap();

  const { token, setToken } = props;

  useEffect(() => {
    if (!token) {
      const savedToken = localStorage.getItem('jwt_token');
      savedToken && setToken(JSON.parse(savedToken) as Token);
    }
  }, [setToken, token]);

  if (!token) {
    return (
      <div className='App'>
        {showLogin ? (
          <SignIn setShowLogin={setShowLogin} />
        ) : (
          <SignUp setShowLogin={setShowLogin} />
        )}
      </div>
    )
  }

  return (
    <div className="App">
      <SideNavigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<UserProfile />} />
      </Routes>
    </div>
  );
}

type AppConnect = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

const mapState = (state: RootState) => ({
  token: state.currentUser.token,
});

const mapDispatch = (dispatch: Dispatch) => ({
  setToken: dispatch.currentUser.setToken,
});

export default connect(mapState, mapDispatch)(App);
