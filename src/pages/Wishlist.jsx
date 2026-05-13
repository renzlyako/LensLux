import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2, ArrowLeft } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart }     from '../context/CartContext';
import './Wishlist.css';

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart }                    = useCart();

  return (
    <div className="fav-page">

      {/* ── Header ── */}
      <div className="fav-header">
        <div className="fav-header-left">
          <Link to="/" className="fav-back">
            <ArrowLeft size={16} strokeWidth={1.5} />
            Back
          </Link>
          <div>
            <h1 className="fav-title">My Favorites</h1>
            <p className="fav-count">
              {wishlist.length === 0
                ? 'No saved items yet'
                : `${wishlist.length} saved item${wishlist.length > 1 ? 's' : ''}`}
            </p>
          </div>
        </div>
      </div>

      {/* ── Empty state ── */}
      {wishlist.length === 0 ? (
        <div className="fav-empty">
          <div className="fav-empty-icon">
            <Heart size={48} strokeWidth={1} />
          </div>
          <h2>Nothing saved yet</h2>
          <p>Tap the heart on any product to save it here.</p>
          <Link to="/products" className="fav-browse-btn">
            Browse Collection
          </Link>
        </div>
      ) : (
        <div className="fav-grid">
          {wishlist.map(product => (
            <div key={product.id} className="fav-card">

              {/* Image */}
              <Link to={`/product/${product.id}`} className="fav-card-img-wrap">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="fav-card-img"
                />
                {/* Remove button on image */}
                <button
                  className="fav-remove-btn"
                  onClick={() => removeFromWishlist(product.id)}
                  aria-label="Remove from favorites"
                >
                  <Trash2 size={14} strokeWidth={1.5} />
                </button>
              </Link>

              {/* Info */}
              <div className="fav-card-info">
                <div className="fav-card-meta">
                  <span className="fav-card-category">{product.category}</span>
                  <h3 className="fav-card-name">{product.name}</h3>
                  <span className="fav-card-price">${product.price.toFixed(2)}</span>
                </div>

                <div className="fav-card-actions">
                  <button
                    className="fav-add-cart-btn"
                    onClick={() => addToCart(product)}
                    disabled={!product.inStock}
                  >
                    <ShoppingBag size={14} strokeWidth={1.5} />
                    {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;