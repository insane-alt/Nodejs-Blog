import React from 'react';
import { useNavigate } from 'react-router-dom';
import CreateBlogForm from '../components/CreateBlogForm';
import { createBlog } from '../services/api';

function CreateBlog({ user }) {
  const navigate = useNavigate();

  const handleCreateBlog = async (blogData) => {
    try {
      await createBlog(blogData);
      navigate('/dashboard');
    } catch (error) {
      console.error("Error creating blog:", error);
      return error.response?.data?.message || 'Failed to create blog. Please try again.';
    }
  };

  return (
    <div className="create-blog-page">
      <h2>Create New Blog</h2>
      <CreateBlogForm onSubmit={handleCreateBlog} />
    </div>
  );
}

export default CreateBlog;
