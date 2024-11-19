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
			setCurrentIndex(
				(prevIndex) => (prevIndex + 1) % images.length
			);
		}, 3000); // Change slide every 3 seconds

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
		},
		{
			Title:
				"Keep up with various trends according to the seasons here ",
			text: "Special seasonal offer  ",
		},
		{
			Title:
				"Buy all the special festival product from here ",
			text: " Special festive product   ",
		},
		{
			Title: "Order product which meets your need ",
			text: "Custom made product ",
		},
	];

	return (
		<div className="Carousel w-full h-[80vh] bg-three">
			{images.map((image, index) => (
				<div
					key={index}
					id={`slide ${index + 1}`}
					className={`flex Carousel-item relative w-full h-full ${
						index === currentIndex ? "block" : "hidden"
					}`}
				>
					<div>
						<img
							src={image}
							className="w-full h-full"
							alt={`Slide ${index + 1}`}
						/>
					</div>
					<div className="flex flex-col justify-center item-center p-[5rem] gap-10">
						<div className="text-5xl text-one text-center">
							{array[index].Title}
						</div>
						<div className="text-center text-2xl text-one">
							{array[index].text}
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

export default Carousel;
