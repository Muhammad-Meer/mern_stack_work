import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserRegister from "../pages/UserRegister";
import UserLogin from "../pages/UserLogin";
import FoodpartnerRegister from "../pages/FoodpartnerRegister";
import FoodpartnerLogin from "../pages/FoodpartnerLogin";
import Home from "../genreal/Home";
import CreateFood from "../createfood/CreateFood";





const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user-register" element={<UserRegister />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/partner-register" element={<FoodpartnerRegister />} />
        <Route path="/partner-login" element={<FoodpartnerLogin />} />
        <Route path="/create-food" element={<CreateFood />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;