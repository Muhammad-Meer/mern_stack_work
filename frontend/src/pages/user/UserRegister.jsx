// UserRegister.jsx

import "./auth.css";

export default function UserRegister() {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">User Register</h1>
        <p className="auth-subtitle">
          Create your account to continue
        </p>

        <form className="auth-form">
          <div className="input-group">
            <label>Full Name</label>
            <input type="text" placeholder="Enter your name" />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input type="email" placeholder="Enter your email" />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input type="password" placeholder="Enter your password" />
          </div>

          <button className="auth-btn">
            Register
          </button>
        </form>

        <div className="auth-footer">
          Already have an account? <a href="#">Login</a>
        </div>
      </div>
    </div>
  );
}