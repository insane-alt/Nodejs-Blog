import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BlogCard from '../components/BlogCard';
import { getUserBlogs, deleteBlog } from '../services/api';

function Dashboard({ user }) {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserBlogs = async () => {
      try {
        const data = await getUserBlogs();
        setBlogs(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user blogs:", error);
        setLoading(false);
      }
    };

    fetchUserBlogs();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await deleteBlog(id);
        setBlogs(blogs.filter(blog => blog._id !== id));
      } catch (error) {
        console.error("Error deleting blog:", error);
      }
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>My Blogs</h2>
        <Link to="/create-blog" className="btn btn-primary">Create New Blog</Link>
      </div>

      {loading ? (
        <p>Loading your blogs...</p>
      ) : blogs.length > 0 ? (
        <div className="blog-grid">
          {blogs.map(blog => (
            <BlogCard 
              key={blog._id} 
              blog={blog} 
              showActions={true} 
              onDelete={() => handleDelete(blog._id)} 
            />
          ))}
        </div>
      ) : (
        <div className="no-blogs">
          <p>You haven't created any blogs yet.</p>
          <Link to="/create-blog" className="btn btn-primary">Create Your First Blog</Link>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
