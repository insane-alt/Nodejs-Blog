
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function CreateBlogForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const result = await onSubmit(formData);
      if (result) {
        setError(result);
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div className="blog-form">
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows="10"
            required
          />
        </div>
        <div className="form-actions">
          <button type="submit" className="btn btn-primary">Create Blog</button>
          <Link to="/dashboard" className="btn btn-secondary">Cancel</Link>
        </div>
      </form>
    </div>
  );
}

export default CreateBlogForm;
