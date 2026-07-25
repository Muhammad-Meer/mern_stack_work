import { useState } from 'react';
import '../styles/styles.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import API from '../config/api';

const PartnerRegister = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!firstName || !email || !password || !businessName) {
      alert("All fields are required");
      return;
    }

    setLoading(true);
    try {
      await axios.post(
        `${API}/api/auth/food-partner/register`,
        { businessName, username: firstName, email, password },
        { withCredentials: true }
      );
      navigate("/partner-login");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <span className="role-badge">Food Partner</span>
          <h1>Register Restaurant</h1>
          <p>Grow your business with us</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Restaurant Name</label>
            <input
              type="text"
              placeholder="Al-Habib Biryani"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Owner Name</label>
            <input
              type="text"
              placeholder="Full Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Business Email</label>
            <input
              type="email"
              placeholder="owner@restaurant.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Create password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn" disabled={loading}>
            {loading ? "Registering..." : "Register Restaurant"}
          </button>
        </form>

        <div className="switch-link">
          Already registered? <Link to="/partner-login">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default PartnerRegister;
