import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

function Inicio() {
  
  const [personajes, setPersonajes] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [filtroRaza, setFiltroRaza] = useState('Todos');

  useEffect(() => {
    
    fetch('https://dragonball-api.com/api/characters?limit=50')
      .then((respuesta) => respuesta.json())
      .then((data) => {
        setPersonajes(data.items || data);
      })
      .catch((error) => console.error('Error al cargar la API:', error));
  }, []);

  // 2. Lógica de filtrado combinada (Buscador por nombre + Filtro por raza)
  const personajesFiltrados = personajes.filter((personaje) => {
    const coincideNombre = personaje.name.toLowerCase().includes(busqueda.toLowerCase());
    const coincideRaza = filtroRaza === 'Todos' || personaje.race === filtroRaza;
    return coincideNombre && coincideRaza;
  });

  return (
    <div className="inicio-contenedor">
      <h1>Universo Dragon Ball Z</h1>

      {/* Seccion de Buscador y Filtro (Requisito de clase e Inicio) */}
      <div className="controles-busqueda">
        <input
          type="text"
          placeholder="Buscar personaje por nombre..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="input-buscador"
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
          <option value="God">God</option>
        </select>
      </div>

      {/* Galería general de personajes */}
      <div className="grid-personajes">
        {personajesFiltrados.length > 0 ? (
          personajesFiltrados.map((personaje) => (
            <div key={personaje.id} className="tarjeta-personaje">
              <img src={personaje.image} alt={personaje.name} />
              <h3>{personaje.name}</h3>
              <p><strong>Ki:</strong> {personaje.ki}</p>
              <p><strong>Raza:</strong> {personaje.race}</p>
              
              {/* Enlace dinámico a la vista de detalle con :id */}
              <Link to={`/personaje/${personaje.id}`} className="btn-detalle">
                Ver Detalle
              </Link>
            </div>
          ))
        ) : (
          <p className="sin-resultados">No se encontraron personajes que coincidan.</p>
        )}
      </div>
    </div>
  );
}

export default Inicio;