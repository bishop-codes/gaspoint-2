import React from 'react';
import './AppDownload.css';

const AppDownload = () => {
  return (
    <section id="download" className="section app-download">
      <div className="container">
        <div className="download-content glass-panel">
          <div className="download-text">
            <h2>Get GasPoint on Your Phone</h2>
            <p>
              Order cooking gas, track your delivery in real-time, and get exclusive discounts when you use the GasPoint mobile app. Available on iOS and Android.
            </p>
            <div className="app-buttons">
              <button className="btn-store glass">
                <span className="store-icon">🍎</span>
                <div className="store-text">
                  <small>Download on the</small>
                  <strong>App Store</strong>
                </div>
              </button>
              <button className="btn-store glass">
                <span className="store-icon">▶️</span>
                <div className="store-text">
                  <small>GET IT ON</small>
                  <strong>Google Play</strong>
                </div>
              </button>
            </div>
          </div>
          <div className="download-image">
            <div className="phone-mockup glass-panel">
              <div className="phone-screen">
                <div className="mockup-content">
                  <div className="mockup-header">GasPoint</div>
                  <div className="mockup-body">
                    <div className="mockup-box"></div>
                    <div className="mockup-box"></div>
                    <div className="mockup-box"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppDownload;
