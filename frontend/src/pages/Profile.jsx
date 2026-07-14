import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/profile.css';
import API from '../config/api';

const Profile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    axios.get(`${API}/api/food-partner/${id}`)
      .then(res => {
        setProfile(res.data.partner);
        setFoods(res.data.foods || []);
      })
      .catch(() => navigate('/'));
  }, [id, navigate]);

  if (!profile) return <div className="profile-loading">Loading...</div>;

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="profile-avatar">
          <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=200&h=200&fit=crop" alt={profile.businessName} />
        </div>
        <h1>{profile.businessName}</h1>
        <p className="profile-email">{profile.email}</p>
        <div className="profile-stats">
          <div className="stat">
            <span className="stat-number">{foods.length}</span>
            <span className="stat-label">Meals</span>
          </div>
          <div className="stat">
            <span className="stat-number">{foods.reduce((sum, f) => sum + (f.likeCount || 0), 0)}</span>
            <span className="stat-label">Likes</span>
          </div>
        </div>
      </div>
      <div className="profile-foods">
        <h2>Our Meals</h2>
        <div className="foods-grid">
          {foods.map(food => (
            <div key={food._id} className="food-card">
              <video src={food.video} muted loop playsInline
                onMouseEnter={e => e.target.play()}
                onMouseLeave={e => e.target.pause()}
              />
              <div className="food-card-info">
                <h3>{food.name}</h3>
                <p>{food.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button className="back-btn" onClick={() => navigate('/')}>Back to Home</button>
    </div>
  );
};

export default Profile;
