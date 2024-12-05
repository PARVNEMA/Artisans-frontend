import React from "react";

const Aboutus = () => {
  return (
    <div className="bg-one min-h-screen">
      {/* Intro Section */}
      <div className="flex flex-col lg:flex-row justify-between p-10 bg-four shadow-lg rounded-lg my-10 mx-4 lg:mx-20">
        <div className="lg:px-10 pt-10">
          <h1 className="text-5xl font-bold pb-4 text-three">Crafted India</h1>
          <p className="pb-4 text-3xl font-semibold text-two">
            Looking for authentic Indian products made by local artists? We got
            you.
          </p>
          <p className="text-xl font-normal text-three">
            Crafted India is a global online platform that helps local Indian
            artists connect with audiences both locally and internationally. We
            provide small businesses with the tools and support to easily launch
            their online shops, showcasing their art and make a living. We
            connect customers of Crafted India with local artists from across
            India and internationally with the help of Indian postal services,
            enabling them to experience the rich cultural heritage of India and
            reconnect with their roots.
          </p>
        </div>

        <div className="flex justify-center items-center px-10">
          <img
            className="h-64 w-64 object-cover rounded-full shadow-md"
            src="public/images/Elegant Peacock Indian Wedding Logo (3).png"
            alt="Crafted India"
          />
        </div>
      </div>

      {/* Introduce the Problem Section */}
      <div className="flex flex-col lg:flex-row justify-between items-center my-10 mx-4 lg:mx-20 p-10 bg-white shadow-lg rounded-lg">
        <div className="flex justify-center items-center px-10">
          <img
            className="h-48 w-48 object-cover rounded-full shadow-md"
            src="/public/images/Elegant Peacock Indian Wedding Logo (3).png"
            alt="Artist"
          />
        </div>
        <div className="lg:pl-10 pt-10">
          <h1 className="text-5xl font-bold pb-4 text-three">
            What Drives Us?
          </h1>
          <p className="text-xl font-normal text-three">
            As local sellers/small handicrafts artisans, it is difficult to sell
            their products all around the globe and in India due to limited
            resources and information at their disposal. Along with that,
            artisans find it hard to form a community and reach people as it is
            difficult for them to understand everyone's preferences. For Indians
            living abroad, finding authentic local products becomes difficult
            due to lack of transparency in manufacturing and transportation of
            their desired products.
          </p>
        </div>
      </div>

      {/* Solution to the Problem Section */}
      <div className="flex flex-col lg:flex-row justify-between items-center my-10 mx-4 lg:mx-20 p-10 bg-white shadow-lg rounded-lg">
        <div className="lg:pl-10">
          <h1 className="text-5xl font-bold pb-4 text-three text-center">
            What Do We Contribute?
          </h1>
          <p className="text-xl font-normal text-three">
            Crafted India along with the Indian post office provides artisans
            with a platform to identify, reach, and sell their products to the
            desired audiences with transparency in the transportation process.
            With our advanced machine learning technology, we make it easy for
            the artisans to identify their audience and form their own
            community. We connect customers with artisan products, ensuring a
            sense of security and support between the artisans and the
            customers.
          </p>
        </div>

        <div className="flex justify-center items-center px-10 mt-6 lg:mt-0">
          {/* Add two images here */}
        </div>
      </div>

      {/* What Makes Us Unique Section */}
      <div className="my-12 mx-4 lg:mx-20">
        <h2 className="text-three text-5xl font-extrabold text-center mb-16">
          What Makes Us Unique
        </h2>
        <div className="grid xl:grid-cols-3 lg:grid-cols-2 gap-6">
          {[
            {
              img: "https://img.freepik.com/free-vector/two-business-partners-shaking-hands-big-briefcase-partnership-agreement-cooperation-deal-completed-concept-white-background_335657-1643.jpg",
              title: "Customization",
              description:
                "Make art that speaks to you! Connect with the right artist and customize the product that you love.",
            },
            {
              img: "https://content.jdmagicbox.com/comp/jabalpur/u3/9999px761.x761.170604180802.q6u3/catalogue/india-post-office-kamla-nehru-jabalpur-post-office-services-3raa4.jpg",
              title: "Transportation",
              description:
                "Receive product at every corner of the globe through Indian post.",
            },
            {
              img: "https://img.freepik.com/free-vector/stylish-diwali-discount-sale-banner-template-design_1017-15786.jpg",
              title: "Seasonal Recommendation",
              description:
                "Experience the taste of Indian season through highly curated seasonal recommendation products.",
            },
            {
              img: "https://img.freepik.com/free-vector/hand-drawn-international-trade-with-coins_23-2149145946.jpg",
              title: "Multi-currency",
              description:
                "Buy products with ease in any currency through our multi-currency system.",
            },
            {
              img: "https://img.freepik.com/free-vector/team-spirit-concept-illustration_114360-1473.jpg",
              title: "Find a Community",
              description:
                "Connect with people who understand and appreciate your art, and create valuable products with your skill set.",
            },
            {
              img: "https://media.istockphoto.com/id/1415211237/vector/translation-icon-people-multilanguage-comunication-linguist-chat-bubbles-with-language.jpg?s=2048x2048&w=is&k=20&c=_cuNx3tDgssmH15MnvwZB-0deSn0Hi2k44BSyUKyuWs=",
              title: "Communication",
              description:
                "Tailor our products to suit your needs with seamless communication for your team.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="p-6 flex gap-6 rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300 bg-four"
            >
              <img
                src={item.img}
                className="w-36 h-36 p-3 shrink-0 object-cover rounded-md"
                alt={item.title}
              />
              <div>
                <h3 className="text-black text-2xl font-semibold mb-1">
                  {item.title}
                </h3>
                <p className="text-three text-md font-semibold">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Future Prospect Section */}
      <div className="flex justify-center py-20 bg-white shadow-lg rounded-lg mx-4 lg:mx-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold pb-4 text-three">
            What Does the Future Hold for Us?
          </h1>
          <p className="text-xl font-normal text-three">
            More innovative solutions, better community support, and expanding
            our reach globally.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Aboutus;
