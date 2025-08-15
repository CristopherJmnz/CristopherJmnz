import { Link } from 'react-router-dom';
import './NotFound.css';
export const NotFound = () => {
  return (
    <div className="not-found">
      <div className="error-container">
        <h1>404</h1>
        <h2>Página no encontrada</h2>
        <p>Lo sentimos, pero la página que estás buscando no existe.</p>
        <Link to="/" className="back-home">
          Volver al Inicio
        </Link>
      </div>
    </div>
  );
};
export default NotFound;
