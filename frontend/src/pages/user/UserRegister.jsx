import "../../style/auth.css";
import { useState } from "react";
import axios from "axios";




export default function UserRegister() {

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async  (e) => {
    e.preventDefault();

     // Here you would typically send the data to your backend API  };
     try{

      const response = await axios.post('http://localhost:3200/api/auth/user/register', {
        fullName,
        email,
        password
      })
     } catch(error) {
      res.status(500).json({message: "server error" + error.message})
     }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">User Register</h1>
        <p className="auth-subtitle">
          Create your account to continue
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Full Name</label>
            <input onChange={(e) => setFullName(e.target.value)}
              type="text" name="fullName" placeholder="Enter your name" />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input onChange={(e) => setEmail(e.target.value)}
              type="email" placeholder="Enter your email" />
          </div>


          <div className="input-group">
            <label>Password</label>
            <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Enter your password" />
          </div>

          <button className="auth-btn">
            Register
          </button>
        </form>



        <div className="auth-footer-routing"><a href="/food-partner/register">Register as a Food-Partner</a>
        </div>

        <div className="auth-footer">
          Already have an account? <a href="/user/login">Login</a>
        </div>

      </div>
    </div>
  );
}