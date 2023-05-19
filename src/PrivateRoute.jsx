import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element }) => {
  const isLoggedIn = !!localStorage.getItem('user');

  return isLoggedIn ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
