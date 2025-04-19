import React from 'react';
import { Link } from 'react-router-dom';

function BlogCard({ blog, showActions, onDelete }) {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const truncateContent = (content, maxLength = 150) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  return (
    <div className="blog-card">
      <h3 className="blog-title">{blog.title}</h3>
      <div className="blog-meta">
        <span>By {blog.author.name}</span>
        <span>•</span>
        <span>{formatDate(blog.createdAt)}</span>
      </div>
      <p className="blog-content">{truncateContent(blog.content)}</p>
      
      {showActions && (
        <div className="blog-actions">
          <Link to={`/edit-blog/${blog._id}`} className="btn btn-secondary">Edit</Link>
          <button onClick={onDelete} className="btn btn-danger">Delete</button>
        </div>
      )}
      
      {!showActions && (
        <div className="blog-footer">
          <span className="blog-author">By {blog.author.name}</span>
          <span className="blog-date">{formatDate(blog.createdAt)}</span>
        </div>
      )}
    </div>
  );
}

export default BlogCard;
