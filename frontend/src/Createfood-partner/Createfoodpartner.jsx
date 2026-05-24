
import "../style/video.css";

const videos = [
  {
    id: 1,
    video:
      "https://www.w3schools.com/html/mov_bbb.mp4",
    description:
      "Premium fashion collection for modern streetwear lovers. Explore trending outfits and accessories now.",
  },
  {
    id: 2,
    video:
      "https://www.w3schools.com/html/movie.mp4",
    description:
      "Discover amazing gadgets and tech products with fast delivery and exclusive offers available today.",
  },
  {
    id: 3,
    video:
      "https://www.w3schools.com/html/mov_bbb.mp4",
    description:
      "Shop handmade products and unique lifestyle items carefully crafted for your everyday needs.",
  },
];

export default function HomePage() {
  return (
    <div className="reels-container">
      {videos.map((item) => (
        <div className="video-card" key={item.id}>
          <video
            className="reel-video"
            src={item.video}
            autoPlay
            muted
            loop
            playsInline
          />

          <div className="video-overlay">
            <p className="video-description">{item.description}</p>

            <button className="visit-btn">Visit Store</button>
          </div>
        </div>
      ))}
    </div>
  );
}