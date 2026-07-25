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
    video: '/1.mp4',
    description: 'Authentic Hyderabadi Chicken Biryani with aromatic spices and tender chicken.',
    likeCount: 124,
    savesCount: 58,
    FoodPartner: {
      _id: 'mock-partner-1',
      businessName: 'Spice Kitchen',
    },
  },
  {
    _id: 'mock-2',
    name: 'Butter Paneer',
    video: '/2.mp4',
    description: 'Creamy and rich butter paneer made with fresh cottage cheese and tomato gravy.',
    likeCount: 89,
    savesCount: 34,
    FoodPartner: { _id: 'mock-partner-2', businessName: 'Veg Delights' },
  },
  {
    _id: 'mock-3',
    name: 'Chocolate Lava Cake',
    video: '/3.mp4',
    description: 'Decadent molten chocolate lava cake with a gooey center. Pure indulgence!',
    likeCount: 210,
    savesCount: 95,
    FoodPartner: { _id: 'mock-partner-3', businessName: 'Sweet Tooth Bakery' },
  },
  {
    _id: 'mock-5',
    name: 'Chocolate Lava Cake',
    video: '/5.mp4',
    description: 'Decadent molten chocolate lava cake with a gooey center. Pure indulgence!',
    likeCount: 10,
    savesCount: 95,
    FoodPartner: { _id: 'mock-partner-3', businessName: 'Sweet Tooth Bakery' },
  },
  {
    _id: 'mock-4',
    name: 'Chocolate Lava Cake',
    video: '/4.mp4',
    description: 'Decadent molten chocolate lava cake with a gooey center. Pure indulgence!',
    likeCount: 21,
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
      {/* Top App Bar - TikTok style */}
      <header className="home-topbar">
        <div className="home-logo">
          <span className="logo-icon">🍽️</span>
          <span className="logo-text">FoodReels</span>
        </div>
        <div className="home-top-actions">
          <button
            className="join-btn join-user"
            onClick={() => navigate('/user/register')}
          >
            Join as User
          </button>
          <button
            className="join-btn join-partner"
            onClick={() => navigate('/food-partner/register')}
          >
            Food Partner
          </button>
        </div>
      </header>

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

      {/* Floating Join Prompt (like TikTok sign-up banner) */}
      <div className="floating-join-banner">
        <div className="banner-text">
          <strong>New here?</strong>
          <span>Create an account to like, save & order</span>
        </div>
        <div className="banner-buttons">
          <button
            className="banner-btn user-btn"
            onClick={() => navigate('/user/register')}
          >
            User
          </button>
          <button
            className="banner-btn partner-btn"
            onClick={() => navigate('/food-partner/register')}
          >
            Partner
          </button>
        </div>
      </div>

      <BottomNav />

      {/* Inline styles so everything works without touching other files */}
      <style>{`
        .home-page {
          position: relative;
          min-height: 100vh;
          background: #000;
          color: #fff;
          overflow: hidden;
        }

        /* Top Bar */
        .home-topbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 16px;
          background: linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 70%, transparent 100%);
          backdrop-filter: blur(8px);
        }

        .home-logo {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .logo-icon {
          font-size: 22px;
        }

        .logo-text {
          font-size: 18px;
          font-weight: 700;
          letter-spacing: -0.3px;
          background: linear-gradient(90deg, #ff6b35, #f7c59f);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .home-top-actions {
          display: flex;
          gap: 8px;
        }

        .join-btn {
          border: none;
          border-radius: 20px;
          padding: 7px 14px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .join-user {
          background: #fff;
          color: #111;
        }

        .join-user:hover {
          background: #f0f0f0;
          transform: scale(1.03);
        }

        .join-partner {
          background: linear-gradient(135deg, #ff6b35, #ff8c42);
          color: #fff;
        }

        .join-partner:hover {
          filter: brightness(1.1);
          transform: scale(1.03);
        }

        /* Content area */
        .home-content {
          padding-top: 56px;
          padding-bottom: 90px;
          height: 100vh;
          box-sizing: border-box;
        }

        .home-status {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 70vh;
          gap: 16px;
          color: #aaa;
        }

        .loader {
          width: 40px;
          height: 40px;
          border: 3px solid rgba(255,255,255,0.15);
          border-top-color: #ff6b35;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* Floating banner (TikTok style) */
        .floating-join-banner {
          position: fixed;
          bottom: 72px;
          left: 12px;
          right: 12px;
          z-index: 90;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 12px 14px;
          background: rgba(20, 20, 20, 0.92);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 14px;
          backdrop-filter: blur(12px);
          box-shadow: 0 8px 32px rgba(0,0,0,0.5);
          animation: slideUp 0.4s ease;
        }

        @keyframes slideUp {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .banner-text {
          display: flex;
          flex-direction: column;
          gap: 2px;
          flex: 1;
        }

        .banner-text strong {
          font-size: 14px;
          color: #fff;
        }

        .banner-text span {
          font-size: 12px;
          color: #aaa;
        }

        .banner-buttons {
          display: flex;
          gap: 8px;
          flex-shrink: 0;
        }

        .banner-btn {
          border: none;
          border-radius: 20px;
          padding: 8px 16px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .user-btn {
          background: #fff;
          color: #111;
        }

        .user-btn:hover {
          background: #f0f0f0;
        }

        .partner-btn {
          background: linear-gradient(135deg, #ff6b35, #ff8c42);
          color: #fff;
        }

        .partner-btn:hover {
          filter: brightness(1.1);
        }

        /* Mobile polish */
        @media (max-width: 400px) {
          .join-btn {
            padding: 6px 10px;
            font-size: 12px;
          }
          .logo-text {
            font-size: 16px;
          }
          .banner-text span {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;