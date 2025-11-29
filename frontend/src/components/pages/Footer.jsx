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
    </div>
  );
};

export default Footer;
