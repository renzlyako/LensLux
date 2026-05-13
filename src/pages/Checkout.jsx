import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, MapPin } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import './Checkout.css';

const Checkout = () => {
  const { cart, getCartTotal, clearCart } = useCart();
  const { user }    = useAuth();
  const navigate    = useNavigate();
  const [savingProfile, setSavingProfile] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: user?.email || '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  // Auto-fill shipping info from Supabase profiles
  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      const { data, error } = await supabase
        .from('profiles')
        .select('first_name, last_name, address, city, zip_code, email')
        .eq('id', user.id)
        .single();

      if (!error && data) {
        setFormData(prev => ({
          ...prev,
          firstName: data.first_name || '',
          lastName:  data.last_name  || '',
          address:   data.address    || '',
          city:      data.city       || '',
          zipCode:   data.zip_code   || '',
          email:     data.email      || user.email || '',
        }));
      }
    };
    fetchProfile();
  }, [user]);

  const formatCardNumber = (val) => {
    const digits = val.replace(/\D/g, '').slice(0, 16);
    return digits.replace(/(.{4})/g, '$1 ').trim();
  };

  const formatExpiry = (val) => {
    const digits = val.replace(/\D/g, '').slice(0, 4);
    if (digits.length >= 3) return digits.slice(0, 2) + '/' + digits.slice(2);
    return digits;
  };

  const handleChange = e => {
    const { name, value } = e.target;
    let formatted = value;
    if (name === 'cardNumber') formatted = formatCardNumber(value);
    if (name === 'expiryDate') formatted = formatExpiry(value);
    if (name === 'cvv')        formatted = value.replace(/\D/g, '').slice(0, 3);
    setFormData({ ...formData, [name]: formatted });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setSavingProfile(true);

    // Save shipping info to Supabase for next time
    if (user) {
      await supabase
        .from('profiles')
        .update({
          first_name: formData.firstName,
          last_name:  formData.lastName,
          address:    formData.address,
          city:       formData.city,
          zip_code:   formData.zipCode,
        })
        .eq('id', user.id);
    }

    // Save order to localStorage
    const order = {
      id:     Date.now(),
      items:  cart,
      total:  getCartTotal(),
      date:   new Date().toISOString(),
      status: 'To Pay',
      firstName: formData.firstName,
      lastName:  formData.lastName,
      email:     formData.email,
      address:   formData.address,
      city:      formData.city,
      zipCode:   formData.zipCode,
    };

    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));

    clearCart();
    setSavingProfile(false);
    navigate('/orders');
  };

  if (cart.length === 0) {
    return (
      <div className="checkout-empty">
        <h2>Your cart is empty</h2>
        <Link to="/collection" className="checkout-empty-btn">Browse Collection</Link>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <button className="checkout-back" onClick={() => navigate(-1)}>
        <ArrowLeft size={16} strokeWidth={1.5} /> Back
      </button>

      <h1 className="checkout-title">Checkout</h1>

      <div className="checkout-container">
        <form onSubmit={handleSubmit} className="checkout-form">

          {/* Shipping */}
          <div className="checkout-section">
            <div className="checkout-section-title">
              <MapPin size={16} strokeWidth={1.5} />
              <h2>Shipping Information</h2>
            </div>
            <div className="checkout-row">
              <div className="checkout-field">
                <label>First Name</label>
                <input type="text" name="firstName" placeholder="Juan" value={formData.firstName} onChange={handleChange} required />
              </div>
              <div className="checkout-field">
                <label>Last Name</label>
                <input type="text" name="lastName" placeholder="dela Cruz" value={formData.lastName} onChange={handleChange} required />
              </div>
            </div>
            <div className="checkout-field">
              <label>Email</label>
              <input type="email" name="email" placeholder="you@example.com" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="checkout-field">
              <label>Address</label>
              <input type="text" name="address" placeholder="123 Main St" value={formData.address} onChange={handleChange} required />
            </div>
            <div className="checkout-row">
              <div className="checkout-field">
                <label>City</label>
                <input type="text" name="city" placeholder="Manila" value={formData.city} onChange={handleChange} required />
              </div>
              <div className="checkout-field">
                <label>ZIP Code</label>
                <input type="text" name="zipCode" placeholder="1000" value={formData.zipCode} onChange={handleChange} required />
              </div>
            </div>
          </div>

          {/* Payment */}
          <div className="checkout-section">
            <div className="checkout-section-title">
              <CreditCard size={16} strokeWidth={1.5} />
              <h2>Payment Information</h2>
            </div>
            <div className="checkout-field">
              <label>Card Number</label>
              <input type="text" name="cardNumber" placeholder="1234 5678 9012 3456" value={formData.cardNumber} onChange={handleChange} required maxLength={19} />
            </div>
            <div className="checkout-row">
              <div className="checkout-field">
                <label>Expiry Date</label>
                <input type="text" name="expiryDate" placeholder="MM/YY" value={formData.expiryDate} onChange={handleChange} required maxLength={5} />
              </div>
              <div className="checkout-field">
                <label>CVV</label>
                <input type="password" name="cvv" placeholder="•••" value={formData.cvv} onChange={handleChange} required maxLength={3} />
              </div>
            </div>
          </div>

          <button type="submit" className="checkout-submit-btn" disabled={savingProfile}>
            {savingProfile ? 'Processing...' : `Place Order — $${getCartTotal().toFixed(2)}`}
          </button>

        </form>

        {/* Order Summary */}
        <div className="checkout-summary">
          <h2>Order Summary</h2>
          <div className="checkout-summary-items">
            {cart.map(item => (
              <div key={item.id} className="checkout-summary-item">
                <img src={item.images?.[0] || item.img} alt={item.name} />
                <div className="checkout-summary-info">
                  <span className="checkout-summary-name">{item.name}</span>
                  <span className="checkout-summary-qty">Qty: {item.quantity}</span>
                </div>
                <span className="checkout-summary-price">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
          <div className="checkout-summary-rows">
            <div className="checkout-summary-row">
              <span>Subtotal</span>
              <span>${getCartTotal().toFixed(2)}</span>
            </div>
            <div className="checkout-summary-row">
              <span>Shipping</span>
              <span className="checkout-free">Free</span>
            </div>
          </div>
          <div className="checkout-summary-total">
            <span>Total</span>
            <span>${getCartTotal().toFixed(2)}</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Checkout;