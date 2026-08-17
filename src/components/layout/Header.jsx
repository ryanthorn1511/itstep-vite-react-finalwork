import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ShoppingCart, ShieldCheck, LogOut } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import './Header.css';

export const Header = () => {
  const { totalItemsCount } = useCart();
  const { isAdminLoggedIn, logout } = useAuth();

  return (
    <header className="site-header">
      <div className="container header-container">
        <Link to="/" className="logo-text">
          ITSTEPMarket
        </Link>

        <nav className="nav-menu">
          <NavLink 
            to="/" 
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            end
          >
            Каталог
          </NavLink>
          <NavLink 
            to="/cart" 
            className={({ isActive }) => `nav-item cart-link ${isActive ? 'active' : ''}`}
          >
            <ShoppingCart size={18} />
            <span>Кошик</span>
            {totalItemsCount > 0 && (
              <span className="cart-badge-count">{totalItemsCount}</span>
            )}
          </NavLink>
        </nav>

        {isAdminLoggedIn && (
          <div className="header-actions">
            <div className="admin-status-group">
              <Link to="/admin" className="btn btn-secondary admin-btn">
                <ShieldCheck size={18} />
                <span>Панель адміна</span>
              </Link>
              <button 
                onClick={logout} 
                className="btn btn-icon btn-secondary" 
                title="Вийти з адмін-панелі"
              >
                <LogOut size={18} />
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
