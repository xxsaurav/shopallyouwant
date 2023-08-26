import React, { useState } from 'react';
import './Header.css'

import { FaBars } from 'react-icons/fa';
import { Link } from "react-router-dom";
const Navbar = () => {
  const [navVisible, setNavVisible] = useState(true);
  return (
    <>

      {<nav className={`nav${navVisible ? " open" : ""}`}>
        <FaBars className={`fabars${navVisible ? " open" : ""}`}
        //  onClick={(e)=>{setNavVisible(!navVisible)}}
        />
        <div className='navmenu'>

          <Link to='/' className="route_home">
            Home
          </Link>
          <Link to='/about' className="route_about">
            About
          </Link>
          <Link to='/contact' className="route_contact">
            Contact
          </Link>
          <Link to='/products' className="route_products">
            Products
          </Link>
          <Link to="/login" className='route_login'>
            Login
          </Link>
        </div>
        <nav className='navbtn'>
          {/* <NavBtnLink to='/signin'>Sign In</NavBtnLink> */}
        </nav>
      </nav>}
    </>)

};

export default Navbar;
