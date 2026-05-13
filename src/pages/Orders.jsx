import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Package, MapPin, User, LogOut, X, CreditCard, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Orders.css';

const ORDER_STATUSES = ['All', 'To Pay', 'To Ship', 'To Receive', 'Completed', 'Return/Refund', 'Cancelled'];

const STATUS_STYLES = {
  'To Pay':        { color: '#e67e22', bg: '#fff8f0' },
  'To Ship':       { color: '#2980b9', bg: '#f0f8ff' },
  'To Receive':    { color: '#8e44ad', bg: '#f9f0ff' },
  'Completed':     { color: '#27ae60', bg: '#f0fdf4' },
  'Cancelled':     { color: '#e74c3c', bg: '#fff0f0' },
  'Return/Refund': { color: '#f39c12', bg: '#fffbf0' },
};

const getMockStatus = (index) => {
  const statuses = ['To Pay', 'To Ship', 'To Receive', 'Completed', 'Completed', 'Cancelled'];
  return statuses[index % statuses.length];
};

// ── Pay Now Modal ──
const PayNowModal = ({ order, onClose, onSuccess }) => {
  const [step, setStep]     = useState('form'); // form | loading | success
  const [cardData, setCardData] = useState({
    name: '', number: '', expiry: '', cvv: '',
  });
  const [errors, setErrors] = useState({});

  const formatCardNumber = (val) => {
    const digits = val.replace(/\D/g, '').slice(0, 16);
    return digits.replace(/(.{4})/g, '$1 ').trim();
  };

  const formatExpiry = (val) => {
    const digits = val.replace(/\D/g, '').slice(0, 4);
    if (digits.length >= 3) return digits.slice(0, 2) + '/' + digits.slice(2);
    return digits;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formatted = value;
    if (name === 'number') formatted = formatCardNumber(value);
    if (name === 'expiry') formatted = formatExpiry(value);
    if (name === 'cvv')    formatted = value.replace(/\D/g, '').slice(0, 3);
    setCardData(prev => ({ ...prev, [name]: formatted }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!cardData.name.trim())                        e.name   = 'Required';
    if (cardData.number.replace(/\s/g, '').length < 16) e.number = 'Enter 16-digit card number';
    if (cardData.expiry.length < 5)                   e.expiry = 'Enter valid expiry MM/YY';
    if (cardData.cvv.length < 3)                      e.cvv    = 'Enter 3-digit CVV';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setStep('loading');
    setTimeout(() => {
      setStep('success');
      setTimeout(() => {
        onSuccess(order.id);
        onClose();
      }, 2000);
    }, 1500);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>

        {/* Close */}
        <button className="modal-close" onClick={onClose}>
          <X size={18} strokeWidth={1.5} />
        </button>

        {/* ── FORM step ── */}
        {step === 'form' && (
          <>
            <div className="modal-header">
              <CreditCard size={22} strokeWidth={1.5} />
              <div>
                <h2 className="modal-title">Complete Payment</h2>
                <p className="modal-subtitle">Order #{String(order.id).slice(-6)}</p>
              </div>
            </div>

            {/* Order mini summary */}
            <div className="modal-order-summary">
              {order.items?.map((item, i) => (
                <div key={i} className="modal-order-item">
                  <img src={item.images?.[0] || item.img} alt={item.name} />
                  <span>{item.name} x{item.quantity}</span>
                  <span>${((item.price || 0) * (item.quantity || 1)).toFixed(2)}</span>
                </div>
              ))}
              <div className="modal-order-total">
                <span>Total</span>
                <span>${order.total?.toFixed(2)}</span>
              </div>
            </div>

            {/* Card form */}
            <form className="modal-form" onSubmit={handleSubmit}>
              <div className="modal-field">
                <label>Cardholder Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Juan dela Cruz"
                  value={cardData.name}
                  onChange={handleChange}
                />
                {errors.name && <span className="modal-error">{errors.name}</span>}
              </div>

              <div className="modal-field">
                <label>Card Number</label>
                <input
                  type="text"
                  name="number"
                  placeholder="1234 5678 9012 3456"
                  value={cardData.number}
                  onChange={handleChange}
                  maxLength={19}
                />
                {errors.number && <span className="modal-error">{errors.number}</span>}
              </div>

              <div className="modal-row">
                <div className="modal-field">
                  <label>Expiry Date</label>
                  <input
                    type="text"
                    name="expiry"
                    placeholder="MM/YY"
                    value={cardData.expiry}
                    onChange={handleChange}
                    maxLength={5}
                  />
                  {errors.expiry && <span className="modal-error">{errors.expiry}</span>}
                </div>
                <div className="modal-field">
                  <label>CVV</label>
                  <input
                    type="password"
                    name="cvv"
                    placeholder="•••"
                    value={cardData.cvv}
                    onChange={handleChange}
                    maxLength={3}
                  />
                  {errors.cvv && <span className="modal-error">{errors.cvv}</span>}
                </div>
              </div>

              <div className="modal-secure">
                <Lock size={12} strokeWidth={1.5} />
                Your payment info is encrypted and secure
              </div>

              <button type="submit" className="modal-pay-btn">
                Pay ${order.total?.toFixed(2)}
              </button>
            </form>
          </>
        )}

        {/* ── LOADING step ── */}
        {step === 'loading' && (
          <div className="modal-loading">
            <div className="modal-spinner" />
            <p>Processing payment...</p>
            <span>Please do not close this window</span>
          </div>
        )}

        {/* ── SUCCESS step ── */}
        {step === 'success' && (
          <div className="modal-success">
            <div className="modal-success-icon">✓</div>
            <h2>Payment Successful!</h2>
            <p>Your order is now being prepared for shipment.</p>
            <span>Order #{String(order.id).slice(-6)}</span>
          </div>
        )}

      </div>
    </div>
  );
};

const Orders = () => {
  const [orders, setOrders]           = useState([]);
  const [activeTab, setActiveTab]     = useState('orders');
  const [statusFilter, setStatusFilter] = useState('All');
  const [payingOrder, setPayingOrder] = useState(null);
  const { user, logout }              = useAuth();
  const navigate                      = useNavigate();

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    const withStatus = storedOrders.reverse().map((order, i) => ({
      ...order,
      status: order.status || getMockStatus(i),
    }));
    setOrders(withStatus);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handlePaymentSuccess = (orderId) => {
    const updated = orders.map(o =>
      o.id === orderId ? { ...o, status: 'To Ship' } : o
    );
    setOrders(updated);
    // Save updated status to localStorage
    const stored = JSON.parse(localStorage.getItem('orders') || '[]');
    const updatedStored = stored.map(o =>
      o.id === orderId ? { ...o, status: 'To Ship' } : o
    );
    localStorage.setItem('orders', JSON.stringify(updatedStored));
  };

  const handleCancelOrder = (orderId) => {
    const updated = orders.map(o =>
      o.id === orderId ? { ...o, status: 'Cancelled' } : o
    );
    setOrders(updated);
    const stored = JSON.parse(localStorage.getItem('orders') || '[]');
    const updatedStored = stored.map(o =>
      o.id === orderId ? { ...o, status: 'Cancelled' } : o
    );
    localStorage.setItem('orders', JSON.stringify(updatedStored));
  };

  const filteredOrders = statusFilter === 'All'
    ? orders
    : orders.filter(o => o.status === statusFilter);

  return (
    <div className="profile-page">

      {payingOrder && (
        <PayNowModal
          order={payingOrder}
          onClose={() => setPayingOrder(null)}
          onSuccess={handlePaymentSuccess}
        />
      )}

      <button className="profile-back" onClick={() => navigate(-1)}>
        <ArrowLeft size={16} strokeWidth={1.5} /> Back
      </button>

      <div className="profile-container">

        {/* Sidebar */}
        <div className="profile-sidebar">
          <div className="profile-user-info">
            <div className="profile-avatar">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div>
              <p className="profile-user-name">{user?.name || 'User'}</p>
              <p className="profile-user-email">{user?.email}</p>
            </div>
          </div>
          <nav className="profile-nav">
            <button
              className={`profile-nav-item ${activeTab === 'orders' ? 'active' : ''}`}
              onClick={() => setActiveTab('orders')}
            >
              <Package size={16} strokeWidth={1.5} />
              My Orders
            </button>
            <button
              className={`profile-nav-item ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              <User size={16} strokeWidth={1.5} />
              Profile Info
            </button>
            <button className="profile-nav-item profile-nav-logout" onClick={handleLogout}>
              <LogOut size={16} strokeWidth={1.5} />
              Logout
            </button>
          </nav>
        </div>

        {/* Content */}
        <div className="profile-content">

          {activeTab === 'orders' && (
            <div className="profile-section">
              <h2 className="profile-section-title">My Orders</h2>

              <div className="order-status-tabs">
                {ORDER_STATUSES.map(status => (
                  <button
                    key={status}
                    className={`order-status-tab ${statusFilter === status ? 'active' : ''}`}
                    onClick={() => setStatusFilter(status)}
                  >
                    {status}
                    {status !== 'All' && (
                      <span className="order-status-count">
                        {orders.filter(o => o.status === status).length}
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {filteredOrders.length === 0 ? (
                <div className="profile-empty">
                  <Package size={48} strokeWidth={1} />
                  <h3>{statusFilter === 'All' ? 'No orders yet' : `No ${statusFilter} orders`}</h3>
                  <p>{statusFilter === 'All' ? 'Start shopping to place your first order!' : 'Orders with this status will appear here.'}</p>
                  {statusFilter === 'All' && (
                    <Link to="/collection" className="profile-empty-btn">Browse Collection</Link>
                  )}
                </div>
              ) : (
                <div className="orders-list">
                  {filteredOrders.map(order => {
                    const style = STATUS_STYLES[order.status] || STATUS_STYLES['Completed'];
                    return (
                      <div key={order.id} className="order-card">
                        <div className="order-card-header">
                          <div>
                            <p className="order-id">Order #{String(order.id).slice(-6)}</p>
                            <p className="order-date">
                              {new Date(order.date).toLocaleDateString('en-US', {
                                year: 'numeric', month: 'long', day: 'numeric'
                              })}
                            </p>
                          </div>
                          <div className="order-status-wrap">
                            <span className="order-status-badge" style={{ color: style.color, background: style.bg }}>
                              {order.status}
                            </span>
                            <span className="order-total">${order.total?.toFixed(2)}</span>
                          </div>
                        </div>

                        <div className="order-items">
                          {order.items?.map((item, i) => (
                            <div key={i} className="order-item">
                              <img src={item.images?.[0] || item.img} alt={item.name} className="order-item-img" />
                              <div className="order-item-info">
                                <span className="order-item-name">{item.name}</span>
                                <span className="order-item-qty">Qty: {item.quantity}</span>
                              </div>
                              <span className="order-item-price">
                                ${((item.price || 0) * (item.quantity || 1)).toFixed(2)}
                              </span>
                            </div>
                          ))}
                        </div>

                        {order.address && (
                          <div className="order-shipping">
                            <MapPin size={13} strokeWidth={1.5} />
                            {order.address}, {order.city} {order.zipCode}
                          </div>
                        )}

                        <div className="order-actions">
                          {order.status === 'To Pay' && (
                            <>
                              <button
                                className="order-action-btn primary"
                                onClick={() => setPayingOrder(order)}
                              >
                                Pay Now
                              </button>
                              <button
                                className="order-action-btn ghost"
                                onClick={() => handleCancelOrder(order.id)}
                              >
                                Cancel Order
                              </button>
                            </>
                          )}
                          {order.status === 'To Ship' && (
                            <button className="order-action-btn ghost" onClick={() => handleCancelOrder(order.id)}>
                              Cancel Order
                            </button>
                          )}
                          {order.status === 'To Receive' && (
                            <button className="order-action-btn primary">Order Received</button>
                          )}
                          {(order.status === 'Completed' || order.status === 'Cancelled') && (
                            <button className="order-action-btn ghost">Buy Again</button>
                          )}
                          {order.status === 'Return/Refund' && (
                            <button className="order-action-btn ghost">Track Refund</button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="profile-section">
              <h2 className="profile-section-title">Profile Info</h2>
              <div className="profile-info-card">
                <div className="profile-info-row">
                  <span className="profile-info-label">Full Name</span>
                  <span className="profile-info-value">{user?.name || '—'}</span>
                </div>
                <div className="profile-info-row">
                  <span className="profile-info-label">Email</span>
                  <span className="profile-info-value">{user?.email || '—'}</span>
                </div>
                <div className="profile-info-row">
                  <span className="profile-info-label">Member Since</span>
                  <span className="profile-info-value">
                    {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                  </span>
                </div>
                <div className="profile-info-row">
                  <span className="profile-info-label">Total Orders</span>
                  <span className="profile-info-value">{orders.length}</span>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Orders;