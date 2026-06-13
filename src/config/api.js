// RSS Feed Configuration (No API key required)
const RSS_CONFIG = {
    // UK / global
    BBC_NEWS: 'https://feeds.bbci.co.uk/news/rss.xml',
    BBC_WORLD: 'https://feeds.bbci.co.uk/news/world/rss.xml',
    BBC_TECH: 'https://feeds.bbci.co.uk/news/technology/rss.xml',
    BBC_SPORT: 'https://feeds.bbci.co.uk/sport/rss.xml',
    BBC_BUSINESS: 'https://feeds.bbci.co.uk/news/business/rss.xml',
    BBC_ENTERTAINMENT: 'https://feeds.bbci.co.uk/news/entertainment_and_arts/rss.xml',
    REUTERS_WORLD: 'https://feeds.reuters.com/Reuters/worldNews',
    REUTERS_BUSINESS: 'https://feeds.reuters.com/reuters/businessNews',
    REUTERS_TECH: 'https://feeds.reuters.com/reuters/technologyNews',
    REUTERS_TOP: 'https://feeds.reuters.com/reuters/topNews',
    NPR_TOP: 'https://feeds.npr.org/1001/rss.xml',
    NYT_HOME: 'https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml',
    GUARDIAN_WORLD: 'https://www.theguardian.com/world/rss',
    GUARDIAN_BUSINESS: 'https://www.theguardian.com/uk/business/rss',
    GUARDIAN_TECH: 'https://www.theguardian.com/uk/technology/rss',
    GUARDIAN_SPORT: 'https://www.theguardian.com/uk/sport/rss',
    ALJAZEERA_ALL: 'https://www.aljazeera.com/xml/rss/all.xml',

    // India
    TOI_TOP: 'https://timesofindia.indiatimes.com/rssfeeds/-2128936835.cms',
    THE_HINDU_NATIONAL: 'https://www.thehindu.com/news/national/feeder/default.rss',
    NDTV_TOP: 'https://feeds.feedburner.com/ndtvnews-top-stories',
    INDIAN_EXPRESS: 'https://indianexpress.com/section/india/feed/',

    // China / Chinese publishers (English feeds)
    CHINA_DAILY: 'https://www.chinadaily.com.cn/rss/china_rss.xml',
    SCMP_CHINA: 'https://www.scmp.com/rss/4/feed',
    CGTN_WORLD: 'https://news.cgtn.com/news/rss/index.xml',
    SCMP_ASIA: 'https://www.scmp.com/rss/3/feed'
};

const FEED_SOURCE_BY_URL = {
    [RSS_CONFIG.BBC_NEWS]: 'BBC News',
    [RSS_CONFIG.BBC_WORLD]: 'BBC News',
    [RSS_CONFIG.BBC_TECH]: 'BBC News',
    [RSS_CONFIG.BBC_SPORT]: 'BBC Sport',
    [RSS_CONFIG.BBC_BUSINESS]: 'BBC News',
    [RSS_CONFIG.BBC_ENTERTAINMENT]: 'BBC News',
    [RSS_CONFIG.REUTERS_WORLD]: 'Reuters',
    [RSS_CONFIG.REUTERS_BUSINESS]: 'Reuters',
    [RSS_CONFIG.REUTERS_TECH]: 'Reuters',
    [RSS_CONFIG.REUTERS_TOP]: 'Reuters',
    [RSS_CONFIG.NPR_TOP]: 'NPR',
    [RSS_CONFIG.NYT_HOME]: 'New York Times',
    [RSS_CONFIG.GUARDIAN_WORLD]: 'The Guardian',
    [RSS_CONFIG.GUARDIAN_BUSINESS]: 'The Guardian',
    [RSS_CONFIG.GUARDIAN_TECH]: 'The Guardian',
    [RSS_CONFIG.GUARDIAN_SPORT]: 'The Guardian',
    [RSS_CONFIG.ALJAZEERA_ALL]: 'Al Jazeera',
    [RSS_CONFIG.TOI_TOP]: 'Times of India',
    [RSS_CONFIG.THE_HINDU_NATIONAL]: 'The Hindu',
    [RSS_CONFIG.NDTV_TOP]: 'NDTV',
    [RSS_CONFIG.INDIAN_EXPRESS]: 'Indian Express',
    [RSS_CONFIG.CHINA_DAILY]: 'China Daily',
    [RSS_CONFIG.SCMP_CHINA]: 'SCMP',
    [RSS_CONFIG.CGTN_WORLD]: 'CGTN',
    [RSS_CONFIG.SCMP_ASIA]: 'SCMP'
};

