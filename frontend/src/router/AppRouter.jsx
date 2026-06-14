import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";


const Home = () => <h1>Home</h1>;
const Register = () => <h1>Register</h1>;
const Login = () => <h1>Login</h1>;
const Logout = () => <h1>Logout</h1>;

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;