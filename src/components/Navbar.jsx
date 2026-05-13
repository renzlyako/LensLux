import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Heart, ShoppingBag, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const navLinks = [
  { label: 'Collection', href: '/collection',  type: 'route'  },
  { label: 'New In',     href: '#new-in',       type: 'scroll' },
  { label: 'Trending',   href: '#trending',     type: 'scroll' },
  { label: 'Lookbook',   href: '#lookbook',     type: 'scroll' },
  { label: 'Reviews',    href: '#reviews',      type: 'scroll' },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen]       = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, logout }              = useAuth();
  const navigate                      = useNavigate();
  const location                      = useLocation();

  const handleNavClick = (e, link) => {
    e.preventDefault();

    if (link.type === 'route') {
      navigate(link.href);
      setMenuOpen(false);
      return;
    }

    // Scroll type
    const id = link.href.replace('#', '');
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

        {/* Logo */}
        <Link to="/" className="nav-logo">LensLux</Link>

        {/* Center links */}
        <div className="nav-links">
          {navLinks.map(link => (
            <a
              key={link.label}
              href={link.href}
              className="nav-link"
              onClick={e => handleNavClick(e, link)}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right actions */}
        <div className="nav-actions">
          {user ? (
            <>
              <Link to="/wishlist" className="nav-icon-btn" aria-label="Favorites">
                <Heart size={18} strokeWidth={1.5} />
              </Link>
              <Link to="/cart" className="nav-icon-btn" aria-label="Cart">
                <ShoppingBag size={18} strokeWidth={1.5} />
              </Link>
              <Link to="/orders" className="nav-icon-btn" aria-label="Profile">
                <User size={18} strokeWidth={1.5} />
              </Link>
              <button onClick={handleLogout} className="nav-cta">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login"    className="nav-cta">Sign In</Link>
              <Link to="/register" className="nav-cta nav-cta-register">Register</Link>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="nav-hamburger"
          onClick={() => setMenuOpen(m => !m)}
          aria-label="Toggle menu"
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Search dropdown */}
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

      {/* Mobile menu */}
      <div className={`nav-mobile-menu ${menuOpen ? 'open' : ''}`}>
        {navLinks.map(link => (
          <a
            key={link.label}
            href={link.href}
            onClick={e => handleNavClick(e, link)}
          >
            {link.label}
          </a>
        ))}
        {user ? (
          <>
            <Link to="/wishlist" onClick={() => setMenuOpen(false)}>Favorites</Link>
            <Link to="/cart"     onClick={() => setMenuOpen(false)}>Cart</Link>
            <Link to="/orders"   onClick={() => setMenuOpen(false)}>Orders</Link>
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