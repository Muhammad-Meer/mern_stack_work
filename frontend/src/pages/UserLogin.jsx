import React from 'react';
import '../styles/styles.css';

const UserLogin = () => {
  return (
    <div className="auth-container">
      <div className="auth-header">
        <span className="role-badge">Customer</span>
        <h1>Welcome Back</h1>
        <p>Sign in to order delicious food</p>
      </div>

      <form className="auth-form">
        <div className="input-group">
          <label>Email Address</label>
          <input type="email" placeholder="you@example.com" />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input type="password" placeholder="••••••••" />
        </div>

        <button type="button" className="btn">Login</button>
      </form>

      <div className="switch-link">
        Don't have an account? <a href="/user-register">Register</a>
      </div>
    </div>
  );
};

export default UserLogin;