import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRouteIsLoggedIn = ({ element, redirectTo }) => {
  const isLoggedIn = !!localStorage.getItem('user');

  return isLoggedIn ? element : <Navigate to={redirectTo} />;
};

export default PrivateRouteIsLoggedIn;
