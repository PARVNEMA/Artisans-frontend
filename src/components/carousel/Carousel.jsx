import React, { useEffect, useState } from "react";
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
    }, 3000); // Change slide every 3 seconds

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
      Title: "Explore all the Authenticated products made by local Artists",
      text: "From Local to Global",
      Link: "/DetailedProduct",
    },
    {
      Title: "Keep up with various trends according to the seasons here",
      text: "Special Seasonal Offer",
      Link: "/FeaturedProducts",
    },
    {
      Title: "Buy all the special festival products from here",
      text: "Special Festive Products",
      Link: "/ProductList",
    },
    {
      Title: "Order products which meet your needs",
      text: "Custom Made Products",
    },
  ];

  return (
    <div className="relative w-full h-[80vh] overflow-hidden">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: "cover",
              backgroundAttachment: "fixed",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mx-10 lg:mx-20 text-one text-center mb-4">
                <Link to={array[index].Link}>{array[index].Title}</Link>
              </h2>
              <button className="text-white font-serif text-xl md:text-2xl px-4 py-2 rounded bg-three bg-opacity-80 hover:bg-opacity-100 transition duration-300">
                {array[index].text}
              </button>
            </div>
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
