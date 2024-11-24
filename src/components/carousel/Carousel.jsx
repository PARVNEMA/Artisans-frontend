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
//import DetailedProduct from "../detailedproduct/DetailedProduct";
//import FeaturedProducts from "../featuredProducts/FeaturedProducts";
//import ProductList from "../ProductList/ProductList";
//import { Link } from "react-router-dom";

const images = [
	"public/images/Untitled design (5).png",
	"public/images/2.jpg",
	"public/images/1.jpg",
	"public/images/slide4.png",
];

const array = [
	{
		Title: "Explore all the Authenticated product made by local Artists",
		text: "From local to Global",
		
	},
	{
		Title: "Keep up with various trends according to the seasons here",
		text: "Special seasonal offer",
		
	},
	{
		Title: "Buy all the special festival products from here",
		text: "Special festive products",
		
	},
	{
		Title: "Order products that meet your needs",
		text: "Custom-made products",
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
		<div className="Carousel relative w-full h-screen bg-brown-500 overflow-hidden isolate z-0"   style={{ backgroundColor: "#bec9ae" }}>
			{images.map((image, index) => (
				<div
					key={index}
					className={`absolute inset-0 flex flex-col justify-center items-center transition-opacity duration-500 ${
						index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
					}`}
				>
					<div className="relative w-[70%] h-[70%]  rounded-lg shadow-md overflow-hidden">
					<img
						src={image}
						alt={`Slide ${index + 1}`}
						className="w-full h-100 object-cover"
					/>
					<div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center">
						<h1 className="text-5xl font-bold text-white text-center mb-4">
							{array[index]?.Title}
						</h1>
						<p className="text-2xl text-white text-center mb-6">{array[index]?.text}</p>
						<button className="bg-amber-100 text-black px-6 py-2 rounded">
							Explore
						</button>
					</div>
				</div>
				</div>
			))}
			<div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
				<button onClick={handlePrev} className="btn btn-circle">
					❮
				</button>
				<button onClick={handleNext} className="btn btn-circle">
					❯
				</button>
			</div>
		</div>
	);
};

export default Carousel;

