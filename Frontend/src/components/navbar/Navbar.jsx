import React, { useContext, useState } from 'react'
import "./Navbar.css"
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom';
import { StoreContext } from '../context/StoreContext';

const Navbar = ({ setshowLogin }) => {

  const [menu, setmenu] = useState("Shop");
  const { getTotalCartAmount, token, setToken, navigate } = useContext(StoreContext);

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
    navigate("/");
  }
  return (
    <div className="navbar">
      <Link to='/'><img className='logo' src={assets.logo} alt="logo" /></Link>
      <ul className="navbar-menu">
        <Link to={"/"} onClick={() => setmenu("Shop")} className={menu === "Shop" ? "active" : ""}>Home</Link>
        <Link to={"/about"} onClick={() => setmenu("About")} className={menu === "About" ? "active" : ""}>About</Link>
        <Link to={"/contact"} onClick={() => setmenu("Contact")} className={menu === "Contact" ? "active" : ""}>Contact</Link>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className="navbar-search-icon">
          <Link to="/cart"><img src={assets.basket_icon} alt="" /> </Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
        {!token ? <button onClick={() => { setshowLogin(true) }} className="navbar-button">Sign In</button>
          : <div className='navbar-profile'>
            <img src={assets.profile_icon} alt="" />
            <ul className='nav-profile-dropdown'>
              <li onClick={()=> navigate('/myorders')}><img src={assets.bag_icon} alt='' /><p>Orders </p> </li>
              <hr />
              <li onClick={logout}><img src={assets.logout_icon} alt='' /><p>Logout </p> </li>
            </ul>
          </div>}

      </div>
    </div>
  )
}

export default Navbar