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
		
        <div className="flex justify-between p-10" >
            <div className=' px-40 pt-10'>
            <h1 class="text-5xl font-bold pb-4"> Crafted India</h1>
                <p class="pb-4 text-3xl font-semibold"> Looking for authentic Indian products made by local artists? We got you.  </p>
                  <p class="text-xl font-normal"> Crafted India is a global online platform that helps local Indian artists connect with audiences both locally and internationally. 
                    We provide small businesses with the tools and support to easily launch their online shops, showcasing their art and make a living.
                    We connect customers of Crafted India with local artists from across India and internationally with the help of Indian postal services, enabling them to experience the rich cultural heritage of India 
                    and reconnect with their roots.</p>
            </div>
         
      
            <div  className=' logo flex  px-20 '>
                <img
                className='h-56rem w-52rem '
                src="public/images/logo2.png"
                alt="Crafted India "
                />
            </div>
           
        </div>
        {/** introduce the problem */}
        <div className=" flex justify-between p-10 px-40">
            <div className='flex insert y-0 right-0'>
                <img 
                className=' h-48 w-48'
               src="public/images/Kutch (1).jpg"
               alt="Artist"
               />
            </div>
            <div className="pl-40 pt-10">
                <h1 class="text-5xl font-bold pb-4 "> What Drives us?</h1>
                <p class="text-xl font-normal "> As local sellers/small handicrafts artisans is dificult to sell there product all around globe and in india 
                 due to imited resources and information at their disposal.
                Along with the artisist find it hard to form a community and reach people as it diifuclt for them to reach and understand everyone prefrences 
                As for the Indian  who are living abord find authentic local product becomes difficlut due to lack of transparence in manufracting and transportation of there desired procut accoring to there prefrences 
                </p>
            </div>
        </div>
{/**Soultion to problem */}
    <div className='flex justify-between p-20'>
        <div className='px-40 pt-10 '>
        <h1 class="text-5xl font-bold pb-4 "> What do we contribute </h1>
        <p> Crafted India along iht Indian post office provide Artisans  with a platefrom to  identify , reach and seller there product ot the desired audiances wiht transparences in transpotation processs
            With our advance machine learnign technology we make it easy for the artisnas to identify there audiacne and form thre own comminuty 
            we connect cutomers  with customer product and reight artisans so the sences of secuirty and supoort it mainted between the artsians and the customers  </p>
        </div>

        <div className='flex insert y-0 right-0'>
{/** two images  */}
         </div>
    </div>
    
    {/** what unique about us  */}
   
				

    {/**fututre prestect */}
    <div className='flex jsutify-between p-30'>
        <div className="flex center">
            <h1> What does the future hold for us ?</h1>
        </div>
    </div>

</div>
  )
}

export default Aboutus;
