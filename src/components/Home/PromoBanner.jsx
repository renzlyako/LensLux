import { Link } from 'react-router-dom';
import banner1 from '../../assets/banner1.png';
import './PromoBanner.css';

const PromoBanner = () => {
  return (
    <section className="promo-banner">
      <img src={banner1} alt="LensLux Collection" className="promo-banner-img" />
      <div className="promo-banner-overlay" />
      <div className="promo-banner-content">
        <p className="promo-banner-eyebrow">Limited Edition</p>
        <h2 className="promo-banner-headline">
          The New Collection<br />Has Arrived.
        </h2>
        <p className="promo-banner-sub">
          Timeless silhouettes. Bold new colorways.<br />
          Designed for those who lead, not follow.
        </p>
        <Link to="/products" className="promo-banner-btn">
          Shop the Collection
        </Link>
      </div>
    </section>
  );
};

export default PromoBanner;