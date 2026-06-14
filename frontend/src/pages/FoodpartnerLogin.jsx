import React from 'react';
import '../styles/styles.css';

const PartnerLogin = () => {
  return (
    <div className="auth-container">
      <div className="auth-header">
        <span className="role-badge">Food Partner</span>
        <h1>Partner Login</h1>
        <p>Manage your restaurant easily</p>
      </div>

      <form className="auth-form">
        <div className="input-group">
          <label>Restaurant Email</label>
          <input type="email" placeholder="restaurant@example.com" />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input type="password" placeholder="••••••••" />
        </div>

        <button type="button" className="btn">Login as Partner</button>
      </form>

      <div className="switch-link">
        Don't have a partner account? <a href="/partner-register">Register Restaurant</a>
      </div>
    </div>
  );
};

export default PartnerLogin;