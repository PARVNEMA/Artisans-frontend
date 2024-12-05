import React from "react";

function ContactUs() {
	return (
    <div className="mb-6">
      <div className="grid md:grid-cols-2 gap-16 items-center relative overflow-hidden p-8 shadow-lg rounded-3xl max-w-6xl mx-auto bg-three mt-4">
        <div className="p-8 max-w-lg mx-auto bg-white rounded-lg shadow-lg md:flex md:flex-col">
          <h2 className="text-three text-3xl font-extrabold">Get In Touch</h2>
          <p className="text-sm text-gray-500 mt-4 leading-relaxed">
            Have a specific inquiry or looking to explore new opportunities? Our
            experienced team is ready to engage with you.
          </p>

          <form className="mt-8 space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              className="px-4 py-3 bg-white w-full text-gray-800 text-sm border-b border-gray-300 focus:border-three outline-none"
            />
            <input
              type="text"
              placeholder="Street"
              className="px-4 py-3 bg-white w-full text-gray-800 text-sm border-b border-gray-300 focus:border-three outline-none"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="City"
                className="px-4 py-3 bg-white w-full text-gray-800 text-sm border-b border-gray-300 focus:border-three outline-none"
              />
              <input
                type="text"
                placeholder="Postcode"
                className="px-4 py-3 bg-white w-full text-gray-800 text-sm border-b border-gray-300 focus:border-three outline-none"
              />
            </div>
            <input
              type="number"
              placeholder="Phone No."
              className="px-4 py-3 bg-white w-full text-gray-800 text-sm border-b border-gray-300 focus:border-three outline-none"
            />
            <input
              type="email"
              placeholder="Email"
              className="px-4 py-3 bg-white w-full text-gray-800 text-sm border-b border-gray-300 focus:border-three outline-none"
            />
            <textarea
              placeholder="Write Message"
              className="px-4 py-3 bg-white w-full text-gray-800 text-sm border-b border-gray-300 focus:border-three outline-none"
            ></textarea>
            <button
              type="button"
              className="mt-8 flex items-center justify-center text-sm w-full rounded-md px-6 py-3 bg-three text-white hover:bg-opacity-75 transition-opacity duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16px"
                height="16px"
                fill="#fff"
                className="mr-2"
                viewBox="0 0 548.244 548.244"
              ></svg>
              Send Message
            </button>
          </form>

          <ul className="mt-4 flex flex-wrap justify-center gap-6">
            <li className="flex items-center text-blue-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16px"
                height="16px"
                fill="currentColor"
                viewBox="0 0 479.058 479.058"
              ></svg>
              <a href="mailto:info@example.com" className="text-sm ml-4">
                <strong>info@example.com</strong>
              </a>
            </li>
            <li className="flex items-center text-blue-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16px"
                height="16px"
                fill="currentColor"
                viewBox="0 0 482.6 482.6"
              ></svg>
              <a href="tel:+158996888" className="text-sm ml-4">
                <strong>+158 996 888</strong>
              </a>
            </li>
          </ul>
        </div>

        <div className="relative w-full h-64 md:h-full bg-one rounded-lg lg:rounded-tr-none lg:rounded-bl-lg overflow-hidden">
          <iframe
            src="https://maps.google.com/maps?q=jabalpur&t=&z=13&ie=UTF8&iwloc=&output=embed"
            className="w-full h-full"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
