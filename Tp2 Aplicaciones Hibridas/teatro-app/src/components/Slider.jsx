// Importar React y componentes necesarios de Swiper
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Swiper from 'swiper';
import '../swiper-bundle.min.css';
import '../effect-coverflow.min.css'; 

const MySlider = ({ images, obras }) => {
  const swiperRef = useRef(null); 

  useEffect(() => {
    swiperRef.current = new Swiper('.swiper-container', {
      slidesPerView: 3,
      spaceBetween: 20,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      effect: 'coverflow',
      coverflowEffect: {
        rotate: 100,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      },
      loop: true,
      breakpoints: {
        640: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
      },
    });
  }, []);

  return (
    <div className="swiper-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className="swiper-wrapper">
        {images.map((image, index) => (
          <div className="swiper-slide" key={index}>
            <Link to={`/obra/${obras[index]._id}`}>
              <img
                src={image}
                alt={`Slide ${index}`}
                className="slider-image rounded-lg swiper-slide-img"
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MySlider;
