import { useState, useEffect } from 'react';
import slide_1 from '../assets/slider_1.jpeg';
import slide_2 from '../assets/slider_2.jpeg';

const images = [
  slide_1,
  slide_2,
];

export const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((currentIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="relative h-80 md:h-120 overflow-hidden shadow-lg">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}>
          <img
            src={image}
            alt={`Imagen ${index + 1}`}
            className="object-cover w-full h-80 md:h-120"/>
        </div>
      ))}
    </div>
  );
};
