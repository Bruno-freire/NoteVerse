import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { BsXLg } from 'react-icons/bs';
import { FaList } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';

import logoImg from '../../assets/images/logo-white.png';
import "./index.scss";
import UsersServices from "../../services/users";

function HeaderLogged(props) {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [iconActive, setIconActive] = useState(false);
  const [nameMatch, setName] = useState("")


  useEffect(() => {
    if(props.setChangeName){
      const { name } = JSON.parse(localStorage.getItem('user'));
      const regex = /^(\S+)/;
      const nameMatch = name.match(regex)[0];
      setName(nameMatch)
      props.setChangeName(false)
    }else{
      const { name } = JSON.parse(localStorage.getItem('user'));
      const regex = /^(\S+)/;
      const nameMatch = name.match(regex)[0];
      setName(nameMatch)
    }
    
  }, [props.changeName])

  const navigate = useNavigate()


  const toggleMenu = () => {
    setIsMenuActive(!isMenuActive);
    setIconActive(!iconActive);
  };

  const handleRemoveUserAndToken = async () => {
    if (localStorage.getItem('tester')) {
      await UsersServices.delete()
      navigate('/login')
    } else {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      navigate('/login')
    }
  };

  const handleEditUser = () => {
    navigate('/users/edit')
  }

  return (
    <>
      <nav className="logged">
        <div className="leftLogged">
          <NavLink to='/'>
            <img src={logoImg} alt="" />
          </NavLink>
          {props.showIcons && <FaList className="iconBurguer" id="notes" onClick={() => {props.setIsOpen(true)}} />}
        </div>
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
          <div onClick={toggleMenu} className={`name ${isMenuActive ? "active" : ""}`}>{nameMatch}</div>
        </div>
      </nav>
      <nav className="nav-hamburguer">
        <div className={`nav-itens-hamburguer ${isMenuActive ? "active" : ""}`}>
          <div className="nav-item-hamburguer">
            <p onClick={handleEditUser}>User Edit</p>
            <p onClick={handleRemoveUserAndToken}>LogOut</p>
          </div>
        </div>
      </nav>
    </>
  );
}

export default HeaderLogged;
