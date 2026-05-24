import "../../style/auth.css";
import { useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

export default function FoodPartnerRegister() {

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();


    try {
      const response = await axios.post(
        "http://localhost:3200/api/auth/food-partner/register",
        {
          username: fullName,
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
        <h1 className="auth-title">Partner Register</h1>
        <p className="auth-subtitle">
          Join as a food partner
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Restaurant Name</label>
            <input type="text" placeholder="Enter restaurant name"
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input type="email" placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input type="password" placeholder="Create password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="auth-btn">
            Register
          </button>
        </form>



        <div className="auth-footer-routing"><a href="/user/register">Register as a User</a>
        </div>

        <div className="auth-footer">
          Already registered? <a href="/food-partner/login">Login</a>
        </div>

      </div>
    </div>
  );
}