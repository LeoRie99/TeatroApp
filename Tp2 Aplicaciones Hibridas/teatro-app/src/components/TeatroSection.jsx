import React, { useState, useEffect } from 'react';
import Slider from './Slider';

const TeatroSection = ({ teatroId }) => {
  const [teatro, setTeatro] = useState(null);
  const [obras, setObras] = useState([]);

  useEffect(() => {
    const fetchTeatro = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/admin/${teatroId}`);
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
    const fetchObrasByTeatroId = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/obras/admin/${teatroId}`);
        if (!response.ok) {
          throw new Error('Error al obtener las obras');
        }
        const data = await response.json();
        setObras(data);
      } catch (error) {
        console.error(`Error al obtener las obras para el Teatro ${teatroId}:`, error);
        setObras([]);
      }
    };

    fetchTeatro();
    fetchObrasByTeatroId();
  }, [teatroId]);
  

  return (
    <section className="my-8">
      {teatro && (
        <h1 className="text-white font-headline text-2xl font-bold mb-4">{teatro.nombreTeatro}</h1>
      )}
      {obras.length > 0 ? (
        <Slider images={obras.map(obra => obra.foto)} obras={obras} />
      ) : (
        <p>No hay obras disponibles para este teatro.</p>
      )}
    </section>
  );
};

export default TeatroSection;
