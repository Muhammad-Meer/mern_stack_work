import React from 'react';
import '../styles/styles.css';

const UserRegister = () => {
  return (
    <div className="auth-container">
      <div className="auth-header">
        <span className="role-badge">Customer</span>
        <h1>Create Account</h1>
        <p>Join us and enjoy great food</p>
      </div>

      <form className="auth-form">
        <div className="input-group">
          <label>Full Name</label>
          <input type="text" placeholder="Ahmed Khan" />
        </div>
        <div className="input-group">
          <label>Email Address</label>
          <input type="email" placeholder="you@example.com" />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input type="password" placeholder="Create strong password" />
        </div>
        <div className="input-group">
          <label>Phone Number</label>
          <input type="tel" placeholder="03xx-xxxxxxx" />
        </div>

        <button type="button" className="btn">Register</button>
      </form>

      <div className="switch-link">
        Already have an account? <a href="/user-login">Login</a>
      </div>
    </div>
  );
};

export default UserRegister;