import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, LogIn } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './LoginModal.css';

const LoginModal = () => {
  const { isLoginModalOpen, setIsLoginModalOpen, login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      login(email);
    }
  };

  return (
    <AnimatePresence>
      {isLoginModalOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal-overlay"
            onClick={() => setIsLoginModalOpen(false)}
          />
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="login-modal glass"
          >
            <div className="modal-header">
              <h3>Welcome Back</h3>
              <button onClick={() => setIsLoginModalOpen(false)}>
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <label>Email Address</label>
                <div className="input-with-icon">
                  <Mail size={18} />
                  <input 
                    type="email" 
                    placeholder="name@example.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label>Password</label>
                <div className="input-with-icon">
                  <Lock size={18} />
                  <input 
                    type="password" 
                    placeholder="••••••••" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button type="submit" className="login-submit-btn">
                <LogIn size={20} />
                Sign In
              </button>

              <div className="modal-footer-text">
                Don't have an account? <span>Sign Up</span>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default LoginModal;
