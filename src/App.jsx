import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider }     from './context/CartContext';
import { AuthProvider }     from './context/AuthContext';
import { WishlistProvider } from './context/WishlistContext';
import { useAuth }          from './context/AuthContext';
import Navbar      from './components/Navbar';
import Footer      from './components/Footer';
import Home        from './pages/Home';
import Products    from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart        from './pages/Cart';
import Checkout    from './pages/Checkout';
import Login       from './pages/Login';
import Register    from './pages/Register';
import Wishlist    from './pages/Wishlist';
import Orders      from './pages/Orders';
import NewArrivalsPage from './pages/NewArrivalsPage';
import TrendingPage    from './pages/TrendingPage';
import CollectionPage  from './pages/CollectionPage';
import Admin from './pages/Admin';
import './App.css';

// Protected route wrapper
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

function AppRoutes() {
  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/"             element={<Home />} />
          <Route path="/products"     element={<Products />} />
          <Route path="/product/:id"  element={<ProductDetail />} />
          <Route path="/login"        element={<Login />} />
          <Route path="/register"     element={<Register />} />
          <Route path="/collection"   element={<CollectionPage />} />
          <Route path="/new-arrivals" element={<NewArrivalsPage />} />
          <Route path="/trending"     element={<TrendingPage />} />
          <Route path="/cart"         element={<ProtectedRoute><Cart /></ProtectedRoute>} />
          <Route path="/checkout"     element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
          <Route path="/wishlist"     element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />
          <Route path="/orders"       element={<ProtectedRoute><Orders /></ProtectedRoute>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

// In App.jsx — move admin route OUTSIDE AppRoutes
function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <Router>
            <Routes>
              {/* Admin — no navbar/footer */}
              <Route path="/admin" element={<Admin />} />

              {/* All other routes — with navbar/footer */}
              <Route path="/*" element={<AppRoutes />} />
            </Routes>
          </Router>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;