import { useEffect, useState } from 'react';
import axios from 'axios';
import ReelFeed from '../components/ReelFeed';
import BottomNav from '../components/BottomNav';
import API from '../config/api';

const Saved = () => {
  const [videos, setVideos] = useState([]);

  const fetchSaved = () => {
    axios.get(`${API}/api/food/save`, { withCredentials: true })
      .then(res => {
        setVideos(res.data.fooditems || []);
      })
      .catch(() => {});
  };

  useEffect(() => {
    fetchSaved();
  }, []);

  async function removeSave(item) {
    try {
      await axios.post(`${API}/api/food/save`, { foodId: item._id }, { withCredentials: true });
      setVideos(prev => prev.filter(v => v._id !== item._id));
    } catch { /* noop */ }
  }

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, overflow: 'hidden' }}>
        <ReelFeed
          items={videos}
          onSave={removeSave}
          emptyMessage="No saved videos yet."
        />
      </div>
      <BottomNav />
    </div>
  );
};

export default Saved;
