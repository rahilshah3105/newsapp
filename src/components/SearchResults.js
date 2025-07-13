import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import NewsItem from './NewsItem';
import { buildRssUrl, fetchRssDirectly, RSS_CONFIG } from '../config/api';
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

    const searchNews = useCallback(async (query, pageNum = 1, append = false) => {
        if (!query || !query.trim()) return;
        
        setLoading(true);
        setError(null);
        
        try {
            let parsedData;

            // Try RSS2JSON first with API key
            try {
                const url = buildRssUrl(RSS_CONFIG.BBC_NEWS, {
                    count: 100 // Get more articles to search through
                });
                const response = await fetch(url);
                parsedData = await response.json();

                if (parsedData.status === 'error') {
                    throw new Error(parsedData.message || 'RSS2JSON failed');
                }
            } catch (rss2jsonError) {
                console.log('RSS2JSON failed, trying direct RSS fetch...');
                // Fallback to direct RSS parsing (no API key needed)
                parsedData = await fetchRssDirectly(RSS_CONFIG.BBC_NEWS);
            }

            // Filter articles based on search query
            const queryLower = query.toLowerCase().trim();
            const filteredArticles = parsedData.items?.filter(item => {
                const title = item.title?.toLowerCase() || '';
                const description = item.description?.toLowerCase() || '';
                return title.includes(queryLower) || description.includes(queryLower);
            }).map(item => ({
                title: item.title,
                description: item.description,
                url: item.url || item.link,
                image: item.image || item.thumbnail || item.enclosure?.link,
                publishedAt: item.publishedAt || item.pubDate,
                source: { name: 'BBC News' },
                author: 'BBC News'
            })) || [];

            if (append) {
                setArticles(prev => [...prev, ...filteredArticles]);
            } else {
                setArticles(filteredArticles);
            }
            
            setHasMore(filteredArticles.length === 100);
        } catch (err) {
            console.error('Search RSS Error:', err);
            setError(err.message || 'Failed to search news. Please try again later.');
            setArticles([]);
        } finally {
            setLoading(false);
        }
    }, []);

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