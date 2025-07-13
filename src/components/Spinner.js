import React from 'react';
import './News.css';

const Spinner = () => {
    return (
      <div className="news-loading">
        <div className="news-loading-spinner"></div>
        <p className="news-loading-text">Loading amazing content...</p>
      </div>
  );
};

export default Spinner;
