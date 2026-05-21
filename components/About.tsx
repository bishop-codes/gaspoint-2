"use client";

import React, { useState, useEffect } from 'react';
import CountUp from './CountUp';
import './About.css';

const aboutImages = [
  '/gold (2).jpg',
  '/gold (7).jpg',
  '/gold (10).jpg'
];

const AboutCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % aboutImages.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="about-image-wrapper glass-panel">
      {aboutImages.map((img, idx) => (
        <img
          key={idx}
          src={img}
          alt={`Aurum Gold Miners Operations - ${idx + 1}`}
          className={`about-image ${idx === currentIndex ? 'active' : ''}`}
        />
      ))}
    </div>
  );
};

const About = () => {
  return (
    <section id="about" className="section about-section">
      <div className="container">
        <div className="about-content">
          <div className="about-text">
            <h2 className="section-title about-title" style={{ textAlign: 'left', marginBottom: '2rem' }}>About Aurum Miners</h2>
            <p className="about-desc">
              Exceptional gold mining and trading company located in Mali. If you are looking forward to investing in the gold business in Africa in general and Mali in particular, <strong>AURUM MINERS</strong> is your perfect partner.
            </p>
            <p className="about-desc">
              We are an indigenous artisanal mining company registered and operating since 1992, specializing in the mining of non-ferrous metals like gold, and dealing primarily in gold dust and gold bars.
            </p>
            <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))' }}>
              <div className="stat-item glass-panel">
                <h3><CountUp end={1992} suffix="" /></h3>
                <p>Established</p>
              </div>
              <div className="stat-item glass-panel">
                <h3><CountUp end={100} suffix="%" /></h3>
                <p>Purity</p>
              </div>
              <div className="stat-item glass-panel">
                <h3><CountUp end={500} suffix="+" /></h3>
                <p>Clients Worldwide</p>
              </div>
              <div className="stat-item glass-panel">
                <h3><CountUp end={30} suffix="+" /></h3>
                <p>Years Experience</p>
              </div>
            </div>
          </div>
          <AboutCarousel />
        </div>
      </div>
    </section>
  );
};

export default About;
