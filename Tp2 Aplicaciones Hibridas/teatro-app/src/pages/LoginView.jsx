import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../assets/logo2.png';

const LoginPage = () => {
  const [mail, setMail] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setIsLoading(true); // Mostrar el indicador de carga

    try {
      const response = await fetch('http://localhost:3000/api/usuarios/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mail, contraseña }),
      });

      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token); // Almacena el token en localStorage
      navigate('/'); // Redirige a la página de inicio después del inicio de sesión
    } catch (error) {
      setError('Correo electrónico o contraseña incorrectos');
      console.error('Error al iniciar sesión:', error);
    } finally {
      setIsLoading(false); // Ocultar el indicador de carga
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100" style={{ backgroundColor: '#bf1a27' }}>
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md flex flex-col items-center">
      <img src={logo} alt="Logo" className="w-32 h-32 mb-8" />
        <form onSubmit={handleLogin}>
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
            {isLoading ? 'Cargando...' : 'Iniciar sesión'}
          </button>
        </form>
        <p className="text-center mt-4">
          ¿No tienes cuenta? <Link to="/register" className="text-blue-600 hover:underline">Registrate aquí</Link>
        </p>
      </div>
    </main>
  );
};

export default LoginPage;
