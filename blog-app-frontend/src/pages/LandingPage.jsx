import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BlogCard from '../components/BlogCard';
import { getAllBlogs } from '../services/api';

function LandingPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await getAllBlogs();
        setBlogs(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="landing-page">
      <div className="hero-section">
        <h1>Welcome to BlogApp</h1>
        <p>Share your thoughts with the world</p>
        <div className="hero-buttons">
          <Link to="/register" className="btn btn-primary">Get Started</Link>
          <Link to="/login" className="btn btn-secondary">Login</Link>
        </div>
      </div>

      <div className="recent-blogs">
        <h2>Recent Blogs</h2>
        {loading ? (
          <p>Loading blogs...</p>
        ) : blogs.length > 0 ? (
          <div className="blog-grid">
            {blogs.map(blog => (
              <BlogCard key={blog._id} blog={blog} showActions={false} />
            ))}
          </div>
        ) : (
          <p>No blogs available yet.</p>
        )}
      </div>
    </div>
  );
}

export default LandingPage;
