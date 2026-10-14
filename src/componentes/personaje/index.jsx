import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './style.css';

function Personaje() {
  const { id } = useParams();
  const [personaje, setPersonaje] = useState(null);
  const [esFavorito, setEsFavorito] = useState(false);

  useEffect(() => {
    fetch(`https://dragonball-api.com/api/characters/${id}`)
      .then((respuesta) => respuesta.json())
      .then((data) => {
        setPersonaje(data);

        // Verificamos si este personaje ya se encuentra en localStorage
        const guardados = JSON.parse(localStorage.getItem('favoritos')) || [];
        const existe = guardados.some((fav) => fav.id === data.id);
        setEsFavorito(existe);
      })
      .catch((error) => console.error('Error al obtener el detalle:', error));
  }, [id]);

  // Función para agregar o quitar de la lista de favoritos
  const toggleFavorito = () => {
    const guardados = JSON.parse(localStorage.getItem('favoritos')) || [];
    let nuevosFavoritos;

    if (esFavorito) {
      // Si ya es favorito, lo filtramos para eliminarlo
      nuevosFavoritos = guardados.filter((fav) => fav.id !== personaje.id);
    } else {
      // Si no es favorito, lo agregamos a la lista
      nuevosFavoritos = [
        ...guardados,
        {
          id: personaje.id,
          name: personaje.name,
          image: personaje.image,
          race: personaje.race,
          ki: personaje.ki
        }
      ];
    }

    // Actualizamos localStorage y el estado local
    localStorage.setItem('favoritos', JSON.stringify(nuevosFavoritos));
    setEsFavorito(!esFavorito);
  };

  if (!personaje) {
    return <div className="cargando">Cargando detalles del personaje...</div>;
  }

  return (
    <div className="detalle-contenedor">
      <Link to="/" className="btn-volver">← Volver a la Lista</Link>

      <div className="detalle-tarjeta">
        <img src={personaje.image} alt={personaje.name} className="detalle-imagen" />
        <div className="detalle-info">
          <h2>{personaje.name}</h2>
          <p><strong>Ki Base:</strong> {personaje.ki}</p>
          <p><strong>Ki Máximo:</strong> {personaje.maxKi}</p>
          <p><strong>Raza:</strong> {personaje.race}</p>
          <p><strong>Género:</strong> {personaje.gender}</p>
          <p className="descripcion"><strong>Historia:</strong> {personaje.description}</p>

          <button
            onClick={toggleFavorito}
            className={esFavorito ? 'btn-fav eliminar' : 'btn-fav agregar'}
          >
            {esFavorito ? '⭐ Quitar de Favoritos' : '☆ Agregar a Favoritos'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Personaje;