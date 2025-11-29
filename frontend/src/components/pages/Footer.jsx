import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
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
      {/* Container for the Text and the Button */}
      <div className="footer-toggle-bar">
        <p className="footer-tagline">India's last minute app</p>

        <button
          className="footer-toggle-btn"
          onClick={toggleFooter}
        >
          {isOpen ? <FaMinus /> : <FaPlus />}
        </button>
      </div>

      {/* The Footer Content */}
      {isOpen && (
        <footer className="footer-content">
          {/* 1. Copyright Text */}
          <div className="footer-copyright">
            <p>© 2024 Grocify Commerce Private Limited</p>
          </div>

          {/* 2. Legal Links */}
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

          {/* 3. Social Icons */}
          <div className="footer-social">
            <Link to="#" className="social-icon-btn">
              <FaFacebookF />
            </Link>
            <Link to="#" className="social-icon-btn">
              <FaTwitter />
            </Link>
            <Link to="#" className="social-icon-btn">
              <FaInstagram />
            </Link>
            <Link to="#" className="social-icon-btn">
              <FaLinkedinIn />
            </Link>
          </div>
        </footer>
      )}
    </div>
  );
};

export default Footer;