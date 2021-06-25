import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { Parallax } from "react-parallax";

function Home() {
   const { user } = useContext(UserContext);
   const img1 =
      "https://static6.depositphotos.com/1003098/571/i/600/depositphotos_5710780-stock-photo-geocache-detail.jpg";
   const img2 =
      "https://images.unsplash.com/photo-1505778276668-26b3ff7af103?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1043&q=80";

   return (
      <div>
         <div>
            <Parallax className="para3" bgImage={img1} strength={400} blur={3}>
               <div className="first background-img"></div>
               <div className="contain race">
                  <h1 className="race-title">Let the Race Begin!</h1>
                  {user === null ? (
                     <div className="tern">
                        <h3 className="first-subtitle">
                           Login or Register to find a race today!
                        </h3>
                        <Link className="btn" to="/auth">
                           Login/Register
                        </Link>
                     </div>
                  ) : (
                     <div className="tern">
                        <h3 className="first-subtitle">
                           Get started with a Race!
                        </h3>
                        <Link className="btn" to="/map">
                           Find a Race
                        </Link>
                     </div>
                  )}
               </div>
            </Parallax>

            <h1>Placeholder Title</h1>
            <div className="line" />
            <Parallax className="para3" bgImage={img2} strength={400} blur={3}>
               <div className="second background-img"></div>
               <div className="contain">
                  <h3 className="second-subtitle"> Placeholder text </h3>
                  <Link className="btn" to="/">
                     Useless Button
                  </Link>
               </div>
            </Parallax>
         </div>
      </div>
   );
}

export default Home;
