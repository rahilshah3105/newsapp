import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import NewsItem from './NewsItem';
import { fetchMultiSourceNews, getCountryAwareCategoryFeeds } from '../config/api';
import './News.css';

const SearchResults = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get('q');
    const country = queryParams.get('country') || 'in';
    
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const pageSize = 20;

    const searchNews = useCallback(async (query, pageNum = 1, append = false) => {
        if (!query || !query.trim()) return;
        
        setLoading(true);
        setError(null);
        
        try {
            const feeds = [
                ...getCountryAwareCategoryFeeds('general', country),
                ...getCountryAwareCategoryFeeds('business', country),
                ...getCountryAwareCategoryFeeds('technology', country),
                ...getCountryAwareCategoryFeeds('sports', country),
                ...getCountryAwareCategoryFeeds('entertainment', country)
            ];

            const searchResult = await fetchMultiSourceNews({
                feeds,
                page: pageNum,
                pageSize,
                query
            });

            if (append) {
                setArticles(prev => [...prev, ...searchResult.items]);
            } else {
                setArticles(searchResult.items);
            }
            
            setHasMore(searchResult.hasMore);
        } catch (err) {
            console.error('Search RSS Error:', err);
            setError(err.message || 'Failed to search news. Please try again later.');
            setArticles([]);
        } finally {
            setLoading(false);
        }
    }, [country, pageSize]);

    useEffect(() => {
        if (searchQuery && searchQuery.trim()) {
            setPage(1);
            searchNews(searchQuery, 1, false);
        }
    }, [searchQuery, country, searchNews]);

    const loadMore = useCallback(() => {
        if (!loading && hasMore && searchQuery) {
            const nextPage = page + 1;
            setPage(nextPage);
            searchNews(searchQuery, nextPage, true);
        }
    }, [loading, hasMore, searchQuery, page, searchNews]);

    const handleScroll = useCallback(() => {
        if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
            loadMore();
        }
    }, [loadMore]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    if (!searchQuery || !searchQuery.trim()) {
        return (
            <div className="news-container">
                <div className="container">
                    <div className="news-empty fade-in">
                        <i className="fas fa-search news-empty-icon"></i>
                        <h3 className="news-empty-title">Search for News</h3>
                        <p className="news-empty-message">Use the search bar above to find articles</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="news-container">
                <div className="container">
                    <div className="news-error fade-in">
                        <i className="fas fa-exclamation-triangle news-error-icon"></i>
                        <h3 className="news-error-title">Search Error</h3>
                        <p className="news-error-message">{error}</p>
                        <button 
                            className="btn-modern"
                            onClick={() => searchNews(searchQuery, 1, false)}
                        >
                            <i className="fas fa-redo me-2"></i>
                            Try Again
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="news-container">
            <div className="container">
                <div className="news-header fade-in">
                    <h1 className="news-title">
                        <i className="fas fa-search me-3"></i>
                        Search Results
                    </h1>
                    <p className="news-subtitle">
                        Found {articles.length} articles for "{searchQuery}"
                    </p>
                </div>

                {loading && page === 1 && (
                    <div className="news-loading">
                        <div className="news-loading-spinner"></div>
                        <p className="news-loading-text">Searching for articles...</p>
                    </div>
                )}

                {!loading && articles.length === 0 && (
                    <div className="news-empty">
                        <i className="fas fa-search news-empty-icon"></i>
                        <h3 className="news-empty-title">No Articles Found</h3>
                        <p className="news-empty-message">
                            No articles found for "{searchQuery}". Try different keywords or check your spelling.
                        </p>
                    </div>
                )}

                <div className="news-grid">
                    {articles.map((article, index) => (
                        <div
                            className="fade-in"
                            key={`${article.url}-${index}`}
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <NewsItem
                                {...article}
                                imageUrl={article.image}
                                source={article.source?.name}
                                category="search"
                            />
                        </div>
                    ))}
                </div>

                {loading && page > 1 && (
                    <div className="news-loading">
                        <div className="news-loading-spinner"></div>
                        <p className="news-loading-text">Loading more articles...</p>
                    </div>
                )}

                {!loading && !hasMore && articles.length > 0 && (
                    <div className="news-empty">
                        <i className="fas fa-check-circle news-empty-icon"></i>
                        <h3 className="news-empty-title">All Results Loaded</h3>
                        <p className="news-empty-message">You've reached the end of search results</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchResults; 