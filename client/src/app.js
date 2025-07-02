import './App.css';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import UserHome from './pages/UserHome';
import EditProduct from './pages/EditProduct';
import CategoryProducts from './pages/CategoryProducts';
import WishlistPage from './pages/WishlistPage';
import CartPage from './pages/CartPage';
import MyOrders from './pages/MyOrders';
import Invoice from './pages/Invoice';

// Route protection component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

function App() {
  const [role, setRole] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);
  }, [location.pathname]);

  return (
    <div className="app-background">
      <Routes>
        {/* Default: Registration */}
        <Route path="/" element={<RegisterPage />} />

        {/* Login Page */}
        <Route path="/login" element={<LoginPage />} />

        {/* Admin Panel: Add/View Product Toggle */}
        <Route path="/admin"
          element={
            <ProtectedRoute>
              {role === "admin" ? <AdminDashboard /> : <Navigate to="/user-home" />}
            </ProtectedRoute>
          }
        />

        {/* Update product */}
        <Route path="/admin/edit/:id"
          element={
            <ProtectedRoute>
            {role === "admin" ? <EditProduct /> : <Navigate to="/user-home" />}
            </ProtectedRoute>
          }
        />

        {/* User Panel: View Products Only */}
        <Route path="/user-home"
          element={
            <ProtectedRoute>
              {role === "user" ? <UserHome /> : <Navigate to="/admin" />}
            </ProtectedRoute>
          }
        />

        {/* category page */}
        <Route path="/category/:categoryName" element = {<CategoryProducts />} />

        {/* Wishlist & cart page */}
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/my-orders" element={<MyOrders />} />

        <Route path="/invoice/:orderId" element={<Invoice />} />

        {/* catch all route */}
        <Route path="*" element={<Navigate to={role === "admin" ? "/admin" : "/user-home"} />} />
      </Routes>
    </div>
  );
}

export default App;
