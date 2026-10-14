import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

function Coleccion() {
  // Estado para la lista completa de personajes traída de la API
  const [personajes, setPersonajes] = useState([]);
  
  // Estado para capturar el texto ingresado en el buscador
  const [busqueda, setBusqueda] = useState('');
  
  // Estado para el filtro por raza (opcional/adicional)
  const [filtroRaza, setFiltroRaza] = useState('Todos');

  useEffect(() => {
    // Obtenemos una lista amplia de personajes
    fetch('https://dragonball-api.com/api/characters?limit=50')
      .then((res) => res.json())
      .then((data) => {
        setPersonajes(data.items || data);
      })
      .catch((err) => console.error('Error al cargar la colección:', err));
  }, []);

  // Lógica de filtrado en tiempo real según la búsqueda y el selector de raza
  const personajesFiltrados = personajes.filter((personaje) => {
    const coincideNombre = personaje.name.toLowerCase().includes(busqueda.toLowerCase());
    const coincideRaza = filtroRaza === 'Todos' || personaje.race === filtroRaza;
    return coincideNombre && coincideRaza;
  });

  return (
    <div className="coleccion-contenedor">
      <h2>Colección y Buscador de Personajes</h2>

      {/* Controles de Búsqueda y Filtro */}
      <div className="barram-busqueda">
        <input
          type="text"
          placeholder="Buscar por nombre (ej. Goku)..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="input-busqueda"
        />

        <select
          value={filtroRaza}
          onChange={(e) => setFiltroRaza(e.target.value)}
          className="select-filtro"
        >
          <option value="Todos">Todas las Razas</option>
          <option value="Saiyan">Saiyan</option>
          <option value="Namekian">Namekian</option>

          <option value="Human">Human</option>
          <option value="Frieza Race">Frieza Race</option>
          <option value="Android">Android</option>
        </select>
      </div>

      {/* Galería de Resultados Filtrados */}
      <div className="grid-coleccion">
        {personajesFiltrados.length > 0 ? (
          personajesFiltrados.map((personaje) => (
            <div key={personaje.id} className="tarjeta-coleccion">
              <img src={personaje.image} alt={personaje.name} />
              <h3>{personaje.name}</h3>
              <p><strong>Raza:</strong> {personaje.race}</p>
              <Link to={`/personaje/${personaje.id}`} className="btn-ver">
                Ver Ficha
              </Link>
            </div>
          ))
        ) : (
          <p className="sin-resultados">No se encontraron personajes con los filtros seleccionados.</p>
        )}
      </div>
    </div>
  );
}

export default Coleccion;