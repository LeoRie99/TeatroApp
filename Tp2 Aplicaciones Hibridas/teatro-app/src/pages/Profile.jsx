import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Profile = () => {
  const [userData, setUserData] = useState({});
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3000/api/usuarios/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token ? `Bearer ${token}` : '',
          },
        });

        if (!response.ok) {
          throw new Error('Error al obtener datos del usuario');
        }

        const data = await response.json();
        console.log('Datos del usuario:', data);
        setUserData(data);
      } catch (error) {
        console.error('Error al obtener datos del usuario:', error);
        setError(error.message);
      }

      
    };

    

    fetchUserData();
  }, []);

  if (error) {
    return <div className="container mx-auto p-8 text-center text-red-600">Error al obtener datos del usuario: {error}</div>;
  }

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    navigate('/login'); 
  };

  return (
    <main className="container mx-auto px-4 py-8 text-center container mx-auto p-4 especial">
      <div className="p-6">
        <h1 className="text-center text-4xl font-bold mb-6 text-white">Bienvenido/a {userData.nombre}</h1>
        <div className="mb-6">
          <label className="block text-white text-xl font-bold mb-2">Email:</label>
          <p className="text-white text-xl">{userData.mail}</p>
        </div>
        <div className="mb-6">
          <label className="block text-white text-xl font-bold mb-2">Teléfono:</label>
          <p className="text-white text-xl">{userData.telefono}</p>
        </div>
        <div className="mb-6">
          <label className="block text-white text-xl font-bold mb-2">Fecha de Nacimiento:</label>
          <p className="text-white text-xl">{userData.nacimiento}</p>
        </div>
        <div className="flex justify-center">
          <Link to="/" className="mr-4">
            <button className="text-white px-6 py-3 rounded-md mt-4 bg-red-600 hover:bg-red-700 transition duration-300">Volver al Inicio</button>
          </Link>
          <button className="text-white px-6 py-3 rounded-md mt-4 bg-red-600 hover:bg-red-700 transition duration-300">Últimas Operaciones</button>
        </div>
        <div className="flex justify-center">
          <button className="text-white px-6 py-3 rounded-md mt-4 bg-red-600 hover:bg-red-700 transition duration-300" onClick={handleLogout}>Cerrar Sesión</button>
        </div>
      </div>
    </main>
  );
};

export default Profile;
