import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Plus, Minus } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { FOOD_ITEMS, CATEGORIES } from '../../data/foods';
import './Menu.css';

const MenuGrid = ({ searchQuery }) => {
  const [activeCategory, setActiveCategory] = useState("All");
  const { addToCart, cart, updateQuantity } = useCart();

  const filteredItems = FOOD_ITEMS.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All" || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section className="menu-section container fade-in">
      <div className="menu-controls">
        <div className="categories">
          {CATEGORIES.map(cat => (
            <button 
              key={cat} 
              className={`cat-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="menu-grid">
        <AnimatePresence mode='popLayout'>
          {filteredItems.map(item => {
            const cartItem = cart.find(i => i.id === item.id);
            return (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                key={item.id} 
                className="food-card"
              >
                <div className="food-image">
                  <img src={item.image} alt={item.name} loading="lazy" />
                  <div className="food-tags">
                    {item.tags.map(tag => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="food-info">
                  <div className="food-header">
                    <h3>{item.name}</h3>
                    <div className="rating">
                      <Star size={14} fill="currentColor" />
                      <span>{item.rating}</span>
                    </div>
                  </div>
                  <p>{item.description}</p>
                  <div className="food-footer">
                    <span className="price">${item.price.toFixed(2)}</span>
                    <div className="add-actions">
                      {cartItem ? (
                        <div className="qty-control">
                          <button onClick={() => updateQuantity(item.id, -1)}><Minus size={16} /></button>
                          <span>{cartItem.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)}><Plus size={16} /></button>
                        </div>
                      ) : (
                        <button className="add-btn" onClick={() => addToCart(item)}>
                          <Plus size={18} />
                          <span>Add</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {filteredItems.length === 0 && (
        <div className="no-results">
          <h3>No dishes found</h3>
          <p>Try searching for something else or browse another category.</p>
        </div>
      )}
    </section>
  );
};

export default MenuGrid;
