import React from 'react';
import '../styles/styles.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useState} from 'react';

const PartnerLogin = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handelSubmit = async  (e) => {
    e.preventDefault();

    try {
      const responce = await axios.post(
        "http://localhost:3200/api/auth/food-partner/login",
        {
          email: email,
          password: password
        }
      )
      navigate("/create-food");
    } catch (error) {
      console.log(error.message);
    }
  }


  return (
    <div className="auth-container">
      <div className="auth-header">
        <span className="role-badge">Food Partner</span>
        <h1>Partner Login</h1>
        <p>Manage your restaurant easily</p>
      </div>

      <form className="auth-form" onSubmit={handelSubmit}>
        <div className="input-group">
          <label>Restaurant Email</label>
          <input type="email" placeholder="restaurant@example.com"
          value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input type="password" placeholder="••••••••"
          value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        <button type="submit" className="btn">Login as Partner</button>
      </form>

      <div className="switch-link">
        Don't have a partner account? <Link to="/partner-register">Register Restaurant</Link> 
      </div>
    </div>
  );
};

export default PartnerLogin;