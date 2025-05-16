import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PortalPage from './pages/PortalPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/portal" element={<PortalPage />} />
      </Routes>
    </Router>
  );
}

export default App;