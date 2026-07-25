import '../styles/styles.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import API from '../config/api';

const PartnerLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("All fields are required");
      return;
    }

    setLoading(true);
    try {
      await axios.post(
        `${API}/api/auth/food-partner/login`,
        { email, password },
        { withCredentials: true }
      );
      navigate("/create-food");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <span className="role-badge">Food Partner</span>
          <h1>Partner Login</h1>
          <p>Manage your restaurant easily</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Restaurant Email</label>
            <input type="email" placeholder="restaurant@example.com"
              value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input type="password" placeholder="&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;"
              value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          <button type="submit" className="btn" disabled={loading}>
            {loading ? "Logging in..." : "Login as Partner"}
          </button>
        </form>

        <div className="switch-link">
          Don't have a partner account? <Link to="/food-partner/register">Register Restaurant</Link>
        </div>
      </div>
    </div>
  );
};

export default PartnerLogin;
