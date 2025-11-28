import React, { useEffect } from "react";
import "../css/Security.css";

const Security = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="security-wrapper">
      <div className="security-container">
        {/* 1. IMAGE SECTION 
           Replace the src below with your actual image path.
           Example: src={require('./assets/security_shield.png')}
        */}
        <img
          src="https://cdn-icons-png.flaticon.com/512/2092/2092663.png"
          alt="Security Shield"
          className="security-hero-image"
        />

        <h1 className="security-title">
          Help keep Grocify safe for the community by disclosing security issues
          to us
        </h1>

        <p className="security-text">
          We take security seriously at Grocify. If you are a security
          researcher or expert, and believe you’ve identified security-related
          issues with Grocify's website or apps, we would appreciate you
          disclosing it to us responsibly.
        </p>

        <p className="security-text">
          Our team is committed to addressing all security issues in a
          responsible and timely manner, and ask the security community to give
          us the opportunity to do so before disclosing them publicly. Please
          submit a bug to us on our{" "}
          <a href="#" className="security-link">
            HackerOne page
          </a>
          , along with a detailed description of the issue and steps to
          reproduce it, if any. We trust the security community to make every
          effort to protect our users data and privacy.
        </p>

        <p className="security-text">
          For a list of researchers who have helped us address security issues,
          please visit our{" "}
          <a href="#" className="security-link">
            HackerOne page
          </a>
          .
        </p>

        {/* Call to Action Button */}
        <div className="btn-container">
          <a href="#" className="security-btn">
            Submit a Bug Report
          </a>
        </div>
      </div>
    </div>
  );
};

export default Security;
