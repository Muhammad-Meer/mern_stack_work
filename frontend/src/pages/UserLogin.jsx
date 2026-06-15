import React from 'react';
import '../styles/styles.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const UserLogin = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!email || !password) {
      alert("All fields are required");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3200/api/auth/user/login",
        {
          email,
          password
        },
        { withCredentials: true }
      );

      console.log(response.data);

      navigate('/');

      
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-header">
        <span className="role-badge">Customer</span>
        <h1>Welcome Back</h1>
        <p>Sign in to order delicious food</p>
      </div>


      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Email Address</label>
          <input type="email" placeholder="you@example.com"
           value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input type="password" placeholder="••••••••" 
           value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        <button type="submit" className="btn">Login</button>
      </form>

      <div className="switch-link">
        Don't have an account? <Link to="/user-register">Register</Link>
      </div>
    </div>
  );
};

export default UserLogin;