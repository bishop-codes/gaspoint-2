import React from 'react';
import './Contact.css';

const Contact = () => {
  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        <h2 className="section-title">Get In Touch</h2>
        <div className="contact-wrapper">
          <div className="contact-info glass-panel">
            <h3>Contact Information</h3>
            <p>Reach out to us for inquiries, quotes, and expert gold mining services.</p>
            
            <div className="info-item">
              <span className="info-label">Head Office:</span>
              <p>Bamako Quartier-Kalaban Coura.<br />420: Porte 33. Mali</p>
            </div>
            
            <div className="info-item">
              <span className="info-label">Email:</span>
              <p><a href="mailto:info@aurumgoldminers.com">info@aurumgoldminers.com</a></p>
            </div>
            
            <div className="info-item">
              <span className="info-label">Phone:</span>
              <p>+223 61 92 15 67<br />+223 68 33 50 50</p>
            </div>
          </div>
          
          <div className="contact-form glass-panel">
            <form>
              <div className="form-group">
                <input type="text" placeholder="Your Name" required className="form-control" />
              </div>
              <div className="form-group">
                <input type="email" placeholder="Your Email" required className="form-control" />
              </div>
              <div className="form-group">
                <input type="text" placeholder="Subject" required className="form-control" />
              </div>
              <div className="form-group">
                <textarea placeholder="Your Message" rows={5} required className="form-control"></textarea>
              </div>
              <button type="submit" className="btn-primary" style={{ width: '100%' }}>Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
