import React from 'react';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#333334' }} className="text-white py-4 mt-8">
      <div className="container mx-auto text-center">
        <p>&copy; 2024 TeatroApp. Todos los derechos reservados.</p>
        <nav className="flex justify-center space-x-4">
          <a href="#" className="hover:underline">Inicio</a>
          <a href="#" className="hover:underline">Acerca de</a>
          <a href="#" className="hover:underline">Contacto</a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;