import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import { buildRssUrl, fetchRssDirectly, RSS_CONFIG } from '../config/api';
import './News.css';

export class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 12,
        category: 'general'
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }

    captitalFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0,
            error: null,
            hasMore: true
        }
        document.title = `${this.captitalFirstLetter(this.props.category)} - NewsPulse`;
    }

    getRssFeedForCategory(category) {
        const categoryMap = {
            'general': RSS_CONFIG.BBC_NEWS,
            'business': RSS_CONFIG.BBC_BUSINESS,
            'technology': RSS_CONFIG.BBC_TECH,
            'sports': RSS_CONFIG.BBC_SPORT,
            'entertainment': RSS_CONFIG.BBC_ENTERTAINMENT,
            'health': RSS_CONFIG.BBC_NEWS,
            'science': RSS_CONFIG.BBC_TECH
        };
        return categoryMap[category] || RSS_CONFIG.BBC_NEWS;
    }

    async update() {
        try {
            const rssFeed = this.getRssFeedForCategory(this.props.category);
            
            this.setState({ loading: true, error: null });

            let parsedData;

            // Try RSS2JSON first with API key
            try {
                const url = buildRssUrl(rssFeed, {
                    count: this.props.pageSize
                });
                let data = await fetch(url);
                parsedData = await data.json();

                if (parsedData.status === 'error') {
                    throw new Error(parsedData.message || 'RSS2JSON failed');
                }
            } catch (rss2jsonError) {
                console.log('RSS2JSON failed, trying direct RSS fetch...');
                // Fallback to direct RSS parsing (no API key needed)
                parsedData = await fetchRssDirectly(rssFeed);
            }

            // Transform RSS data to match our expected format
            const transformedArticles = parsedData.items?.map(item => ({
                title: item.title,
                description: item.description,
                url: item.url || item.link,
                image: item.image || item.thumbnail || item.enclosure?.link,
                publishedAt: item.publishedAt || item.pubDate,
                source: { name: 'BBC News' },
                author: 'BBC News'
            })) || [];

            this.setState({
                articles: this.state.page === 1 ? transformedArticles : [...this.state.articles, ...transformedArticles],
                totalResults: parsedData.items?.length || 0,
                loading: false,
                hasMore: transformedArticles.length === this.props.pageSize
            });
        } catch (error) {
            console.error('News fetch error:', error);
            this.setState({
                error: error.message || 'Failed to fetch news. Please try again later.',
                loading: false
            });
        }
    }

    componentDidMount() {
        this.update();
        window.addEventListener('scroll', this.handleScroll);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.category !== this.props.category || prevProps.country !== this.props.country) {
            this.setState({ page: 1, articles: [], error: null }, this.update);
        }
    }

    handlePrevious = async () => {
        this.setState({ page: this.state.page - 1 }, this.update);
    }

    handleNext = async () => {
        this.setState({ page: this.state.page + 1 }, this.update);
    }

    handleLoadMore = () => {
        if (!this.state.loading && this.state.hasMore) {
            this.setState({ page: this.state.page + 1 }, this.update);
        }
    }

    handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
            this.handleLoadMore();
        }
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    render() {
        const { error, loading, articles, page, totalResults, hasMore } = this.state;
        
        if (error) {
            return (
                <div className="container">
                    <div className="news-error fade-in">
                        <i className="fas fa-exclamation-triangle news-error-icon"></i>
                        <h3 className="news-error-title">Error Loading News</h3>
                        <p className="news-error-message">{error}</p>
                        <button 
                            className="btn-modern"
                            onClick={() => this.update()}
                        >
                            <i className="fas fa-redo me-2"></i>
                            Try Again
                        </button>
                    </div>
                </div>
            );
        }

        return (
            <div className="news-container">
                <div className="container">
                    <div className="news-header fade-in">
                        <h1 className="news-title">
                            <i className="fas fa-newspaper me-3"></i>
                            Top {this.captitalFirstLetter(this.props.category)} Headlines
                        </h1>
                        <p className="news-subtitle">
                            Stay informed with the latest breaking news and updates
                        </p>
                    </div>

                    {loading && page === 1 && (
                        <div className="news-loading">
                            <div className="news-loading-spinner"></div>
                            <p className="news-loading-text">Loading latest news...</p>
                        </div>
                    )}

                    <div className="news-grid">
                        {!loading && articles.map((element, index) => {
                            return (
                                <div
                                    className="fade-in"
                                    key={`${element.url}-${index}`}
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    <NewsItem
                                        title={element.title ? element.title.slice(0, 40) : ""}
                                        description={element.description ? element.description.slice(0, 80) : ""} 
                                        imageUrl={element.image}
                                        newsUrl={element.url}
                                        author={element.author}
                                        date={element.publishedAt} 
                                        source={element.source?.name}
                                        category={this.props.category}
                                        {...element}
                                    />
                                </div>
                            );
                        })}
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
                            <h3 className="news-empty-title">All Caught Up!</h3>
                            <p className="news-empty-message">You've reached the end of the latest news</p>
                        </div>
                    )}

                    {articles.length > 0 && (
                        <div className="news-pagination">
                            <button
                                disabled={page <= 1}
                                type="button" 
                                className="news-pagination-btn"
                                onClick={this.handlePrevious}
                            >
                                <i className="fas fa-chevron-left me-2"></i>
                                Previous
                            </button>
                            <span className="news-pagination-info">
                                Page {page} of {Math.ceil(totalResults / this.props.pageSize)}
                            </span>
                            <button
                                disabled={!hasMore}
                                type="button" 
                                className="news-pagination-btn"
                                onClick={this.handleNext}
                            >
                                Next
                                <i className="fas fa-chevron-right ms-2"></i>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

export default News
