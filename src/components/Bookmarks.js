import React, { useState } from 'react';
import { useBookmarks } from '../context/BookmarkContext';
import NewsItem from './NewsItem';

const Bookmarks = () => {
    const { bookmarks, clearAllBookmarks } = useBookmarks();
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('newest');

    const filteredBookmarks = bookmarks
        .filter(bookmark => 
            bookmark.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            bookmark.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            bookmark.source?.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            switch (sortBy) {
                case 'newest':
                    return new Date(b.bookmarkedAt) - new Date(a.bookmarkedAt);
                case 'oldest':
                    return new Date(a.bookmarkedAt) - new Date(b.bookmarkedAt);
                case 'title':
                    return a.title?.localeCompare(b.title);
                case 'source':
                    return a.source?.localeCompare(b.source);
                default:
                    return 0;
            }
        });

    const handleClearAll = () => {
        if (window.confirm('Are you sure you want to clear all bookmarks?')) {
            clearAllBookmarks();
        }
    };

    if (bookmarks.length === 0) {
        return (
            <div className="container my-5">
                <div className="text-center">
                    <i className="fas fa-bookmark fa-3x text-muted mb-3"></i>
                    <h3>No bookmarks yet</h3>
                    <p className="text-muted">Start bookmarking articles to see them here!</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container my-3">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="mb-0">
                    <i className="fas fa-bookmark me-2"></i>
                    My Bookmarks ({bookmarks.length})
                </h1>
                <button 
                    className="btn btn-outline-danger btn-sm"
                    onClick={handleClearAll}
                >
                    <i className="fas fa-trash me-1"></i>
                    Clear All
                </button>
            </div>

            <div className="row mb-4">
                <div className="col-md-6">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search bookmarks..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="col-md-3">
                    <select
                        className="form-select"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                    >
                        <option value="newest">Newest First</option>
                        <option value="oldest">Oldest First</option>
                        <option value="title">By Title</option>
                        <option value="source">By Source</option>
                    </select>
                </div>
                <div className="col-md-3">
                    <div className="text-muted">
                        Showing {filteredBookmarks.length} of {bookmarks.length} bookmarks
                    </div>
                </div>
            </div>

            {filteredBookmarks.length === 0 ? (
                <div className="text-center py-5">
                    <i className="fas fa-search fa-2x text-muted mb-3"></i>
                    <h4>No bookmarks found</h4>
                    <p className="text-muted">Try adjusting your search terms</p>
                </div>
            ) : (
                <div className="row">
                    {filteredBookmarks.map((bookmark) => (
                        <div className="col-md-4" key={bookmark.url}>
                            <NewsItem {...bookmark} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Bookmarks; 