const GLOBAL_BASE_FEEDS = [
    RSS_CONFIG.BBC_NEWS,
    RSS_CONFIG.REUTERS_TOP,
    RSS_CONFIG.REUTERS_WORLD,
    RSS_CONFIG.NPR_TOP,
    RSS_CONFIG.NYT_HOME,
    RSS_CONFIG.GUARDIAN_WORLD,
    RSS_CONFIG.ALJAZEERA_ALL
];

const CATEGORY_FEEDS = {
    general: [
        ...GLOBAL_BASE_FEEDS,
        RSS_CONFIG.TOI_TOP,
        RSS_CONFIG.THE_HINDU_NATIONAL,
        RSS_CONFIG.INDIAN_EXPRESS,
        RSS_CONFIG.CHINA_DAILY,
        RSS_CONFIG.SCMP_CHINA,
        RSS_CONFIG.SCMP_ASIA
    ],
    business: [
        ...GLOBAL_BASE_FEEDS,
        RSS_CONFIG.BBC_BUSINESS,
        RSS_CONFIG.REUTERS_BUSINESS,
        RSS_CONFIG.GUARDIAN_BUSINESS,
        RSS_CONFIG.TOI_TOP,
        RSS_CONFIG.INDIAN_EXPRESS,
        RSS_CONFIG.CHINA_DAILY
    ],
    technology: [
        ...GLOBAL_BASE_FEEDS,
        RSS_CONFIG.BBC_TECH,
        RSS_CONFIG.REUTERS_TECH,
        RSS_CONFIG.GUARDIAN_TECH,
        RSS_CONFIG.CGTN_WORLD,
        RSS_CONFIG.SCMP_CHINA,
        RSS_CONFIG.SCMP_ASIA
    ],
    sports: [
        ...GLOBAL_BASE_FEEDS,
        RSS_CONFIG.BBC_SPORT,
        RSS_CONFIG.GUARDIAN_SPORT,
        RSS_CONFIG.TOI_TOP,
        RSS_CONFIG.NDTV_TOP,
        RSS_CONFIG.INDIAN_EXPRESS
    ],
    entertainment: [
        ...GLOBAL_BASE_FEEDS,
        RSS_CONFIG.BBC_ENTERTAINMENT,
        RSS_CONFIG.TOI_TOP,
        RSS_CONFIG.NDTV_TOP,
        RSS_CONFIG.SCMP_CHINA,
        RSS_CONFIG.SCMP_ASIA
    ],
    health: [
        ...GLOBAL_BASE_FEEDS,
        RSS_CONFIG.CHINA_DAILY,
        RSS_CONFIG.THE_HINDU_NATIONAL,
        RSS_CONFIG.INDIAN_EXPRESS
    ],
    science: [
        ...GLOBAL_BASE_FEEDS,
        RSS_CONFIG.BBC_TECH,
        RSS_CONFIG.REUTERS_TECH,
        RSS_CONFIG.GUARDIAN_TECH,
        RSS_CONFIG.CGTN_WORLD,
        RSS_CONFIG.CHINA_DAILY,
        RSS_CONFIG.SCMP_ASIA
    ]
};

const COUNTRY_REGIONAL_FEEDS = {
    in: [RSS_CONFIG.TOI_TOP, RSS_CONFIG.THE_HINDU_NATIONAL, RSS_CONFIG.NDTV_TOP, RSS_CONFIG.INDIAN_EXPRESS],
    cn: [RSS_CONFIG.CHINA_DAILY, RSS_CONFIG.SCMP_CHINA, RSS_CONFIG.CGTN_WORLD, RSS_CONFIG.SCMP_ASIA]
};

// RSS to JSON converter (free service - no API key needed)
const RSS_TO_JSON_BASE = 'https://api.rss2json.com/v1/api.json';
const APP_RSS_PROXY_PATH = '/api/rss';
const FEED_CACHE_TTL_MS = 10 * 60 * 1000;
const FEED_FAILURE_COOLDOWN_MS = 15 * 60 * 1000;
const AGGREGATE_CACHE_TTL_MS = 5 * 60 * 1000;
const REQUEST_TIMEOUT_MS = 12000;
const feedCache = new Map();
const aggregateCache = new Map();

