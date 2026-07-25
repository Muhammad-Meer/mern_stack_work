import { useState } from "react";
import "../styles/styles.css";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import API from '../config/api';

const UserRegister = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!firstName || !email || !password) {
      alert("All fields are required");
      return;
    }

    setLoading(true);
    try {
      await axios.post(
        `${API}/api/auth/user/register`,
        { username: firstName, email, password },
        { withCredentials: true }
      );
      navigate("/user-login");
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
          <span className="role-badge">Customer</span>
          <h1>Create Account</h1>
          <p>Join us and enjoy great food!</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Ahmed Khan"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Create strong password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn" disabled={loading}>
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>

        <div className="switch-link">
          Already have an account? <Link to="/user-login">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;
