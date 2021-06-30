import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import "./Header.css";

export default function Header() {
   const [menu, setMenu] = useState(false);
   const { user, setUser } = useContext(UserContext);

   const menuClick = () => {
      setMenu(!menu);
   };

   const handleLogout = () => {
      setUser(null);
      setMenu(false);
   };
   // console.log(user);

   return (
      <div className="parent">
         <div className="header">
            <Link className="logo" onClick={() => setMenu(false)} to="/">
               Cache-N-Dash
            </Link>
            <button className="menu-button" onClick={menuClick}>
               {/* Menu */}
               <div>
                  <div className="patty" />
                  <div className="patty" />
                  <div className="patty" />
               </div>
            </button>
         </div>

         <div
            className={`menu ${
               menu
                  ? user === null
                     ? "drop"
                     : user.isadmin
                     ? "admin-drop"
                     : "drop"
                  : ""
            }`}
         >
            <Link className="link" onClick={() => setMenu(false)} to="/">
               Home
            </Link>
            {/* <Link onClick={() => setMenu(false)} to="/search">
               Search
            </Link> */}
            <Link className="link" onClick={() => setMenu(false)} to="/map">
               Map
            </Link>
            <Link
               className="link"
               onClick={() => setMenu(false)}
               to="/leaderboard"
            >
               Leaderboard
            </Link>
            {user === null ? (
               <Link className="link" onClick={() => setMenu(false)} to="/auth">
                  Login | Register
               </Link>
            ) : (
               <div className={`menu submenu ${menu ? "drop" : ""}`}>
                  <Link
                     className="link"
                     onClick={() => setMenu(false)}
                     to="/admin"
                  >
                     Admin
                  </Link>
                  <Link
                     className="link"
                     onClick={() => setMenu(false)}
                     to={"/profile"}
                  >
                     {user.username}'s Profile
                  </Link>
                  <Link className="link" onClick={handleLogout} to={"/"}>
                     Logout
                  </Link>
               </div>
            )}
         </div>
      </div>
   );
}
