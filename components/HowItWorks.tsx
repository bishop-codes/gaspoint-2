import React from 'react';
import './HowItWorks.css';

const steps = [
  {
    step: '01',
    title: 'Select Gas Size',
    description: 'Choose from 3kg, 6kg, 12.5kg, or 50kg cylinder sizes depending on your need.'
  },
  {
    step: '02',
    title: 'Choose Location',
    description: 'Enter your delivery address and we will find the closest verified vendor.'
  },
  {
    step: '03',
    title: 'Delivery to Doorstep',
    description: 'Track your order and receive your gas cylinder in record time.'
  }
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="section how-it-works">
      <div className="container">
        <h2 className="section-title">How It Works</h2>
        <p className="section-subtitle">Three simple steps to refill your cylinder</p>
        
        <div className="steps-container">
          {steps.map((step, idx) => (
            <div key={idx} className="step-card">
              <div className="step-number">{step.step}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
