import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, ShoppingBag, Package,
  Users, LogOut, TrendingUp, DollarSign,
  Clock, CheckCircle, Pencil, Trash2,
  Plus, X, ChevronDown, Upload, Eye, EyeOff,
} from 'lucide-react';
import { useAuth }        from '../context/AuthContext';
import { supabaseAdmin }  from '../lib/supabase';
import { products as allProducts } from '../data/products';
import './Admin.css';

const ADMIN_EMAIL    = 'admin@lenslux.com';
const STATUS_OPTIONS = ['To Pay','To Ship','To Receive','Completed','Cancelled','Return/Refund'];
const STATUS_COLORS  = {
  'To Pay':        '#e67e22',
  'To Ship':       '#2980b9',
  'To Receive':    '#8e44ad',
  'Completed':     '#27ae60',
  'Cancelled':     '#e74c3c',
  'Return/Refund': '#f39c12',
};
const CATEGORIES = ['Classic', 'Sport', 'Luxury', 'Electronics', 'Fashion', 'Accessories'];

// ── Custom Confirm Dialog ──
const ConfirmDialog = ({ message, onConfirm, onCancel }) => (
  <div className="confirm-backdrop">
    <div className="confirm-box">
      <div className="confirm-icon">
        <Trash2 size={24} strokeWidth={1.5} />
      </div>
      <h3 className="confirm-title">Are you sure?</h3>
      <p className="confirm-message">{message}</p>
      <div className="confirm-actions">
        <button className="confirm-cancel" onClick={onCancel}>Cancel</button>
        <button className="confirm-ok" onClick={onConfirm}>Delete</button>
      </div>
    </div>
  </div>
);

