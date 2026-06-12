import { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { Heart, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart }     from '../context/CartContext';
import { useAuth }     from '../context/AuthContext';
import { newArrivalsData } from '../pages/NewArrivalsPage';
import { trendingData }    from '../pages/TrendingPage';

import c1 from '../assets/c1.png';
import c2 from '../assets/c2.png';
import c3 from '../assets/c3.png';
import c4 from '../assets/c4.png';
import c5 from '../assets/c5.png';
import s1 from '../assets/s1.png';
import s2 from '../assets/s2.png';
import s3 from '../assets/s3.png';
import l1 from '../assets/l1.png';
import l2 from '../assets/l2.png';
import l3 from '../assets/l3.png';

import './CollectionPage.css';

const classicItems = [
  { id: 'c1', img: c1, name: 'Riviera Round',      color: 'Gold & Black',   price: 129, badge: 'Classic', category: 'Classic', inStock: true, images: [c1] },
  { id: 'c2', img: c2, name: 'Monaco Slim',         color: 'Silver Frame',   price: 149, badge: 'Classic', category: 'Classic', inStock: true, images: [c2] },
  { id: 'c3', img: c3, name: 'Capri Oval',          color: 'Matte Black',    price: 139, badge: 'Classic', category: 'Classic', inStock: true, images: [c3] },
  { id: 'c4', img: c4, name: 'Santorini Square',    color: 'Tortoise Brown', price: 159, badge: 'Classic', category: 'Classic', inStock: true, images: [c4] },
  { id: 'c5', img: c5, name: 'Amalfi Retro',        color: 'Honey Amber',    price: 119, badge: 'Classic', category: 'Classic', inStock: true, images: [c5] },
];

const sportItems = [
  { id: 's1', img: s1, name: 'Malibu Wraparound',  color: 'Smoke Lens',  price: 189, badge: 'Sport', category: 'Sport', inStock: true, images: [s1] },
  { id: 's2', img: s2, name: 'Ibiza Shield',        color: 'Mirror Red',  price: 169, badge: 'Sport', category: 'Sport', inStock: true, images: [s2] },
  { id: 's3', img: s3, name: 'Biarritz Sport Pro',  color: 'Ocean Blue',  price: 199, badge: 'Sport', category: 'Sport', inStock: true, images: [s3] },
];

const luxuryItems = [
  { id: 'l1', img: l1, name: 'Cannes Cat-Eye',       color: 'Pearl & Gold',  price: 289, badge: 'Luxury', category: 'Luxury', inStock: true, images: [l1] },
  { id: 'l2', img: l2, name: 'Versailles Oversized', color: 'Black Diamond', price: 319, badge: 'Luxury', category: 'Luxury', inStock: true, images: [l2] },
  { id: 'l3', img: l3, name: 'Monaco Elite',         color: 'Rose Gold',     price: 349, badge: 'Luxury', category: 'Luxury', inStock: true, images: [l3] },
];

const tabs = [
  { key: 'All',          label: 'All'          },
  { key: 'Classic',      label: 'Classic'      },
  { key: 'Sport',        label: 'Sport'        },
  { key: 'Luxury',       label: 'Luxury'       },
  { key: 'New Arrivals', label: 'New Arrivals' },
  { key: 'Trending',     label: 'Trending'     },
];

const CollectionPage = () => {
  const [searchParams]  = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  const [activeTab, setActiveTab]         = useState(initialCategory);
  const [adminProducts, setAdminProducts] = useState([]);

  const { addToWishlist, isInWishlist } = useWishlist();
  const { addToCart, cart }             = useCart();
  const { user }                        = useAuth();
  const navigate                        = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('admin-products') || '[]');
    setAdminProducts(stored);
  }, []);

  const isInCart = (id) => cart.some(item => item.id === id);

  const handleAddToCart = (item) => {
    if (!user) { navigate('/login'); return; }
    addToCart(item);
  };

  const handleWishlist = (item) => {
    if (!user) { navigate('/login'); return; }
    addToWishlist(item);
  };

  const allItems = [
    ...classicItems, ...sportItems, ...luxuryItems,
    ...newArrivalsData, ...trendingData, ...adminProducts,
  ];

  const filtered =
    activeTab === 'All'          ? allItems :
    activeTab === 'Classic'      ? [...classicItems,  ...adminProducts.filter(p => p.category === 'Classic')]  :
    activeTab === 'Sport'        ? [...sportItems,    ...adminProducts.filter(p => p.category === 'Sport')]    :
    activeTab === 'Luxury'       ? [...luxuryItems,   ...adminProducts.filter(p => p.category === 'Luxury')]   :
    activeTab === 'New Arrivals' ? newArrivalsData :
    activeTab === 'Trending'     ? trendingData    :
    allItems;

  return (
    <div className="col-page">
      <div className="col-header">
        <Link to="/" className="col-back">
          <ArrowLeft size={16} strokeWidth={1.5} /> Back
        </Link>
        <div>
          <p className="col-eyebrow">LensLux</p>
          <h1 className="col-title">Collection</h1>
          <p className="col-count">{filtered.length} items</p>
        </div>
      </div>

      <div className="col-tabs-wrap">
        <div className="col-tabs">
          {tabs.map(tab => (
            <button
              key={tab.key}
              className={`col-tab ${activeTab === tab.key ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="col-grid">
        {filtered.map(item => (
          <div key={item.id} className="col-card">
            <div className="col-card-img-wrap">
              <img src={item.img || item.images?.[0]} alt={item.name} className="col-card-img" />
              <span className={`col-badge ${
                item.category === 'Luxury' ? 'col-badge--gold' :
                item.badge === 'Trending' || item.badge === 'Best Seller' ? 'col-badge--dark' : ''
              }`}>
                {item.badge || item.category}
              </span>
              <button
                className={`col-wish-btn ${isInWishlist(item.id) ? 'active' : ''}`}
                onClick={() => handleWishlist(item)}
                aria-label="Add to favorites"
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
                <button
                  className={`col-cart-btn ${isInCart(item.id) ? 'in-cart' : ''}`}
                  onClick={() => handleAddToCart(item)}
                >
                  <ShoppingBag size={14} strokeWidth={1.5} />
                  {isInCart(item.id) ? 'Added ✓' : 'Add to Cart'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollectionPage;