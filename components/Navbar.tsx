"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef<HTMLUListElement>(null);
  const menuIconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        menuIconRef.current &&
        !menuIconRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="navbar glass">
      <div className="navbar-container">
        <div className="logo">
          <Link href="/" className="logo-link">
            <span className="logo-text">Gas<span className="logo-highlight">Point</span></span>
          </Link>
        </div>
        
        <div className={`menu-icon ${isOpen ? 'open' : ''}`} onClick={toggleMenu} ref={menuIconRef}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <ul className={`nav-links ${isOpen ? 'active' : ''}`} ref={sidebarRef}>
          <li><Link href="/" onClick={closeMenu}>Home</Link></li>
          <li><Link href="/features" onClick={closeMenu}>Features</Link></li>
          <li><Link href="/services" onClick={closeMenu}>Services</Link></li>
          <li><Link href="/download" onClick={closeMenu}>App</Link></li>
          <li><Link href="/order" className="btn-primary btn-small" onClick={closeMenu}>Order Gas</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
