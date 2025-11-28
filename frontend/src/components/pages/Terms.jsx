import React, { useEffect } from "react";
import "../css/Terms.css";

const TermsConditions = () => {
  // Ensure page starts at top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="terms-wrapper">
      <div className="terms-container">
        <h1 className="terms-title">Terms of Use</h1>
        <p className="terms-last-updated">Last updated in June 2025</p>

        <p className="terms-text">
          Thank you for using Grocify. For your information:{" "}
          <span className="terms-bold">“Grocift Commerce Private Limited”</span>,
          is a company incorporated under the Companies Act, 2013 with its
          registered office at Ground Floor, Tower A, Pioneer Square Building,
          Golf Course Extension Road, Sector 62, Gurugram-122098, Haryana
          (hereinafter referred as “We”/ “Grocify”/ “Us”/ “Our”).
        </p>
        <p className="terms-text">
          For abundant clarity, Grocify and/ or the trademark "Grocify" are
          neither related, linked or interconnected in whatsoever manner or
          nature, to “GROFFR.COM” (which is a real estate services business
          operated by “Redstone Consultancy Services Private Limited”).
        </p>

        <h2 className="terms-section-title">Acceptance of Terms</h2>
        <p className="terms-text">
          These Terms are intended to make you aware of your legal rights and
          responsibilities with respect to your access to and use of the
          Grocify’s website{" "}
          <a href="https://www.Grocify.com" className="terms-link">
            www.Grocify.com
          </a>{" "}
          ("Site") and/or any related mobile or software applications
          (collectively referred to as, “Grocify Platform”) including but not
          limited to the services offered by Grocify via the Grocify Platform or
          otherwise ("Services").
        </p>
        <p className="terms-text">
          Your use/ access of the Grocify Platform shall be governed by these
          Terms and the Privacy Policy of Grocify. By accessing the Grocify
          Platform and/ or undertaking any sale-purchase transaction, you agree
          to be bound by the Terms.
        </p>

        <h2 className="terms-section-title">Services Overview</h2>
        <p className="terms-text">
          Grocify Platform is a platform for users/ consumers to transact with
          sellers/ service providers offering products/services for sale/ supply
          through the Grocify Platform. Products/ services may be listed or
          offered for sale/ supply on the Grocify Platform by Grocify, its
          affiliates or third parties (“Third Party Sellers”).
        </p>
        <p className="terms-text">
          Grocify is not and cannot be a party to any transaction between you
          and the Third Party Sellers (which shall be a bipartite arrangement
          between you and the Third Party Seller). Grocify does not make any
          representation or warranties with respect to the Third Party
          Offerings.
        </p>

        <h2 className="terms-section-title">Eligibility</h2>
        <p className="terms-text">
          Persons who are “incompetent to contract” within the meaning of the
          Indian Contract Act, 1872 including minors, undischarged insolvent
          etc. are not eligible to use/access the Grocify Platform. However, if
          you are a minor, i.e. under the age of 18 years, you may use/access
          the Grocify Platform under the supervision of an adult parent or legal
          guardian.
        </p>

        <h2 className="terms-section-title">
          Account & Registration Obligations
        </h2>
        <p className="terms-text">
          All users must register and log in for placing orders on the Grocify
          Platform. You must keep your account and registration details current
          and correct. By agreeing to the Terms, you agree to receive
          promotional, transactional or other communications.
        </p>

        <h2 className="terms-section-title">Limited License & Access</h2>
        <p className="terms-text">
          Grocify grants you a personal, limited, non-exclusive,
          non-transferable and revocable license to access (for personal use
          only) the Grocify Platform. You hereby agree and undertake not to use,
          host, display, upload, modify, publish, transmit, update or share any
          information/ content which (“Prohibited Conduct”):
        </p>
        <ul className="terms-list">
          <li>
            Belongs to another person and to which you do not have any right;
          </li>
          <li>
            Is harmful, threatening, abusive, indecent, discriminatory, or
            racially, ethnically objectionable;
          </li>
          <li>
            Contains software viruses or any other computer code designed to
            interrupt functionality;
          </li>
          <li>
            Threatens the unity, integrity, defence, security or sovereignty of
            India;
          </li>
          <li>
            Infringes any patent, trademark, copyright or another proprietary
            right.
          </li>
        </ul>

        <h2 className="terms-section-title">Disclaimers</h2>
        <p className="terms-text">
          You acknowledge and agree that the Grocify Platform and the Services
          are provided "as is" and "as available" and that your use of the
          Grocify Platform and the Services shall be at your sole risk. Grocify
          Parties disclaim all warranties, express or implied, in connection
          with the Grocify Platform.
        </p>

        <h2 className="terms-section-title">Delivery Partners</h2>
        <p className="terms-text">
          We facilitate delivery of orders placed on the Grocify Platform
          through independent contractors, i.e. delivery partners, on a
          principal-to-principal basis. You are expected to respect the dignity
          and diversity of delivery partners.
        </p>

        <h2 className="terms-section-title">Returns & Refunds</h2>
        <p className="terms-text">
          Products once delivered/ services once fulfilled are non-returnable/
          non-replaceable/ non-exchangeable/ non-refundable, save and except if
          the product is damaged, defective, or expired at the time of delivery.
        </p>
        <p className="terms-text">
          All refunds for permitted returns and permitted cancellations will be
          processed within 7 working days from the date of return/ cancellation
          approval.
        </p>

        <h2 className="terms-section-title">Grievance Redressal Mechanism</h2>
        <p className="terms-text">
          In accordance with applicable law, the name and contact details of the
          Grievance Officer and Nodal Officer are published as under:
        </p>

        <div className="officer-details-box">
          <h3 className="terms-sub-title" style={{ marginTop: 0 }}>
            Details of the Grievance Officer
          </h3>
          <p className="terms-text">
            <span className="terms-bold">Dhananjay Shashidharan</span>
            <br />
            Grocift Commerce Private Limited
            <br />
            Ground Floor, Tower-A, Pioneer Square Building, Sector 62,
            Gurugram-122098.
            <br />
            Email:{" "}
            <a
              href="mailto:grievance.officer@grocify.com"
              className="terms-link"
            >
              grievance.officer@grocify.com
            </a>
            <br />
            Time: Monday - Friday (09:00 - 18:00 hours)
          </p>
        </div>

        <div className="officer-details-box">
          <h3 className="terms-sub-title" style={{ marginTop: 0 }}>
            Details of the Nodal Officer
          </h3>
          <p className="terms-text">
            <span className="terms-bold">Vikramjit Singh</span>
            <br />
            Grocift Commerce Private Limited
            <br />
            Email:{" "}
            <a href="mailto:nodal@grocify.com" className="terms-link">
              nodal@grocify.com
            </a>
          </p>
        </div>

        <h2 className="terms-section-title">Additional Terms</h2>

        <h3 className="terms-sub-title">Ambulance Services</h3>
        <p className="terms-text">
          Grocify provides a platform for Customers to avail patient
          transportation & care services from third party service providers. You
          understand that the Ambulance Services (including patient care) shall
          be undertaken relying on the accuracy of information provided by you.
        </p>

        <h3 className="terms-sub-title">Pharma & Healthcare Consultation</h3>
        <p className="terms-text">
          Grocify provides a platform to Third Party Sellers and Healthcare
          Consultants. You agree that listing of Pharma Products or Healthcare
          Consultation Services does not amount to an “offer for sale” by
          Grocify.
        </p>

        <h3 className="terms-sub-title">Specific Terms for Tobacco Products</h3>
        <p className="terms-text">
          User agrees that they are at least eighteen (18) years of age and live
          outside the radius of hundred (100) yards from an educational
          institution when purchasing such products.
        </p>

        <h2 className="terms-section-title">Contact Us</h2>
        <p className="terms-text">
          Should you need any clarifications regarding the Terms, please do
          write to us at{" "}
          <a href="mailto:info@grocify.com" className="terms-link">
            info@grocify.com
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default TermsConditions;
