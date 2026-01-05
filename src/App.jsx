import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/HomePage';
import EmConstrucao from './pages/EmConstrucao';
import InscricaoUJAD from './pages/InscricaoUJAD';
import ConfirmacaoInscricaoUjad from './pages/ConfirmacaoInscricaoUjad';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/em-breve" element={<EmConstrucao />} />
        <Route path="/ujad" element={<InscricaoUJAD />} />
        <Route path="/ujad-sucesso" element={<ConfirmacaoInscricaoUjad/>} />
      </Routes>
    </Router>
  );
}

export default App;