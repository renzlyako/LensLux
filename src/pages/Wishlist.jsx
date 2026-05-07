import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import './Wishlist.css';

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (wishlist.length === 0) {
    return (
      <div className="wishlist-empty">
        <h2>Your wishlist is empty</h2>
        <p>Save items you love for later!</p>
        <Link to="/products">Browse Products</Link>
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      <h1>My Wishlist ({wishlist.length} items)</h1>
      <div className="wishlist-grid">
        {wishlist.map(product => (
          <div key={product.id} className="wishlist-item">
            <Link to={`/product/${product.id}`}>
              <img src={product.images[0]} alt={product.name} />
            </Link>
            <div className="wishlist-item-info">
              <h3>{product.name}</h3>
              <p className="price">${product.price.toFixed(2)}</p>
              <div className="wishlist-actions">
                <button 
                  onClick={() => addToCart(product)}
                  className="move-to-cart"
                >
                  Add to Cart
                </button>
                <button 
                  onClick={() => removeFromWishlist(product.id)}
                  className="remove-btn"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;