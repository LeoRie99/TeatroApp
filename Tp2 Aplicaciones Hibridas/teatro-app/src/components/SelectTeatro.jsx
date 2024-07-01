import React, { useState, useEffect } from 'react';

const SelectTeatro = ({ onSelectTeatro }) => {
  const [teatros, setTeatros] = useState([]);
  const [selectedTeatro, setSelectedTeatro] = useState('');

  useEffect(() => {
    const fetchTeatros = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/admin');
        if (!response.ok) {
          throw new Error('Error al obtener los teatros');
        }
        const data = await response.json();

        // Asegúrate de que data sea un array o contenga un array
        if (Array.isArray(data)) {
          setTeatros(data);
        } else if (data.admins && Array.isArray(data.admins)) {
          setTeatros(data.admins);
        } else {
          setTeatros([]); // Manejo de caso cuando la estructura no es la esperada
        }
      } catch (error) {
        console.error('Error al obtener los teatros:', error);
        setTeatros([]);
      }
    };

    fetchTeatros();
  }, []);

  const handleSelectChange = (event) => {
    const selectedTeatroId = event.target.value;
    setSelectedTeatro(selectedTeatroId);
    onSelectTeatro(selectedTeatroId);
  };

  return (
    <div className="py-4">
      <div className="flex items-center justify-center">
        <select
          className="w-full max-w-xs bg-gray-800 text-white border border-gray-300 rounded-lg shadow-sm px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-500"
          style={{ backgroundColor: '#333334', fontSize: '1.1rem' }}
          value={selectedTeatro}
          onChange={handleSelectChange}
        >
          <option value="">Selecciona un teatro</option>
          {teatros.map(teatro => (
            <option key={teatro._id} value={teatro._id}>{teatro.nombreTeatro}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SelectTeatro;
