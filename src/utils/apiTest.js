// API Test Utility
export const testNewsAPI = async () => {
    const testUrl = 'https://newsapi.org/v2/top-headlines?country=us&category=general&apiKey=84ebf4a8b7ab41a699b1329c862aa1b9&page=1&pageSize=5';
    
    try {
        console.log('Testing NewsAPI...');
        const response = await fetch(testUrl);
        const data = await response.json();
        
        console.log('API Response:', data);
        
        if (data.status === 'error') {
            console.error('API Error:', data.message);
            return { success: false, error: data.message };
        }
        
        if (data.articles && data.articles.length > 0) {
            console.log('✅ API is working! Found', data.articles.length, 'articles');
            return { success: true, articles: data.articles };
        } else {
            console.log('⚠️ API returned no articles');
            return { success: false, error: 'No articles found' };
        }
    } catch (error) {
        console.error('❌ API Test Failed:', error);
        return { success: false, error: error.message };
    }
};

// Alternative API keys for testing
export const ALTERNATIVE_API_KEYS = [
    '84ebf4a8b7ab41a699b1329c862aa1b9', // Original
    'YOUR_API_KEY_HERE', // Replace with your own
];

// Get a working API key
export const getWorkingAPIKey = async () => {
    for (const key of ALTERNATIVE_API_KEYS) {
        if (key === 'YOUR_API_KEY_HERE') continue;
        
        const testUrl = `https://newsapi.org/v2/top-headlines?country=us&category=general&apiKey=${key}&page=1&pageSize=1`;
        
        try {
            const response = await fetch(testUrl);
            const data = await response.json();
            
            if (data.status !== 'error') {
                console.log('✅ Working API key found:', key);
                return key;
            }
        } catch (error) {
            console.log('❌ API key failed:', key);
        }
    }
    
    console.log('❌ No working API keys found');
    return null;
}; 