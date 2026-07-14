import { BrowserRouter, Routes, Route } from "react-router-dom";
import ChooseRegister from "../pages/ChooseRegister";
import UserRegister from "../pages/UserRegister";
import UserLogin from "../pages/UserLogin";
import FoodpartnerRegister from "../pages/FoodpartnerRegister";
import FoodpartnerLogin from "../pages/FoodpartnerLogin";
import Home from "../pages/Home";
import Saved from "../pages/Saved";
import CreateFood from "../createfood/CreateFood";
import Profile from "../pages/Profile";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<ChooseRegister />} />
        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/food-partner/register" element={<FoodpartnerRegister />} />
        <Route path="/food-partner/login" element={<FoodpartnerLogin />} />
        <Route path="/saved" element={<Saved />} />
        <Route path="/create-food" element={<CreateFood />} />
        <Route path="/food-partner/:id" element={<Profile />} />
        <Route path="/user-register" element={<UserRegister />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/partner-register" element={<FoodpartnerRegister />} />
        <Route path="/partner-login" element={<FoodpartnerLogin />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
