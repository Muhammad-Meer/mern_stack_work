import "../style/video.css";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const VIDEOS = [
  {
    id: 1,
    src: "https://ik.imagekit.io/fhby9sue9/c75f2ba4-edb1-47ba-a834-a4f80a3065b7_rfMDtWhuL",
    description: "Summer collection for your modern home.",
  },
  {
    id: 2,
    src: "https://ik.imagekit.io/fhby9sue9/71a88405-3aac-46a9-bf08-3da2e85873d0_ykLZluBli",
    description: "Minimal furniture and smart storage ideas.",
  },
  {
    id: 3,
    src: "https://ik.imagekit.io/fhby9sue9/5481c1f7-1765-4937-9095-3add307be99b_DvJqWxEl2",
    description: "Beauty products with premium quality finish.",
  },
  {
    id: 4,
    src: "https://ik.imagekit.io/fhby9sue9/d5af89cf-b17e-4991-a230-7e865171a64a_oI4Ex3NUl",
    description: "Hair styling tools with modern technology.",
  },
];



export default function Createfoodpartner() {

  const [videos , setvideos] =  useState(VIDEOS)
  useEffect(() => {
    axios.get('http://localhost:3200/api/Food')

  })
  return (
    <div className="scroll-container">
      {VIDEOS.map((video) => (
        <div className="video-slide" key={video.id}>
          <video
            className="video-el"
            src={video.src}
            autoPlay
            muted
            loop
            playsInline
          />

          <div className="overlay">
            <p>{video.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}