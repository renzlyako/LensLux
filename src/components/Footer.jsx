import { Link } from 'react-router-dom';
import { useState } from 'react';
import './Footer.css';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="footer">
      <div className="footer-inner">

        {}
        <div className="footer-left">
          <Link to="/" className="footer-logo">LensLux</Link>
          <p className="footer-tagline">
            Premium eyewear crafted for those<br />
            who dare to stand out.
          </p>

          {}
          <div className="footer-newsletter">
            <p className="footer-newsletter-label">
              Get 10% off your first order
            </p>
            {subscribed ? (
              <p className="footer-subscribed">
                ✓ You're subscribed! Check your email.
              </p>
            ) : (
              <form className="footer-form" onSubmit={handleSubscribe}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="footer-input"
                  required
                />
                <button type="submit" className="footer-subscribe-btn">
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>

        {}
        <div className="footer-right">

          {}
          <div className="footer-col">
            <h4 className="footer-col-title">Collection</h4>
            <ul className="footer-links">
              <li><Link to="/products?category=Classic" className="footer-link">Classic</Link></li>
              <li><Link to="/products?category=Sport"   className="footer-link">Sport</Link></li>
              <li><Link to="/products?category=Luxury"  className="footer-link">Luxury</Link></li>
              <li><Link to="/products?category=New"     className="footer-link">New Arrivals</Link></li>
            </ul>
          </div>

          {}
          <div className="footer-col">
            <h4 className="footer-col-title">Support</h4>
            <ul className="footer-links">
              <li><Link to="/faq"      className="footer-link">FAQ</Link></li>
              <li><Link to="/shipping" className="footer-link">Shipping Info</Link></li>
              <li><Link to="/returns"  className="footer-link">Returns</Link></li>
              <li><Link to="/contact"  className="footer-link">Contact Us</Link></li>
            </ul>
          </div>

          {}
          <div className="footer-col">
            <h4 className="footer-col-title">Company</h4>
            <ul className="footer-links">
              <li><Link to="/about"    className="footer-link">About</Link></li>
              <li><Link to="/blog"     className="footer-link">Blog</Link></li>
              <li><Link to="/lookbook" className="footer-link">Lookbook</Link></li>
              <li><Link to="/press"    className="footer-link">Press</Link></li>
            </ul>
          </div>

          {}
          <div className="footer-col">
            <h4 className="footer-col-title">Follow Us</h4>
            <ul className="footer-links">
              <li>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="footer-link">
                  Instagram
                </a>
              </li>
              <li>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="footer-link">
                  Facebook
                </a>
              </li>
              <li>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="footer-link">
                  Twitter
                </a>
              </li>
              <li>
                <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="footer-link">
                  TikTok
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {}
      <div className="footer-bottom">
        <p className="footer-copy">
          © 2026 LensLux. All rights reserved.
        </p>
        <div className="footer-legal">
          <Link to="/privacy" className="footer-legal-link">Privacy Policy</Link>
          <span className="footer-legal-sep">·</span>
          <Link to="/terms"   className="footer-legal-link">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;