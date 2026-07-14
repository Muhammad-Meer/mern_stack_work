import { useEffect, useState } from 'react';
import axios from 'axios';
import ReelFeed from '../components/ReelFeed';
import BottomNav from '../components/BottomNav';
import API from '../config/api';

const Home = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    axios.get(`${API}/api/food`, { withCredentials: true })
      .then(res => {
        setVideos(res.data.fooditems || []);
      })
      .catch(() => {});
  }, []);

  async function likeVideo(item) {
    try {
      const res = await axios.post(`${API}/api/food/like`, { foodId: item._id }, { withCredentials: true });
      setVideos(prev => prev.map(v =>
        v._id === item._id ? { ...v, likeCount: v.likeCount + (res.data.like ? 1 : -1) } : v
      ));
    } catch { /* noop */ }
  }

  async function saveVideo(item) {
    try {
      const res = await axios.post(`${API}/api/food/save`, { foodId: item._id }, { withCredentials: true });
      setVideos(prev => prev.map(v =>
        v._id === item._id ? { ...v, savesCount: v.savesCount + (res.data.save ? 1 : -1) } : v
      ));
    } catch { /* noop */ }
  }

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, overflow: 'hidden' }}>
        <ReelFeed
          items={videos}
          onLike={likeVideo}
          onSave={saveVideo}
          emptyMessage="No videos available."
        />
      </div>
      <BottomNav />
    </div>
  );
};

export default Home;
