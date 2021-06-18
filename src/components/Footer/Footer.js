import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
   return (
      <div>
         <footer className="footer">
            <h3>Cache-N-Dash</h3>
            <div>
               <Link to="/contact">Contact Us!</Link>
               <Link to="/">Home</Link>
            </div>
            <div>
               <Link to={"/profile"}>Test Profile</Link>
               <Link to="/admin"> Admin</Link>
            </div>
            <div>
               <Link to="/search">Search</Link>
               <Link to="/leaderboard">Leaderboard</Link>
               <Link to="/map">Race</Link>
            </div>
         </footer>
      </div>
   );
}

export default Footer;
