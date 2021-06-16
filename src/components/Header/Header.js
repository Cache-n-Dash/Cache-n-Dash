
import {Link} from 'react-router-dom';
import {useState} from 'react';

export default function Header() {
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
          <Link to='/'>Home</Link>
          <Link to='/search'>Search</Link>
          <Link to='/map'>Race</Link>
          <Link to='/leaderboard'>Leaderboard</Link>
          <Link to="/auth">Login | Register</Link>
          <Link to="/admin">Admin</Link>
          <Link to="/profile">Profile</Link>
        </div>}
      </div>
  )
}

