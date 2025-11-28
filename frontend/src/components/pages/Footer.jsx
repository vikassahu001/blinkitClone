import React from "react";
import { Link } from "react-router-dom";
// Ensure you have installed react-icons: npm install react-icons
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import "../css/Footer.css"; // Import the CSS file here


const Footer = () => {
  return (
    <div className="footer-wrapper">
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
    </div>
  );
};

export default Footer;
