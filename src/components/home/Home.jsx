import React, { useEffect, useState } from "react";
import axios from "axios";
import Carousel from "../carousel/Carousel";
import Category from "../category/Category";
import { useAuth } from "../../../useContext/loginContext";
import FeaturedProducts from "../featuredProducts/FeaturedProducts";

const Home = () => {
  const backendurl = import.meta.env.VITE_URL;

  const getCurrentUser = async () => {
    try {
      const res = await axios.get(`${backendurl}/customers/current-user`, {
        withCredentials: true, // Ensure cookies are included in the request
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      console.log("current user", res.data);
    } catch (error) {
      console.error("Error fetching current user", error);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <div id="home">
      {/* Carousel */}
      <Carousel />

      {/* Products */}
      <FeaturedProducts />

      {/* Category */}
      <div id="categories" className="mx-24 my-8">
        <Category />
      </div>

      {/* Feature section */}
      <div className="mb-12 mt-8 mx-24">
        <h2 className="text-three text-4xl font-extrabold text-center mb-16">
          Discover Our Exclusive Features
        </h2>
        <div className="grid xl:grid-cols-3 lg:grid-cols-2 gap-6">
          <div className="p-6 flex gap-6 rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300 bg-four">
            <img
              src="https://img.freepik.com/free-vector/two-business-partners-shaking-hands-big-briefcase-partnership-agreement-cooperation-deal-completed-concept-white-background_335657-1643.jpg?t=st=1732643288~exp=1732646888~hmac=e5a6ea280d78aca6b12afbdfb895cdba0754861a2199ea1e65bc34911bf4a277&w=996"
              className="w-36 h-36 p-3 shrink-0"
              alt="Customization"
            />
            <div>
              <h3 className="text-black text-2xl font-semibold mb-1">
                Customization
              </h3>
              <p className="text-three text-md font-semibold">
                Make art that speaks to you! Connect with the right artist and
                customize the product that you love.
              </p>
            </div>
          </div>

          <div className="p-6 flex gap-6 rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300 bg-four">
            <img
              src="https://content.jdmagicbox.com/comp/jabalpur/u3/9999px761.x761.170604180802.q6u3/catalogue/india-post-office-kamla-nehru-jabalpur-post-office-services-3raa4.jpg"
              className="w-36 h-36 p-3 shrink-0"
              alt="Transportation"
            />
            <div>
              <h3 className="text-black text-2xl font-semibold mb-1">
                Transportation
              </h3>
              <p className="text-three text-md font-semibold">
                Receive product at every corner of the globe through Indian
                post.
              </p>
            </div>
          </div>

          <div className="p-6 flex gap-6 rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300 bg-four">
            <img
              src="https://img.freepik.com/free-vector/stylish-diwali-discount-sale-banner-template-design_1017-15786.jpg?t=st=1732643855~exp=1732647455~hmac=a60821e7553b634c9633ca10de4534622b9da67ef158644bd0a70983002a7a78&w=740"
              className="w-36 h-36 p-3 shrink-0"
              alt="Seasonal Recommendation"
            />
            <div>
              <h3 className="text-black text-2xl font-semibold mb-1">
                Seasonal Recommendation
              </h3>
              <p className="text-three text-md font-semibold">
                Experience the taste of Indian season through highly curated
                seasonal recommendation products.
              </p>
            </div>
          </div>

          <div className="p-6 flex gap-6 rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300 bg-four">
            <img
              src="https://img.freepik.com/free-vector/hand-drawn-international-trade-with-coins_23-2149145946.jpg?t=st=1732644010~exp=1732647610~hmac=a2eaafca1a5c3862d7c000b143d4208b6d1cd192704ec4d21c9d72f308d1faf6&w=740"
              className="w-36 h-36 p-3 shrink-0"
              alt="Multi-currency"
            />
            <div>
              <h3 className="text-black text-2xl font-semibold mb-1">
                Multi-currency
              </h3>
              <p className="text-three text-md font-semibold">
                Buy products with ease in any currency through our
                multi-currency system.
              </p>
            </div>
          </div>

          <div className="p-6 flex gap-6 rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300 bg-four">
            <img
              src="https://img.freepik.com/free-vector/team-spirit-concept-illustration_114360-1473.jpg?t=st=1732644281~exp=1732647881~hmac=f4f9c5864beee95507d3dbf625e97c7840480f795544f893d2beb4e1db4be198&w=740"
              className="w-36 h-36 p-3 shrink-0"
              alt="Find a Community"
            />
            <div>
              <h3 className="text-black text-2xl font-semibold mb-1">
                Find a Community
              </h3>
              <p className="text-three text-md font-semibold">
                Connect with people who understand and appreciate your art, and
                create valuable products with your skill set.
              </p>
            </div>
          </div>

          <div className="p-6 flex gap-6 rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300 bg-four">
            <img
              src="https://media.istockphoto.com/id/1415211237/vector/translation-icon-people-multilanguage-comunication-linguist-chat-bubbles-with-language.jpg?s=2048x2048&w=is&k=20&c=_cuNx3tDgssmH15MnvwZB-0deSn0Hi2k44BSyUKyuWs="
              className="w-36 h-36 p-3 shrink-0"
              alt="Communication"
            />
            <div>
              <h3 className="text-black text-2xl font-semibold mb-1">
                Communication
              </h3>
              <p className="text-three text-md font-semibold">
                Tailor our products to suit your needs with seamless
                communication for your team.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

{
  /* Seasonal Products */
}
{
  /* <div id="seasonal" className="bg-[url('https://img.freepik.com/free-vector/yellow-stylish-luxury-background_1055-7309.jpg?t=st=1731436061~exp=1731439661~hmac=eda972ca3c1091d3bb24cee125d7b7f516e15284a910836fe8345502cf89d2e1&w=740')]">
				<div class="my-[1.3rem] font-[comic sans] py-4 mx-auto lg:max-w-7xl sm:max-w-full">
					<h2 class="text-4xl text-center font-extrabold text-gray-950 mb-12">
						Seasonal Products
					</h2>
					<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
						<div class="bg-gray-50 shadow-md overflow-hidden rounded-lg cursor-pointer hover:-translate-y-2 transition-all relative">
							<div class="bg-gray-100 w-10 h-10 flex items-center justify-center rounded-full cursor-pointer absolute top-3 right-3">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16px"
									class="fill-gray-800 inline-block"
									viewBox="0 0 64 64"
								>
									<path
										d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
										data-original="#000000"
									></path>
								</svg>
							</div>

							<div class="w-5/6 h-[260px] p-4 overflow-hidden mx-auto aspect-w-16 aspect-h-8">
								<img
									src="https://readymadeui.com/images/product9.webp"
									alt="Product 1"
									class="h-full w-full object-contain"
								/>
							</div>

							<div class="p-6 bg-white ">
								<h3 class="text-lg font-bold text-gray-800 ">
									Sole Elegance
								</h3>
								<h4 class="text-lg text-gray-800 font-bold mt-2 ">
									$10.5
								</h4>
								<p class="text-gray-600  mt-2 ">
									5 types of shoos available
								</p>

								<div class="flex space-x-2 mt-4">
									<svg
										class="w-4 fill-[#facc15]"
										viewBox="0 0 14 13"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
									</svg>
									<svg
										class="w-4 fill-[#facc15]"
										viewBox="0 0 14 13"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
									</svg>
									<svg
										class="w-4 fill-[#facc15]"
										viewBox="0 0 14 13"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
									</svg>
									<svg
										class="w-4 fill-[#CED5D8]"
										viewBox="0 0 14 13"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
									</svg>
									<svg
										class="w-4 fill-[#CED5D8]"
										viewBox="0 0 14 13"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
									</svg>
								</div>
							</div>
						</div>

						<div class="bg-gray-50 shadow-md overflow-hidden rounded-lg cursor-pointer hover:-translate-y-2 transition-all relative">
							<div class="bg-gray-100 w-10 h-10 flex items-center justify-center rounded-full cursor-pointer absolute top-3 right-3">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16px"
									class="fill-gray-800 inline-block"
									viewBox="0 0 64 64"
								>
									<path
										d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
										data-original="#000000"
									></path>
								</svg>
							</div>
							<div class="w-5/6 h-[260px] p-4 overflow-hidden mx-auto aspect-w-16 aspect-h-8">
								<img
									src="https://readymadeui.com/images/product10.webp"
									alt="Product 2"
									class="h-full w-full object-contain"
								/>
							</div>
							<div class="p-6 bg-white">
								<h3 class="text-lg font-bold text-gray-800">
									Urban Sneakers
								</h3>
								<h4 class="text-lg text-gray-800 font-bold mt-2">
									$12.5
								</h4>
								<p class="text-gray-600  mt-2">
									5 types of shoos available
								</p>

								<div class="flex space-x-2 mt-4">
									<svg
										class="w-4 fill-[#facc15]"
										viewBox="0 0 14 13"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
									</svg>
									<svg
										class="w-4 fill-[#facc15]"
										viewBox="0 0 14 13"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
									</svg>
									<svg
										class="w-4 fill-[#facc15]"
										viewBox="0 0 14 13"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
									</svg>
									<svg
										class="w-4 fill-[#CED5D8]"
										viewBox="0 0 14 13"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
									</svg>
									<svg
										class="w-4 fill-[#CED5D8]"
										viewBox="0 0 14 13"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
									</svg>
								</div>
							</div>
						</div>

						<div class="bg-gray-50 shadow-md overflow-hidden rounded-lg cursor-pointer hover:-translate-y-2 transition-all relative">
							<div class="bg-gray-100 w-10 h-10 flex items-center justify-center rounded-full cursor-pointer absolute top-3 right-3">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16px"
									class="fill-gray-800 inline-block"
									viewBox="0 0 64 64"
								>
									<path
										d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
										data-original="#000000"
									></path>
								</svg>
							</div>
							<div class="w-5/6 h-[260px] p-4 overflow-hidden mx-auto aspect-w-16 aspect-h-8">
								<img
									src="https://readymadeui.com/images/product11.webp"
									alt="Product 3"
									class="h-full w-full object-contain"
								/>
							</div>
							<div class="p-6 bg-white">
								<h3 class="text-lg font-bold text-gray-800">
									Velvet Boots
								</h3>
								<h4 class="text-lg text-gray-800 font-bold mt-2">
									$14.5
								</h4>
								<p class="text-gray-600  mt-2">
									5 types of shoos available
								</p>

								<div class="flex space-x-2 mt-4">
									<svg
										class="w-4 fill-[#facc15]"
										viewBox="0 0 14 13"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
									</svg>
									<svg
										class="w-4 fill-[#facc15]"
										viewBox="0 0 14 13"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
									</svg>
									<svg
										class="w-4 fill-[#facc15]"
										viewBox="0 0 14 13"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
									</svg>
									<svg
										class="w-4 fill-[#CED5D8]"
										viewBox="0 0 14 13"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
									</svg>
									<svg
										class="w-4 fill-[#CED5D8]"
										viewBox="0 0 14 13"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
									</svg>
								</div>
							</div>
						</div>

						<div class="bg-gray-50 shadow-md overflow-hidden rounded-lg cursor-pointer hover:-translate-y-2 transition-all relative">
							<div class="bg-gray-100 w-10 h-10 flex items-center justify-center rounded-full cursor-pointer absolute top-3 right-3">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16px"
									class="fill-gray-800 inline-block"
									viewBox="0 0 64 64"
								>
									<path
										d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
										data-original="#000000"
									></path>
								</svg>
							</div>
							<div class="w-5/6 h-[260px] p-4 overflow-hidden mx-auto aspect-w-16 aspect-h-8">
								<img
									src="https://readymadeui.com/images/product12.webp"
									alt="Product 3"
									class="h-full w-full object-contain"
								/>
							</div>
							<div class="p-6 bg-white">
								<h3 class="text-lg font-bold text-gray-800">
									Summit Hiking
								</h3>
								<h4 class="text-lg text-gray-800 font-bold mt-2">
									$12.5
								</h4>
								<p class="text-gray-600  mt-2">
									5 types of shoos available
								</p>

								<div class="flex space-x-2 mt-4">
									<svg
										class="w-4 fill-[#facc15]"
										viewBox="0 0 14 13"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
									</svg>
									<svg
										class="w-4 fill-[#facc15]"
										viewBox="0 0 14 13"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
									</svg>
									<svg
										class="w-4 fill-[#facc15]"
										viewBox="0 0 14 13"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
									</svg>
									<svg
										class="w-4 fill-[#CED5D8]"
										viewBox="0 0 14 13"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
									</svg>
									<svg
										class="w-4 fill-[#CED5D8]"
										viewBox="0 0 14 13"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
									</svg>
								</div>
							</div>
						</div>

						<div class="bg-gray-50 shadow-md overflow-hidden rounded-lg cursor-pointer hover:-translate-y-2 transition-all relative">
							<div class="bg-gray-100 w-10 h-10 flex items-center justify-center rounded-full cursor-pointer absolute top-3 right-3">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16px"
									class="fill-gray-800 inline-block"
									viewBox="0 0 64 64"
								>
									<path
										d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
										data-original="#000000"
									></path>
								</svg>
							</div>
							<div class="w-5/6 h-[260px] p-4 overflow-hidden mx-auto aspect-w-16 aspect-h-8">
								<img
									src="https://readymadeui.com/images/product13.webp"
									alt="Product 3"
									class="h-full w-full object-contain"
								/>
							</div>
							<div class="p-6 bg-white">
								<h3 class="text-lg font-bold text-gray-800">
									Zenith Glow
								</h3>
								<h4 class="text-lg text-gray-800 font-bold mt-2">
									$15.5
								</h4>
								<p class="text-gray-600  mt-2">
									5 types of shoos available
								</p>

								<div class="flex space-x-2 mt-4">
									<svg
										class="w-4 fill-[#facc15]"
										viewBox="0 0 14 13"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
									</svg>
									<svg
										class="w-4 fill-[#facc15]"
										viewBox="0 0 14 13"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
									</svg>
									<svg
										class="w-4 fill-[#facc15]"
										viewBox="0 0 14 13"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
									</svg>
									<svg
										class="w-4 fill-[#CED5D8]"
										viewBox="0 0 14 13"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
									</svg>
									<svg
										class="w-4 fill-[#CED5D8]"
										viewBox="0 0 14 13"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
									</svg>
								</div>
							</div>
						</div>

						<div class="bg-gray-50 shadow-md overflow-hidden rounded-lg cursor-pointer hover:-translate-y-2 transition-all relative">
							<div class="bg-gray-100 w-10 h-10 flex items-center justify-center rounded-full cursor-pointer absolute top-3 right-3">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16px"
									class="fill-gray-800 inline-block"
									viewBox="0 0 64 64"
								>
									<path
										d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
										data-original="#000000"
									></path>
								</svg>
							</div>
							<div class="w-5/6 h-[260px] p-4 overflow-hidden mx-auto aspect-w-16 aspect-h-8">
								<img
									src="https://readymadeui.com/images/product14.webp"
									alt="Product 3"
									class="h-full w-full object-contain"
								/>
							</div>
							<div class="p-6 bg-white">
								<h3 class="text-lg font-bold text-gray-800">
									Echo Elegance
								</h3>
								<h4 class="text-lg text-gray-800 font-bold mt-2">
									$14.5
								</h4>
								<p class="text-gray-600  mt-2">
									5 types of shoos available
								</p>

								<div class="flex space-x-2 mt-4">
									<svg
										class="w-4 fill-[#facc15]"
										viewBox="0 0 14 13"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
									</svg>
									<svg
										class="w-4 fill-[#facc15]"
										viewBox="0 0 14 13"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
									</svg>
									<svg
										class="w-4 fill-[#facc15]"
										viewBox="0 0 14 13"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
									</svg>
									<svg
										class="w-4 fill-[#CED5D8]"
										viewBox="0 0 14 13"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
									</svg>
									<svg
										class="w-4 fill-[#CED5D8]"
										viewBox="0 0 14 13"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
									</svg>
								</div>
							</div>
						</div>

						<div class="bg-gray-50 shadow-md overflow-hidden rounded-lg cursor-pointer hover:-translate-y-2 transition-all relative">
							<div class="bg-gray-100 w-10 h-10 flex items-center justify-center rounded-full cursor-pointer absolute top-3 right-3">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16px"
									class="fill-gray-800 inline-block"
									viewBox="0 0 64 64"
								>
									<path
										d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
										data-original="#000000"
									></path>
								</svg>
							</div>
							<div class="w-5/6 h-[260px] p-4 overflow-hidden mx-auto aspect-w-16 aspect-h-8">
								<img
									src="https://readymadeui.com/images/product15.webp"
									alt="Product 3"
									class="h-full w-full object-contain"
								/>
							</div>
							<div class="p-6 bg-white">
								<h3 class="text-lg font-bold text-gray-800">
									Pumps
								</h3>
								<h4 class="text-lg text-gray-800 font-bold mt-2">
									$14.5
								</h4>
								<p class="text-gray-600  mt-2">
									5 types of shoos available
								</p>

								<div class="flex space-x-2 mt-4">
									<svg
										class="w-4 fill-[#facc15]"
										viewBox="0 0 14 13"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
									</svg>
									<svg
										class="w-4 fill-[#facc15]"
										viewBox="0 0 14 13"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
									</svg>
									<svg
										class="w-4 fill-[#facc15]"
										viewBox="0 0 14 13"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
									</svg>
									<svg
										class="w-4 fill-[#CED5D8]"
										viewBox="0 0 14 13"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
									</svg>
									<svg
										class="w-4 fill-[#CED5D8]"
										viewBox="0 0 14 13"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
									</svg>
								</div>
							</div>
						</div>

						<div class="bg-gray-50 shadow-md overflow-hidden rounded-lg cursor-pointer hover:-translate-y-2 transition-all relative">
							<div class="bg-gray-100 w-10 h-10 flex items-center justify-center rounded-full cursor-pointer absolute top-3 right-3">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16px"
									class="fill-gray-800 inline-block"
									viewBox="0 0 64 64"
								>
									<path
										d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
										data-original="#000000"
									></path>
								</svg>
							</div>
							<div class="w-5/6 h-[260px] p-4 overflow-hidden mx-auto aspect-w-16 aspect-h-8">
								<img
									src="https://readymadeui.com/images/product10.webp"
									alt="Product 3"
									class="h-full w-full object-contain"
								/>
							</div>
							<div class="p-6 bg-white">
								<h3 class="text-lg font-bold text-gray-800">
									Blaze Burst
								</h3>
								<h4 class="text-lg text-gray-800 font-bold mt-2">
									$14.5
								</h4>
								<p class="text-gray-600  mt-2">
									5 types of shoos available
								</p>

								<div class="flex space-x-2 mt-4">
									<svg
										class="w-4 fill-[#facc15]"
										viewBox="0 0 14 13"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
									</svg>
									<svg
										class="w-4 fill-[#facc15]"
										viewBox="0 0 14 13"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
									</svg>
									<svg
										class="w-4 fill-[#facc15]"
										viewBox="0 0 14 13"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
									</svg>
									<svg
										class="w-4 fill-[#CED5D8]"
										viewBox="0 0 14 13"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
									</svg>
									<svg
										class="w-4 fill-[#CED5D8]"
										viewBox="0 0 14 13"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
									</svg>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div> */
}
