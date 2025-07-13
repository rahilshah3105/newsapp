// Image utility functions
export const getFallbackImage = (category = 'general') => {
    const fallbackImages = {
        general: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        business: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        technology: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        sports: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        entertainment: 'https://images.unsplash.com/photo-1489599837799-e2c8b0b2b8b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        health: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        science: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    };
    
    return fallbackImages[category] || fallbackImages.general;
};

export const validateImageUrl = (url) => {
    if (!url) return false;
    
    // Check if URL is valid
    try {
        new URL(url);
    } catch {
        return false;
    }
    
    // Check if it's an image URL
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
    const hasImageExtension = imageExtensions.some(ext => 
        url.toLowerCase().includes(ext)
    );
    
    return hasImageExtension || url.includes('image') || url.includes('img');
};

export const getOptimizedImageUrl = (originalUrl, width = 400) => {
    if (!originalUrl) return null;
    
    // If it's an Unsplash URL, optimize it
    if (originalUrl.includes('unsplash.com')) {
        return `${originalUrl}&w=${width}&q=80`;
    }
    
    // If it's a BBC URL, try to optimize
    if (originalUrl.includes('bbc.co.uk') || originalUrl.includes('bbc.com')) {
        return originalUrl;
    }
    
    return originalUrl;
}; 