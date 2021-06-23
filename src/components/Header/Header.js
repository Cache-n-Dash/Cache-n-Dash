import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import "./Header.css";

export default function Header() {
   const [menu, setMenu] = useState(false);
   const { user } = useContext(UserContext);

   const menuClick = () => {
      setMenu(!menu);
   };

   return (
      <div className="parent">
         <div className="header">
            <Link className="logo" onClick={() => setMenu(false)} to="/">
               Cache-N-Dash
            </Link>
            <button className="menu-button" onClick={menuClick}>
               Menu
               <div>
                  <div className="patty" />
                  <div className="patty" />
                  <div className="patty" />
               </div>
            </button>
         </div>

         <div className={`menu ${menu ? "drop" : ""}`}>
            <Link onClick={() => setMenu(false)} to="/">
               Home
            </Link>
            <Link onClick={() => setMenu(false)} to="/search">
               Search
            </Link>
            <Link onClick={() => setMenu(false)} to="/map">
               Map
            </Link>
            <Link onClick={() => setMenu(false)} to="/leaderboard">
               Leaderboard
            </Link>
            <Link onClick={() => setMenu(false)} to="/admin">
               Admin
            </Link>
            {user === null ? (
               <Link onClick={() => setMenu(false)} to="/auth">
                  Login | Register
               </Link>
            ) : (
               <Link onClick={() => setMenu(false)} to={"/profile"}>
                  {user.username}'s Profile
               </Link>
            )}
         </div>
      </div>
   );
}
