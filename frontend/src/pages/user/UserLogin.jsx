// UserLogin.jsx

import "../../style/auth.css";

export default function UserLogin() {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">User Login</h1>
        <p className="auth-subtitle">
          Welcome back
        </p>

        <form className="auth-form">
          <div className="input-group">
            <label>Email</label>
            <input type="email" placeholder="Enter your email" />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input type="password" placeholder="Enter your password" />
          </div>

          <button className="auth-btn">
            Login
          </button>
        </form>



        <div className="auth-footer-routing"><a href="/food-partner/login">Login as a Food-Partner</a>
        </div>

        
        <div className="auth-footer">
          Don’t have an account? <a href="/user/register">Register</a>
        </div>
      </div>
    </div>
  );
}
