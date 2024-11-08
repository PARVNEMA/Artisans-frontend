import React from "react";

function Home() {
	return (
		<div className="h-[80vh] w-full">
			<div className="hero bg-base-200 h-full w-full">
				<div className="hero-content flex-col lg:flex-row-reverse w-full">
					<div className="w-[45%] ">
						<img
							src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
							className="w-[80%] rounded-lg shadow-2xl"
						/>
					</div>
					<div className="w-full">
						<h1 className="text-5xl font-bold">
							Box Office News!
						</h1>
						<p className="py-6 text-wrap w-[65%] text-md">
							Provident cupiditate voluptatem et in. Quaerat
							fugiat ut assumenda excepturi exercitationem
							quasi. In deleniti eaque aut repudiandae et a
							id nisi.
						</p>
						<button className="btn btn-info">
							Get Started
						</button>
					</div>
				</div>
			</div>

			{/* card section */}
			<div className=" grid md:grid-cols-3 grid-cols-2 w-full h-[45vh]  mt-20 justify-evenly items-center ">
				<div className="card card-compact bg-base-100 w-96 shadow-xl ">
					<figure>
						<img
							src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
							alt="Shoes"
						/>
					</figure>
					<div className=" flex justify-center items-center p-5">
						<div className="w-[65%]">
							<h2 className="card-title">Shoes!</h2>
							<p className="text-wrap ">
								If a dog chews shoes whose shoes does he
								choose?
							</p>
						</div>
						<div className="card-actions justify-end">
							<button className="btn btn-primary">
								Buy Now
							</button>
						</div>
					</div>
				</div>
				<div className="card card-compact bg-base-100 w-96 shadow-xl ">
					<figure>
						<img
							src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
							alt="Shoes"
						/>
					</figure>
					<div className=" flex justify-center items-center p-5">
						<div className="w-[65%]">
							<h2 className="card-title">Shoes!</h2>
							<p className="text-wrap ">
								If a dog chews shoes whose shoes does he
								choose?
							</p>
						</div>
						<div className="card-actions justify-end">
							<button className="btn btn-primary">
								Buy Now
							</button>
						</div>
					</div>
				</div>
				<div className="card card-compact bg-base-100 w-96 shadow-xl ">
					<figure>
						<img
							src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
							alt="Shoes"
						/>
					</figure>
					<div className=" flex justify-center items-center p-5">
						<div className="w-[65%]">
							<h2 className="card-title">Shoes!</h2>
							<p className="text-wrap ">
								If a dog chews shoes whose shoes does he
								choose?
							</p>
						</div>
						<div className="card-actions justify-end">
							<button className="btn btn-primary">
								Buy Now
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Home;
