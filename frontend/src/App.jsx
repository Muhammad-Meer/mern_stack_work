import React, { useState } from "react";
import axios from "axios";

const AuthPage = () => {
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // REGISTER
  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3200/api/auth/user/register",
        registerData,
        {
          withCredentials: true,
        }
      );

      console.log(response.data);
      alert("Register Success");
    } catch (error) {
      console.log(error.response?.data || error.message);
      alert("Register Failed");
    }
  };

  // LOGIN
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3200/api/auth/user/login",
        loginData,
        {
          withCredentials: true,
        }
      );

      console.log(response.data);
      alert("Login Success");
    } catch (error) {
      console.log(error.response?.data || error.message);
      alert("Login Failed");
    }
  };

  // LOGOUT
  const handleLogout = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3200/api/auth/user/logout",
        {
          withCredentials: true,
        }
      );

      console.log(response.data);
      alert("Logout Success");
    } catch (error) {
      console.log(error.response?.data || error.message);
      alert("Logout Failed");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "50px",
        padding: "50px",
        fontFamily: "Arial",
      }}
    >
      {/* REGISTER */}
      <div>
        <h2>Register</h2>

        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Name"
            value={registerData.name}
            onChange={(e) =>
              setRegisterData({
                ...registerData,
                name: e.target.value,
              })
            }
          />

          <br />
          <br />

          <input
            type="email"
            placeholder="Email"
            value={registerData.email}
            onChange={(e) =>
              setRegisterData({
                ...registerData,
                email: e.target.value,
              })
            }
          />

          <br />
          <br />

          <input
            type="password"
            placeholder="Password"
            value={registerData.password}
            onChange={(e) =>
              setRegisterData({
                ...registerData,
                password: e.target.value,
              })
            }
          />

          <br />
          <br />

          <button type="submit">Register</button>
        </form>
      </div>

      {/* LOGIN */}
      <div>
        <h2>Login</h2>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={loginData.email}
            onChange={(e) =>
              setLoginData({
                ...loginData,
                email: e.target.value,
              })
            }
          />

          <br />
          <br />

          <input
            type="password"
            placeholder="Password"
            value={loginData.password}
            onChange={(e) =>
              setLoginData({
                ...loginData,
                password: e.target.value,
              })
            }
          />

          <br />
          <br />

          <button type="submit">Login</button>
        </form>

        <br />

        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default AuthPage;