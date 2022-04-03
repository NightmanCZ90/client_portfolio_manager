import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import './App.css';

import SideNavigation from './components/SideNavigation';
import Home from './pages/Home';
import SignIn from './pages/User/SignIn';
import SignUp from './pages/User/SignUp';
import { Dispatch, RootState } from './store/store';

interface AppProps extends AppConnect {

}

const App: React.FC<AppProps> = (props) => {
  const [showLogin, setShowLogin] = useState<boolean>(false);

  const { token, setToken } = props;

  useEffect(() => {
    if (!token) {
      const savedToken = localStorage.getItem('access_token');
      savedToken && setToken(savedToken);
    }
  }, [token]);

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
