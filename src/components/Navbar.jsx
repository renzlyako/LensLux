import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const navLinks = [
  { label: 'Collection', href: '#collection' },
  { label: 'New In',     href: '#new-in'     },
  { label: 'Trending',   href: '#trending'   },
  { label: 'Lookbook',   href: '#lookbook'   },
  { label: 'Reviews',    href: '#reviews'    },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen]     = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, logout }            = useAuth();
  const navigate                    = useNavigate();
  const location                    = useLocation();

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const id = href.replace('#', '');

    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
    setMenuOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setMenuOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">

        {}
        <Link to="/" className="nav-logo">LensLux</Link>

        {}
        <div className="nav-links">
          {navLinks.map(link => (
            <a
              key={link.label}
              href={link.href}
              className="nav-link"
              onClick={e => handleNavClick(e, link.href)}
            >
              {link.label}
            </a>
          ))}
        </div>

        {}
        <div className="nav-actions">
          {user ? (
            <>
              <span className="nav-username">Hi, {user.name}</span>
              <button onClick={handleLogout} className="nav-cta">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login"    className="nav-cta">Sign In</Link>
              <Link to="/register" className="nav-cta nav-cta-register">Register</Link>
            </>
          )}
        </div>

        {}
        <button
          className="nav-hamburger"
          onClick={() => setMenuOpen(m => !m)}
          aria-label="Toggle menu"
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {}
      {menuOpen && (
        <div className="nav-search-drop">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search eyewear..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              autoFocus
            />
            <button type="submit">Search</button>
          </form>
        </div>
      )}

      {}
      <div className={`nav-mobile-menu ${menuOpen ? 'open' : ''}`}>
        {navLinks.map(link => (
          <a
            key={link.label}
            href={link.href}
            onClick={e => handleNavClick(e, link.href)}
          >
            {link.label}
          </a>
        ))}
        {user ? (
          <>
            <Link to="/orders" onClick={() => setMenuOpen(false)}>Orders</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login"    onClick={() => setMenuOpen(false)}>Sign In</Link>
            <Link to="/register" onClick={() => setMenuOpen(false)}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;