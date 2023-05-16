import React from "react";
import { Route, Routes } from "react-router-dom";
import HomeScreen from "./screens/home";
import RegisterScreen from './screens/auth/register'
import LoginScreen from './screens/auth/login'
import NotesIndex from './screens/notes/index'
import UsersEditScreen from './screens/users/edit'

const AppRoutes = () => {
  return (
      <Routes>
        <Route path="/" element={<HomeScreen/>} />
        <Route path='/register' element={<RegisterScreen/>} />
        <Route path='/login' element={<LoginScreen/>} />
        <Route path='/notes' element={<NotesIndex/>} />
        <Route path='/users/edit' element={<UsersEditScreen/>} />
        <Route path="*"/>
      </Routes>
  );
};

export default AppRoutes;