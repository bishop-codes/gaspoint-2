"use client";

import React, { useState } from 'react';
import './ServicesDetail.css';

const detailedServices = [
  {
    title: 'Precision Gas Refill',
    desc: 'Get your cylinder filled to its exact weight specifications. We support all cylinder types, brands, and valve variants (screw-on, clip-on). Each refill undergoes standard pressure & safety leak tests.',
    features: ['Accurate weights guaranteed', 'Safety cap replacement', 'Rider-conducted kitchen leak check', 'Express 30-min dispatch'],
    icon: '🔄',
    tag: 'Popular'
  },
  {
    title: 'Certified Cylinder Purchases',
    desc: 'Purchase brand-new, premium cylinders directly from certified manufacturers. Our cylinders are manufactured under strict international safety guidelines (ISO, SON) to ensure maximum impact resistance.',
    features: ['High-tensile steel bodies', 'Anti-corrosion coating', 'Fitted with standard safety valves', 'Free first filling included'],
    icon: '📦',
    tag: 'Best Value'
  },
  {
    title: 'Complete Accessories Supply',
    desc: 'Keep your kitchen safe by regularly replacing your gas hoses and regulators. We supply heavy-duty, leak-proof regulators, high-pressure reinforced hoses, and stainless steel secure safety clips.',
    features: ['High-durability safety hoses', 'Anti-leak auto-shutoff regulators', 'Professional installation by riders', 'Standard safety guidelines packet'],
    icon: '⚙️',
    tag: 'Safety First'
  },
  {
    title: 'Commercial & Bulk Supply',
    desc: 'Customized LPG supply plans for restaurants, bakeries, hotels, and schools. We offer high-volume delivery discounts, dedicated dispatch schedules, bulk storage tanks maintenance, and fast emergency refills.',
    features: ['Dedicated account managers', 'Priority emergency delivery', 'Quarterly safety compliance checks', 'Flexible monthly invoice settlement'],
    icon: '🏭',
    tag: 'Enterprise'
  }
];

const servicePlans = [
  {
    name: 'Starter Plan',
    price: '₦4,500',
    desc: 'Perfect for students and small apartments.',
    cylinderSize: '5kg Gas Refill',
    benefits: ['Delivery within 45 mins', 'Post-refill safety check', 'Pay on delivery supported', 'Digital receipting'],
    accent: false
  },
  {
    name: 'Standard Family Plan',
    price: '₦10,500',
    desc: 'The best option for typical residential homes.',
    cylinderSize: '12.5kg Gas Refill',
    benefits: ['Express 30-min delivery', 'Premium safety testing', '10% discount on next refill', 'Dedicated priority support'],
    accent: true
  },
  {
    name: 'Commercial Plan',
    price: 'Custom Price',
    desc: 'Tailored for high-volume restaurants & hotels.',
    cylinderSize: 'Bulk 50kg+ Refills',
    benefits: ['Dedicated dispatch rider', 'Priority emergency booking', 'Monthly invoice terms', 'Free safety auditor inspection'],
    accent: false
  }
];

export default function ServicesDetail() {
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);

  const faqData = [
    {
      q: 'How do you guarantee the weight of the gas cylinder?',
      a: 'All our dispatch riders carry calibrated high-precision portable digital scales. The cylinder is weighed directly in your presence before connection and after filling to guarantee you get exactly what you paid for.'
    },
    {
      q: 'What is your process for safety checks?',
      a: 'Every time we deliver, the rider sprays a customized foaming leak-detection solution over the valve neck, regulator, and hose connections. This bubble test checks for micro-leaks. They also review the hose age to ensure it is not cracked or expired.'
    },
    {
      q: 'Can I exchange my empty cylinder even if it is a different brand?',
      a: 'Yes, absolutely! We accept all standard industry-approved cylinder brands for exchange, provided they are in safe working condition (no major rust, dents, or valve defects).'
    },
    {
      q: 'How often should I change my gas hose and regulator?',
      a: 'Safety standards recommend replacing your flexible LPG hose every 2 to 3 years and your regulator every 5 years. Always use high-quality accessories to prevent safety hazards.'
    }
  ];

  const toggleFAQ = (idx: number) => {
    setActiveFAQ(activeFAQ === idx ? null : idx);
  };

  return (
    <div className="services-detail-container">
      <div className="glow-purple" style={{ top: '25%', left: '-5%' }}></div>
      <div className="glow-purple" style={{ bottom: '10%', right: '-5%' }}></div>

      {/* Hero */}
      <section className="services-hero animate-fade-in">
        <span className="services-badge">Full Catalogue</span>
        <h1>Comprehensive LPG <span className="highlight-text">Energy Solutions</span></h1>
        <p className="services-sub">
          From precise refills to complete smart gas ecosystems, we provide premium energy products with a 100% safety priority.
        </p>
      </section>

      {/* Detailed Services list */}
      <section className="detailed-services-list">
        {detailedServices.map((service, idx) => (
          <div key={idx} className="service-detail-item glass-panel">
            <div className="serv-badge-wrap">
              <span className="serv-icon">{service.icon}</span>
              <span className="serv-tag glass">{service.tag}</span>
            </div>
            <h2>{service.title}</h2>
            <p>{service.desc}</p>
            <ul className="serv-bullet-list">
              {service.features.map((feat, fIdx) => (
                <li key={fIdx}>🛡️ {feat}</li>
              ))}
            </ul>
            <a href="/order" className="btn-secondary service-item-cta">Book Service Now</a>
          </div>
        ))}
      </section>

      {/* Pricing / Packages */}
      <section className="pricing-section">
        <h2 className="section-title">Popular Refill <span className="highlight-text">Packages</span></h2>
        <p className="section-subtitle">Choose a suitable package that matches your domestic or commercial gas demand.</p>

        <div className="pricing-grid">
          {servicePlans.map((plan, idx) => (
            <div key={idx} className={`pricing-card glass-panel ${plan.accent ? 'accent-plan' : ''}`}>
              {plan.accent && <span className="popular-plan-badge">Most Popular</span>}
              <h3>{plan.name}</h3>
              <p className="plan-desc">{plan.desc}</p>
              
              <div className="plan-price highlight-text">{plan.price}</div>
              <div className="plan-size glass">{plan.cylinderSize}</div>

              <ul className="plan-benefits">
                {plan.benefits.map((benefit, bIdx) => (
                  <li key={bIdx}>✨ {benefit}</li>
                ))}
              </ul>

              <a href="/order" className={`btn-primary plan-btn ${!plan.accent ? 'glass' : ''}`}>
                Select Package
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* FAQs */}
      <section className="faq-section glass-panel">
        <h2 className="faq-title">Frequently Asked Questions</h2>
        <p className="faq-sub">Everything you need to know about safety, weights, and deliveries.</p>
        
        <div className="faq-list">
          {faqData.map((faq, idx) => (
            <div key={idx} className={`faq-item glass ${activeFAQ === idx ? 'open' : ''}`} onClick={() => toggleFAQ(idx)}>
              <div className="faq-question">
                <h3>{faq.q}</h3>
                <span className="faq-arrow">{activeFAQ === idx ? '▲' : '▼'}</span>
              </div>
              <div className="faq-answer">
                <p>{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