const fetchWithTimeout = async (url, options = {}, timeoutMs = REQUEST_TIMEOUT_MS) => {
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), timeoutMs);

    try {
        return await fetch(url, {
            ...options,
            signal: controller.signal
        });
    } finally {
        window.clearTimeout(timeoutId);
    }
};

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

const getSourceNameForFeed = (rssUrl) => {
    return FEED_SOURCE_BY_URL[rssUrl] || 'News Source';
};

const normalizeRssItem = (item, fallbackSourceName) => ({
    title: item.title || '',
    description: item.description || '',
    url: item.url || item.link || item.guid || '',
    image: item.image || item.thumbnail || item.enclosure?.link || item.enclosure?.thumbnail || '',
    publishedAt: item.publishedAt || item.pubDate || '',
    source: { name: item.author || item.source?.name || fallbackSourceName },
    author: item.author || fallbackSourceName
});

const dedupeArticles = (items) => {
    const seen = new Set();
    return items.filter((item) => {
        const key = item.url || `${item.title}-${item.publishedAt}`;
        if (!key || seen.has(key)) return false;
        seen.add(key);
        return true;
    });
};

const sortArticlesByDate = (items) => {
    return [...items].sort((a, b) => {
        const aTime = new Date(a.publishedAt || 0).getTime();
        const bTime = new Date(b.publishedAt || 0).getTime();
        return bTime - aTime;
    });
};

export const getCategoryFeeds = (category) => {
    return CATEGORY_FEEDS[category] || CATEGORY_FEEDS.general;
};

const COUNTRY_FEED_PRIORITY = {
    in: [RSS_CONFIG.TOI_TOP, RSS_CONFIG.THE_HINDU_NATIONAL, RSS_CONFIG.NDTV_TOP, RSS_CONFIG.INDIAN_EXPRESS],
    cn: [RSS_CONFIG.CHINA_DAILY, RSS_CONFIG.SCMP_CHINA, RSS_CONFIG.CGTN_WORLD, RSS_CONFIG.SCMP_ASIA],
    gb: [RSS_CONFIG.BBC_NEWS, RSS_CONFIG.BBC_WORLD],
    us: [RSS_CONFIG.REUTERS_TOP, RSS_CONFIG.REUTERS_WORLD, RSS_CONFIG.REUTERS_BUSINESS, RSS_CONFIG.REUTERS_TECH, RSS_CONFIG.NPR_TOP]
};

export const getCountryAwareCategoryFeeds = (category, country = 'in') => {
    const categoryFeeds = getCategoryFeeds(category);
    const priorityFeeds = COUNTRY_FEED_PRIORITY[country] || [];

    const allRegionalFeeds = new Set(Object.values(COUNTRY_REGIONAL_FEEDS).flat());
    const selectedRegionalFeeds = new Set(COUNTRY_REGIONAL_FEEDS[country] || []);

    // Remove non-selected regional feeds so the chosen country controls regional publishers.
    const filteredCategoryFeeds = categoryFeeds.filter((feed) => {
        if (!allRegionalFeeds.has(feed)) return true;
        return selectedRegionalFeeds.has(feed);
    });

    return [...new Set([...priorityFeeds, ...filteredCategoryFeeds])];
};

export const getAllCategoryFeeds = (country = 'in') => {
    const categories = ['general', 'business', 'technology', 'sports', 'entertainment', 'health', 'science'];
    const allFeeds = categories.flatMap((category) => getCountryAwareCategoryFeeds(category, country));
    return [...new Set(allFeeds)];
};

