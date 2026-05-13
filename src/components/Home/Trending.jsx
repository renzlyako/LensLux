import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';
import { useCart }     from '../../context/CartContext';
import trending1 from '../../assets/trending1.png';
import trending2 from '../../assets/trending2.png';
import trending3 from '../../assets/trending3.png';
import trending4 from '../../assets/trending4.png';
import './Trending.css';

export const trendingData = [
  { id: 't1', img: trending1, badge: 'Trending',    name: 'Havana Classic',    color: 'Tortoise Brown', price: 159, inStock: true, category: 'Classic', images: [trending1] },
  { id: 't2', img: trending2, badge: 'Best Seller', name: 'Noir Squared',      color: 'Matte Black',    price: 139, inStock: true, category: 'Classic', images: [trending2] },
  { id: 't3', img: trending3, badge: 'Trending',    name: 'Golden Hour',       color: 'Gold Chrome',    price: 179, inStock: true, category: 'Luxury',  images: [trending3] },
  { id: 't4', img: trending4, badge: 'Best Seller', name: 'Arctic Shield',     color: 'Pearl White',    price: 149, inStock: true, category: 'Sport',   images: [trending4] },
];

const REPEAT  = 6;
const VISIBLE = 4;
const looped  = Array.from({ length: REPEAT }, () => trendingData).flat();

const Trending = () => {
  const [index, setIndex]       = useState(0);
  const [animated, setAnimated] = useState(true);
  const isTransitioning         = useRef(false);
  const { addToWishlist, isInWishlist } = useWishlist();
  const { addToCart }                   = useCart();

  const offset = -(index * (100 / VISIBLE));

  const next = () => {
    if (isTransitioning.current) return;
    isTransitioning.current = true;
    setAnimated(true);
    setIndex(i => i + 1);
  };

  const prev = () => {
    if (isTransitioning.current) return;
    isTransitioning.current = true;
    setAnimated(true);
    setIndex(i => Math.max(0, i - 1));
  };

  const onTransitionEnd = () => {
    isTransitioning.current = false;
    const total = looped.length;
    const mid   = Math.floor(REPEAT / 2) * trendingData.length;
    if (index >= total - VISIBLE - 1) {
      setAnimated(false);
      setIndex(mid);
    }
  };

  return (
    <section className="trending" id="trending">
      <div className="tr-header">
        <div className="tr-title-wrap">
          <p className="tr-eyebrow">What's Hot</p>
          <h2 className="tr-headline">Trending Now</h2>
        </div>
        <Link to="/collection?category=Trending" className="tr-view-all">View All →</Link>
      </div>

      <div className="tr-carousel-wrapper">
        <button className="tr-btn" onClick={prev} aria-label="Previous">&#8249;</button>
        <div className="tr-track">
          <div
            className="tr-inner"
            style={{
              transform: `translateX(${offset}%)`,
              transition: animated ? 'transform 0.4s ease' : 'none',
            }}
            onTransitionEnd={onTransitionEnd}
          >
            {looped.map((item, i) => (
              <div key={`${item.id}-${i}`} className="tr-card">
                <div className="tr-card-img-wrap">
                  <img src={item.img} alt={item.name} className="tr-card-img" />
                  <span className="tr-badge">{item.badge}</span>
                  <button
                    className={`tr-wish-btn ${isInWishlist(item.id) ? 'active' : ''}`}
                    onClick={() => addToWishlist(item)}
                    aria-label="Add to favorites"
                  >
                    <Heart size={14} strokeWidth={1.5} fill={isInWishlist(item.id) ? 'currentColor' : 'none'} />
                  </button>
                </div>
                <div className="tr-card-info">
                  <div className="tr-card-meta">
                    <span className="tr-card-name">{item.name}</span>
                    <span className="tr-card-color">{item.color}</span>
                  </div>
                  <div className="tr-card-right">
                    <span className="tr-card-price">${item.price}</span>
                    <button
                      className="tr-cart-btn"
                      onClick={() => addToCart(item)}
                      aria-label="Add to cart"
                    >
                      <ShoppingBag size={14} strokeWidth={1.5} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <button className="tr-btn" onClick={next} aria-label="Next">&#8250;</button>
      </div>
    </section>
  );
};

export default Trending;