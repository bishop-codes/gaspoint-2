"use client";

import React, { useState } from 'react';
import './FeaturesDetail.css';

const detailedFeatures = [
  {
    title: 'Precision Express Logistics',
    subtitle: 'Under 30 Minutes Average Delivery',
    desc: 'Our proprietary dispatch algorithm routes the nearest rider to your home instantly. With specialized LPG carriers and optimized logistics hubs, we guarantee your gas is delivered hot-on-the-heels of your order.',
    bulletPoints: [
      'Smart rider-dispatch system',
      'Specialized, secure gas safety bags',
      'Real-time traffic-avoidance routing',
    ],
    icon: '⚡',
  },
  {
    title: 'Grade-A Security & Compliance',
    subtitle: 'Strict Quality Control & Testing',
    desc: 'Safety is our absolute priority. We partner exclusively with certified, high-grade gas plants. Every single cylinder is inspected for micro-leaks, rust, pressure anomalies, and valve safety before leaving our bay.',
    bulletPoints: [
      'Multi-point safety checklist on every dispatch',
      'Certified high-quality LPG (pure butane/propane mix)',
      'Compliant with standard weights and measures',
    ],
    icon: '🛡️',
  },
  {
    title: 'Transparent Live Tracking',
    subtitle: 'Full Visibility From Station to Door',
    desc: 'No more waiting and wondering. Follow your gas cylinder live on a Map. Get access to the rider’s profile, phone number, and see their exact visual progress in real-time as they make their way to you.',
    bulletPoints: [
      'Precise GPS-enabled tracking',
      'Direct rider communication channel',
      'Automated ETA notifications',
    ],
    icon: '📍',
  },
  {
    title: 'Flexible & Secure Payments',
    subtitle: 'Encrypted Digital Checkouts',
    desc: 'We support local payment networks seamlessly. Choose Card, Mobile Bank Transfers, Apple/Google Pay, or simply pay Cash on Delivery after inspecting the cylinder safety levels.',
    bulletPoints: [
      '100% PCI-DSS compliant secure portal',
      'Automated digital invoice sent to your email',
      'Flexible wallet system with cashback rewards',
    ],
    icon: '🔒',
  }
];

export default function FeaturesDetail() {
  // Gas Usage Calculator state
  const [familySize, setFamilySize] = useState(2);
  const [cookingFrequency, setCookingFrequency] = useState('medium'); // low, medium, high

  const calculateGasLifetime = () => {
    let baseDays = 45; // baseline for 12.5kg for 2 people with medium cooking
    
    // adjust for family size
    if (familySize === 1) baseDays = 75;
    else if (familySize === 2) baseDays = 45;
    else if (familySize === 3 || familySize === 4) baseDays = 25;
    else baseDays = 14;

    // adjust for cooking frequency
    if (cookingFrequency === 'low') baseDays = Math.round(baseDays * 1.4);
    else if (cookingFrequency === 'high') baseDays = Math.round(baseDays * 0.7);

    return {
      days: baseDays,
      recCylinder: baseDays < 20 ? '25kg' : baseDays > 50 ? '5kg' : '12.5kg',
    };
  };

  const calcResult = calculateGasLifetime();

  return (
    <div className="features-detail-container">
      <div className="glow-purple" style={{ top: '15%', right: '-10%' }}></div>
      <div className="glow-purple" style={{ bottom: '15%', left: '-10%' }}></div>

      {/* Header */}
      <section className="features-hero animate-fade-in">
        <span className="features-badge">Core Capabilities</span>
        <h1>Why GasPoint Leads in <span className="highlight-text">LPG Innovation</span></h1>
        <p className="features-sub">
          We combine cutting-edge tech with safe, seamless physical logistics to redefine how you fuel your home.
        </p>
      </section>

      {/* Detailed Columns */}
      <section className="features-columns-section">
        {detailedFeatures.map((feat, idx) => (
          <div key={idx} className="feat-col-item glass-panel">
            <div className="feat-col-header">
              <span className="feat-col-icon">{feat.icon}</span>
              <div>
                <h2>{feat.title}</h2>
                <small className="highlight-text">{feat.subtitle}</small>
              </div>
            </div>
            <p className="feat-col-desc">{feat.desc}</p>
            <ul className="feat-col-list">
              {feat.bulletPoints.map((bullet, bIdx) => (
                <li key={bIdx}>✨ {bullet}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* Premium Interactive Widget: Gas Calculator */}
      <section className="calculator-section glass-panel">
        <div className="calc-text">
          <h2>Gas Usage <span className="highlight-text">Smart Estimator</span></h2>
          <p>Not sure what cylinder size is ideal for you? Use our smart estimator to predict your monthly consumption and choose the most cost-effective option.</p>
          
          <div className="calc-controls">
            <div className="calc-input">
              <label>Family Size (People)</label>
              <div className="family-selector">
                {[1, 2, 4, 6].map((num) => (
                  <button
                    key={num}
                    className={`glass ${familySize === num ? 'active' : ''}`}
                    onClick={() => setFamilySize(num)}
                  >
                    {num === 6 ? '6+' : num}
                  </button>
                ))}
              </div>
            </div>

            <div className="calc-input">
              <label>Cooking Intensity</label>
              <div className="freq-selector">
                {['low', 'medium', 'high'].map((freq) => (
                  <button
                    key={freq}
                    className={`glass ${cookingFrequency === freq ? 'active' : ''}`}
                    onClick={() => setCookingFrequency(freq)}
                  >
                    {freq.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="calc-result-box glass">
          <h3>Estimated Cylinder Lifespan</h3>
          <small>(Based on Standard 12.5kg Cylinder)</small>
          
          <div className="result-number highlight-text">
            {calcResult.days} <span>Days</span>
          </div>

          <p className="result-advice">
            A 12.5kg cylinder will last you approximately <strong>{Math.round(calcResult.days / 7)} weeks</strong>.
          </p>

          <div className="recommendation">
            <span>Recommended Cylinder:</span>
            <strong>{calcResult.recCylinder}</strong>
          </div>

          <a href="/order" className="btn-primary calc-order-btn">Order Recommended Size</a>
        </div>
      </section>

      {/* Safety Commitment banner */}
      <section className="safety-commitment glass-panel">
        <div className="safety-badge-large">🛡️</div>
        <h2>Our Absolute Safety Guarantee</h2>
        <p>
          Every delivery rider is trained in LPG safety standards and carries a calibrated portable gas leak detector. Upon refilling/connecting your cylinder, they perform a comprehensive safety leak-test on your regulator, hose, and cylinder neck to guarantee 100% leak-free operations.
        </p>
        <div className="safety-badges-row">
          <span className="glass">✓ ISO 9001 Certified</span>
          <span className="glass">✓ SON Approved</span>
          <span className="glass">✓ Safety-Insured Deliveries</span>
        </div>
      </section>
    </div>
  );
}