const fetchSingleFeed = async (rssUrl) => {
    const now = Date.now();
    const cached = feedCache.get(rssUrl);

    if (cached?.data && now - cached.timestamp < FEED_CACHE_TTL_MS) {
        return cached.data;
    }

    if (cached?.promise) {
        return cached.promise;
    }

    if (cached?.error && now - cached.failedAt < FEED_FAILURE_COOLDOWN_MS) {
        return [];
    }

    const fallbackSource = getSourceNameForFeed(rssUrl);

    const pendingPromise = (async () => {
        try {
            const parsedData = await fetchRssDirectly(rssUrl, fallbackSource);
            const items = (parsedData.items || []).map((item) => normalizeRssItem(item, fallbackSource));
            feedCache.set(rssUrl, { data: items, timestamp: Date.now() });
            return items;
        } catch (error) {
            feedCache.set(rssUrl, { data: [], timestamp: Date.now(), error: true, failedAt: Date.now() });
            return [];
        }
    })();

    feedCache.set(rssUrl, { ...cached, promise: pendingPromise, timestamp: now });
    return pendingPromise;
};

export const fetchMultiSourceNews = async ({ feeds, page = 1, pageSize = 12, query = '' }) => {
    const uniqueFeeds = [...new Set(feeds)].filter(Boolean);
    const aggregateKey = uniqueFeeds.slice().sort().join('|');
    const aggregateNow = Date.now();
    const cachedAggregate = aggregateCache.get(aggregateKey);

    let cleaned;
    if (cachedAggregate?.items && aggregateNow - cachedAggregate.timestamp < AGGREGATE_CACHE_TTL_MS) {
        cleaned = cachedAggregate.items;
    } else {
        const settled = await Promise.allSettled(uniqueFeeds.map((feed) => fetchSingleFeed(feed)));

        const mergedArticles = settled
            .filter((result) => result.status === 'fulfilled')
            .flatMap((result) => result.value);

        cleaned = dedupeArticles(sortArticlesByDate(mergedArticles));
        aggregateCache.set(aggregateKey, { items: cleaned, timestamp: aggregateNow });
    }

    const filtered = query
        ? cleaned.filter((item) => {
            const q = query.toLowerCase().trim();
            return (item.title || '').toLowerCase().includes(q) || (item.description || '').toLowerCase().includes(q);
        })
        : cleaned;

    const totalResults = filtered.length;
    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;

    return {
        items: filtered.slice(startIndex, endIndex),
        totalResults,
        hasMore: endIndex < totalResults
    };
};

// Fallback method: Direct RSS parsing (no API key needed)
export const fetchRssDirectly = async (rssUrl, sourceName = 'News Source') => {
    try {
        const localProxyResponse = await fetchWithTimeout(`${APP_RSS_PROXY_PATH}?url=${encodeURIComponent(rssUrl)}`);

        if (localProxyResponse.ok) {
            const xmlText = await localProxyResponse.text();
            if (xmlText && (xmlText.includes('<rss') || xmlText.includes('<feed'))) {
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
                const items = xmlDoc.querySelectorAll('item');

                const articles = Array.from(items).map(item => {
                    let imageUrl = '';

                    const mediaContent = item.querySelector('media\\:content, content');
                    if (mediaContent) {
                        imageUrl = mediaContent.getAttribute('url') || '';
                    }

                    if (!imageUrl) {
                        const enclosure = item.querySelector('enclosure');
                        if (enclosure && enclosure.getAttribute('type')?.startsWith('image/')) {
                            imageUrl = enclosure.getAttribute('url') || '';
                        }
                    }

                    if (!imageUrl) {
                        const mediaThumbnail = item.querySelector('media\\:thumbnail, thumbnail');
                        if (mediaThumbnail) {
                            imageUrl = mediaThumbnail.getAttribute('url') || '';
                        }
                    }

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
                        source: { name: sourceName },
                        author: sourceName
                    };
                });

                return { status: 'ok', items: articles };
            }
        }

        const rss2jsonUrl = buildRssUrl(rssUrl);
        const response = await fetchWithTimeout(rss2jsonUrl);
        const data = await response.json();

        if (data.status === 'error') {
            throw new Error(data.message || 'RSS2JSON failed');
        }

        return {
            status: 'ok',
            items: (data.items || []).map((item) => normalizeRssItem(item, sourceName))
        };
    } catch (error) {
        console.warn(`RSS fetch failed for ${sourceName}:`, error);
        throw new Error(`Failed to load ${sourceName} feed right now`);
    }
};

export { RSS_CONFIG };

// (Optional) NewsAPI config for reference
// const NEWS_API_KEY = process.env.REACT_APP_NEWS_API_KEY || 'YOUR_NEWS_API_KEY';
// const NEWS_BASE_URL = 'https://newsapi.org/v2'; 