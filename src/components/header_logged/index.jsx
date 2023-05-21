import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { BsXLg, GiHamburgerMenu } from 'react-icons/all';
import logoImg from '../../assets/images/logo-white.png';
import "./index.scss";

function HeaderLogged() {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [iconActive, setIconActive] = useState(false);

  const navigate = useNavigate()

  const { name } = JSON.parse(localStorage.getItem('user'));

  const toggleMenu = () => {
    setIsMenuActive(!isMenuActive);
    setIconActive(!iconActive);
  };

  const handleRemoveUserAndToken = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login')
  };

  return (
    <>
      <nav className="logged">
        <NavLink to='/'>
          <img src={logoImg} alt="" />
        </NavLink>
        {iconActive && (
          <BsXLg
            className="icon"
            size={50}
            onClick={toggleMenu}
          />
        )}
        {!iconActive && (
          <GiHamburgerMenu
            className="icon"
            size={50}
            onClick={toggleMenu}
          />
        )}
        <div className="nav-itens ">
          <div onClick={toggleMenu} className="name">{name}</div>
        </div>
      </nav>
      <nav className="nav-hamburguer teste">
        <div className={`nav-itens-hamburguer ${isMenuActive ? "active" : ""}`}>
          <div className="nav-item-hamburguer">
            <p>User Edit</p>
            <p onClick={handleRemoveUserAndToken}>LogOut</p>
          </div>
        </div>
      </nav>
    </>
  );
}

export default HeaderLogged;
