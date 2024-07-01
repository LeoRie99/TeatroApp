import React, { useState } from 'react';
import { useNavigate, Link  } from 'react-router-dom';
import logo from '../assets/logo2.png';

const RegisterView = () => {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState('');
  const [mail, setMail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [nacimiento, setNacimiento] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/usuarios/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre,
          mail,
          telefono,
          nacimiento,
          contraseña
        }),
      });

      if (!response.ok) {
        throw new Error('Error en la solicitud: ' + response.statusText);
      }

      const data = await response.json();
      console.log('Usuario registrado:', data);
      
    
      navigate('/');

    } catch (error) {
      console.error('Error al registrarse:', error.message);
      // Aquí puedes manejar errores de registro, como mostrar un mensaje al usuario
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100" style={{ backgroundColor: '#bf1a27' }}>
    <div className="bg-white p-8 rounded shadow-md w-full max-w-md flex flex-col items-center">
      <img src={logo} alt="Logo" className="w-32 h-32 mb-8" />
      <form onSubmit={handleRegister} className="w-full">
        <div className="mb-6">
          <label className="block text-gray-700">Nombre</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700">Fecha de Nacimiento</label>
          <input
            type="date"
            value={nacimiento}
            onChange={(e) => setNacimiento(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700">Correo electrónico</label>
          <input
            type="email"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700">Teléfono</label>
          <input
            type="tel"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700">Contraseña</label>
          <input
            type="password"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
          disabled={isLoading}
          style={{ backgroundColor: '#bf1a27' }}
        >
          {isLoading ? 'Cargando...' : 'Registrarse'}
        </button>
      </form>
      <p className="text-center mt-4">
        ¿Ya tienes una cuenta? <Link to="/login" className="text-blue-600 hover:underline">Inicia sesión aquí</Link>
      </p>
    </div>
  </main>
  );
};

export default RegisterView;
