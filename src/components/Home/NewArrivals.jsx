import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';
import { useCart }     from '../../context/CartContext';
import { useAuth }     from '../../context/AuthContext';
import new1 from '../../assets/new1.png';
import new2 from '../../assets/new2.png';
import new3 from '../../assets/new3.png';
import new4 from '../../assets/new4.png';
import new5 from '../../assets/new5.png';
import new6 from '../../assets/new6.png';
import new7 from '../../assets/new7.png';
import new8 from '../../assets/new8.png';
import new9 from '../../assets/new9.png';
import './NewArrivals.css';

const VISIBLE = 4;

export const newArrivalsData = [
  { id: 'n1', img: new1, badge: 'New',       name: 'Riviera Classic',   color: 'Midnight Black', price: 129, inStock: true, category: 'Classic', images: [new1] },
  { id: 'n2', img: new2, badge: 'New Color', name: 'Monaco Slim',       color: 'Sand Dune',      price: 149, inStock: true, category: 'Classic', images: [new2] },
  { id: 'n3', img: new3, badge: 'New',       name: 'Capri Sport',       color: 'Ocean Teal',     price: 189, inStock: true, category: 'Sport',   images: [new3] },
  { id: 'n4', img: new4, badge: 'New Color', name: 'Santorini Oval',    color: 'Rose Gold',      price: 159, inStock: true, category: 'Luxury',  images: [new4] },
  { id: 'n5', img: new5, badge: 'New',       name: 'Ibiza Retro',       color: 'Tortoise Brown', price: 139, inStock: true, category: 'Classic', images: [new5] },
  { id: 'n6', img: new6, badge: 'New Color', name: 'Cannes Cat-Eye',    color: 'Pearl White',    price: 169, inStock: true, category: 'Luxury',  images: [new6] },
  { id: 'n7', img: new7, badge: 'New',       name: 'Malibu Wraparound', color: 'Smoke Grey',     price: 199, inStock: true, category: 'Sport',   images: [new7] },
  { id: 'n8', img: new8, badge: 'New Color', name: 'Amalfi Round',      color: 'Olive Green',    price: 119, inStock: true, category: 'Classic', images: [new8] },
  { id: 'n9', img: new9, badge: 'New',       name: 'Biarritz Aviator',  color: 'Gold Chrome',    price: 179, inStock: true, category: 'Luxury',  images: [new9] },
];

const looped = [...newArrivalsData, ...newArrivalsData.slice(0, VISIBLE)];

const NewArrivals = () => {
  const [index, setIndex]       = useState(0);
  const [animated, setAnimated] = useState(true);
  const isTransitioning         = useRef(false);
  const { addToWishlist, isInWishlist } = useWishlist();
  const { addToCart }                   = useCart();
  const { user }                        = useAuth();
  const navigate                        = useNavigate();

  const offset = -(index * (100 / VISIBLE));

  const handleAddToCart = (item) => {
    if (!user) { navigate('/login'); return; }
    addToCart(item);
  };

  const handleWishlist = (item) => {
    if (!user) { navigate('/login'); return; }
    addToWishlist(item);
  };

  const next = () => {
    if (isTransitioning.current) return;
    isTransitioning.current = true;
    setAnimated(true);
    setIndex(i => i + 1);
  };

  const prev = () => {
    if (isTransitioning.current) return;
    isTransitioning.current = true;
    if (index === 0) {
      const realMax = newArrivalsData.length;
      setAnimated(false);
      setIndex(realMax);
      requestAnimationFrame(() => requestAnimationFrame(() => {
        setAnimated(true);
        setIndex(realMax - 1);
        isTransitioning.current = false;
      }));
      return;
    }
    setAnimated(true);
    setIndex(i => i - 1);
  };

  const onTransitionEnd = () => {
    isTransitioning.current = false;
    if (index >= newArrivalsData.length) {
      setAnimated(false);
      setIndex(0);
    }
  };

  return (
    <section className="new-arrivals" id="new-in">
      <div className="na-header">
        <div className="na-title-wrap">
          <p className="na-eyebrow">Just Dropped</p>
          <h2 className="na-headline">New Arrivals</h2>
        </div>
        <Link to="/collection?category=New Arrivals" className="na-view-all">View All →</Link>
      </div>
      <div className="na-carousel-wrapper">
        <button className="na-btn" onClick={prev} aria-label="Previous">&#8249;</button>
        <div className="na-track">
          <div
            className="na-inner"
            style={{
              transform: `translateX(${offset}%)`,
              transition: animated ? 'transform 0.4s ease' : 'none',
            }}
            onTransitionEnd={onTransitionEnd}
          >
            {looped.map((item, i) => (
              <div key={`${item.id}-${i}`} className="na-card">
                <div className="na-card-img-wrap">
                  <img src={item.img} alt={item.name} className="na-card-img" />
                  <span className="na-badge">{item.badge}</span>
                  <button
                    className={`na-wish-btn ${isInWishlist(item.id) ? 'active' : ''}`}
                    onClick={() => handleWishlist(item)}
                    aria-label="Add to favorites"
                  >
                    <Heart size={14} strokeWidth={1.5} fill={isInWishlist(item.id) ? 'currentColor' : 'none'} />
                  </button>
                </div>
                <div className="na-card-info">
                  <div className="na-card-meta">
                    <span className="na-card-name">{item.name}</span>
                    <span className="na-card-color">{item.color}</span>
                  </div>
                  <div className="na-card-right">
                    <span className="na-card-price">${item.price}</span>
                    <button
                      className="na-cart-btn"
                      onClick={() => handleAddToCart(item)}
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
        <button className="na-btn" onClick={next} aria-label="Next">&#8250;</button>
      </div>
    </section>
  );
};

export default NewArrivals;