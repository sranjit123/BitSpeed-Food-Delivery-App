import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingCart, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import './Cart.css';

const CartSidebar = ({ onCheckout }) => {
  const { 
    isCartOpen, 
    setIsCartOpen, 
    cart, 
    updateQuantity, 
    subtotal, 
    tax, 
    deliveryFee, 
    total 
  } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="cart-overlay"
            onClick={() => setIsCartOpen(false)}
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="cart-sidebar shadow-lg"
          >
            <div className="cart-header">
              <h3>Your Order</h3>
              <button className="close-btn" onClick={() => setIsCartOpen(false)}>
                <X size={24} />
              </button>
            </div>

            <div className="cart-items-container">
              {cart.length === 0 ? (
                <div className="empty-cart">
                  <ShoppingCart size={64} strokeWidth={1} />
                  <p>Your cart is empty.</p>
                  <button className="start-btn" onClick={() => setIsCartOpen(false)}>
                    Start Browsing
                  </button>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="cart-item">
                    <img src={item.image} alt={item.name} />
                    <div className="cart-item-details">
                      <h4>{item.name}</h4>
                      <span className="cart-item-price">${item.price.toFixed(2)}</span>
                      <div className="cart-qty-toggle">
                        <button onClick={() => updateQuantity(item.id, -1)}><Minus size={14} /></button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)}><Plus size={14} /></button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="cart-footer">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Tax (8%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Delivery Fee</span>
                  <span>${deliveryFee.toFixed(2)}</span>
                </div>
                <div className="summary-row total">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <button 
                  className="checkout-btn"
                  onClick={() => {
                    setIsCartOpen(false);
                    onCheckout();
                  }}
                >
                  Proceed to Checkout
                  <ArrowRight size={20} />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartSidebar;
