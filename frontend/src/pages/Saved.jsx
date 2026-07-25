import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReelFeed from '../components/ReelFeed';
import BottomNav from '../components/BottomNav';
import API from '../config/api';

const Saved = () => {
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSaved = useCallback(() => {
    axios.get(`${API}/api/food/save`, { withCredentials: true })
      .then(res => {
        setVideos(res.data.fooditems || []);
      })
      .catch(() => {
        navigate('/user/login');
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  useEffect(() => {
    fetchSaved();
  }, [fetchSaved]);

  async function removeSave(item) {
    try {
      await axios.post(`${API}/api/food/save`, { foodId: item._id }, { withCredentials: true });
      setVideos(prev => prev.filter(v => v._id !== item._id));
    } catch {
      navigate('/user/login');
    }
  }

  return (
    <div className="home-page">
      <div className="home-content">
        {loading ? (
          <div className="home-status">
            <div className="loader"></div>
            <p>Loading saved items...</p>
          </div>
        ) : (
          <ReelFeed
            items={videos}
            onSave={removeSave}
            emptyMessage="No saved videos yet."
          />
        )}
      </div>
      <BottomNav />
    </div>
  );
};

export default Saved;
