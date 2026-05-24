import "../../style/auth.css";
import { useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";


export default function FoodPartnerLogin() {

  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();


    try {
      const response = await axios.post(
        "http://localhost:3200/api/auth/food-partner/login",
        {
          email: email,
          password: password,
        },
        { withCredentials: true }
      )

      console.log(response.data)

      navigate("/food-partner")
    } catch (error) {
      console.log(error)
    }
  }



  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Partner Login</h1>
        <p className="auth-subtitle">
          Login to manage your restaurant
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>
            <input type="email" placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input type="password" placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="auth-btn">
            Login
          </button>
        </form>


        <div className="auth-footer-routing"><a href="/user/login">Login as a User</a>
        </div>

        <div className="auth-footer">
          New partner? <a href="/food-partner/register">Register</a>
        </div>
      </div>
    </div>
  );
}