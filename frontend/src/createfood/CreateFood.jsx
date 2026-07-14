import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/create-food.css';
import API from '../config/api';

const CreateFood = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [video, setVideo] = useState(null);
  const [preview, setPreview] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleVideoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('video/')) {
        alert('Please select a video file');
        return;
      }
      setVideo(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('video/')) {
      setVideo(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !video) {
      alert('Name and video are required');
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('video', video);

      await axios.post(`${API}/api/food`, formData, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      navigate('/');
    } catch (error) {
      alert(error.response?.data?.error || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="create-food-page">
      <div className="create-food-container">
        <h1>Upload New Meal</h1>
        <p>Share your delicious creation with the world</p>

        <form onSubmit={handleSubmit}>
          <div
            className="upload-zone"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onClick={() => document.getElementById('video-input')?.click()}
          >
            {preview ? (
              <video src={preview} className="video-preview" controls />
            ) : (
              <div className="upload-placeholder">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#e23744" strokeWidth="2">
                  <polyline points="16 16 12 12 8 16" />
                  <line x1="12" y1="12" x2="12" y2="21" />
                  <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
                  <polyline points="16 16 12 12 8 16" />
                </svg>
                <p>Drag & drop or click to upload video</p>
              </div>
            )}
            <input
              id="video-input"
              type="file"
              accept="video/*"
              onChange={handleVideoChange}
              hidden
            />
          </div>

          <div className="input-group">
            <label>Meal Name</label>
            <input
              type="text"
              placeholder="e.g. Chicken Biryani"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Description</label>
            <textarea
              placeholder="Describe this dish..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          <button type="submit" className="btn submit-btn" disabled={uploading}>
            {uploading ? 'Uploading...' : 'Upload Meal'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateFood;
