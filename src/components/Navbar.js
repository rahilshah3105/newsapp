import React from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useBookmarks } from '../context/BookmarkContext';
import logo from '../logo.svg';
import './Navbar.css';

const Navbar = ({ selectedCountry = 'in', onCountryChange = () => { } }) => {
    const { isDarkMode, toggleTheme } = useTheme();
    const { bookmarks } = useBookmarks();
    const history = useHistory();
    const location = useLocation();
    const [searchQuery, setSearchQuery] = React.useState('');
    const [isScrolled, setIsScrolled] = React.useState(false);
    const [isCategoryOpen, setIsCategoryOpen] = React.useState(false);
    const [highlightedCategoryKey, setHighlightedCategoryKey] = React.useState('home');
    const [isCountryOpen, setIsCountryOpen] = React.useState(false);
    const [highlightedCountryCode, setHighlightedCountryCode] = React.useState(selectedCountry);
    const searchInputRef = React.useRef(null);
    const categoryDropdownRef = React.useRef(null);
    const countryDropdownRef = React.useRef(null);

    const countries = [
        { code: 'in', name: 'India', flag: 'IN', tone: 'tone-in' },
        { code: 'cn', name: 'China', flag: 'CN', tone: 'tone-cn' },
        { code: 'us', name: 'USA', flag: 'US', tone: 'tone-us' },
        { code: 'gb', name: 'UK', flag: 'UK', tone: 'tone-gb' },
        { code: 'ca', name: 'Canada', flag: 'CA', tone: 'tone-ca' },
        { code: 'au', name: 'Australia', flag: 'AU', tone: 'tone-au' },
        { code: 'de', name: 'Germany', flag: 'DE', tone: 'tone-de' },
        { code: 'fr', name: 'France', flag: 'FR', tone: 'tone-fr' },
        { code: 'jp', name: 'Japan', flag: 'JP', tone: 'tone-jp' }
    ];

    const categories = [
        { key: 'home', label: 'Home', path: '/', icon: 'fa-house', tone: 'cat-home' },
        { key: 'business', label: 'Business', path: '/business', icon: 'fa-briefcase', tone: 'cat-business' },
        { key: 'entertainment', label: 'Entertainment', path: '/entertainment', icon: 'fa-film', tone: 'cat-entertainment' },
        { key: 'general', label: 'General', path: '/general', icon: 'fa-newspaper', tone: 'cat-general' },
        { key: 'health', label: 'Health', path: '/health', icon: 'fa-heart-pulse', tone: 'cat-health' },
        { key: 'science', label: 'Science', path: '/science', icon: 'fa-flask', tone: 'cat-science' },
        { key: 'sports', label: 'Sports', path: '/sports', icon: 'fa-football', tone: 'cat-sports' },
        { key: 'technology', label: 'Technology', path: '/technology', icon: 'fa-microchip', tone: 'cat-technology' }
    ];

    const getSelectedCategory = () => {
        const path = location.pathname;
        const matched = categories.find((category) => category.path === path);
        return matched?.key || 'home';
    };

    const selectedCategory = getSelectedCategory();
    const selectedCategoryInfo = categories.find((category) => category.key === selectedCategory) || categories[0];

    const selectedCountryInfo = countries.find((country) => country.code === selectedCountry) || countries[0];

    const moveHighlight = (direction) => {
        const currentIndex = countries.findIndex((country) => country.code === highlightedCountryCode);
        const fallbackIndex = countries.findIndex((country) => country.code === selectedCountry);
        const baseIndex = currentIndex >= 0 ? currentIndex : fallbackIndex >= 0 ? fallbackIndex : 0;

        let nextIndex = baseIndex + direction;
        if (nextIndex < 0) nextIndex = countries.length - 1;
        if (nextIndex >= countries.length) nextIndex = 0;

        setHighlightedCountryCode(countries[nextIndex].code);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            history.push(`/search?q=${encodeURIComponent(searchQuery.trim())}&country=${selectedCountry}`);
        }
    };

    const handleCountryChangeLocal = (countryCode) => {
        onCountryChange(countryCode);
        setHighlightedCountryCode(countryCode);
        setIsCountryOpen(false);

        if (location.pathname === '/search') {
            const params = new URLSearchParams(location.search);
            params.set('country', countryCode);
            history.push(`/search?${params.toString()}`);
        }
    };

    const handleCategoryChange = (selectedKey) => {
        const selected = categories.find((category) => category.key === selectedKey);
        if (selected) {
            setHighlightedCategoryKey(selected.key);
            setIsCategoryOpen(false);
            history.push(selected.path);
        }
    };

    const moveCategoryHighlight = (direction) => {
        const currentIndex = categories.findIndex((category) => category.key === highlightedCategoryKey);
        const fallbackIndex = categories.findIndex((category) => category.key === selectedCategory);
        const baseIndex = currentIndex >= 0 ? currentIndex : fallbackIndex >= 0 ? fallbackIndex : 0;

        let nextIndex = baseIndex + direction;
        if (nextIndex < 0) nextIndex = categories.length - 1;
        if (nextIndex >= categories.length) nextIndex = 0;

        setHighlightedCategoryKey(categories[nextIndex].key);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && searchQuery.trim()) {
            e.preventDefault();
            history.push(`/search?q=${encodeURIComponent(searchQuery.trim())}&country=${selectedCountry}`);
        }
    };

    const handleClearSearch = () => {
        setSearchQuery('');
        if (searchInputRef.current) {
            searchInputRef.current.focus();
        }
    };

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    React.useEffect(() => {
        const handleOutsideClick = (event) => {
            if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target)) {
                setIsCategoryOpen(false);
            }

            if (countryDropdownRef.current && !countryDropdownRef.current.contains(event.target)) {
                setIsCountryOpen(false);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);
        return () => document.removeEventListener('mousedown', handleOutsideClick);
    }, []);

    React.useEffect(() => {
        setHighlightedCountryCode(selectedCountry);
    }, [selectedCountry]);

    React.useEffect(() => {
        if (isCountryOpen) {
            setHighlightedCountryCode(selectedCountry);
        }
    }, [isCountryOpen, selectedCountry]);

    React.useEffect(() => {
        setHighlightedCategoryKey(selectedCategory);
    }, [selectedCategory]);

    React.useEffect(() => {
        if (isCategoryOpen) {
            setHighlightedCategoryKey(selectedCategory);
        }
    }, [isCategoryOpen, selectedCategory]);

    const handleCountryKeyDown = (e) => {
        if (!isCountryOpen && (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            setIsCountryOpen(true);
            return;
        }

        if (!isCountryOpen) return;

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            moveHighlight(1);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            moveHighlight(-1);
        } else if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleCountryChangeLocal(highlightedCountryCode);
        } else if (e.key === 'Escape' || e.key === 'Tab') {
            setIsCountryOpen(false);
        }
    };

    const handleCategoryKeyDown = (e) => {
        if (!isCategoryOpen && (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            setIsCategoryOpen(true);
            return;
        }

        if (!isCategoryOpen) return;

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            moveCategoryHighlight(1);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            moveCategoryHighlight(-1);
        } else if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleCategoryChange(highlightedCategoryKey);
        } else if (e.key === 'Escape' || e.key === 'Tab') {
            setIsCategoryOpen(false);
        }
    };

    return (
        <nav className={`navbar navbar-expand-lg navbar-modern ${isScrolled ? 'scrolled' : ''}`}>
            <div className="container-fluid">
                <Link className="navbar-brand-modern" to="/">
                    <img src={logo} alt="NewsPulse Logo" className="navbar-logo" />
                    <span className="brand-text">NewsPulse</span>
                </Link>

                <button className="navbar-toggler navbar-toggler-modern" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon navbar-toggler-icon-modern"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <div className="navbar-controls">
                        <div className="category-dropdown" ref={categoryDropdownRef}>
                            <button
                                type="button"
                                className="category-selector"
                                onClick={() => setIsCategoryOpen((prev) => !prev)}
                                onKeyDown={handleCategoryKeyDown}
                                aria-expanded={isCategoryOpen}
                                aria-haspopup="listbox"
                                aria-controls="category-options-listbox"
                            >
                                <span className="category-selector-content">
                                    <span className={`category-chip ${selectedCategoryInfo.tone}`}>
                                        <i className={`fas ${selectedCategoryInfo.icon}`}></i>
                                    </span>
                                    <span className="category-selector-label">{selectedCategoryInfo.label}</span>
                                </span>
                                <i className={`fas fa-chevron-${isCategoryOpen ? 'up' : 'down'} category-selector-arrow`}></i>
                            </button>

                            {isCategoryOpen && (
                                <div
                                    id="category-options-listbox"
                                    className="category-options"
                                    role="listbox"
                                    aria-label="Category options"
                                >
                                    {categories.map((category) => (
                                        <button
                                            key={category.key}
                                            type="button"
                                            className={`category-option ${category.key === selectedCategory ? 'active' : ''} ${category.key === highlightedCategoryKey ? 'highlighted' : ''}`}
                                            onClick={() => handleCategoryChange(category.key)}
                                            onMouseEnter={() => setHighlightedCategoryKey(category.key)}
                                            role="option"
                                            aria-selected={category.key === selectedCategory}
                                        >
                                            <span className={`category-chip ${category.tone}`}>
                                                <i className={`fas ${category.icon}`}></i>
                                            </span>
                                            <span className="category-option-name">{category.label}</span>
                                            {category.key === selectedCategory && <i className="fas fa-check category-option-check"></i>}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="country-dropdown" ref={countryDropdownRef}>
                            <button
                                type="button"
                                className="country-selector"
                                onClick={() => setIsCountryOpen((prev) => !prev)}
                                onKeyDown={handleCountryKeyDown}
                                aria-expanded={isCountryOpen}
                                aria-haspopup="listbox"
                                aria-controls="country-options-listbox"
                            >
                                <span className="country-selector-content">
                                    <span className={`country-chip ${selectedCountryInfo.tone}`}>{selectedCountryInfo.flag}</span>
                                    <span className="country-selector-label">{selectedCountryInfo.name}</span>
                                </span>
                                <i className={`fas fa-chevron-${isCountryOpen ? 'up' : 'down'} country-selector-arrow`}></i>
                            </button>

                            {isCountryOpen && (
                                <div
                                    id="country-options-listbox"
                                    className="country-options"
                                    role="listbox"
                                    aria-label="Country options"
                                >
                                    {countries.map((country) => (
                                        <button
                                            key={country.code}
                                            type="button"
                                            className={`country-option ${country.code === selectedCountry ? 'active' : ''} ${country.code === highlightedCountryCode ? 'highlighted' : ''}`}
                                            onClick={() => handleCountryChangeLocal(country.code)}
                                            onMouseEnter={() => setHighlightedCountryCode(country.code)}
                                            role="option"
                                            aria-selected={country.code === selectedCountry}
                                        >
                                            <span className={`country-chip ${country.tone}`}>{country.flag}</span>
                                            <span className="country-option-name">{country.name}</span>
                                            {country.code === selectedCountry && <i className="fas fa-check country-option-check"></i>}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        <form className="search-form" onSubmit={handleSearch}>
                            <input
                                ref={searchInputRef}
                                className="search-input"
                                type="text"
                                placeholder="Search news..."
                                aria-label="Search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={handleKeyPress}
                            />
                            {searchQuery && (
                                <button
                                    className="search-clear-btn"
                                    type="button"
                                    onClick={handleClearSearch}
                                    title="Clear search"
                                >
                                    <i className="fas fa-times"></i>
                                </button>
                            )}
                            <button className="search-btn" type="submit">
                                <i className="fas fa-search"></i>
                            </button>
                        </form>

                        <div className="navbar-actions">
                            <Link className="bookmark-badge" to="/bookmarks">
                                <i className="fas fa-bookmark"></i>
                                {bookmarks.length > 0 && (
                                    <span className="bookmark-count">
                                        {bookmarks.length}
                                    </span>
                                )}
                            </Link>

                            <button
                                className="theme-toggle"
                                onClick={toggleTheme}
                                title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                            >
                                <i className={`fas fa-${isDarkMode ? 'sun' : 'moon'}`}></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
