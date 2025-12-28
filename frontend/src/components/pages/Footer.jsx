import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaXTwitter } from "react-icons/fa6";
import {
  FaInstagram,
  FaLinkedinIn,
  FaPlus,
  FaMinus,
} from "react-icons/fa";
import "../css/Footer.css";

const Footer = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleFooter = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`footer-wrapper ${isOpen ? "open" : "closed"}`}>
      <div className="footer-toggle-bar">
        <p className="footer-tagline">India's last minute shop</p>
        <button className="footer-toggle-btn" onClick={toggleFooter}>
          {isOpen ? <FaMinus /> : <FaPlus />}
        </button>
      </div>

      <footer className="footer-content">
        <div className="footer-copyright">
          <p>© 2024 Grocify Commerce Private Limited</p>
        </div>

        <div className="footer-links">
          <Link to="/privacy" className="footer-link-item">
            Privacy
          </Link>
          <Link to="/terms" className="footer-link-item">
            Terms
          </Link>
          <Link to="/security" className="footer-link-item">
            Security
          </Link>
        </div>

        <div className="footer-social">
          <Link
            to="https://x.com/VikasSahu15933"
            target="_blank"
            rel="noreferrer"
            className="social-icon-btn"
          >
            <FaXTwitter />
          </Link>
          <Link
            to="https://www.instagram.com/vikas.sahu001/#"
            target="_blank"
            rel="noreferrer"
            className="social-icon-btn"
          >
            <FaInstagram />
          </Link>
          <Link
            to="https://www.linkedin.com/in/vikas-sahu-ba3008356/"
            target="_blank"
            rel="noreferrer"
            className="social-icon-btn"
          >
            <FaLinkedinIn />
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
