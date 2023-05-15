import React from "react";
import { Route, Routes } from "react-router-dom";
import HomeScreen from "./screens/home";

const AppRoutes = () => {
  return (
      <Routes>
        <Route path="/" element={<HomeScreen/>} />
        <Route path="*"/>
      </Routes>
  );
};

export default AppRoutes;