"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import './Hero.css';

const heroImages = [
  '/gas.jpg',
  '/gas-2.jpg',
  '/gas-3.jpg',
  '/gas-4.jpg'
];

const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" className="hero">
      {heroImages.map((img, idx) => (
        <div
          key={idx}
          className={`hero-bg-image ${idx === currentImage ? 'active' : ''}`}
          style={{ backgroundImage: `url("${img}")` }}
        />
      ))}
      <div className="hero-overlay"></div>
      <div className="hero-content container animate-fade-in">
        <div className="glow-purple" style={{ top: '-10%', left: '-5%' }}></div>
        <h2 className="hero-subtitle">FAST & SECURE</h2>
        <h1 className="hero-title">NEVER RUN OUT OF GAS</h1>
        <h3 className="hero-tagline">DELIVERY IN MINUTES</h3>
        <p className="hero-description">
          GasPoint provides fast, reliable, and secure cooking gas delivery right to your doorstep. Experience real-time tracking and verified vendors for peace of mind.
        </p>
        <div className="hero-cta">
          <Link href="/order" className="btn-primary">Order Gas Now</Link>
          <Link href="/download" className="btn-secondary glass">Download App</Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
