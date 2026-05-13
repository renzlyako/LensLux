import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ArrowLeft, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './Cart.css';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="cart-empty">
        <div className="cart-empty-icon">
          <ShoppingBag size={52} strokeWidth={1} />
        </div>
        <h2>Your cart is empty</h2>
        <p>Looks like you haven't added anything yet.</p>
        <Link to="/collection" className="cart-empty-btn">
          Browse Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page">

      {/* Back */}
      <button className="cart-back" onClick={() => navigate(-1)}>
        <ArrowLeft size={16} strokeWidth={1.5} /> Back
      </button>

      <div className="cart-container">

        {/* Left — items */}
        <div className="cart-left">
          <div className="cart-header">
            <h1 className="cart-title">Shopping Cart <span>({cart.length})</span></h1>
            <button onClick={clearCart} className="cart-clear-btn">Clear All</button>
          </div>

          <div className="cart-items">
            {cart.map(item => (
              <div key={item.id} className="cart-item">
                <img
                  src={item.images?.[0] || item.img}
                  alt={item.name}
                  className="cart-item-img"
                />
                <div className="cart-item-details">
                  <span className="cart-item-category">{item.category}</span>
                  <h3 className="cart-item-name">{item.name}</h3>
                  <div className="cart-qty-controls">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >−</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>
                </div>
                <div className="cart-item-right">
                  <span className="cart-item-price">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                  <button
                    className="cart-remove-btn"
                    onClick={() => removeFromCart(item.id)}
                    aria-label="Remove item"
                  >
                    <Trash2 size={15} strokeWidth={1.5} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — summary */}
        <div className="cart-summary">
          <h2>Order Summary</h2>
          <div className="cart-summary-rows">
            <div className="cart-summary-row">
              <span>Subtotal</span>
              <span>${getCartTotal().toFixed(2)}</span>
            </div>
            <div className="cart-summary-row">
              <span>Shipping</span>
              <span className="cart-free">Free</span>
            </div>
          </div>
          <div className="cart-summary-total">
            <span>Total</span>
            <span>${getCartTotal().toFixed(2)}</span>
          </div>
          <Link to="/checkout" className="cart-checkout-btn">
            Proceed to Checkout
          </Link>
          <Link to="/collection" className="cart-continue">
            Continue Shopping
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Cart;