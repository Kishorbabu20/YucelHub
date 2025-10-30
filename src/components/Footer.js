// src/components/Footer.js
import React, { useState } from 'react';
import './Footer.css';
import vector from '../assets/Vector.png';
import LinkedInIcon from '../assets/InkedIn Icon.svg';
import MailIcon from '../assets/Mail Icon.svg';
import InstagramIcon from '../assets/InkedIn Icon-1.svg';

const Footer = () => {
  const [hoveredIcon, setHoveredIcon] = useState(null);
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <p className="footer-text">We're committed to your <span className="highlight">comfort</span> and <span className="highlight">satisfaction</span> for unforgettable experience.</p>
          <div className="footer-logo">
            <img src={vector} alt="YucelHub Logo" />
            <span>Yucel<span className="bold-hub">Hub</span></span>
          </div>
        </div>
        <div className="footer-right">
          <div className="footer-links">
            <div className="quick-links">
              <h4>QUICK LINKS</h4>
              <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/services">Services</a></li>
                <li><a href="/portfolio">Creations</a></li>
                <li><a href="/partner">Partner With Us</a></li>
                <li><a href="/about">About Us</a></li>
                <li><a href="/career">Career</a></li>
              </ul>
            </div>
            <div className="pages">
              <h4>PAGES</h4>
              <ul>
                <li><a href="/contact">Contact Us</a></li>
                {/* <li><a href="/faq">FAQ</a></li> */}
                <li><a href="/terms">Terms And Condition</a></li>
                <li><a href="/privacy">Privacy Policy</a></li>
                <li><a href="/partner-policy">Partner Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-contact">
            <div className="email-link">
              <span className={`email-prefix ${hoveredIcon === 'linkedin' ? 'transparent' : hoveredIcon === 'mail' ? 'black' : hoveredIcon === 'instagram' ? 'transparent' : ''}`}>rohan@</span>
              <span className={`email-domain ${hoveredIcon === 'linkedin' ? 'black' : hoveredIcon === 'mail' ? 'black' : hoveredIcon === 'instagram' ? 'black' : ''}`}>yucelhub</span>
              <span className={`email-tld ${hoveredIcon === 'linkedin' ? 'transparent' : hoveredIcon === 'mail' ? 'black' : hoveredIcon === 'instagram' ? 'black' : ''}`}>.in</span>
            </div>
            <div className="social-icons">
              <a href="https://www.linkedin.com/company/yucel-hub/posts/?feedView=all" target="_blank" rel="noopener noreferrer" onMouseEnter={() => setHoveredIcon('linkedin')} onMouseLeave={() => setHoveredIcon(null)}>
                <img src={LinkedInIcon} alt="LinkedIn" className="social-icon-img" />
              </a>
              <a href="mailto:rohan@yucelhub.in" target="_blank" rel="noopener noreferrer" onMouseEnter={() => setHoveredIcon('mail')} onMouseLeave={() => setHoveredIcon(null)}>
                <img src={MailIcon} alt="Email" className="social-icon-img" />
              </a>
              <a href="https://instagram.com/yucel_hub" target="_blank" rel="noopener noreferrer" onMouseEnter={() => setHoveredIcon('instagram')} onMouseLeave={() => setHoveredIcon(null)}>
                <img src={InstagramIcon} alt="Instagram" className="social-icon-img" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>Design By Yucelhub Copyright © 2025. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;