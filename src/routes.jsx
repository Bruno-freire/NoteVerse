import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes} from "react-router-dom";
import HomeScreen from "./screens/home";
import RegisterScreen from './screens/auth/register'
import LoginScreen from './screens/auth/login'
import NotesIndex from './screens/notes/index'
import UsersEditScreen from './screens/users/edit'
import PrivateRoute from "./privateRoute";


const AppRoutes = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const checkLoggedInStatus = () => {
      const user = localStorage.getItem('user')
      setIsLoggedIn(!!user)
    }
    checkLoggedInStatus();
  }, [])

  return (
    <Routes>
      <Route path="/" element={<HomeScreen/>} />
      <Route path='/register' element={<RegisterScreen/>} />
      <Route path='/login' element={isLoggedIn ? <Navigate to='/notes'/> : <LoginScreen/>} />
      <Route path='/notes' element={<PrivateRoute><NotesIndex/></PrivateRoute>} />
      <Route path='/users/edit' element={<UsersEditScreen/>} />
      <Route path="*" />
    </Routes>
  );
};

export default AppRoutes;
