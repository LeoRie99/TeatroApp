import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ObraDetail = () => {
  const { obraId } = useParams();
  const navigate = useNavigate(); // Hook para la navegación
  const [obra, setObra] = useState(null);
  const [teatro, setTeatro] = useState(null); // Estado para almacenar los detalles del teatro
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchObra = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/obras/${obraId}`);
        if (!response.ok) {
          throw new Error('Error al obtener la obra');
        }
        const data = await response.json();
        setObra(data);
        setLoading(false);

        // Una vez que se carga la obra, obtén detalles del teatro relacionado
        if (data && data.admin) {
          const responseTeatro = await fetch(`http://localhost:3000/api/admin/${data.admin}`);
          if (!responseTeatro.ok) {
            throw new Error('Error al obtener el teatro');
          }
          const teatroData = await responseTeatro.json();
          setTeatro(teatroData);
        }
      } catch (error) {
        console.error('Error al obtener la obra:', error);
        setLoading(false);
      }
    };

    fetchObra();
  }, [obraId]);

  // Función para manejar el evento click del botón Volver
  const handleVolverClick = () => {
    navigate(-1); // Navega atrás en la historia de navegación
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!obra) {
    return <div>No se encontró la obra.</div>;
  }

  return (
    <main className="container mx-auto p-4 especial">
      
      <h1 className="text-2xl font-bold mb-6 text-white text-center">{obra.titulo}</h1>
      <div className="text-white flex items-center ml-8">
        <img src={obra.foto} alt={obra.titulo} className="image-128x200" />
        <div className='flex flex-col ml-4'>
          <p className="mb-6 mt-6 "><strong>Director:</strong> {obra.director}</p>
          <p className="mb-6"><strong>Elenco:</strong> {obra.elenco}</p>
          <p className="mb-6"><strong>Teatro:</strong> {teatro ? teatro.nombreTeatro : 'Cargando teatro...'}</p> 
          <p className="mb-6"><strong>Precio:</strong> ${obra.precio}</p>
        </div>
      </div>
      <p className="mb-6 mt-6 text-white description"> <strong>Descripción:</strong> {obra.descripcion}</p>
      <button onClick={handleVolverClick} className="mb-4 bg-gray-300 px-4 py-2 rounded-md text-white hover:bg-gray-400" style={{ backgroundColor: '#bf1a27' }}>
        Volver
      </button>
      <button className="mb-4 bg-gray-300 px-4 py-2 rounded-md text-white hover:bg-gray-400" style={{ backgroundColor: '#bf1a27' }}>
        Comprar Entrada
      </button>
    </main>
  );
};

export default ObraDetail;
