"use client";

import React, { useState, useEffect } from 'react';
import './Services.css';

const servicesData = [
  {
    title: 'Gas Refill',
    description: 'Fast and secure refilling of your empty gas cylinders. Delivered quickly directly to your home.',
    images: [
      '/gas-5.jpg',
      '/gas-6.jpg'
    ],
  },
  {
    title: 'Cylinder Purchase',
    description: 'Buy brand new, certified safe gas cylinders of any size. Tested and guaranteed.',
    images: [
      '/gas-7.jpg',
      '/gas-8.jpg'
    ],
  },
  {
    title: 'Consultation & Support',
    description: 'Expert advice on gas usage, safety checks, and commercial vendor onboarding.',
    images: [
      '/gas-9.jpg',
      '/gas.jpg'
    ],
  }
];

const ServiceCarousel = ({ images, title, delayMs }: { images: string[], title: string, delayMs: number }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;

    const timeout = setTimeout(() => {
      timer = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 3000);
    }, delayMs);

    return () => {
      clearTimeout(timeout);
      if (timer) clearInterval(timer);
    };
  }, [images.length, delayMs]);

  return (
    <div className="service-img-wrapper">
      {images.map((img, idx) => (
        <img
          key={idx}
          src={img}
          alt={`${title} - ${idx + 1}`}
          className={`service-img ${idx === currentIndex ? 'active' : ''}`}
        />
      ))}
      <div className="service-img-overlay"></div>
    </div>
  );
};

const Services = () => {
  return (
    <section id="services" className="section services-section">
      <div className="container">
        <h2 className="section-title">Our Services</h2>
        <p className="section-subtitle">Comprehensive LPG solutions for homes and businesses</p>
        <div className="services-grid">
          {servicesData.map((service, index) => (
            <div className="service-card glass-panel" key={index}>
              <ServiceCarousel images={service.images} title={service.title} delayMs={index * 500} />
              <div className="service-content">
                <h3 className="service-title">{service.title}</h3>
                <p className="service-desc">{service.description}</p>
                <a href="#contact" className="service-link">View Details &rarr;</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
