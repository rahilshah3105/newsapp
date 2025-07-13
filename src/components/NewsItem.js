import React from 'react'
import { useBookmarks } from '../context/BookmarkContext';

const NewsItem = ({ title, description, imageUrl, newsUrl, author, date, source, ...article }) => {
    const { addBookmark, removeBookmark, isBookmarked } = useBookmarks();
    const bookmarked = isBookmarked(newsUrl);

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
            addBookmark({ title, description, imageUrl, newsUrl, author, date, source, ...article });
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

    return (
        <div className='my-3'>
            <div className="card h-100 news-card">
                <div className="position-relative">
                    <span className='position-absolute translate-middle badge rounded-pill bg-danger' style={{top: '10px', left: '92%', zIndex: '1' }}>
                        {source}
                    </span>
                    <img 
                        src={!imageUrl ? "https://www.devdiscourse.com/remote.axd?https://devdiscourse.blob.core.windows.net/devnews/24_12_2022_20_32_57_3774539.jpg?width=920&format=jpeg" : imageUrl} 
                        className="card-img-top" 
                        alt={title}
                        style={{ height: '200px', objectFit: 'cover' }}
                    />
                    <div className="position-absolute top-0 end-0 p-2">
                        <button 
                            className={`btn btn-sm ${bookmarked ? 'btn-warning' : 'btn-outline-warning'}`}
                            onClick={handleBookmarkToggle}
                            title={bookmarked ? 'Remove from bookmarks' : 'Add to bookmarks'}
                        >
                            <i className={`fas fa-bookmark ${bookmarked ? 'text-white' : ''}`}></i>
                        </button>
                    </div>
                </div>
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text flex-grow-1">{description}</p>
                    <div className="card-text mb-2">
                        <small className="text-muted">
                            <i className="fas fa-user me-1"></i>
                            By {!author ? "Unknown" : author} 
                            <span className="mx-2">•</span>
                            <i className="fas fa-clock me-1"></i>
                            {new Date(date).toLocaleDateString()}
                            <span className="mx-2">•</span>
                            <i className="fas fa-book-open me-1"></i>
                            {readingTime} min read
                        </small>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                        <a 
                            rel="noreferrer" 
                            href={newsUrl} 
                            target="_blank" 
                            className="btn btn-primary btn-sm"
                        >
                            <i className="fas fa-external-link-alt me-1"></i>
                            Read More
                        </a>
                        <button 
                            className="btn btn-outline-secondary btn-sm"
                            onClick={handleShare}
                            title="Share article"
                        >
                            <i className="fas fa-share-alt"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewsItem
