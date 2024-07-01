import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SelectTeatro from '../components/SelectTeatro';
import TeatroSection from '../components/TeatroSection';

const Home = () => {
  const navigate = useNavigate();
  const [teatros, setTeatros] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Estado para manejar el indicador de carga

  useEffect(() => {
    const fetchTeatros = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/admin');
        if (!response.ok) {
          throw new Error('Failed to fetch teatros');
        }
        const data = await response.json();
        console.log('Data from API (Teatros):', data);
        setTeatros(data.admins); 
      } catch (error) {
        console.error('Error fetching teatros:', error);
        setTeatros([]); 
      } finally {
        setIsLoading(false); // Ocultar el indicador de carga
      }
    };

    fetchTeatros();
  }, []);

  console.log('Teatros state:', teatros);

  const handleSelectTeatro = (selectedTeatroId) => {
    if (selectedTeatroId) {
      navigate(`/teatro/${selectedTeatroId}`);
    }
  };

  return (
    <main className="p-4">
      <SelectTeatro  onSelectTeatro={handleSelectTeatro} />
      {isLoading ? (
        <p>Cargando teatros...</p>
      ) : (
        teatros.length > 0 ? (
          teatros.map(teatro => (
            <TeatroSection
              key={teatro._id}
              title={teatro.nombreTeatro}
              teatroId={teatro._id} 
            />
          ))
        ) : (
          <p>No hay teatros disponibles.</p>
        )
      )}
    </main>
  );
};

export default Home;
