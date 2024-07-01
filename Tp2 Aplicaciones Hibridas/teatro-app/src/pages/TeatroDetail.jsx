import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const TeatroDetail = () => {
  const { id } = useParams();
  const [teatro, setTeatro] = useState(null);
  const [obras, setObras] = useState([]);

  useEffect(() => {
    const fetchTeatro = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/admin/${id}`);
        if (!response.ok) {
          throw new Error('Error al obtener el teatro');
        }
        const data = await response.json();
        setTeatro(data);
      } catch (error) {
        console.error('Error al obtener el teatro:', error);
        setTeatro(null);
      }
    };

    const fetchObras = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/obras/admin/${id}`);
        if (!response.ok) {
          throw new Error('Error al obtener las obras');
        }
        const data = await response.json();
        setObras(data);
      } catch (error) {
        console.error('Error al obtener las obras:', error);
        setObras([]);
      }
    };

    fetchTeatro();
    fetchObras();
  }, [id]);

  if (!teatro) {
    return <p>Cargando...</p>;
  }

  return (
    <main className="container mx-auto p-4 especial">
      <h1 className="text-white font-headline text-2xl font-bold mb-4 pt-5 text-center">{teatro.nombreTeatro}</h1>
      <ul className='flex flex-wrap justify-around ml-4'>
        {obras.map(obra => (
          <li key={obra._id} className="obra-item mb-10 mt-10">
            <Link to={`/obra/${obra._id}`}>
          <img src={obra.foto} alt={obra.titulo} className="image-128x200 galeria rounded-lg" />
          </Link>
         </li>
        ))}
      </ul>
      <Link to="/" className="mb-4 bg-gray-300 px-4 py-2 rounded-md text-white hover:bg-gray-400" style={{ backgroundColor: '#bf1a27' }}>Volver al inicio</Link>
    </main>
  );
};

export default TeatroDetail;
