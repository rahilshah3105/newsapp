import React from 'react'
import { Link, useHistory } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useBookmarks } from '../context/BookmarkContext';
import logo from '../logo.svg';
import './Navbar.css';

const Navbar = () => {
    const { isDarkMode, toggleTheme } = useTheme();
    const { bookmarks } = useBookmarks();
    const history = useHistory();
    const [searchQuery, setSearchQuery] = React.useState('');
    const [selectedCountry, setSelectedCountry] = React.useState('in');
    const [isScrolled, setIsScrolled] = React.useState(false);
    const searchInputRef = React.useRef(null);

    const countries = [
        { code: 'in', name: 'India' },
        { code: 'us', name: 'USA' },
        { code: 'gb', name: 'UK' },
        { code: 'ca', name: 'Canada' },
        { code: 'au', name: 'Australia' },
        { code: 'de', name: 'Germany' },
        { code: 'fr', name: 'France' },
        { code: 'jp', name: 'Japan' }
    ];

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            history.push(`/search?q=${encodeURIComponent(searchQuery.trim())}&country=${selectedCountry}`);
        }
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
                    <ul className="navbar-nav navbar-nav-modern me-auto mb-2 mb-lg-0">
                        <li className="nav-item"><Link className="nav-link nav-link-modern" aria-current="page" to="/">Home</Link></li>
                        <li className="nav-item"><Link className="nav-link nav-link-modern" to="/business">Business</Link></li>
                        <li className="nav-item"><Link className="nav-link nav-link-modern" to="/entertainment">Entertainment</Link></li>
                        <li className="nav-item"><Link className="nav-link nav-link-modern" to="/general">General</Link></li>
                        <li className="nav-item"><Link className="nav-link nav-link-modern" to="/health">Health</Link></li>
                        <li className="nav-item"><Link className="nav-link nav-link-modern" to="/science">Science</Link></li>
                        <li className="nav-item"><Link className="nav-link nav-link-modern" to="/sports">Sports</Link></li>
                        <li className="nav-item"><Link className="nav-link nav-link-modern" to="/technology">Technology</Link></li>
                            <li className="nav-item">
                            <Link className="bookmark-badge" to="/bookmarks">
                                    <i className="fas fa-bookmark"></i>
                                    {bookmarks.length > 0 && (
                                    <span className="bookmark-count">
                                            {bookmarks.length}
                                        </span>
                                    )}
                                </Link>
                            </li>
                        </ul>
                        
                    <div className="navbar-search">
                            <select 
                            className="country-selector" 
                                value={selectedCountry}
                            onChange={(e) => setSelectedCountry(e.target.value)}
                            >
                                {countries.map(country => (
                                    <option key={country.code} value={country.code}>
                                        {country.name}
                                    </option>
                                ))}
                        </select>

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
        </nav>
    )
}

export default Navbar
