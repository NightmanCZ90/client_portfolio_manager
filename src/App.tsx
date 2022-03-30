import { Route, Routes } from 'react-router-dom';
import './App.css';
import SideNavigation from './components/SideNavigation';
import Home from './pages/Home';

const App: React.FC = () => {

  return (
    <div className="App">
      <SideNavigation />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
