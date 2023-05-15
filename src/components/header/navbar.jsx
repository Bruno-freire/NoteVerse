import React, { useState } from "react";
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
        <img src={logoImg} alt="" />
        
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
          <a href="#" className="nav-item">Item 1</a>
          <a href="#" className="nav-item">Item 2</a>
          <a href="#" className="nav-item">Item 3</a>
          <a href="#" className="nav-item">Item 4</a>
        </div>
      </nav>
      <nav className="nav-hamburguer">
        <div className={`nav-itens-hamburguer ${isMenuActive ? "active" : ""}`}>
          <div className="nav-item-hamburguer">
            <a href="#" className="nav-item">Item 1</a>
            <a href="#" className="nav-item">Item 2</a>
            <a href="#" className="nav-item">Item 3</a>
            <a href="#" className="nav-item">Item 4</a>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
