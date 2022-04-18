import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import './App.css';

import SideNavigation from './components/SideNavigation';
import { useCurrentUser } from './hooks/currentUser';
import { usePortfolios } from './hooks/portfolios';
import useAxiosPrivate from './hooks/useAxiosPrivate';
import Home from './pages/Home';
import Portfolios from './pages/Portfolios';
import CreatePortfolio from './pages/Portfolios/create';
import PortfolioDetail from './pages/Portfolios/detail';
import SignIn from './pages/User/SignIn';
import SignUp from './pages/User/SignUp';
import UserProfile from './pages/User/UserProfile';
import { Dispatch, RootState } from './store/store';
import { Token } from './types/user';

// TODO: Add Internationalization and Localization
export const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
})

interface AppProps extends AppConnect {

}

const App: React.FC<AppProps> = (props) => {
  const [showLogin, setShowLogin] = useState<boolean>(true);
  useAxiosPrivate();
  useCurrentUser();
  usePortfolios();

  const { currentUser, token, setToken } = props;

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

  if (token && !currentUser) {

    // TODO: Implement loading screen
    return (
      <div>
        Loading
      </div>
    )
  }

  return (
    <div className="App">
      <SideNavigation />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/portfolios" element={<Portfolios />} />
        <Route path="/portfolios/create" element={<CreatePortfolio />} />
        <Route path="/portfolios/:id" element={<PortfolioDetail />} />

        <Route path="/user" element={<UserProfile />} />
      </Routes>
    </div>
  );
}

type AppConnect = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

const mapState = (state: RootState) => ({
  token: state.currentUser.token,
  currentUser: state.currentUser.user,
});

const mapDispatch = (dispatch: Dispatch) => ({
  setToken: dispatch.currentUser.setToken,
});

export default connect(mapState, mapDispatch)(App);
