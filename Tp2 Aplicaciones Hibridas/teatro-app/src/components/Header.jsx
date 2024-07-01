import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleToggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Elimina el token del localStorage
    navigate('/login'); // Redirige a la vista de login
  };

  // Verifica si estamos en la página de inicio (/)
  const isHome = location.pathname === '/';

  return (
    <header className="flex items-center justify-between p-4 text-white" style={{ backgroundColor: '#bf1a27' }}>
      <Link to="/">
        <div className="text-xl font-bold flex items-center">
          <img src={logo} alt="Logo"/>
        </div>
      </Link>
      {isHome && (
        <div className="md:hidden" onClick={handleToggleMenu}>
          {isOpen ? (
            <button className="text-xl">&times;</button>
          ) : (
            <button className="text-xl">&#9776;</button>
          )}
        </div>
      )}
      <nav className={`md:flex ${isHome && isOpen ? 'block' : 'hidden'}`}>
        <Link to="/profile" className="block px-4 py-2" onClick={handleLinkClick}>Perfil</Link>
        <button className="block px-4 py-2" onClick={handleLogout}>Cerrar Sesión</button>
      </nav>
    </header>
  );
};

export default Header;
