import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, CreditCard, Home, ListOrdered, ChevronRight, ChevronLeft, PackageCheck } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import './Checkout.css';

const STEPS = [
  { id: 1, title: "Delivery", icon: Home },
  { id: 2, title: "Payment", icon: CreditCard },
  { id: 3, title: "Summary", icon: ListOrdered }
];

const CheckoutWizard = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const { cart, total, clearCart } = useCart();
  const [isFinishing, setIsFinishing] = useState(false);
  const [formData, setFormData] = useState({
    name: '', street: '', city: '', zip: '',
    cardNumber: '', expiry: '', cvc: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 3));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const handleFinalize = () => {
    setIsFinishing(true);
    setTimeout(() => {
      clearCart();
      setIsFinishing(false);
      onComplete();
    }, 2000);
  };

  if (isFinishing) {
    return (
      <div className="checkout-processing">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="processing-content"
        >
          <div className="spinner"></div>
          <h2>Processing Order...</h2>
          <p>Hang tight! We're sending your order to the kitchen.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="checkout-wizard glass fade-in">
      <div className="wizard-progress">
        {STEPS.map(step => (
          <div key={step.id} className={`step-item ${currentStep >= step.id ? 'active' : ''}`}>
            <div className="step-icon">
              {currentStep > step.id ? <CheckCircle size={20} /> : <step.icon size={20} />}
            </div>
            <span>{step.title}</span>
            {step.id !== 3 && <div className="step-line"></div>}
          </div>
        ))}
      </div>

      <div className="wizard-body">
        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <motion.div 
              key="step1"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              className="step-content"
            >
              <h3>Delivery Details</h3>
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="John Doe" />
              </div>
              <div className="form-group">
                <label>Street Address</label>
                <input type="text" name="street" value={formData.street} onChange={handleInputChange} placeholder="123 Main St" />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>City</label>
                  <input type="text" name="city" value={formData.city} onChange={handleInputChange} placeholder="San Francisco" />
                </div>
                <div className="form-group">
                  <label>Zip Code</label>
                  <input type="text" name="zip" value={formData.zip} onChange={handleInputChange} placeholder="94103" />
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div 
              key="step2"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              className="step-content"
            >
              <h3>Payment Method</h3>
              <div className="card-mock">
                <CreditCard size={24} />
                <span>Credit / Debit Card</span>
              </div>
              <div className="form-group">
                <label>Card Number</label>
                <input type="text" name="cardNumber" value={formData.cardNumber} onChange={handleInputChange} placeholder="0000 0000 0000 0000" />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Expiry Date</label>
                  <input type="text" name="expiry" value={formData.expiry} onChange={handleInputChange} placeholder="MM/YY" />
                </div>
                <div className="form-group">
                  <label>CVC</label>
                  <input type="text" name="cvc" value={formData.cvc} onChange={handleInputChange} placeholder="123" />
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div 
              key="step3"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              className="step-content"
            >
              <h3>Order Summary</h3>
              <div className="summary-list">
                {cart.map(item => (
                  <div key={item.id} className="summary-item">
                    <span>{item.quantity}x {item.name}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="delivery-card">
                <Home size={18} />
                <div>
                  <p><strong>Deliver to:</strong></p>
                  <p>{formData.name}</p>
                  <p>{formData.street}, {formData.city} {formData.zip}</p>
                </div>
              </div>
              <div className="final-total">
                <span>Amount to Pay</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="wizard-footer">
        <button className="white-btn" onClick={prevStep} disabled={currentStep === 1}>
          <ChevronLeft size={20} />
          Back
        </button>
        {currentStep < 3 ? (
          <button className="primary-btn" onClick={nextStep} disabled={!formData.name || !formData.street}>
            Next Step
            <ChevronRight size={20} />
          </button>
        ) : (
          <button className="primary-btn finalize" onClick={handleFinalize}>
            <PackageCheck size={20} />
            Place Order
          </button>
        )}
      </div>
    </div>
  );
};

export default CheckoutWizard;
