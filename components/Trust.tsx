import React from 'react';
import './Trust.css';

const testimonials = [
  {
    name: 'Sarah O.',
    role: 'Homeowner',
    review: 'GasPoint is a lifesaver! I ran out of gas while cooking dinner, and they delivered a refill in just 20 minutes.',
    rating: 5
  },
  {
    name: 'Chef Michael',
    role: 'Restaurant Owner',
    review: 'We rely on GasPoint for our daily bulk gas needs. Their delivery is punctual, and their vendors are professional.',
    rating: 5
  },
  {
    name: 'Aisha T.',
    role: 'Student',
    review: 'The app is so easy to use, and I love that I can pay securely with my card before delivery.',
    rating: 4
  }
];

const Trust = () => {
  return (
    <section id="trust" className="section trust">
      <div className="container">
        <h2 className="section-title">Trusted By Thousands</h2>
        <p className="section-subtitle">See what our customers have to say</p>
        
        <div className="stats-container glass-panel">
          <div className="stat">
            <h3>10k+</h3>
            <p>Happy Customers</p>
          </div>
          <div className="stat">
            <h3>15 Mins</h3>
            <p>Avg. Delivery Time</p>
          </div>
          <div className="stat">
            <h3>500+</h3>
            <p>Verified Vendors</p>
          </div>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((test, idx) => (
            <div key={idx} className="testimonial-card glass-panel">
              <div className="stars">
                {'⭐'.repeat(test.rating)}
              </div>
              <p className="review-text">"{test.review}"</p>
              <div className="reviewer">
                <h4>{test.name}</h4>
                <p>{test.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Trust;
