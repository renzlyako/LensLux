import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart }     from '../context/CartContext';
import { trendingData } from '../components/Home/Trending';
import './CollectionPage.css';

// Safely re-export data in case other components look for it here
export { trendingData };

const TrendingPage = () => {
  const { addToWishlist, isInWishlist } = useWishlist();
  const { addToCart }                   = useCart();

  return (
    <div className="col-page">
      <div className="col-header">
        <Link to="/" className="col-back">
          <ArrowLeft size={16} strokeWidth={1.5} /> Back
        </Link>
        <div>
          <p className="col-eyebrow">What's Hot</p>
          <h1 className="col-title">Trending Now</h1>
          <p className="col-count">{trendingData.length} items</p>
        </div>
      </div>

      <div className="col-grid">
        {trendingData.map(item => (
          <div key={item.id} className="col-card">
            <div className="col-card-img-wrap">
              <img src={item.img} alt={item.name} className="col-card-img" />
              <span className="col-badge col-badge--dark">{item.badge}</span>
              <button
                className={`col-wish-btn ${isInWishlist(item.id) ? 'active' : ''}`}
                onClick={() => addToWishlist(item)}
              >
                <Heart size={14} strokeWidth={1.5} fill={isInWishlist(item.id) ? 'currentColor' : 'none'} />
              </button>
            </div>
            <div className="col-card-info">
              <div className="col-card-meta">
                <span className="col-card-category">{item.category}</span>
                <h3 className="col-card-name">{item.name}</h3>
                <span className="col-card-color">{item.color}</span>
              </div>
              <div className="col-card-footer">
                <span className="col-card-price">${item.price}</span>
                <button className="col-cart-btn" onClick={() => addToCart(item)}>
                  <ShoppingBag size={14} strokeWidth={1.5} />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingPage;