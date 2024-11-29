
import React, { useEffect, useState } from "react";
import DetailedProduct from "../detailedproduct/DetailedProduct";
import FeaturedProducts from "../featuredProducts/FeaturedProducts";
import ProductList from "../ProductList/ProductList";
import { Link } from "react-router-dom";

const images = [
	"public/images/DeWatermark.ai_1732863152583.png",
	"public/images/2.jpg",
	"public/images/1.jpg",
	"public/images/slide4.png",
];

const Carousel = () => {
	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentIndex(
				(prevIndex) => (prevIndex + 1) % images.length
			);
		}, 10000); // Change slide every 3 seconds

		return () => clearInterval(interval); // Clean up the interval on component unmount
	}, []);

	const handlePrev = () => {
		setCurrentIndex(
			(prevIndex) =>
				(prevIndex - 1 + images.length) % images.length
		);
	};

	const handleNext = () => {
		setCurrentIndex(
			(prevIndex) => (prevIndex + 1) % images.length
		);
	};

	const array = [
		{
			Title:
				"Explore all the Authenticated product made my local Artist",
			text: "From local to Gobal ",
			Link:DetailedProduct
		},
		{
			Title:
				"Keep up with various trends according to the seasons here ",
			text: "Special seasonal offer  ",
			Link:FeaturedProducts
		},
		{
			Title:
				"Buy all the special festival product from here ",
			text: " Special festive product   ",
			Link:ProductList
		},
		{
			Title: "Order product which meets your need ",
			text: "Custom made product ",
			
		},
	];

	return (
		
		<div className="Carousel relative w-full h-screen bg-brown-500 overflow-hidden isolate z-0">
     {/* <div
        style={{
          position: "relative",width: "100%",height: 0,paddingTop: "56.2225%",boxShadow: "0 2px 8px 0 rgba(63,69,81,0.16)",
         overflow: "hidden",borderRadius: "8px", willChange: "transform",
        }}
      >
        <iframe
          loading="lazy"
          style={{
            position: "absolute",
            width: "100%", height: "100%", top: 0, left: 0, border: "none", padding: 0, margin: 0,
          }}
          src="https://www.canva.com/design/DAGXe3M_zds/eIKOb_BpaddlZi3dOB0X7A/view?embed"
          allowFullScreen
          allow="fullscreen"
        ></iframe>
      </div>*/}
			{images.map((image, index) => (
				<div
					key={index}
					id={`slide ${index + 1}`}
					className={`absolute inset-0 flex flex-col items-center transition-opacity duration-500 w-100 h-100 bg-black opacity-80   ${
						index === currentIndex ? "block" : "hidden"
					}`}
				>
					<div className="relative w-full h-full  rounded-lg shadow-md overflow-hidden bg-black opacity-90 ">
						<img
							src={image}
							className="w-100 h-100 object-cover"
							alt={`Slide ${index + 1}`}
						/>
					</div>
					
					<div className="absolute inset-0  flex flex-col justify-center  item-center mt-7 pl-80 pr-80 pb-19">
						<div className="text-6xl font-bold text-[#F0EEC8] text-center px-10  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7) ">
						<Link to={array[index].Title}>{array[index].Title}</Link>
						</div>
						<div className="text-center text-2xl text-one text-black">
						<button type="button" class="bg-[#F0EEC8] px-4 py-2 rounded mt-60">{array[index].text}</button>	
						</div>
					</div>
					
					<div className="absolute  top-1/2 flex -translate-y-1/2 transform justify-between">
						<button
							onClick={handlePrev}
							className="btn btn-circle mx-60 mt-80"
						>
							❮
						</button>
						<button
							onClick={handleNext}
							className="btn btn-circle mx-60 mt-80"
						>
							❯
						</button>
					</div>
			
 
</div>
			
			))}
		</div>
	);
};

export default Carousel;
