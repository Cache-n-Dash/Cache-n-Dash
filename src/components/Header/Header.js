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
            <h1>Cache-N-Dash</h1>
            <button className="menu-button" onClick={menuClick}>
               Menu
               <div>
                  <div className="patty" />
                  <div className="patty" />
                  <div className="patty" />
               </div>
            </button>
         </div>
         <div>
            {menu && (
               <div className="menu">
                  <Link to="/">Home</Link>
                  <Link to="/search">Search</Link>
                  <Link to="/map">Race</Link>
                  <Link to="/leaderboard">Leaderboard</Link>
                  <Link to="/admin">Admin</Link>
                  {user === null ? (
                     <Link to="/auth">Login | Register</Link>
                  ) : (
                     <Link to={"/profile"}>{user.username}'s Profile</Link>
                  )}
                  {/* 'test profile' link is to be deleted in final build, it's here for testing purposes */}
                  <Link to={"/profile"}>Test Profile</Link>
               </div>
            )}
         </div>
      </div>
   );
}
