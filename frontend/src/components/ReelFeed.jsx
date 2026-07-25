import { useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Reels.css';

const ReelFeed = ({ items, onLike, onSave, emptyMessage }) => {
  const containerRef = useRef(null);
  const videoRefs = useRef({});

  const handleIntersection = useCallback((entries) => {
    entries.forEach((entry) => {
      const video = videoRefs.current[entry.target.dataset.index];
      if (video) {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      }
    });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: [0.6],
    });

    const videoElements = containerRef.current?.querySelectorAll('.reel-item');
    videoElements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [handleIntersection, items]);

  if (!items || items.length === 0) {
    return (
      <div className="reels-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', padding: '40px 20px' }}>
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.5" style={{ marginBottom: '16px' }}>
            <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
            <line x1="7" y1="2" x2="7" y2="22" />
            <line x1="17" y1="2" x2="17" y2="22" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <line x1="2" y1="7" x2="7" y2="7" />
            <line x1="2" y1="17" x2="7" y2="17" />
            <line x1="17" y1="7" x2="22" y2="7" />
            <line x1="17" y1="17" x2="22" y2="17" />
          </svg>
          <p style={{ color: '#aaa', fontSize: '16px' }}>{emptyMessage || 'No items available.'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="reels-container" ref={containerRef}>
      {items.map((item, index) => (
        <div className="reel-item" key={item._id} data-index={index}>
          <video
            ref={(el) => (videoRefs.current[index] = el)}
            className="reel-video"
            src={item.video}
            loop
            muted
            playsInline
            preload="metadata"
          />
          <ReelOverlay item={item} onLike={onLike} onSave={onSave} />
        </div>
      ))}
    </div>
  );
};

const ReelOverlay = ({ item, onLike, onSave }) => {
  const navigate = useNavigate();

  return (
    <div className="reel-overlay">
      <p className="reel-description">{item.description || item.name}</p>
      <div className="reel-actions">
        <button className="action-btn like-btn" onClick={() => onLike?.(item)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.8 1-1a5.5 5.5 0 0 0 0-7.8z" />
          </svg>
          <span>{item.likeCount || 0}</span>
        </button>
        <button className="action-btn save-btn" onClick={() => onSave?.(item)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
          </svg>
          <span>{item.savesCount || 0}</span>
        </button>
      </div>
      {item.FoodPartner?._id && (
        <button className="visit-store-btn" onClick={() => navigate(`/food-partner/${item.FoodPartner._id}`)}>
          Visit {item.FoodPartner.businessName || 'Store'}
        </button>
      )}
    </div>
  );
};

export default ReelFeed;
