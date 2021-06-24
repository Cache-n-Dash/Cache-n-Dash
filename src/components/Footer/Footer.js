import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
   return (
      <footer className="footer">
         <Link className="logo" to="/">
            Cache-N-Dash
         </Link>
         <div>
            <Link to="/contact">Contact Us!</Link>
            <Link to="/">Home</Link>
         </div>
         <div>
            <Link to={"/profile"}>User Profile</Link>
            <Link to="/admin"> Admin</Link>
         </div>
         <div>
            <Link to="/search">Search</Link>
            <Link to="/leaderboard">Leaderboard</Link>
            <Link to="/map">Race</Link>
         </div>
      </footer>
   );
}

export default Footer;
