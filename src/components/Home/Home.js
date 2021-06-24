import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";

function Home() {
   const { user } = useContext(UserContext);
   return (
      <div>
         <div>
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

            <h1>Placeholder Title</h1>
            <div className="line" />
            <div className="second background-img"></div>
            <div className="contain">
               <h3 className="second-subtitle"> Placeholder text </h3>
               <Link className="btn" to="/">
                  Useless Button
               </Link>
            </div>
         </div>
      </div>
   );
}

export default Home;
