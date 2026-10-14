import { useState, useEffect } from 'react';
import './style.css';

function Original() {
  const [personajes, setPersonajes] = useState([]);
  const [personajeActual, setPersonajeActual] = useState(null);
  const [opciones, setOpciones] = useState([]);
  const [esferas, setEsferas] = useState(0);
  const [puntos, setPuntos] = useState(0);
  const [revelado, setRevelado] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [invocado, setInvocado] = useState(false);

  useEffect(() => {    
    fetch('https://dragonball-api.com/api/characters?limit=50')
      .then((res) => res.json())
      .then((data) => {
        const lista = data.items || data;
        setPersonajes(lista);
        generarNuevaRonda(lista);
      })
      .catch((err) => console.error('Error al cargar juego:', err));
  }, []);

  
  const generarNuevaRonda = (lista) => {
    if (!lista || lista.length < 4) return;

    setRevelado(false);
    setMensaje('');

    // 1. Personaje objetivo correcto
    const correcto = lista[Math.floor(Math.random() * lista.length)];
    setPersonajeActual(correcto);

    // 2. Obtener 3 distractores distintos
    const distractores = lista.filter((p) => p.id !== correcto.id);
    const opcionesBarajadas = [correcto];

    while (opcionesBarajadas.length < 4) {
      const azar = distractores[Math.floor(Math.random() * distractores.length)];
      if (!opcionesBarajadas.some((item) => item.id === azar.id)) {
        opcionesBarajadas.push(azar);
      }
    }

    // 3. Meclamos las 4 opciones aleatoriamente
    opcionesBarajadas.sort(() => Math.random() - 0.5);
    setOpciones(opcionesBarajadas);
  };

  // Manejar el clic sobre una opción de respuesta
  const responder = (opcionSeleccionada) => {
    if (revelado || invocado) return;

    setRevelado(true);

    if (opcionSeleccionada.id === personajeActual.id) {
      const nuevasEsferas = esferas + 1;
      setEsferas(nuevasEsferas);
      setPuntos(puntos + 100);
      setMensaje('¡CORRECTO! conseguiste una Esfera del Dragón 🐲');

      // Si consigue las 7 esferas del dragón
      if (nuevasEsferas >= 7) {
        setInvocado(true);
      }
    } else {
      setMensaje(`¡¡¡¡PERDISTE INSECTO!!!! es ${personajeActual.name}`);
    }
  };

  const reiniciarJuego = () => {
    setEsferas(0);
    setPuntos(0);
    setInvocado(false);
    generarNuevaRonda(personajes);
  };

  if (!personajeActual) {
    return <div className="cargando-juego">Cargando Radar del Dragón...</div>;
  }

  return (
    <div className="juego-contenedor">
      <h2>🐉 DESAFÍO DEL RADAR DEL DRAGÓN 🐉</h2>
      <p className="subtitulo-juego">
        Adivina la silueta del guerrero para reunir las 7 Esferas del Dragón.
      </p>

      {/* Marcador de Puntos y Esferas */}
      <div className="tablero-puntuacion">
        <div className="caja-puntos">Puntos: <span>{puntos}</span></div>
        <div className="caja-esferas">
          Esferas Recompletadas:
          <div className="esferas-iconos">
            {Array.from({ length: 7 }).map((_, i) => (
              <span key={i} className={i < esferas ? 'esfera activa' : 'esfera'}>
                🟠
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Pantalla del Invocador de Shenlong */}
      {invocado ? (
        <div className="shenlong-invocacion">
          <h1>✨ ¡HAS INVOCADO A SHENLONG! ✨</h1>
          <p>¡Felicidades, reuniste las 7 Esferas del Dragón!</p>
          <img
            src="https://dragonball-api.com/characters/goku_normal.webp"
            alt="Shenlong"
            className="img-shenlong"
          />
          <button onClick={reiniciarJuego} className="btn-jugar-nuevo">
            Jugar de Nuevo
          </button>
        </div>
      ) : (
        <div className="area-juego">
          
          <div className="tarjeta-silueta">
            <img
              src={personajeActual.image}
              alt="Personaje Secreto"
              className={revelado ? 'imagen-personaje revelada' : 'imagen-personaje silueta'}
            />
            {revelado && <h3 className="nombre-revelado">{personajeActual.name}</h3>}
          </div>

          {/* Mensaje de resultado */}
          {mensaje && <div className="mensaje-resultado">{mensaje}</div>}

          {/* Botones de Opciones */}
          <div className="grid-opciones">
            {opciones.map((opcion) => (
              <button
                key={opcion.id}
                onClick={() => responder(opcion)}
                disabled={revelado}
                className="btn-opcion"
              >
                {opcion.name}
              </button>
            ))}
          </div>

          {/* Botón Siguiente Ronda */}
          {revelado && (
            <button
              onClick={() => generarNuevaRonda(personajes)}
              className="btn-siguiente"
            >
              Siguiente Guerrero →
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default Original;