import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import hero1 from '../../assets/hero1.png';
import './HeroSection.css';

const HeroSection = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="hero" id="home">
      <img src={hero1} alt="LensLux Hero" className="hero-img" />
      <div className="hero-overlay" />

      <div className={`hero-content ${loaded ? 'visible' : ''}`}>
        <p className="hero-eyebrow">New Collection 2026</p>
        <h1 className="hero-headline">
          See the World.<br />In Style.
        </h1>
        <p className="hero-sub">
          Premium eyewear for those who dare to stand out.
        </p>
        <div className="hero-actions">
          <Link to="" className="hero-btn primary">Explore Collection</Link>
          <Link to="" className="hero-btn ghost">View Lookbook</Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;