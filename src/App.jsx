import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import EmConstrucao from './pages/EmConstrucao';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/em-breve" element={<EmConstrucao />} />
      </Routes>
    </Router>
  );
}

export default App;