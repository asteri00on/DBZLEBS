// 1. Importas la imagen de la carpeta assets (cambia 'imagen_dbz.png' por el nombre y extensión real de tu archivo)
import imagenPortada from '../../assets/appidbz.jfif';
import './style.css';

function Informativa() {
  return (
    <div className="informativa-contenedor">
      <div className="tarjeta-info-personalizada">
        <h1 className="titulo-app">DRAGON BALL API</h1>
        <p className="subtitulo-autor">Luis Eduardo Bareño Suescun</p>

        {/* 2. Asignas la variable importada como expresión entre llaves {} en el atributo src */}
        <div className="imagen-decorativa">
          <img
            src={imagenPortada}
            alt="Dragon Ball Z Cover"
          />
        </div>


        <div className="creditos-footer">
          <a
            href="https://github.com/asteri00on/DBZLEBS"
            target="_blank"
            rel="noopener noreferrer"
            className="link-github"
          >
            github.com/asteri00on/DBZLEBS
          </a>
          <span className="version">v 1.0.0</span>
        </div>
      </div>
    </div>
  );
}

export default Informativa;