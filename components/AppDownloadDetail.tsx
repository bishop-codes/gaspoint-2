"use client";

import React from 'react';
import './AppDownloadDetail.css';

const appFeatures = [
  {
    title: 'Instant Refills',
    desc: 'Order a gas refill in less than 10 seconds. Save your defaults for a one-tap checkout.',
    icon: '⚡'
  },
  {
    title: 'Live Map Tracking',
    desc: 'See exactly where your dispatch rider is in real-time, along with their ETA and contact info.',
    icon: '📍'
  },
  {
    title: 'Cylinder Leak Alarm',
    desc: 'Sync with our IoT smart safety devices to get leak warnings instantly on your mobile phone.',
    icon: '🚨'
  },
  {
    title: 'Smart Scheduling',
    desc: 'Schedule deliveries when you are free. Weekends, mornings, or late nights—we got you.',
    icon: '📅'
  },
  {
    title: 'In-app Wallet',
    desc: 'Fund your wallet, receive cashback, and enjoy discounts on every single gas transaction.',
    icon: '💳'
  },
  {
    title: 'Cylinder Safety Alerts',
    desc: 'Get reminders when your cylinder is nearing its 5-year safety expiry date to stay protected.',
    icon: '🛡️'
  }
];

export default function AppDownloadDetail() {
  return (
    <div className="app-detail-container">
      <div className="glow-purple" style={{ top: '20%', left: '-10%' }}></div>
      <div className="glow-purple" style={{ bottom: '20%', right: '-10%' }}></div>

      {/* Hero Section */}
      <section className="app-hero animate-fade-in">
        <div className="app-hero-grid">
          <div className="app-hero-text">
            <span className="app-badge">GasPoint Mobile App</span>
            <h1>The Smartest Way to <span className="highlight-text">Manage Cook Gas</span></h1>
            <p>
              Download GasPoint today to experience ultimate convenience in kitchen management. From super-fast refills to real-time safety alerts, keep your household powered without interruptions.
            </p>
            <div className="hero-download-buttons">
              <button className="btn-store-premium glass">
                <span className="store-icon">🍎</span>
                <div className="store-text">
                  <small>Download on the</small>
                  <strong>App Store</strong>
                </div>
              </button>
              <button className="btn-store-premium glass">
                <span className="store-icon">▶️</span>
                <div className="store-text">
                  <small>GET IT ON</small>
                  <strong>Google Play</strong>
                </div>
              </button>
            </div>
            <div className="app-stats">
              <div className="stat-box">
                <h4>4.9 ★</h4>
                <p>App Store Rating</p>
              </div>
              <div className="stat-box">
                <h4>500K+</h4>
                <p>Downloads</p>
              </div>
              <div className="stat-box">
                <h4>15 Mins</h4>
                <p>Avg. Delivery Time</p>
              </div>
            </div>
          </div>

          <div className="app-hero-visual">
            <div className="phone-mockup-premium glass">
              <div className="phone-notch"></div>
              <div className="phone-screen-premium">
                <div className="app-mock-home">
                  <div className="app-mock-header">
                    <span className="greeting">Hi, Bishop!</span>
                    <span className="bell">🔔</span>
                  </div>
                  <div className="app-mock-card glass">
                    <small>Cylinder Level</small>
                    <div className="cylinder-level-flex">
                      <h2>74% Filled</h2>
                      <span className="safe-badge">Safe</span>
                    </div>
                    <div className="level-bar-bg">
                      <div className="level-bar-fill" style={{ width: '74%' }}></div>
                    </div>
                    <p className="level-estimation">Est. 12 days remaining</p>
                  </div>
                  <div className="quick-actions">
                    <div className="action-circle glass">🔄<small>Refill</small></div>
                    <div className="action-circle glass">📦<small>Buy</small></div>
                    <div className="action-circle glass">📍<small>Track</small></div>
                    <div className="action-circle glass">⚙️<small>Support</small></div>
                  </div>
                  <div className="recent-order-panel glass">
                    <div className="order-panel-header">
                      <strong>Active Dispatch</strong>
                      <span className="spinner-dot"></span>
                    </div>
                    <div className="dispatcher-info">
                      <div className="avatar">👤</div>
                      <div>
                        <strong>Babatunde A.</strong>
                        <small>Rider (5 mins away)</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Showcase */}
      <section className="app-showcase-features">
        <h2 className="section-title">Packed with <span className="highlight-text">Powerful Features</span></h2>
        <p className="section-subtitle">Discover the technology that makes GasPoint the premium choice for LPG utilities.</p>

        <div className="app-features-grid">
          {appFeatures.map((feat, idx) => (
            <div key={idx} className="app-feature-card glass-panel">
              <div className="app-feat-icon">{feat.icon}</div>
              <h3>{feat.title}</h3>
              <p>{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it looks screenshots carousel / preview */}
      <section className="app-screens-preview">
        <div className="preview-container glass-panel">
          <div className="preview-content">
            <h2>Experience a Smooth, Beautiful Interface</h2>
            <p>Designed with meticulous attention to detail, using high-fidelity dark glassmorphic styling that is easy on the eyes and extremely fast to navigate.</p>
            <ul className="preview-points">
              <li>✨ Fluid animations and interactive menus</li>
              <li>🌗 Seamless transition between sections</li>
              <li>🛡️ Incredibly robust security and encryption standards</li>
            </ul>
            <a href="/order" className="btn-primary app-order-cta">Order Online Now</a>
          </div>
          <div className="preview-images">
            <div className="floating-bubble glass">🛡️ Safe</div>
            <div className="floating-bubble glass" style={{ bottom: '20px', left: '0' }}>📍 Tracking</div>
            <div className="preview-device glass">
              <div className="device-screen">
                <div className="leak-gauge">
                  <div className="gauge-outer">
                    <div className="gauge-inner">
                      <h2>0.0%</h2>
                      <small>No Leak Detected</small>
                    </div>
                  </div>
                  <p className="gauge-desc">Your home and cylinders are fully secured.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion or reviews */}
      <section className="app-reviews">
        <h2 className="section-title">What Our App Users Say</h2>
        <p className="section-subtitle">Join thousands of households enjoying safe, easy cooking gas management.</p>
        <div className="reviews-grid">
          <div className="review-card glass">
            <div className="rating">⭐⭐⭐⭐⭐</div>
            <p>"Refilling used to be such a headache. Now, I just tap twice on the app and a rider is at my house in 20 minutes. The leak detection checklist is also a gamechanger!"</p>
            <div className="user">
              <strong>Sandra E.</strong>
              <small>Lekki, Lagos</small>
            </div>
          </div>
          <div className="review-card glass">
            <div className="rating">⭐⭐⭐⭐⭐</div>
            <p>"I love the real-time tracking. I can see the rider moving on the map, which means I don't have to wait aimlessly. Very reliable app!"</p>
            <div className="user">
              <strong>Emmanuel O.</strong>
              <small>Ikeja, Lagos</small>
            </div>
          </div>
          <div className="review-card glass">
            <div className="rating">⭐⭐⭐⭐⭐</div>
            <p>"The cylinders are clean, safe, and delivered right inside my kitchen. Highly recommend GasPoint to any family."</p>
            <div className="user">
              <strong>Chioma N.</strong>
              <small>Surulere, Lagos</small>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
