import React, { useRef, useEffect, useState } from 'react';
import '../styles/Reels.css';

const Reels = () => {
  const containerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const reels = [
    {
      id: 1,
      videoUrl: "https://ik.imagekit.io/fhby9sue9/a31db4e1-6301-4667-908d-c9babf8b67af_b_AQ6IvZ9",
      description: "Amazing summer collection is here! Limited stock available 🔥",
      storeLink: "#"
    },
    {
      id: 2,
      videoUrl: "https://ik.imagekit.io/fhby9sue9/94eed3ee-afb0-4d7f-83c7-2c0420f2f894_pvcSfDLq0",
      description: "New arrivals just dropped! Don't miss out on these trendy pieces.",
      storeLink: "#"
    },
    {
      id: 3,
      videoUrl: "https://ik.imagekit.io/fhby9sue9/a31db4e1-6301-4667-908d-c9babf8b67af_b_AQ6IvZ9",
      description: "Best selling hoodie of the season. Soft, stylish & comfortable.",
      storeLink: "#"
    },
    // Add more reels as needed
  ];

  // Intersection Observer for auto play/pause
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target.querySelector('video');
          if (entry.isIntersecting) {
            video.play();
            setCurrentIndex(Number(entry.target.dataset.index));
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.8 }
    );

    const reelItems = document.querySelectorAll('.reel-item');
    reelItems.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  // Scroll to specific reel
  const scrollToReel = (index) => {
    const reelElement = document.querySelector(`.reel-item[data-index="${index}"]`);
    if (reelElement) {
      reelElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const goToNext = () => {
    const nextIndex = Math.min(currentIndex + 1, reels.length - 1);
    scrollToReel(nextIndex);
  };

  const goToPrev = () => {
    const prevIndex = Math.max(currentIndex - 1, 0);
    scrollToReel(prevIndex);
  };

  return (
    <div className="reels-container" ref={containerRef}>
      {reels.map((reel, index) => (
        <div
          key={reel.id}
          className="reel-item"
          data-index={index}
        >
          <video
            className="reel-video"
            src={reel.videoUrl}
            loop
            muted
            playsInline
          />

          <div className="reel-overlay">
            <p className="reel-description">{reel.description}</p>
            <button
              className="visit-store-btn"
              onClick={() => window.open(reel.storeLink, '_blank')}
            >
              Visit Store
            </button>
          </div>
        </div>
      ))}

      {/* Navigation Buttons - Visible on Laptop/Desktop */}
      <button className="nav-btn nav-up" onClick={goToPrev} title="Previous">
        ↑
      </button>
      <button className="nav-btn nav-down" onClick={goToNext} title="Next">
        ↓
      </button>
    </div>
  );
};

export default Reels;