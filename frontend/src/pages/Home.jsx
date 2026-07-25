import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReelFeed from '../components/ReelFeed';
import BottomNav from '../components/BottomNav';
import API from '../config/api';

const MOCK_VIDEOS = [
  {
    _id: 'mock-1',
    name: 'Chicken Biryani',
    video: 'https://www.w3schools.com/html/mov_bbb.mp4',
    description: 'Authentic Hyderabadi Chicken Biryani with aromatic spices and tender chicken.',
    likeCount: 124,
    savesCount: 58,
    FoodPartner: { _id: 'mock-partner-1', businessName: 'Spice Kitchen' },
  },
  {
    _id: 'mock-2',
    name: 'Butter Paneer',
    video: 'https://www.w3schools.com/html/movie.mp4',
    description: 'Creamy and rich butter paneer made with fresh cottage cheese and tomato gravy.',
    likeCount: 89,
    savesCount: 34,
    FoodPartner: { _id: 'mock-partner-2', businessName: 'Veg Delights' },
  },
  {
    _id: 'mock-3',
    name: 'Chocolate Lava Cake',
    video: 'https://www.w3schools.com/html/mov_bbb.mp4',
    description: 'Decadent molten chocolate lava cake with a gooey center. Pure indulgence!',
    likeCount: 210,
    savesCount: 95,
    FoodPartner: { _id: 'mock-partner-3', businessName: 'Sweet Tooth Bakery' },
  },
];

const Home = () => {
  const navigate = useNavigate();
  const [videos, setVideos] = useState(MOCK_VIDEOS);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios.get(`${API}/api/food`, { withCredentials: true })
      .then(res => {
        const items = res.data.fooditems || [];
        setVideos(items.length > 0 ? items : MOCK_VIDEOS);
      })
      .catch(() => {
        setVideos(MOCK_VIDEOS);
      })
      .finally(() => setLoading(false));
  }, []);

  async function likeVideo(item) {
    try {
      const res = await axios.post(`${API}/api/food/like`, { foodId: item._id }, { withCredentials: true });
      setVideos(prev => prev.map(v =>
        v._id === item._id ? { ...v, likeCount: v.likeCount + (res.data.like ? 1 : -1) } : v
      ));
    } catch (error) {
      if (error.response?.status === 401) {
        navigate('/user/login');
      }
    }
  }

  async function saveVideo(item) {
    try {
      const res = await axios.post(`${API}/api/food/save`, { foodId: item._id }, { withCredentials: true });
      setVideos(prev => prev.map(v =>
        v._id === item._id ? { ...v, savesCount: v.savesCount + (res.data.save ? 1 : -1) } : v
      ));
    } catch (error) {
      if (error.response?.status === 401) {
        navigate('/user/login');
      }
    }
  }

  return (
    <div className="home-page">
      <div className="home-content">
        {loading ? (
          <div className="home-status">
            <div className="loader"></div>
            <p>Loading delicious food...</p>
          </div>
        ) : (
          <ReelFeed
            items={videos}
            onLike={likeVideo}
            onSave={saveVideo}
            emptyMessage="No videos available yet. Check back soon!"
          />
        )}
      </div>
      <BottomNav />
    </div>
  );
};

export default Home;
