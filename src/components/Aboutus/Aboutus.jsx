// import React from "react";

 
// function Aboutus(){
//     return(
//         <div className="parent" style={{
//            display:"flex"
            
//         }}> 
//           <div className="leftchild" style={{
//             height:"100vh",
//             width:"100vh",
//            // backgroundImage:`url("/public/images/artist.jpg")`,
//             backgroundsize:"contain",
//             backgroundRepeat:"no-repeat",
//             backgroundposition:"center",
//             backgroundColor:"yellow",
//             justifyContent:"left"
//           }}>
//             <div  className ="rigthchild" style={{ 
// justifyContent:"right",
// backgroundColor:"red",


//  }} >
//                 <h2>About us </h2>
//                 <p>
//                     Welcome to Artisans! We are dedicated to bringing you the finest artisan products crafted with love and care.
//                     Our artisans work tirelessly to produce unique, high-quality items that reflect their rich cultural heritage and
//                     exceptional craftsmanship.
//                 </p>
//                 <p>
//                     Our mission is to bridge the gap between traditional artisans and modern consumers, creating a marketplace that
//                     celebrates creativity, skill, and sustainability. Join us on our journey to support artisans around the world and
//                     make a positive impact.
//                 </p>
//             </div>
//       </div>
      
//             </div>
//     )
// }

// export default Aboutus;




import React from "react";

function Aboutus() {
  return (
    <>
    {/* hero section */ }
    <div
      className="parent1"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: "50vh",
        marginTop:"0",
        padding:"2rem 2rem",
       // Optional padding for spacing
      }}
    >
      <div
        className="leftchild"
        style={{
          height: "100%",
          width: "50%",
          backgroundImage: `url("/public/images/artist.jpg")`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      ></div>
      <div
        className="rightchild"
        style={{
          width: "45%",
          padding: "1rem",
          color: "black",
          textAlign:"justify" // Aligns the text to the right within this div
        }}
      >
        <h1 style={{ 
            fontSize:"5vh",
            paddingBottom:"40px",
            lineHeight:"1.5vh"
            }}>About us</h1>
        <p>
          Welcome to Artisans! We are dedicated to bringing you the finest artisan products crafted with love and care.
          Our artisans work tirelessly to produce unique, high-quality items that reflect their rich cultural heritage and
          exceptional craftsmanship.
        </p>
        <p>
          Our mission is to bridge the gap between traditional artisans and modern consumers, creating a marketplace that
          celebrates creativity, skill, and sustainability. Join us on our journey to support artisans around the world and
          make a positive impact.
        </p>
      </div>
    </div>

    {/* second section */ }
    <div className="parent2"
    style={{
 display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: "20vh",
        marginTop:"0",
     padding:"2rem 8rem"
    }}>

<div className="leftchild" style={{
}}>
    <h2 style={{
        fontSize:"5vh",
        paddingBottom:"40px",
        lineHeight:"1.5vh"
    }}>Our Vision</h2>
    
   <p> something relative to our paragphran here here </p>
    </div>
    </div>
    </>
  );
}

export default Aboutus;


