import React, { useEffect, useState } from "react";
import DetailedProduct from "../detailedproduct/DetailedProduct";
import FeaturedProducts from "../featuredProducts/FeaturedProducts";
import ProductList from "../ProductList/ProductList";
import { Link } from "react-router-dom";

const images = [
	"public/images/2.jpg",
	"public/images/1.jpg",
	"public/images/Untitled design (3).png",
	"public/images/4.jpg.jpg",
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
*/
	return (
		<div className="Carousel w-full h-full relative  ">
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
							className="w-full h-full object-cover "
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
					*/}
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

export default Carousel;
