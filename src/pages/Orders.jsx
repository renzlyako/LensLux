import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    setOrders(storedOrders.reverse());
  }, []);

  if (!user) {
    return (
      <div className="orders-empty">
        <h2>Please login to view your orders</h2>
        <Link to="/login">Login</Link>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="orders-empty">
        <h2>No orders yet</h2>
        <p>Start shopping to place your first order!</p>
        <Link to="/products">Browse Products</Link>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <h1>My Orders</h1>
      <div className="orders-list">
        {orders.map(order => (
          <div key={order.id} className="order-card">
            <div className="order-header">
              <div>
                <h3>Order #{order.id}</h3>
                <p className="order-date">
                  {new Date(order.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
              <div className="order-total">
                ${order.total?.toFixed(2) || '0.00'}
              </div>
            </div>
            <div className="order-items">
              {order.items?.map((item, index) => (
                <div key={index} className="order-item">
                  <img src={item.images?.[0]} alt={item.name} />
                  <div>
                    <p>{item.name}</p>
                    <p>Qty: {item.quantity}</p>
                  </div>
                  <p>${((item.price || 0) * (item.quantity || 1)).toFixed(2)}</p>
                </div>
              ))}
            </div>
            <div className="order-shipping">
              <p>Shipped to: {order.address}, {order.city} {order.zipCode}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;