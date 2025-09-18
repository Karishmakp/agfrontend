import React, { useState, useEffect } from 'react';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebookF,
  faLinkedinIn,
  faInstagram,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show/hide button on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

 //scroll
 
  const handleScroll = (e, id) => {
  e.preventDefault(); 
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({
      behavior: "smooth",
      block: "center" ,
    });
  }
};


  return (
    <>
      <footer className="agrowmart-footer">
        <div className="footer-top">
          <div className="social-icons">
            <a href="#"><FontAwesomeIcon icon={faFacebookF} /></a>
            <a href="#"><FontAwesomeIcon icon={faLinkedinIn} /></a>
            <a href="#"><FontAwesomeIcon icon={faInstagram} /></a>
            <a href="#"><FontAwesomeIcon icon={faYoutube} /></a>
          </div>

          <div className="footer-links">
            <a href="#company" onClick={(e) => handleScroll(e, "company")}>About </a>
            <a href="#company" onClick={(e) => handleScroll(e, "company")}>Company</a>
            <a href="#careers" onClick={(e) => handleScroll(e, "careers")}>Careers</a>
            <a href="#services" onClick={(e) => handleScroll(e, "services")}>Services</a>
            <a href="#contact" >Contact</a>
            <a href="#">Terms of Use</a>
          </div>

          <div className="footer-logo">
            <img  src="/assets/logo.jpg" alt="Agrowmart" />
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2025 Agrowmart Naturals Pvt. Ltd. All rights reserved.</p>
        </div>
      </footer>

      {isVisible && (
        <button className="scroll-top" onClick={scrollToTop}>
          <FontAwesomeIcon icon={faChevronUp} />
        </button>
      )}
    </>
  );
};

export default Footer;
