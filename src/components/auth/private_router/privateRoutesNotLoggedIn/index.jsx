import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRouteNotLoggedIn = ({ element, redirectTo }) => {
  const isLoggedIn = !!localStorage.getItem('user');

  return isLoggedIn ? <Navigate to={redirectTo}/> :  element ;
};

export default PrivateRouteNotLoggedIn;
