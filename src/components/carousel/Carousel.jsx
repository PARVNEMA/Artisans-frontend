import React, { useEffect, useState } from 'react';

const images = [
  'Artisans-frontend\public\images\artist.jpg',
  'https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.webp',
  'https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp',
  'https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.webp'
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="Carousel w-full h-[70vh]">
      {images.map((image, index) => (
        <div
          key={index}
          id={`slide ${index + 1}`}
          className={`Carousel-item relative w-full h-full ${index === currentIndex ? 'block' : 'hidden'}`}
        >
          <img src={image} className="w-full h-full" alt={`Slide ${index + 1}`} />
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <button onClick={handlePrev} className="btn btn-circle">❮</button>
            <button onClick={handleNext} className="btn btn-circle">❯</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Carousel;