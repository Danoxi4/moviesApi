import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/reviews.css'; // Import the CSS file

const CommentsSection = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        console.log("Fetching comments")
        const response = await axios.get('http://localhost:1989/api/admin/comments');

        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, []);

  return (
    <div className="comments-container">
      <h2 className="title">User Comments</h2>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div className="comment-card" key={comment._id}>
            <h3 className="comment-name">{comment.name}</h3>
            <p className="comment-text">{comment.text}</p>
          </div>
        ))
      ) : (
        <p>No comments available.</p>
      )}
    </div>
  );
};

export default CommentsSection;
