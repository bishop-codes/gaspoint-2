import React from 'react';
import './Features.css';

const features = [
  {
    title: 'Fast LPG Delivery',
    description: 'Get your cooking gas delivered within 30 minutes. No delays, no excuses.',
    icon: '⚡'
  },
  {
    title: 'Secure Payments',
    description: 'Pay safely via card, mobile money, or cash on delivery. 100% secure.',
    icon: '🔒'
  },
  {
    title: 'Verified Vendors',
    description: 'All our gas stations and vendors undergo strict quality and safety checks.',
    icon: '✅'
  },
  {
    title: 'Real-time Tracking',
    description: 'Track your delivery rider in real-time from the station to your doorstep.',
    icon: '📍'
  }
];

const Features = () => {
  return (
    <section id="features" className="section features">
      <div className="container">
        <h2 className="section-title">Why Choose GasPoint</h2>
        <p className="section-subtitle">We bring convenience to your kitchen with top-notch services</p>
        
        <div className="features-grid">
          {features.map((feature, idx) => (
            <div key={idx} className="feature-card glass-panel animate-fade-in delay-100">
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
