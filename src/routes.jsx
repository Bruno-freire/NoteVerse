import React from "react";
import { Route, Routes} from "react-router-dom";
import HomeScreen from "./screens/home";
import RegisterScreen from './screens/auth/register'
import LoginScreen from './screens/auth/login'
import NotesIndex from './screens/notes/index'
import UsersEditScreen from './screens/users/edit'
import PrivateRouteIsLoggedIn from "./components/auth/private_router/privateRoutesInLoggedIn";
import PrivateRouteNotLoggedIn from "./components/auth/private_router/privateRoutesNotLoggedIn";


const AppRoutes = () => {

  return (
    <Routes>
      <Route path="/" element={<HomeScreen/>} />
      <Route path='/register' element={<RegisterScreen/>} />
      <Route path='/login' element={<PrivateRouteNotLoggedIn element={<LoginScreen/>} redirectTo='/notes'/>} />
      <Route path='/notes' element={<PrivateRouteIsLoggedIn element={<NotesIndex/>} redirectTo='/login'/>} />
      <Route path='/users/edit' element={<UsersEditScreen/>} />
      <Route path="*" />
    </Routes>
  );
};

export default AppRoutes;
