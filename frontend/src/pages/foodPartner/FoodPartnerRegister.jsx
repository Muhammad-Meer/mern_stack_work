// FoodPartnerRegister.jsx

import "../../style/auth.css";

export default function FoodPartnerRegister() {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Partner Register</h1>
        <p className="auth-subtitle">
          Join as a food partner
        </p>

        <form className="auth-form">
          <div className="input-group">
            <label>Restaurant Name</label>
            <input type="text" placeholder="Enter restaurant name" />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input type="email" placeholder="Enter your email" />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input type="password" placeholder="Create password" />
          </div>

          <button className="auth-btn">
            Register
          </button>
        </form>

        <div className="auth-footer">
          Already registered? <a href="/food-partner/login">Login</a>
        </div>
      </div>
    </div>
  );
}