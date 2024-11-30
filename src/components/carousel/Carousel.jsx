import React, { useEffect, useState } from "react";
import DetailedProduct from "../detailedproduct/DetailedProduct";
import FeaturedProducts from "../featuredProducts/FeaturedProducts";
import ProductList from "../ProductList/ProductList";
import { Link } from "react-router-dom";

const images = [
  "/images/DeWatermark.ai_1732863152583.png",
  "/images/2.jpg",
  "/images/1.jpg",
  "/images/slide4.png",
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 10000); // Change slide every 10 seconds

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, []);

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const array = [
    {
      Title: "Explore all the Authenticated product made by local Artists",
      text: "From local to Global",
      Link: "/DetailedProduct"
    },
    {
      Title: "Keep up with various trends according to the seasons here",
      text: "Special seasonal offer",
      Link: "/FeaturedProducts"
    },
    {
      Title: "Buy all the special festival products from here",
      text: "Special festive products",
      Link: "/ProductList"
    },
    {
      Title: "Order products which meet your needs",
      text: "Custom made products"
    },
  ];

  return (
    <div className="carousel relative w-full h-[80vh] overflow-hidden">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={image}
            className="w-full h-full object-cover"
            alt={`Slide ${index + 1}`}
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50">
            <h2 className="text-6xl font-bold mx-20 text-one text-center mb-4">
              <Link to={array[index].Link}>{array[index].Title}</Link>
            </h2>
            <button className="text-white font-serif text-2xl px-4 py-2 rounded">
              {array[index].text}
            </button>
          </div>
        </div>
      ))}
      <button
        onClick={handlePrev}
        className="absolute left-5 top-1/2 transform -translate-y-1/2 text-white text-3xl"
      >
        ❮
      </button>
      <button
        onClick={handleNext}
        className="absolute right-5 top-1/2 transform -translate-y-1/2 text-white text-3xl"
      >
        ❯
      </button>
    </div>
  );
};

export default Carousel;
