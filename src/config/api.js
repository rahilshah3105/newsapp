// NewsAPI Configuration
const API_KEY = process.env.REACT_APP_NEWS_API_KEY || '84ebf4a8b7ab41a699b1329c862aa1b9';
const BASE_URL = 'https://newsapi.org/v2';

export const API_CONFIG = {
    API_KEY,
    BASE_URL,
    TOP_HEADLINES: `${BASE_URL}/top-headlines`,
    EVERYTHING: `${BASE_URL}/everything`
};

// Fallback API key (you can replace this with your own)
export const FALLBACK_API_KEY = '84ebf4a8b7ab41a699b1329c862aa1b9';

// Helper function to build API URLs
export const buildApiUrl = (endpoint, params = {}) => {
    const url = new URL(endpoint);
    url.searchParams.append('apiKey', API_KEY);
    
    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
            url.searchParams.append(key, value);
        }
    });
    
    return url.toString();
}; 