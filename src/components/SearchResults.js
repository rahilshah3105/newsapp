import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import { buildApiUrl } from '../config/api';

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

    const searchNews = async (query, pageNum = 1, append = false) => {
        if (!query) return;
        
        setLoading(true);
        setError(null);
        
        try {
            const url = buildApiUrl('https://newsapi.org/v2/everything', {
                q: query,
                language: 'en',
                sortBy: 'publishedAt',
                page: pageNum,
                pageSize: 12
            });
            
            const response = await fetch(url);
            const data = await response.json();
            
            if (data.status === 'error') {
                throw new Error(data.message || 'Failed to fetch news');
            }
            
            if (append) {
                setArticles(prev => [...prev, ...data.articles]);
            } else {
                setArticles(data.articles);
            }
            
            setHasMore(data.articles.length === 12);
        } catch (err) {
            console.error('Search API Error:', err);
            setError(err.message || 'Failed to search news. Please try again later.');
            setArticles([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (searchQuery) {
            setPage(1);
            searchNews(searchQuery, 1, false);
        }
    }, [searchQuery, country]);

    const loadMore = () => {
        if (!loading && hasMore) {
            const nextPage = page + 1;
            setPage(nextPage);
            searchNews(searchQuery, nextPage, true);
        }
    };

    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
            loadMore();
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [page, loading, hasMore]);

    if (!searchQuery) {
        return (
            <div className="container my-5">
                <div className="text-center">
                    <i className="fas fa-search fa-3x text-muted mb-3"></i>
                    <h3>Search for news</h3>
                    <p className="text-muted">Use the search bar above to find articles</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container my-5">
                <div className="text-center">
                    <i className="fas fa-exclamation-triangle fa-3x text-warning mb-3"></i>
                    <h3>Error</h3>
                    <p className="text-muted">{error}</p>
                    <button 
                        className="btn btn-primary"
                        onClick={() => searchNews(searchQuery, 1, false)}
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="container my-3">
            <div className="mb-4">
                <h1 className="mb-2">
                    <i className="fas fa-search me-2"></i>
                    Search Results
                </h1>
                <p className="text-muted">
                    Found {articles.length} articles for "{searchQuery}"
                </p>
            </div>

            {loading && page === 1 && <Spinner />}

            {!loading && articles.length === 0 && (
                <div className="text-center py-5">
                    <i className="fas fa-search fa-2x text-muted mb-3"></i>
                    <h4>No articles found</h4>
                    <p className="text-muted">Try different keywords or check your spelling</p>
                </div>
            )}

            <div className="row">
                {articles.map((article, index) => (
                    <div className="col-md-4" key={`${article.url}-${index}`}>
                        <NewsItem {...article} />
                    </div>
                ))}
            </div>

            {loading && page > 1 && (
                <div className="text-center my-4">
                    <Spinner />
                    <p className="text-muted mt-2">Loading more articles...</p>
                </div>
            )}

            {!loading && !hasMore && articles.length > 0 && (
                <div className="text-center my-4">
                    <p className="text-muted">No more articles to load</p>
                </div>
            )}
        </div>
    );
};

export default SearchResults; 