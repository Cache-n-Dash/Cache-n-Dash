import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/auth">Auth</Link>
        <Link to="/admin">Admin</Link>
        <Link to="/leaderboard">LeaderBoard</Link>
        <Link to="/map">Map</Link>
        <Link to="/search">Search</Link>
        <Link to="/userdash">UserDash</Link>
      </nav>
    </div>
  );
}

export default Header;
