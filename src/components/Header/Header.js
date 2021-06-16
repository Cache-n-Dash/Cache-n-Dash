
import {Link} from 'react-router-dom';
import {useState} from 'react';

function Header() {
  const [menu, setMenu] = useState(false)

  const menuClick = () => {
    setMenu(!menu)
  }

  return (
    <div className="header">
      <h1>Cache-N-Dash</h1>
      <button className= "menu-button" onClick= {menuClick}>Menu</button>
      {menu && 
        <div className="menu">
          <li><Link to='/'>Home</Link> </li>
          <li><Link to='/search'>Search</Link> </li>
          <li><Link to='/map'>Race</Link> </li>
          <li><Link to='/leaderboard'>Leaderboard</Link> </li>
          <li><Link to="/auth">Login | Register</Link></li>
          <li><Link to="/admin">Admin</Link></li>
          <li><Link to="/userdash">Profile</Link><li>
        </div> }
    </div>
  )
}
export defualt Header;