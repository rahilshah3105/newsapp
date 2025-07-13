import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import { buildApiUrl } from '../config/api';

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

    async update() {
        try {
            const url = buildApiUrl('https://newsapi.org/v2/top-headlines', {
                country: this.props.country,
                category: this.props.category,
                page: this.state.page,
                pageSize: this.props.pageSize
            });
            
            this.setState({ loading: true, error: null });
            let data = await fetch(url);
            let parsedData = await data.json();
            
            if (parsedData.status === 'error') {
                throw new Error(parsedData.message || 'Failed to fetch news');
            }
            
            this.setState({
                articles: this.state.page === 1 ? parsedData.articles : [...this.state.articles, ...parsedData.articles],
                totalResults: parsedData.totalResults,
                loading: false,
                hasMore: parsedData.articles.length === this.props.pageSize
            });
        } catch (error) {
            console.error('News API Error:', error);
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
            this.setState({ page: 1, articles: [], error: null });
            this.update();
        }
    }

    handlePrevious = async () => {
        this.setState({ page: this.state.page - 1 });
        this.update();
    }

    handleNext = async () => {
        this.setState({ page: this.state.page + 1 });
        this.update();
    }

    handleLoadMore = () => {
        if (!this.state.loading && this.state.hasMore) {
            this.setState({ page: this.state.page + 1 });
            this.update();
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
                <div className="container my-5">
                    <div className="text-center">
                        <i className="fas fa-exclamation-triangle fa-3x text-warning mb-3"></i>
                        <h3>Error Loading News</h3>
                        <p className="text-muted">{error}</p>
                        <button 
                            className="btn btn-primary"
                            onClick={() => this.update()}
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            );
        }

        return (
            <div className="container my-3">
                <h1 className='text-center' style={{ margin: '30px 0px' }}>
                    <i className="fas fa-newspaper me-2"></i>
                    Top {this.captitalFirstLetter(this.props.category)} Headlines
                </h1>
                
                {loading && page === 1 && <Spinner />}
                
                <div className="row">
                    {!loading && articles.map((element, index) => {
                        return <div className="col-md-4" key={`${element.url}-${index}`}>
                            <NewsItem 
                                title={element.title ? element.title.slice(0, 40) : ""} 
                                description={element.description ? element.description.slice(0, 80) : ""} 
                                imageUrl={element.urlToImage} 
                                newsUrl={element.url} 
                                author={element.author} 
                                date={element.publishedAt} 
                                source={element.source.name}
                                {...element}
                            />
                        </div>
                    })}
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
                
                {articles.length > 0 && (
                    <div className="container d-flex justify-content-between mt-4">
                        <button 
                            disabled={page <= 1} 
                            type="button" 
                            className="btn btn-dark" 
                            onClick={this.handlePrevious}
                        >
                            <i className="fas fa-chevron-left me-1"></i>
                            Previous
                        </button>
                        <span className="text-muted">
                            Page {page} of {Math.ceil(totalResults / this.props.pageSize)}
                        </span>
                        <button 
                            disabled={!hasMore} 
                            type="button" 
                            className="btn btn-dark" 
                            onClick={this.handleNext}
                        >
                            Next
                            <i className="fas fa-chevron-right ms-1"></i>
                        </button>
                    </div>
                )}
            </div>
        )
    }
}

export default News
