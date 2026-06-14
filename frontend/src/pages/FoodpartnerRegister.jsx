import React from 'react';
import '../styles/styles.css';

const PartnerRegister = () => {
  return (
    <div className="auth-container">
      <div className="auth-header">
        <span className="role-badge">Food Partner</span>
        <h1>Register Restaurant</h1>
        <p>Grow your business with us</p>
      </div>

      <form className="auth-form">
        <div className="input-group">
          <label>Restaurant Name</label>
          <input type="text" placeholder="Al-Habib Biryani" />
        </div>
        <div className="input-group">
          <label>Owner Name</label>
          <input type="text" placeholder="Full Name" />
        </div>
        <div className="input-group">
          <label>Business Email</label>
          <input type="email" placeholder="owner@restaurant.com" />
        </div>
        <div className="input-group">
          <label>Phone Number</label>
          <input type="tel" placeholder="03xx-xxxxxxx" />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input type="password" placeholder="Create password" />
        </div>

        <button type="button" className="btn">Register Restaurant</button>
      </form>

      <div className="switch-link">
        Already registered? <a href="/partner-login">Login</a>
      </div>
    </div>
  );
};

export default PartnerRegister;