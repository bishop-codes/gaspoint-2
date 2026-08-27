"use client";

import React, { useState } from 'react';
import './OrderGas.css';

const cylinderSizes = [
  { size: '5kg', price: 4500, desc: 'Perfect for small families & students', icon: '🔋' },
  { size: '12.5kg', price: 10500, desc: 'Standard residential size, long lasting', icon: '🛢️' },
  { size: '25kg', price: 21000, desc: 'Ideal for large families & heavy users', icon: '🚀' },
  { size: '50kg', price: 41000, desc: 'Commercial grade for restaurants & hotels', icon: '🏭' },
];

export default function OrderGas() {
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'paystack'>('cod');
  const [selectedSize, setSelectedSize] = useState(cylinderSizes[1]); // Default 12.5kg
  const [orderType, setOrderType] = useState('refill'); // refill, new, accessories
  const [quantity, setQuantity] = useState(1);
  const [accessories, setAccessories] = useState({
    regulator: false,
    hose: false,
    clips: false,
  });
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    timeSlot: 'immediate',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getAccessoryPrice = () => {
    let price = 0;
    if (accessories.regulator) price += 3500;
    if (accessories.hose) price += 2000;
    if (accessories.clips) price += 500;
    return price;
  };

  const getBasePrice = () => {
    let base = selectedSize.price;
    if (orderType === 'new') {
      // brand new cylinder includes cost of cylinder metal
      base += selectedSize.size === '5kg' ? 12000 : selectedSize.size === '12.5kg' ? 22000 : selectedSize.size === '25kg' ? 38000 : 65000;
    }
    return base * quantity;
  };

  const getDeliveryFee = () => 1500;

  const getTotalPrice = () => getBasePrice() + getAccessoryPrice() + getDeliveryFee();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const toggleAccessory = (acc: 'regulator' | 'hose' | 'clips') => {
    setAccessories({
      ...accessories,
      [acc]: !accessories[acc],
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address) {
      alert('Please fill in all required fields.');
      return;
    }
    // If user chose online payment, start Paystack flow
    if (paymentMethod === 'paystack') {
      startPaystackPayment();
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 2000);
  };

  const loadPaystackScript = () => {
    return new Promise<void>((resolve) => {
      if (typeof window === 'undefined') return resolve();
      if ((window as any).PaystackPop) return resolve();
      const script = document.createElement('script');
      script.src = 'https://js.paystack.co/v1/inline.js';
      script.async = true;
      script.onload = () => resolve();
      document.body.appendChild(script);
    });
  };

  const startPaystackPayment = async () => {
    const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || '';
    if (!publicKey) {
      alert('Payment not configured. Missing public key.');
      return;
    }

    await loadPaystackScript();

    const amountKobo = Math.round(getTotalPrice() * 100);
    // Paystack requires an email - use phone fallback if email not collected
    const userEmail = (formData as any).email || `${formData.phone.replace(/\s+/g, '')}@example.com`;

    setIsSubmitting(true);

    const handler = (window as any).PaystackPop.setup({
      key: publicKey,
      email: userEmail,
      amount: amountKobo,
      currency: 'NGN',
      ref: `GP-${Date.now()}`,
      metadata: {
        custom_fields: [
          { display_name: 'Customer Name', variable_name: 'customer_name', value: formData.name },
          { display_name: 'Phone', variable_name: 'phone', value: formData.phone },
        ],
      },
      callback: async (response: any) => {
        try {
          const laravelUrl = process.env.NEXT_PUBLIC_LARAVEL_URL || '';
          const verifyEndpoint = laravelUrl ? `${laravelUrl.replace(/\/$/, '')}/api/paystack/verify` : '/api/paystack/verify';
          const verifyRes = await fetch(verifyEndpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ reference: response.reference, email: formData.email }),
          });
          const verifyJson = await verifyRes.json();
          if (verifyRes.ok && verifyJson.data && verifyJson.data.status === 'success') {
            setIsSubmitted(true);
          } else {
            alert('Payment verification failed.');
          }
        } catch (err) {
          alert('Payment verification error');
        } finally {
          setIsSubmitting(false);
        }
      },
      onClose: () => {
        setIsSubmitting(false);
        alert('Payment window closed.');
      },
    });

    handler.openIframe();
  };

  return (
    <div className="order-gas-container">
      <div className="glow-purple" style={{ top: '-10%', left: '5%' }}></div>
      <div className="glow-purple" style={{ bottom: '10%', right: '5%' }}></div>

      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className="order-form-grid animate-fade-in">
          <div className="order-details-section">
            <h1 className="order-title">Order <span className="highlight-text">Cooking Gas</span></h1>
            <p className="order-subtitle">Get your safe, premium LPG delivered at your doorstep in minutes.</p>

            {/* Step 1: Cylinder Size */}
            <div className="form-group-panel glass-panel">
              <span className="step-badge">Step 1</span>
              <h3>Select Cylinder Size</h3>
              <div className="cylinder-grid">
                {cylinderSizes.map((item) => (
                  <div
                    key={item.size}
                    className={`cylinder-card glass ${selectedSize.size === item.size ? 'active' : ''}`}
                    onClick={() => setSelectedSize(item)}
                  >
                    <div className="cyl-icon">{item.icon}</div>
                    <div className="cyl-size">{item.size}</div>
                    <div className="cyl-price">₦{item.price.toLocaleString()}</div>
                    <div className="cyl-desc">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 2: Order Type */}
            <div className="form-group-panel glass-panel">
              <span className="step-badge">Step 2</span>
              <h3>Select Service Type</h3>
              <div className="order-type-selector">
                <button
                  type="button"
                  className={`type-btn glass ${orderType === 'refill' ? 'active' : ''}`}
                  onClick={() => setOrderType('refill')}
                >
                  <strong>🔄 Gas Refill Only</strong>
                  <small>Exchange empty cylinder for full one</small>
                </button>
                <button
                  type="button"
                  className={`type-btn glass ${orderType === 'new' ? 'active' : ''}`}
                  onClick={() => setOrderType('new')}
                >
                  <strong>📦 New Cylinder + Gas</strong>
                  <small>Buy a brand new filled cylinder</small>
                </button>
              </div>
            </div>

            {/* Step 3: Quantity & Accessories */}
            <div className="form-group-panel glass-panel">
              <span className="step-badge">Step 3</span>
              <h3>Quantity & Accessories</h3>
              <div className="qty-accessories-flex">
                <div className="qty-selector">
                  <label>Quantity</label>
                  <div className="qty-controls">
                    <button
                      type="button"
                      className="glass qty-btn"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      -
                    </button>
                    <span className="qty-val">{quantity}</span>
                    <button
                      type="button"
                      className="glass qty-btn"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="accessories-section">
                  <label>Need Accessories?</label>
                  <div className="accessories-grid">
                    <div
                      className={`accessory-card glass ${accessories.regulator ? 'active' : ''}`}
                      onClick={() => toggleAccessory('regulator')}
                    >
                      <input type="checkbox" checked={accessories.regulator} readOnly />
                      <div>
                        <strong>Regulator (₦3,500)</strong>
                        <small>Heavy duty, anti-leak</small>
                      </div>
                    </div>
                    <div
                      className={`accessory-card glass ${accessories.hose ? 'active' : ''}`}
                      onClick={() => toggleAccessory('hose')}
                    >
                      <input type="checkbox" checked={accessories.hose} readOnly />
                      <div>
                        <strong>Hose (₦2,000)</strong>
                        <small>Reinforced 1.5m pipe</small>
                      </div>
                    </div>
                    <div
                      className={`accessory-card glass ${accessories.clips ? 'active' : ''}`}
                      onClick={() => toggleAccessory('clips')}
                    >
                      <input type="checkbox" checked={accessories.clips} readOnly />
                      <div>
                        <strong>Safety Clips (₦500)</strong>
                        <small>Pair of secure steel clips</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4: Delivery Details */}
            <div className="form-group-panel glass-panel">
              <span className="step-badge">Step 4</span>
              <h3>Delivery & Contact Information</h3>
              <div className="delivery-form">
                <div className="form-row">
                  <div className="input-field">
                    <label htmlFor="name">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      placeholder="John Doe"
                      className="glass"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="input-field">
                    <label htmlFor="phone">Phone Number *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      placeholder="e.g. +234 9123144580"
                      className="glass"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="input-field">
                  <label htmlFor="address">Delivery Address *</label>
                  <textarea
                    id="address"
                    name="address"
                    required
                    placeholder="Enter your street address, apartment number, and city..."
                    className="glass"
                    rows={3}
                    value={formData.address}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
                <div className="input-field">
                  <label htmlFor="timeSlot">Delivery Schedule</label>
                  <select
                    id="timeSlot"
                    name="timeSlot"
                    className="glass"
                    value={formData.timeSlot}
                    onChange={handleInputChange}
                  >
                    <option value="immediate">Immediate Delivery (Under 30 Mins)</option>
                    <option value="morning">Morning (8:00 AM - 12:00 PM)</option>
                    <option value="afternoon">Afternoon (12:00 PM - 4:00 PM)</option>
                    <option value="evening">Evening (4:00 PM - 8:00 PM)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="order-summary-section">
            <div className="summary-card glass-panel sticky-summary">
              <h3>Order Summary</h3>
              <hr className="summary-divider" />
              
              <div className="summary-row">
                <span>
                  {selectedSize.size} Cylinder ({orderType === 'refill' ? 'Refill' : 'New Cylinder'}) x {quantity}
                </span>
                <span>₦{getBasePrice().toLocaleString()}</span>
              </div>

              {accessories.regulator && (
                <div className="summary-row sub-row">
                  <span>🛡️ Safety Regulator</span>
                  <span>₦3,500</span>
                </div>
              )}
              {accessories.hose && (
                <div className="summary-row sub-row">
                  <span>🔌 Reinforced Hose</span>
                  <span>₦2,000</span>
                </div>
              )}
              {accessories.clips && (
                <div className="summary-row sub-row">
                  <span>📎 Steel Clips</span>
                  <span>₦500</span>
                </div>
              )}

              <div className="summary-row">
                <span>🚚 Flat Delivery Fee</span>
                <span>₦{getDeliveryFee().toLocaleString()}</span>
              </div>

              <hr className="summary-divider" />

              <div className="summary-row total-row">
                <span>Grand Total</span>
                <span className="highlight-text">₦{getTotalPrice().toLocaleString()}</span>
              </div>

              <div className="payment-method-selector">
                <p>Choose Payment Method</p>
                <div className="pay-methods">
                  <label className="pay-option glass">
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                    />
                    <span>Cash on Delivery</span>
                  </label>
                  <label className="pay-option glass">
                    <input
                      type="radio"
                      name="payment"
                      value="paystack"
                      checked={paymentMethod === 'paystack'}
                      onChange={() => setPaymentMethod('paystack')}
                    />
                    <span>Card / Mobile Money</span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="btn-primary checkout-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="spinner">Processing...</span>
                ) : (
                  `Place Delivery Order`
                )}
              </button>

              <div className="security-assurance">
                🔒 Safe & secure delivery guaranteed by GasPoint. All riders are equipped with gas leak detectors for post-refill safety inspections.
              </div>
            </div>
          </div>
        </form>
      ) : (
        <div className="order-success-screen glass-panel animate-fade-in">
          <div className="success-icon">🎉</div>
          <h2>Order Placed Successfully!</h2>
          <p className="success-order-id">Order ID: <strong>GP-{Math.floor(100000 + Math.random() * 900000)}</strong></p>
          <div className="success-details glass">
            <p>Thank you, <strong>{formData.name}</strong>!</p>
            <p>Your order for a <strong>{selectedSize.size} {orderType === 'refill' ? 'Refill' : 'New Cylinder'} ({quantity}x)</strong> has been received.</p>
            <p>We are dispatching a rider to: <br /><em style={{ color: 'var(--text-secondary)' }}>{formData.address}</em></p>
            <p>Estimated Delivery Time: <strong>{formData.timeSlot === 'immediate' ? 'Within 30 minutes' : formData.timeSlot === 'morning' ? 'Tomorrow Morning (8am - 12pm)' : formData.timeSlot === 'afternoon' ? 'This Afternoon (12pm - 4pm)' : 'This Evening (4pm - 8pm)'}</strong></p>
          </div>
          <p className="tracking-text">A tracking link has been sent to <strong>{formData.phone}</strong>. You can monitor your rider in real time.</p>
          <a href="/" className="btn-primary success-home-btn">Return to Home</a>
        </div>
      )}
    </div>
  );
}
