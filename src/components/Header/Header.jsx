import React from 'react';
import { Search, ShoppingBag, MapPin, User as UserIcon, LogOut } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import './Header.css';

const Header = ({ searchQuery, setSearchQuery }) => {
  const { setIsCartOpen, cartCount } = useCart();
  const { isLoggedIn, user, setIsLoginModalOpen, logout } = useAuth();

  return (
    <header className="header glass">
      <div className="container header-content">
        <div className="logo">
          <span className="logo-text">Bite<span>Speed</span></span>
        </div>

        <div className="location-picker">
          <MapPin size={18} className="icon-orange" />
          <span>San Francisco, CA</span>
        </div>

        <div className="search-bar">
          <Search size={20} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search for dishes or cravings..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="header-actions">
          <button className="cart-trigger" onClick={() => setIsCartOpen(true)}>
            <ShoppingBag size={24} />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>
          
          {isLoggedIn ? (
            <div className="user-profile">
              <div className="user-info">
                <UserIcon size={18} />
                <span>{user.name}</span>
              </div>
              <button className="logout-btn" onClick={logout} title="Logout">
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <button className="login-btn" onClick={() => setIsLoginModalOpen(true)}>
              Log In
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
