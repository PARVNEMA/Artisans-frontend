import React, { useEffect, useState } from "react";

const images = [
  "https://s7d1.scene7.com/is/image/wbcollab/shutterstock_551163163:1140x500?qlt=90&fmt=webp&resMode=sharp2",
  "https://i0.wp.com/iheartindian.wordpress.com/wp-content/uploads/2023/11/image-14.png?resize=930%2C450&ssl=1",
  "https://i.pinimg.com/736x/c7/12/83/c71283ec60693402cb64be8e7ec299df.jpg",
  "https://cdn.prod.website-files.com/60829aab76a98d17b68f30ae/6253deb8bd4d41e9b5186b41_5sDhfqD8ZY69cxoqhn0MamQOij8bpqIEFwRiw3K133e2PmXEEvbkgl2BxLRAC-LiP111g1WORz4_laADlgv0nzujFdNSfzQOcZir-SvuvJm39-3McNhZc7C6Mt3dq_8zP4UATRIg.jpeg",
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
    { Title: "T1", text: "text1" },
    { Title: "T2", text: "text2" },
    { Title: "T3", text: "text3" },
    { Title: "T4", text: "text4" },
  ];

  return (
    <div className="Carousel w-full h-[80vh]">
      {images.map((image, index) => (
        <div
          key={index}
          id={`slide ${index + 1}`}
          className={`Carousel-item relative w-full h-full ${
            index === currentIndex ? "block" : "hidden"
          }`}
        >
          <div className="absolute top-1/2 left-1/2 font-extrabold">
            <h1>{array[index].Title}</h1>
            <button>{array[index].text}</button>
          </div>
          <img
            src={image}
            className="w-full h-full  "
            alt={`Slide ${index + 1}`}
          />
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <button onClick={handlePrev} className="btn btn-circle">
              ❮
            </button>
            <button onClick={handleNext} className="btn btn-circle">
              ❯
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Carousel;
