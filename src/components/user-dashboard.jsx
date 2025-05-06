import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";

export function UserDashboard() {
  const [cookies] = useCookies(['username']);
  const [videos, setVideos] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(0);

  // Fetch categories
  useEffect(() => {
    axios.get('http://127.0.0.1:5050/get-categories')
      .then(res => {
        console.log("Fetched categories:", res.data);
        setCategories(res.data);
      })
      .catch(err => console.error("Category fetch error:", err));
  }, []);

  // Fetch videos
  useEffect(() => {
    axios.get('http://127.0.0.1:5050/get-videos')
      .then(res => {
        console.log("Fetched videos:", res.data);
        setVideos(res.data);
      })
      .catch(err => console.error("Video fetch error:", err));
  }, []);

  // Handle dropdown change
  const handleCategoryChange = (e) => {
    const selectedId = parseInt(e.target.value);
    setSelectedCategoryId(selectedId);
  };

  // Filter videos
  const filteredVideos = selectedCategoryId === 0
    ? videos
    : videos.filter(video => {
        console.log("Checking video categoryId:", video.categoryId, "vs", selectedCategoryId);
        return parseInt(video.categoryId) === selectedCategoryId;
      });

  return (
    <div className="text-dark bg-white p-4 m-3">
      <h2 className="d-flex justify-content-between">
        <div>
          <span className="me-1">{cookies['username']}</span>
          <span>Dashboard</span>
        </div>
        <div><Link to="/user-login" className="btn btn-link">SignOut</Link></div>
      </h2>

      <section className="d-flex">
        <div className="row w-100">
          <div className="col-4">
            <label className="form-label fw-bold">Filter by Category</label>
            <select className="form-select" onChange={handleCategoryChange}>
              <option value="0">All</option>
              {categories.map(cat => (
                <option key={cat.categoryId} value={cat.categoryId}>
                  {cat.categoryName}
                </option>
              ))}
            </select>
          </div>

          <div className="col-8 d-flex flex-wrap">
            {filteredVideos.length > 0 ? (
              filteredVideos.map((video, index) => (
                <div key={index} className="card m-2" style={{ width: 334, height: 400 }}>
                  <div className="card-title text-center">
                    <h5>{video.Title}</h5>
                  </div>
                  <div className="card-body">
                    <iframe src={video.url} height="250" title={`video-${index}`} />
                  </div>
                  <div className="card-footer">
                    <span className="bi bi-eye-fill">{video.views}</span>
                    <span className="bi bi-hand-thumbs-up mx-3">{video.Likes}</span>
                    <span className="bi bi-hand-thumbs-down">{video.Dislikes}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-3">No videos found for this category.</div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
