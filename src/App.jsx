import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Inicio from './componentes/inicio';
import Original from './componentes/original';
import Favoritos from './componentes/favoritos';
import Informativa from './componentes/informativa';
import Usuario from './componentes/usuario';
import Personaje from './componentes/personaje';
import './App.css';

function App() {
  return (
    <Router>
      {/* Las 5 Pestañas principales requeridas en la rúbrica */}
      <nav className="navbar">
        <Link to="/">Inicio</Link>
        <Link to="/original">Original</Link>
        <Link to="/favoritos">Favoritos</Link>
        <Link to="/informativa">Informativa</Link>
        <Link to="/usuario">Usuario</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/original" element={<Original />} />
        <Route path="/favoritos" element={<Favoritos />} />
        <Route path="/informativa" element={<Informativa />} />
        <Route path="/usuario" element={<Usuario />} />
        {/* Ruta dinámica para la ficha técnica del personaje */}
        <Route path="/personaje/:id" element={<Personaje />} />
      </Routes>
    </Router>
  );
}

export default App;