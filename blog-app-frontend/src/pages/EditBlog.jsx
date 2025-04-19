import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EditBlogForm from '../components/EditBlogForm';
import { getBlogById, updateBlog } from '../services/api';

function EditBlog({ user }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const data = await getBlogById(id);
        setBlog(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blog:", error);
        setError('Failed to load blog. It may have been deleted or you do not have permission to edit it.');
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const handleUpdateBlog = async (blogData) => {
    try {
      await updateBlog(id, blogData);
      navigate('/dashboard');
    } catch (error) {
      console.error("Error updating blog:", error);
      return error.response?.data?.message || 'Failed to update blog. Please try again.';
    }
  };

  if (loading) {
    return <p>Loading blog...</p>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="edit-blog-page">
      <h2>Edit Blog</h2>
      {blog && <EditBlogForm blog={blog} onSubmit={handleUpdateBlog} />}
    </div>
  );
}

export default EditBlog;
