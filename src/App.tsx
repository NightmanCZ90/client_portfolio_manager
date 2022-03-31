import { Routes, Route } from 'react-router-dom';
import './App.css';
import SideNavigation from './components/SideNavigation';
import SignUp from './pages/Account/SignUp';
import Home from './pages/Home';

const App: React.FC = () => {

  return (
    <div className="App">
      <SideNavigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