const Admin = () => {
  const { user, logout }          = useAuth();
  const navigate                  = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const [orders, setOrders]           = useState([]);
  const [orderFilter, setOrderFilter] = useState('All');

  const [products, setProducts]       = useState(allProducts);
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct]     = useState(null);
  const [uploading, setUploading]               = useState(false);
  const [productForm, setProductForm] = useState({
    name: '', price: '', category: '', description: '',
    imageFile: null, imagePreview: '',
  });

  // Custom confirm state
  const [confirmDialog, setConfirmDialog] = useState(null);

  const [users, setUsers]           = useState([]);
  const [usersLoading, setUsersLoading] = useState(false);

  useEffect(() => {
    if (user && user.email !== ADMIN_EMAIL) navigate('/');
    if (!user) navigate('/login');
  }, [user, navigate]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('orders') || '[]');
    setOrders(stored.reverse().map(o => ({ ...o, status: o.status || 'To Pay' })));
  }, []);

  useEffect(() => {
    if (activeTab !== 'users') return;
    setUsersLoading(true);
    supabaseAdmin.auth.admin.listUsers().then(({ data, error }) => {
      if (!error) setUsers(data.users || []);
      setUsersLoading(false);
    });
  }, [activeTab]);

  const handleLogout = () => { logout(); navigate('/'); };

  const totalRevenue    = orders.reduce((s, o) => s + (o.total || 0), 0);
  const pendingOrders   = orders.filter(o => o.status === 'To Pay').length;
  const completedOrders = orders.filter(o => o.status === 'Completed').length;

  const handleStatusChange = (orderId, newStatus) => {
    const updated = orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o);
    setOrders(updated);
    const stored = JSON.parse(localStorage.getItem('orders') || '[]');
    localStorage.setItem('orders', JSON.stringify(
      stored.map(o => o.id === orderId ? { ...o, status: newStatus } : o)
    ));
  };

  const openAddProduct = () => {
    setEditingProduct(null);
    setProductForm({ name: '', price: '', category: '', description: '', imageFile: null, imagePreview: '' });
    setShowProductModal(true);
  };

  const openEditProduct = (product) => {
    setEditingProduct(product);
    setProductForm({
      name:         product.name,
      price:        product.price,
      category:     product.category,
      description:  product.description,
      imageFile:    null,
      imagePreview: product.images?.[0] || '',
    });
    setShowProductModal(true);
  };

  const handleDeleteProduct = (id) => {
    setConfirmDialog({
      message: 'This will permanently delete the product.',
      onConfirm: () => {
        setProducts(prev => prev.filter(p => p.id !== id));
        setConfirmDialog(null);
      },
      onCancel: () => setConfirmDialog(null),
    });
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    setUploading(true);

    let imageUrl = productForm.imagePreview;

    if (productForm.imageFile) {
      const file     = productForm.imageFile;
      const fileName = `${Date.now()}-${file.name}`;
      const { error } = await supabaseAdmin.storage
        .from('product-images')
        .upload(fileName, file, { upsert: true });

      if (!error) {
        const { data: urlData } = supabaseAdmin.storage
          .from('product-images')
          .getPublicUrl(fileName);
        imageUrl = urlData.publicUrl;
      }
    }

    if (editingProduct) {
      setProducts(prev => prev.map(p =>
        p.id === editingProduct.id
          ? { ...p, ...productForm, price: parseFloat(productForm.price), images: [imageUrl] }
          : p
      ));
    } else {
      setProducts(prev => [{
        id: Date.now(),
        name:        productForm.name,
        price:       parseFloat(productForm.price),
        category:    productForm.category,
        description: productForm.description,
        rating:  4.5, reviews: 0, inStock: true,
        images:  [imageUrl],
        features: [], specifications: {},
      }, ...prev]);
    }

    setUploading(false);
    setShowProductModal(false);
  };

  const filteredOrders = orderFilter === 'All'
    ? orders : orders.filter(o => o.status === orderFilter);

  const navItems = [
    { key: 'overview', label: 'Overview',  icon: LayoutDashboard },
    { key: 'orders',   label: 'Orders',    icon: ShoppingBag     },
    { key: 'products', label: 'Products',  icon: Package         },
    { key: 'users',    label: 'Users',     icon: Users           },
  ];

  return (
    <div className="admin-layout">

      {/* Custom confirm dialog */}
      {confirmDialog && (
        <ConfirmDialog
          message={confirmDialog.message}
          onConfirm={confirmDialog.onConfirm}
          onCancel={confirmDialog.onCancel}
        />
      )}

      {/* ── Sidebar ── */}
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <span className="admin-brand-name">LensLux</span>
          <span className="admin-brand-badge">Admin</span>
        </div>
        <nav className="admin-nav">
          {navItems.map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.key}
                className={`admin-nav-item ${activeTab === item.key ? 'active' : ''}`}
                onClick={() => setActiveTab(item.key)}
              >
                <Icon size={16} strokeWidth={1.5} />
                {item.label}
              </button>
            );
          })}
        </nav>
        <div className="admin-sidebar-footer">
          <div className="admin-user-info">
            <div className="admin-avatar">A</div>
            <div>
              <p className="admin-user-name">Admin</p>
              <p className="admin-user-email">{user?.email}</p>
            </div>
          </div>
          <button className="admin-logout" onClick={handleLogout}>
            <LogOut size={15} strokeWidth={1.5} /> Logout
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <main className="admin-main">

        {/* OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="admin-section">
            <h1 className="admin-title">Overview</h1>
            <div className="admin-stats">
              <div className="stat-card">
                <div className="stat-icon" style={{ background: '#f0f8ff', color: '#2980b9' }}>
                  <ShoppingBag size={20} strokeWidth={1.5} />
                </div>
                <div>
                  <p className="stat-label">Total Orders</p>
                  <p className="stat-value">{orders.length}</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon" style={{ background: '#f0fdf4', color: '#27ae60' }}>
                  <DollarSign size={20} strokeWidth={1.5} />
                </div>
                <div>
                  <p className="stat-label">Total Revenue</p>
                  <p className="stat-value">${totalRevenue.toFixed(2)}</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon" style={{ background: '#fff8f0', color: '#e67e22' }}>
                  <Clock size={20} strokeWidth={1.5} />
                </div>
                <div>
                  <p className="stat-label">Pending Orders</p>
                  <p className="stat-value">{pendingOrders}</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon" style={{ background: '#f9f0ff', color: '#8e44ad' }}>
                  <TrendingUp size={20} strokeWidth={1.5} />
                </div>
                <div>
                  <p className="stat-label">Completed</p>
                  <p className="stat-value">{completedOrders}</p>
                </div>
              </div>
            </div>
            <div className="admin-card">
              <h2 className="admin-card-title">Recent Orders</h2>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Order ID</th><th>Customer</th><th>Items</th>
                    <th>Total</th><th>Status</th><th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.slice(0, 5).map(order => (
                    <tr key={order.id}>
                      <td className="order-id-cell">#{String(order.id).slice(-6)}</td>
                      <td>{order.firstName} {order.lastName}</td>
                      <td>{order.items?.length} item(s)</td>
                      <td>${order.total?.toFixed(2)}</td>
                      <td>
                        <span className="admin-status-badge"
                          style={{ color: STATUS_COLORS[order.status], background: STATUS_COLORS[order.status] + '18' }}>
                          {order.status}
                        </span>
                      </td>
                      <td>{new Date(order.date).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ORDERS */}
        {activeTab === 'orders' && (
          <div className="admin-section">
            <h1 className="admin-title">Orders Management</h1>
            <div className="admin-filter-tabs">
              {['All', ...STATUS_OPTIONS].map(s => (
                <button
                  key={s}
                  className={`admin-filter-tab ${orderFilter === s ? 'active' : ''}`}
                  onClick={() => setOrderFilter(s)}
                >
                  {s}
                  <span className="admin-filter-count">
                    {s === 'All' ? orders.length : orders.filter(o => o.status === s).length}
                  </span>
                </button>
              ))}
            </div>
            <div className="admin-card">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Order ID</th><th>Customer</th><th>Items</th>
                    <th>Total</th><th>Status</th><th>Date</th><th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.length === 0 ? (
                    <tr><td colSpan={7} className="admin-table-empty">No orders found</td></tr>
                  ) : filteredOrders.map(order => (
                    <tr key={order.id}>
                      <td className="order-id-cell">#{String(order.id).slice(-6)}</td>
                      <td>{order.firstName} {order.lastName}</td>
                      <td>{order.items?.length} item(s)</td>
                      <td>${order.total?.toFixed(2)}</td>
                      <td>
                        <span className="admin-status-badge"
                          style={{ color: STATUS_COLORS[order.status], background: STATUS_COLORS[order.status] + '18' }}>
                          {order.status}
                        </span>
                      </td>
                      <td>{new Date(order.date).toLocaleDateString()}</td>
                      <td>
                        <div className="admin-status-select-wrap">
                          <select
                            className="admin-status-select"
                            value={order.status}
                            onChange={e => handleStatusChange(order.id, e.target.value)}
                          >
                            {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                          </select>
                          <ChevronDown size={12} className="admin-select-icon" />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* PRODUCTS */}
        {activeTab === 'products' && (
          <div className="admin-section">
            <div className="admin-section-header">
              <h1 className="admin-title">Products Management</h1>
              <button className="admin-add-btn" onClick={openAddProduct}>
                <Plus size={15} strokeWidth={2} /> Add Product
              </button>
            </div>
            <div className="admin-card">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Image</th><th>Name</th><th>Category</th>
                    <th>Price</th><th>Rating</th><th>Stock</th><th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => (
                    <tr key={product.id}>
                      <td>
                        <img src={product.images?.[0]} alt={product.name} className="admin-product-img" />
                      </td>
                      <td className="admin-product-name">{product.name}</td>
                      <td>{product.category}</td>
                      <td>${product.price?.toFixed(2)}</td>
                      <td>⭐ {product.rating}</td>
                      <td>
                        <span className={`admin-stock-badge ${product.inStock ? 'in' : 'out'}`}>
                          {product.inStock ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </td>
                      <td>
                        <div className="admin-action-btns">
                          <button className="admin-edit-btn" onClick={() => openEditProduct(product)}>
                            <Pencil size={13} strokeWidth={1.5} />
                          </button>
                          <button className="admin-delete-btn" onClick={() => handleDeleteProduct(product.id)}>
                            <Trash2 size={13} strokeWidth={1.5} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* USERS */}
        {activeTab === 'users' && (
          <div className="admin-section">
            <h1 className="admin-title">Users Management</h1>
            <div className="admin-card">
              {usersLoading ? (
                <div className="admin-loading">Loading users...</div>
              ) : (
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Avatar</th><th>Name</th><th>Email</th><th>Joined</th><th>Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(u => (
                      <tr key={u.id}>
                        <td>
                          <div className="admin-user-avatar">
                            {(u.user_metadata?.name || u.email)?.charAt(0).toUpperCase()}
                          </div>
                        </td>
                        <td>{u.user_metadata?.name || '—'}</td>
                        <td>{u.email}</td>
                        <td>{new Date(u.created_at).toLocaleDateString()}</td>
                        <td>
                          <span className={`admin-role-badge ${u.email === ADMIN_EMAIL ? 'admin' : 'user'}`}>
                            {u.email === ADMIN_EMAIL ? 'Admin' : 'User'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

      </main>

      {/* ── Product Modal ── */}
      {showProductModal && (
        <div className="modal-backdrop" onClick={() => setShowProductModal(false)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowProductModal(false)}>
              <X size={18} strokeWidth={1.5} />
            </button>
            <h2 className="modal-title">
              {editingProduct ? 'Edit Product' : 'Add Product'}
            </h2>

            <form onSubmit={handleSaveProduct} className="modal-form">

              {/* Image upload */}
              <div className="modal-field">
                <label>Product Image</label>
                <div
                  className="admin-img-upload"
                  onClick={() => document.getElementById('product-img-input').click()}
                >
                  {productForm.imagePreview ? (
                    <img src={productForm.imagePreview} alt="preview" className="admin-img-preview" />
                  ) : (
                    <div className="admin-img-placeholder">
                      <Upload size={22} strokeWidth={1.5} />
                      <span>Click to upload image</span>
                      <span className="admin-img-hint">PNG, JPG up to 50MB</span>
                    </div>
                  )}
                </div>
                <input
                  id="product-img-input"
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={e => {
                    const file = e.target.files[0];
                    if (file) {
                      setProductForm(p => ({
                        ...p,
                        imageFile:    file,
                        imagePreview: URL.createObjectURL(file),
                      }));
                    }
                  }}
                />
                {productForm.imagePreview && (
                  <button
                    type="button"
                    className="admin-img-change"
                    onClick={() => document.getElementById('product-img-input').click()}
                  >
                    Change image
                  </button>
                )}
              </div>

              <div className="modal-field">
                <label>Product Name</label>
                <input
                  type="text"
                  placeholder="e.g. Riviera Classic"
                  value={productForm.name}
                  onChange={e => setProductForm(p => ({ ...p, name: e.target.value }))}
                  required
                />
              </div>

              <div className="modal-row">
                <div className="modal-field">
                  <label>Price ($)</label>
                  <input
                    type="number"
                    placeholder="0.00"
                    step="0.01"
                    value={productForm.price}
                    onChange={e => setProductForm(p => ({ ...p, price: e.target.value }))}
                    required
                  />
                </div>
                <div className="modal-field">
                  <label>Category</label>
                  <div className="admin-select-wrap">
                    <select
                      className="admin-category-select"
                      value={productForm.category}
                      onChange={e => setProductForm(p => ({ ...p, category: e.target.value }))}
                      required
                    >
                      <option value="" disabled>Select category</option>
                      {CATEGORIES.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                    <ChevronDown size={14} className="admin-select-icon" />
                  </div>
                </div>
              </div>

              <div className="modal-field">
                <label>Description</label>
                <input
                  type="text"
                  placeholder="Short description..."
                  value={productForm.description}
                  onChange={e => setProductForm(p => ({ ...p, description: e.target.value }))}
                />
              </div>

              <button type="submit" className="modal-pay-btn" disabled={uploading}>
                {uploading ? 'Uploading...' : editingProduct ? 'Save Changes' : 'Add Product'}
              </button>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Admin;