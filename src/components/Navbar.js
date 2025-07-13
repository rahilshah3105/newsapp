import React from 'react'
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useBookmarks } from '../context/BookmarkContext';
import logo from '../logo.svg';

const Navbar = () => {
    const { isDarkMode, toggleTheme } = useTheme();
    const { bookmarks } = useBookmarks();
    const [searchQuery, setSearchQuery] = React.useState('');
    const [selectedCountry, setSelectedCountry] = React.useState('in');

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
            window.location.href = `/search?q=${encodeURIComponent(searchQuery)}&country=${selectedCountry}`;
        }
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand d-flex align-items-center" to="/">
                        <img src={logo} alt="NewsPulse Logo" className="me-2" style={{ width: '32px', height: '32px' }} />
                        <span className="brand-text">NewsPulse</span>
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item"><Link className="nav-link" aria-current="page" to="/">Home</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/business">Business</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/entertainment">Entertainment</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/general">General</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/health">Health</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/science">Science</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/sports">Sports</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/technology">Technology</Link></li>
                            <li className="nav-item">
                                <Link className="nav-link position-relative" to="/bookmarks">
                                    <i className="fas fa-bookmark"></i>
                                    {bookmarks.length > 0 && (
                                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                            {bookmarks.length}
                                        </span>
                                    )}
                                </Link>
                            </li>
                        </ul>
                        
                        <div className="d-flex align-items-center me-3">
                            <select 
                                className="form-select form-select-sm me-2" 
                                value={selectedCountry}
                                onChange={(e) => setSelectedCountry(e.target.value)}
                                style={{ width: 'auto' }}
                            >
                                {countries.map(country => (
                                    <option key={country.code} value={country.code}>
                                        {country.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <form className="d-flex me-3" onSubmit={handleSearch}>
                            <input 
                                className="form-control me-2" 
                                type="search" 
                                placeholder="Search news..." 
                                aria-label="Search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <button className="btn btn-outline-success" type="submit">
                                <i className="fas fa-search"></i>
                            </button>
                        </form>

                        <button 
                            className="btn btn-outline-light" 
                            onClick={toggleTheme}
                            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                        >
                            <i className={`fas fa-${isDarkMode ? 'sun' : 'moon'}`}></i>
                        </button>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
