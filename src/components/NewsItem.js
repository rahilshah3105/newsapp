import React, { useState } from 'react'
import { useBookmarks } from '../context/BookmarkContext';
import { getFallbackImage, validateImageUrl, getOptimizedImageUrl } from '../utils/imageUtils';
import './News.css';

const NewsItem = ({ title, description, imageUrl, newsUrl, author, date, source, category = 'general', ...article }) => {
    const { addBookmark, removeBookmark, isBookmarked } = useBookmarks();
    const bookmarked = isBookmarked(newsUrl);
    const [imageError, setImageError] = useState(false);

    const calculateReadingTime = (text) => {
        const wordsPerMinute = 200;
        const words = text.split(' ').length;
        const minutes = Math.ceil(words / wordsPerMinute);
        return minutes;
    };

    const readingTime = calculateReadingTime(description || title);

    const handleBookmarkToggle = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (bookmarked) {
            removeBookmark(newsUrl);
        } else {
            addBookmark({ title, description, imageUrl, newsUrl, author, date, source, category, ...article });
        }
    };

    const handleShare = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (navigator.share) {
            navigator.share({
                title: title,
                text: description,
                url: newsUrl,
            });
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(`${title}\n\n${description}\n\nRead more: ${newsUrl}`);
            alert('Link copied to clipboard!');
        }
    };

    const handleImageError = () => {
        setImageError(true);
    };

    // Better image URL handling
    const getImageUrl = () => {
        if (imageError || !imageUrl || !validateImageUrl(imageUrl)) {
            return getFallbackImage(category);
        }
        return getOptimizedImageUrl(imageUrl, 400);
    };

    return (
        <div className="news-card">
            <div className="news-card-image-container">
                <img 
                    src={getImageUrl()}
                    className="news-card-image" 
                    alt={title}
                    onError={handleImageError}
                    loading="lazy"
                />
                <span className="news-card-badge">
                    {typeof source === 'string' ? source : source?.name || 'BBC News'}
                </span>
                <button 
                    className={`news-card-bookmark ${bookmarked ? 'bookmarked' : ''}`}
                    onClick={handleBookmarkToggle}
                    title={bookmarked ? 'Remove from bookmarks' : 'Add to bookmarks'}
                >
                    <i className="fas fa-bookmark"></i>
                </button>
            </div>
            <div className="news-card-body">
                <h5 className="news-card-title">{title}</h5>
                <p className="news-card-description">{description}</p>
                <div className="news-card-meta">
                    <div className="news-card-meta-item">
                        <i className="fas fa-user news-card-meta-icon"></i>
                        <span>{!author ? "Unknown" : author}</span>
                    </div>
                    <div className="news-card-meta-item">
                        <i className="fas fa-clock news-card-meta-icon"></i>
                        <span>{new Date(date).toLocaleDateString()}</span>
                    </div>
                    <div className="news-card-meta-item">
                        <i className="fas fa-book-open news-card-meta-icon"></i>
                        <span>{readingTime} min read</span>
                    </div>
                </div>
                <div className="news-card-actions">
                    <a 
                        rel="noreferrer" 
                        href={newsUrl} 
                        target="_blank" 
                        className="news-card-btn"
                    >
                        <i className="fas fa-external-link-alt"></i>
                        Read More
                    </a>
                    <button 
                        className="news-card-btn news-card-btn-secondary"
                        onClick={handleShare}
                        title="Share article"
                    >
                        <i className="fas fa-share-alt"></i>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default NewsItem
