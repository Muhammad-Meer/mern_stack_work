// FoodPartnerLogin.jsx

import "../../style/auth.css";

export default function FoodPartnerLogin() {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Partner Login</h1>
        <p className="auth-subtitle">
          Login to manage your restaurant
        </p>

        <form className="auth-form">
          <div className="input-group">
            <label>Email</label>
            <input type="email" placeholder="Enter your email" />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input type="password" placeholder="Enter password" />
          </div>

          <button className="auth-btn">
            Login
          </button>
        </form>

        <div className="auth-footer">
          New partner? <a href="/food-partner/register">Register</a>
        </div>
      </div>
    </div>
  );
}