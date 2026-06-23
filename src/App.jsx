import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ChevronLeft } from 'lucide-react';
import Header from './components/Header/Header';
import MenuGrid from './components/Menu/MenuGrid';
import CartSidebar from './components/Cart/CartSidebar';
import CheckoutWizard from './components/Checkout/CheckoutWizard';
import LoginModal from './components/Auth/LoginModal';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';

const AppContent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [view, setView] = useState("home"); // "home" or "checkout" or "success"

  return (
    <div className="app">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      
      <main>
        <AnimatePresence mode="wait">
          {view === "home" && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <section className="hero container">
                <div className="hero-text fade-in">
                  <h1>Cravings Delivered <br/><span>In Minutes.</span></h1>
                  <p>Discover the best food from over 1,000 local restaurants near you.</p>
                </div>
              </section>
              <MenuGrid searchQuery={searchQuery} />
            </motion.div>
          )}

          {view === "checkout" && (
            <motion.div
              key="checkout"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="container"
            >
              <button className="back-to-home" onClick={() => setView("home")}>
                <ChevronLeft size={20} />
                Back to Menu
              </button>
              <CheckoutWizard onComplete={() => setView("success")} />
            </motion.div>
          )}

          {view === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="success-view container"
            >
              <div className="success-card glass">
                <CheckCircle2 size={80} className="success-icon" />
                <h2>Order Placed Successfully!</h2>
                <p>Your meal is being prepared with love. Expect delivery in 20-30 mins.</p>
                <div className="order-details">
                  <span>Order ID: #BS-{Math.floor(Math.random() * 100000)}</span>
                </div>
                <button className="primary-btn" onClick={() => setView("home")}>
                  Continue Shopping
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <CartSidebar onCheckout={() => setView("checkout")} />
      <LoginModal />

      <footer className="main-footer">
        <div className="container">
          <p>&copy; 2026 BiteSpeed Inc. Locally sourced. Rapidly delivered.</p>
        </div>
      </footer>

      {/* Global Inline Styles for Hero and Layout */}
      <style>{`
        main { padding-bottom: 100px; }
        .hero { padding: 80px 0 40px; text-align: center; }
        .hero h1 { font-size: 4rem; line-height: 1.1; margin-bottom: 20px; font-weight: 800; }
        .hero h1 span { color: var(--primary); }
        .hero p { font-size: 1.2rem; color: var(--text-muted); max-width: 600px; margin: 0 auto; }
        
        .back-to-home { 
          margin-top: 40px; 
          background: none; 
          display: flex; 
          align-items: center; 
          gap: 8px; 
          font-weight: 600; 
          color: var(--text-muted);
        }
        .back-to-home:hover { color: var(--primary); }

        .success-view { 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          min-height: 80vh; 
        }
        .success-card { 
          padding: 60px; 
          text-align: center; 
          border-radius: 30px; 
          max-width: 500px; 
          background: white;
          box-shadow: 0 20px 60px rgba(0,0,0,0.1);
        }
        .success-icon { color: #4BB543; margin-bottom: 24px; }
        .success-card h2 { margin-bottom: 16px; font-size: 2rem; }
        .success-card p { color: var(--text-muted); margin-bottom: 32px; }
        .order-details { margin-bottom: 32px; font-weight: 700; color: var(--secondary); font-size: 0.9rem; }
        .success-card .primary-btn { margin: 0 auto; }

        .main-footer { 
          padding: 60px 0; 
          border-top: 1px solid var(--border); 
          text-align: center; 
          color: var(--text-muted); 
          font-size: 0.9rem;
        }

        @media (max-width: 600px) {
          .hero h1 { font-size: 2.5rem; }
          .hero p { font-size: 1rem; }
        }
      `}</style>
    </div>
  );
};

const App = () => (
  <AuthProvider>
    <CartProvider>
      <AppContent />
    </CartProvider>
  </AuthProvider>
);

export default App;
