import React, { useState } from "react";
import {NavLink} from "react-router-dom"
import "./Navbar.scss";
import logoImg from '../../assets/images/logo.png'
import {GiHamburgerMenu} from 'react-icons/gi'
import {BsXLg} from 'react-icons/bs'


function Navbar() {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [iconActive, setIconActive] = useState(false)

  const toggleMenu = () => {
    setIsMenuActive(!isMenuActive);
    setIconActive(!iconActive)
  }

  return (
    <>
      <nav className="nav">
        <NavLink to='/'>
          <img src={logoImg} alt="" />
        </NavLink>
        {
          iconActive ? 
          <BsXLg 
            className="icon"
            size={50}
            onClick={toggleMenu}/> 
          : 
          <GiHamburgerMenu
            className="icon"
            size={50}
            onClick={toggleMenu}
        />
        }
        <div className="nav-itens">
          <NavLink to='/register'><p className="register">Register</p></NavLink>
          <NavLink to='/login'><p className="login">Login</p></NavLink>
        </div>
      </nav>
      <nav className="nav-hamburguer">
        <div className={`nav-itens-hamburguer ${isMenuActive ? "active" : ""}`}>
          <div className="nav-item-hamburguer">
          <NavLink to='/register'><p className="register">Register</p></NavLink>
          <NavLink to='/login'><p className="login">Login</p></NavLink>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
