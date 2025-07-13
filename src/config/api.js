// RSS Feed Configuration (No API key required)
const RSS_CONFIG = {
    BBC_NEWS: 'https://feeds.bbci.co.uk/news/rss.xml',
    BBC_WORLD: 'https://feeds.bbci.co.uk/news/world/rss.xml',
    BBC_TECH: 'https://feeds.bbci.co.uk/news/technology/rss.xml',
    BBC_SPORT: 'https://feeds.bbci.co.uk/sport/rss.xml',
    BBC_BUSINESS: 'https://feeds.bbci.co.uk/news/business/rss.xml',
    BBC_ENTERTAINMENT: 'https://feeds.bbci.co.uk/news/entertainment_and_arts/rss.xml'
};

// RSS to JSON converter (free service - no API key needed)
const RSS_TO_JSON_BASE = 'https://api.rss2json.com/v1/api.json';

export const buildRssUrl = (rssUrl, params = {}) => {
    const url = new URL(RSS_TO_JSON_BASE);
    url.searchParams.append('rss_url', rssUrl);
    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
            url.searchParams.append(key, value);
        }
    });
    return url.toString();
};

// Fallback method: Direct RSS parsing (no API key needed)
export const fetchRssDirectly = async (rssUrl) => {
    try {
        // Use a CORS proxy to avoid CORS issues
        const proxyUrl = 'https://api.allorigins.win/raw?url=';
        const response = await fetch(proxyUrl + encodeURIComponent(rssUrl));
        const xmlText = await response.text();

        // Simple XML parsing to extract articles
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
        const items = xmlDoc.querySelectorAll('item');

        const articles = Array.from(items).map(item => {
            // Try to extract image from various sources
            let imageUrl = '';

            // Check for media:content (BBC often uses this)
            const mediaContent = item.querySelector('media\\:content, content');
            if (mediaContent) {
                imageUrl = mediaContent.getAttribute('url') || '';
            }

            // Check for enclosure (standard RSS image)
            if (!imageUrl) {
                const enclosure = item.querySelector('enclosure');
                if (enclosure && enclosure.getAttribute('type')?.startsWith('image/')) {
                    imageUrl = enclosure.getAttribute('url') || '';
                }
            }

            // Check for media:thumbnail
            if (!imageUrl) {
                const mediaThumbnail = item.querySelector('media\\:thumbnail, thumbnail');
                if (mediaThumbnail) {
                    imageUrl = mediaThumbnail.getAttribute('url') || '';
                }
            }

            // Try to extract from description if it contains an image
            if (!imageUrl) {
                const description = item.querySelector('description')?.textContent || '';
                const imgMatch = description.match(/<img[^>]+src="([^"]+)"/);
                if (imgMatch) {
                    imageUrl = imgMatch[1];
                }
            }

            return {
                title: item.querySelector('title')?.textContent || '',
                description: item.querySelector('description')?.textContent?.replace(/<[^>]*>/g, '') || '',
                url: item.querySelector('link')?.textContent || '',
                image: imageUrl,
                publishedAt: item.querySelector('pubDate')?.textContent || '',
                source: { name: 'BBC News' },
                author: 'BBC News'
            };
        });

        return { status: 'ok', items: articles };
    } catch (error) {
        console.error('Direct RSS fetch error:', error);
        throw new Error('Failed to fetch RSS feed directly');
    }
};

export { RSS_CONFIG };

// (Optional) NewsAPI config for reference
// const NEWS_API_KEY = process.env.REACT_APP_NEWS_API_KEY || 'YOUR_NEWS_API_KEY';
// const NEWS_BASE_URL = 'https://newsapi.org/v2'; 