import React from 'react'

//import {useGSAP} from '@gsap/react'
//import gsap from 'gsap'
const Aboutus = () => {
   // const logoRef=useRef();
   // useGSAP(()=>{
//gsap.to(logoRef.current,{
  //  y:400,
  //  duration:2,
  //  dalay:1
//})
  //  })
  return (
    <div>
      {/**Introsection */}

      <div className="flex justify-between p-10 bg-four">
        <div className=" px-40 pt-10">
          <h1 class="text-5xl font-bold pb-4 text-three"> Crafted India</h1>
          <p class="pb-4 text-3xl font-semibold text-two">
            {" "}
            Looking for authentic Indian products made by local artists? We got
            you.{" "}
          </p>
          <p class="text-xl font-normal text-three">
            {" "}
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

        <div className=" logo flex px-10 ">
          <img
            className="h-48rem w-48rem  "
            src="public/images/Elegant Peacock Indian Wedding Logo (3).png"
            alt="Crafted India "
          />
        </div>
      </div>
      {/** introduce the problem */}
      <div className=" flex justify-between p-10 px-40">
        <div className="flex insert y-0 right-0">
          <img
            className=" h-48 w-48"
            src="/public/images/Elegant Peacock Indian Wedding Logo (3).png"
            alt="Artist"
          />
        </div>
        <div className="pl-40 pt-10">
          <h1 class="text-5xl font-bold pb-4 text-three"> What Drives us?</h1>
          <p class="text-xl font-normal ">
            {" "}
            As local sellers/small handicrafts artisans is dificult to sell
            there product all around globe and in india due to imited resources
            and information at their disposal. Along with the artisist find it
            hard to form a community and reach people as it diifuclt for them to
            reach and understand everyone prefrences As for the Indian who are
            living abord find authentic local product becomes difficlut due to
            lack of transparence in manufracting and transportation of there
            desired procut accoring to there prefrences
          </p>
        </div>
      </div>
      {/**Soultion to problem */}
      <div className="flex justify-between p-20">
        <div className="px-40 pt-10 ">
          <h1 class="text-5xl font-bold pb-4 text-three text-center">
            {" "}
            What do we contribute{" "}
          </h1>
          <p>
            {" "}
            Crafted India along with Indian post office provide Artisans with a
            platefrom to identify , reach and seller there product to the
            desired audiances with transparences in transpotation processs With
            our advance machine learnign technology we make it easy for the
            artisnas to identify there audiacne and form there own commnumity we
            connect cutomers with customer product and reight artisans so the
            sences of secuirty and supoort it mainted between the artsians and
            the customers{" "}
          </p>
        </div>

        <div className="flex insert y-0 right-0">{/** two images  */}</div>
      </div>

      {/** what unique about us  */}
      <div class="mb-12 max-w-full  mt-8 mx-[6rem]">
        <h2 class="text-three text-5xl font-extrabold text-center mb-16">
          What makes us unique
        </h2>
        <div class="grid xl:grid-cols-3 lg:grid-cols-2 max-md:max-w-lg mx-auto gap-6">
          <div class="p-6 flex gap-6 rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300 bg-four">
            <img
              src="https://img.freepik.com/free-vector/two-business-partners-shaking-hands-big-briefcase-partnership-agreement-cooperation-deal-completed-concept-white-background_335657-1643.jpg?t=st=1732643288~exp=1732646888~hmac=e5a6ea280d78aca6b12afbdfb895cdba0754861a2199ea1e65bc34911bf4a277&w=996"
              class="w-36 h-36 p-3 shrink-0"
              alt="Customization"
            />
            <div>
              <h3 class="text-black text-2xl font-semibold mb-1">
                Customization
              </h3>
              <p class="text-three text-md font-semibold">
                Make art that speaks to you! Connect with the right artist and
                customize the product that you love.
              </p>
            </div>
          </div>

          <div class="p-6 flex gap-6 rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300 bg-four">
            <img
              src="https://content.jdmagicbox.com/comp/jabalpur/u3/9999px761.x761.170604180802.q6u3/catalogue/india-post-office-kamla-nehru-jabalpur-post-office-services-3raa4.jpg"
              class="w-36 h-36 p-3 shrink-0"
              alt="Transportation"
            />
            <div>
              <h3 class="text-black text-2xl font-semibold mb-1">
                Transportation
              </h3>
              <p class="text-three text-md font-semibold">
                Receive product at every corner of the globe through Indian
                post.
              </p>
            </div>
          </div>

          <div class="p-6 flex gap-6 rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300 bg-four">
            <img
              src="https://img.freepik.com/free-vector/stylish-diwali-discount-sale-banner-template-design_1017-15786.jpg?t=st=1732643855~exp=1732647455~hmac=a60821e7553b634c9633ca10de4534622b9da67ef158644bd0a70983002a7a78&w=740"
              class="w-36 h-36 p-3 shrink-0"
              alt="Seasonal Recommendation"
            />
            <div>
              <h3 class="text-black text-2xl font-semibold mb-1">
                Seasonal Recommendation
              </h3>
              <p class="text-three text-md font-semibold">
                Experience the taste of Indian season through highly curated
                seasonal recommendation products.
              </p>
            </div>
          </div>

          <div class="p-6 flex gap-6 rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300 bg-four">
            <img
              src="https://img.freepik.com/free-vector/hand-drawn-international-trade-with-coins_23-2149145946.jpg?t=st=1732644010~exp=1732647610~hmac=a2eaafca1a5c3862d7c000b143d4208b6d1cd192704ec4d21c9d72f308d1faf6&w=740"
              class="w-36 h-36 p-3 shrink-0"
              alt="Multi-currency"
            />
            <div>
              <h3 class="text-black text-2xl font-semibold mb-1">
                Multi-currency
              </h3>
              <p class="text-three text-md font-semibold">
                Buy products with ease in any currency through our
                multi-currency system.
              </p>
            </div>
          </div>

          <div class="p-6 flex gap-6 rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300 bg-four">
            <img
              src="https://img.freepik.com/free-vector/team-spirit-concept-illustration_114360-1473.jpg?t=st=1732644281~exp=1732647881~hmac=f4f9c5864beee95507d3dbf625e97c7840480f795544f893d2beb4e1db4be198&w=740"
              class="w-36 h-36 p-3 shrink-0"
              alt="Find a Community"
            />
            <div>
              <h3 class="text-black text-2xl font-semibold mb-1">
                Find a Community
              </h3>
              <p class="text-three text-md font-semibold">
                Connect with people who understand and appreciate your art, and
                create valuable products with your skill set.
              </p>
            </div>
          </div>

          <div class="p-6 flex gap-6 rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300 bg-four">
            <img
              src="https://media.istockphoto.com/id/1415211237/vector/translation-icon-people-multilanguage-comunication-linguist-chat-bubbles-with-language.jpg?s=2048x2048&w=is&k=20&c=_cuNx3tDgssmH15MnvwZB-0deSn0Hi2k44BSyUKyuWs="
              class="w-36 h-36 p-3 shrink-0"
              alt="Communication"
            />
            <div>
              <h3 class="text-black text-2xl font-semibold mb-1">
                Communication
              </h3>
              <p class="text-three text-md font-semibold">
                Tailor our products to suit your needs with seamless
                communication for your team.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/**fututre prestect */}
      <div className="flex jsutify-between p-20">
        <div className="px-40">
          <h1 class=" text-5xl font-bold pb-4 text-center">
            {" "}
            What does the future hold for us ?
          </h1>
          <p> </p>
        </div>
      </div>
    </div>
  );
}

export default Aboutus;
