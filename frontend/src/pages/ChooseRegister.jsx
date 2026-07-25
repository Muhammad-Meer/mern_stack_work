import { useNavigate } from 'react-router-dom';
import '../styles/styles.css';
import '../styles/auth-shared.css';

const ChooseRegister = () => {
  const navigate = useNavigate();

  return (
    <div className="auth-page">
      <div className="auth-container choose-container">
        <div className="auth-header">
          <h1>Join Zomato Clone</h1>
          <p>Choose your account type</p>
        </div>
        <div className="choose-options">
          <button className="btn choose-btn" onClick={() => navigate('/user/register')}>
            <span className="choose-icon">&#127860;</span>
            <span className="choose-label">Customer</span>
            <span className="choose-desc">Order delicious food</span>
          </button>
          <button className="btn choose-btn" onClick={() => navigate('/food-partner/register')}>
            <span className="choose-icon">&#127978;</span>
            <span className="choose-label">Food Partner</span>
            <span className="choose-desc">Register your restaurant</span>
          </button>
        </div>
        <div className="switch-link">
          Already have an account? <a onClick={() => navigate('/user/login')}>Login</a>
        </div>
      </div>
    </div>
  );
};

export default ChooseRegister;
