import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

function Favoritos() {
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {    
    const guardados = JSON.parse(localStorage.getItem('favoritos')) || [];
    setFavoritos(guardados);
  }, []);

  const eliminarFavorito = (id) => {
    const nuevosFavoritos = favoritos.filter((fav) => fav.id !== id);
    setFavoritos(nuevosFavoritos);
    localStorage.setItem('favoritos', JSON.stringify(nuevosFavoritos));
  };

  return (
    <div className="favoritos-contenedor">
      <h2>Personajes Favoritos</h2>

      {favoritos.length === 0 ? (
        <p className="sin-favoritos">Aún no has agregado personajes a tus favoritos.</p>
      ) : (
        <div className="grid-favoritos">
          {favoritos.map((personaje) => (
            <div key={personaje.id} className="tarjeta-favorito">
              <img src={personaje.image} alt={personaje.name} />
              <h3>{personaje.name}</h3>
              <p><strong>Raza:</strong> {personaje.race}</p>
              <div className="acciones-favorito">
                <Link to={`/personaje/${personaje.id}`} className="btn-ver">
                  Detalle
                </Link>
                <button
                  onClick={() => eliminarFavorito(personaje.id)}
                  className="btn-eliminar"
                >
                  Quitar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favoritos;