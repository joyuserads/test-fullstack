import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importa as duas páginas
import Home from './pages/Home';
import Detalhes from './pages/Detalhes';
import Form from './pages/form';

function App() {
  return (
    // Envolve a aplicação com o Router

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/noticias/:id" element={<Detalhes />} /> 
        <Route path="/post" element={<Form/>} />  {/* ✅ rota para cadastro */}
      </Routes>

  );
}

export default App;
