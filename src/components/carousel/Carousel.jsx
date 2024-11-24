/*
import React, { useEffect, useState } from "react";
import DetailedProduct from "../detailedproduct/DetailedProduct";
import FeaturedProducts from "../featuredProducts/FeaturedProducts";
import ProductList from "../ProductList/ProductList";
import { Link } from "react-router-dom";

const images = [
	"public/images/Untitled design (5).png",
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
/*
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
		<div className="Carousel w-full h-full relative  overflow-hidden ">
			{images.map((image, index) => (
				<div
					key={index}
					id={`slide ${index + 1}`}
					className={`flex Carousel-item w-full h-full ${
						index === currentIndex ? "block" : "hidden"
					}`}
				>
					<div>
						<img
							src={image}
							className="w-full h-full object-center  overflow-hidden"
							alt={`Slide ${index + 1}`}
						/>
					</div>
					{/** 
					<div className="flex flex-col justify-center item-center p-[5rem] gap-10 text-white">
						<div className="text-5xl text-one text-center text-white">
						<Link to={array[index].Title}>{array[index].Title}</Link>
						</div>
						<div className="text-center text-2xl text-one text-white">
						<button type="button" class="bg-amber-100 px-4 py-2 rounded">{array[index].text}</button>	
						</div>
					</div>
					
					<div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
						<button
							onClick={handlePrev}
							className="btn btn-circle"
						>
							❮
						</button>
						<button
							onClick={handleNext}
							className="btn btn-circle"
						>
							❯
						</button>
					</div>
				</div>
			))}
		</div>
	);
};

export default Carousel;*/

import React, { useEffect, useState } from "react";

import DetailedProduct from "../detailedproduct/DetailedProduct";
import FeaturedProducts from "../featuredProducts/FeaturedProducts";
import ProductList from "../ProductList/ProductList";
//import Artisans from "../Artisans/Dashboard/Dashboard";
import { Link } from "react-router-dom";

const images = [
	"public/images/Untitled design (5).png",
	"public/images/2.jpg",
	"public/images/1.jpg",
	"public/images/slide4.png",
];

const array = [
	{
		Title: "Explore all the Authenticated product made by local Artists",
	    Link: FeaturedProducts
	},
	{
		Title: "Buy all the special festival products from here",
		Link:ProductList	
	},
	{
		Title: "Order products that meet your needs",
     
	},
	{
		Title: "Keep up with various trends according to the seasons here",
	Link:DetailedProduct
	},
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
		setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
	};

	const handleNext = () => {
		setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
	};

	return (
		<div className="Carousel relative w-full h-screen bg-brown-500 overflow-hidden isolate z-0"  >
			<div
      style={{position: "relative",width: "100%",height: 0,paddingTop: "56.2225%",boxShadow: "0 2px 8px 0 rgba(63,69,81,0.16)",
        marginBottom: "0.9em",overflow: "hidden",borderRadius: "8px",willChange: "transform",  }}>
      <iframe
        loading="lazy"
        style={{position: "absolute",width: "100%",height: "100%",top: 0,left: 0,border: "none",padding: 0,margin: 0, }}
        src="https://www.canva.com/design/DAGXX-hGHdY/M8xIQ5o12i4c8aA9t1gzmQ/view?embed"
        allowFullScreen
        allow="fullscreen"
        ></iframe>
    </div>
	<div className="absolute top-1/2 flex justify-between w-full px-80 transform -translate-y-1/2  duration-300 ">
				<button onClick={handlePrev} className="btn btn-circle">
					❮
				</button>
				<button onClick={handleNext} className="btn btn-circle">
					❯
				</button>
			</div>



			{images.map((image, index) => (
				<div
					key={index}
					className={`absolute inset-0 flex flex-col justify-center items-center transition-opacity duration-500 ${
						index === currentIndex ? "opacity-95 z-10" : "opacity-0 z-0"
					}`}
				>
					<div className="relative w-[50%] h-[50%]  rounded-lg shadow-md overflow-hidden">
					<img
						src={image}
						alt={`Slide ${index + 1}`}
						className="w-full h-100 object-cover"
					/>
					<div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-center ">
						<h1 className="text-3xl font-bold text-white text-center mb-8">
							{array[index]?.Title}
						</h1>
						
						<button className="bg-amber-100 text-black px-6 py-2 rounded">
						<p className="text-2xl text-white text-center mb-4">Explore</p>
						</button>
					</div>
				</div>
				</div>
			))}
			{/*<div className="absolute top-1/2 flex justify-between w-full px-80 transform -translate-y-1/2  duration-300 ">
				<button onClick={handlePrev} className="btn btn-circle">
					❮
				</button>
				<button onClick={handleNext} className="btn btn-circle">
					❯
				</button>
			</div>*/}
		</div>
	);
};

export default Carousel;

