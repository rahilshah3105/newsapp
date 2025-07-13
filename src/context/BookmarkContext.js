import React, { createContext, useState, useContext, useEffect } from 'react';

const BookmarkContext = createContext();

export const useBookmarks = () => {
  const context = useContext(BookmarkContext);
  if (!context) {
    throw new Error('useBookmarks must be used within a BookmarkProvider');
  }
  return context;
};

export const BookmarkProvider = ({ children }) => {
  const [bookmarks, setBookmarks] = useState(() => {
    const saved = localStorage.getItem('bookmarks');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  const addBookmark = (article) => {
    if (!bookmarks.find(bookmark => bookmark.url === article.url)) {
      setBookmarks([...bookmarks, { ...article, bookmarkedAt: new Date().toISOString() }]);
    }
  };

  const removeBookmark = (url) => {
    setBookmarks(bookmarks.filter(bookmark => bookmark.url !== url));
  };

  const isBookmarked = (url) => {
    return bookmarks.some(bookmark => bookmark.url === url);
  };

  const clearAllBookmarks = () => {
    setBookmarks([]);
  };

  return (
    <BookmarkContext.Provider value={{ 
      bookmarks, 
      addBookmark, 
      removeBookmark, 
      isBookmarked, 
      clearAllBookmarks 
    }}>
      {children}
    </BookmarkContext.Provider>
  );
}; 