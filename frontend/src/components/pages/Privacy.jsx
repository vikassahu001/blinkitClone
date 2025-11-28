import React, { useEffect } from "react";
import "../css/Privacy.css";

const PrivacyPolicy = () => {
  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="privacy-wrapper">
      <div className="privacy-container">
        <h1 className="privacy-title">Privacy Policy</h1>
        <p className="privacy-last-updated">Last updated in January, 2025</p>

        <p className="privacy-text">
          We i.e. "Grocift Commerce Private Limited" (formerly known as Grofers
          India Private Limited) (“Company”), are committed to protecting the
          privacy and security of your personal information. Your privacy is
          important to us and maintaining your trust is paramount.
        </p>
        <p className="privacy-text">
          This privacy policy explains how we collect, use, process and disclose
          information about you. By using our website/ app/ platform and
          affiliated services, you consent to the terms of our privacy policy
          (“Privacy Policy”) in addition to our ‘Terms of Use.’ We encourage you
          to read this privacy policy to understand the collection, use, and
          disclosure of your information from time to time, to keep yourself
          updated with the changes and updates that we make to this policy.
        </p>
        <p className="privacy-text">
          This privacy policy describes our privacy practices for all websites,
          products and services that are linked to it. However this policy does
          not apply to those affiliates and partners that have their own privacy
          policy. In such situations, we recommend that you read the privacy
          policy on the applicable site.
        </p>
        <p className="privacy-text">
          Should you have any clarifications regarding this privacy policy,
          please write to us at{" "}
          <a href="mailto:privacy@Grocify.com" className="privacy-link">
            privacy@Grocify.com
          </a>
          .
        </p>

        <h2 className="privacy-section-title">Applicability and Scope</h2>
        <p className="privacy-text">
          Grocift Commerce Private Limited ("Grocify," the "Company," "we," "us,"
          and "our,") respects your privacy and is committed to protecting it.
          This policy sets out:
        </p>
        <ul className="privacy-list">
          <li>
            The types of information that Grocify may collect from you directly
            or through automated means when you access or use its website,
            application and other online services (collectively, referred as
            "Services"); and
          </li>
          <li>
            Its practices for collecting, using, maintaining, protecting and
            disclosing that information.
          </li>
        </ul>
        <p className="privacy-text">
          This policy applies only to the information Grocify collects through
          its Services, in email, text and other electronic communications sent
          through or in connection with the Services. This policy does not apply
          to information that you provide to, or that is collected by, any
          third-party that you use in connection with its Services. Grocify
          encourages you to consult directly with such third-parties about their
          privacy practices.
        </p>
        <p className="privacy-text">
          <strong>Permissible Age:</strong> The Services are not intended for
          users under the age of 18, unless permitted under applicable local
          laws (“Permissible Age”). We do not knowingly collect any personal
          information from users or market to or solicit information from anyone
          under the Permissible Age.
        </p>

        <h2 className="privacy-section-title">
          The information we collect and how we use it
        </h2>
        <p className="privacy-text">
          Grocify collects several types of information from and about users of
          our Services, which includes:
        </p>
        <ul className="privacy-list">
          <li>
            <strong>Your Personal Information</strong> - personal information is
            the information that can be associated with a specific person and
            could be used to identify that specific person whether from that
            data, or from the data and other information that we have; and
          </li>
          <li>
            <strong>Non-Personal Information</strong> – which includes data
            about your internet connection, the device(s)you use to access our
            Services, your usage details and other such information that does
            not pertain to your identity.
          </li>
        </ul>

        <h3 className="privacy-sub-title">1. Information You Provide to Us</h3>
        <p className="privacy-text">
          The information we collect on or through our Services may include:
        </p>
        <ul className="privacy-list">
          <li>
            <strong>Personal information:</strong> Name, address, email address,
            postal code, password and other information you may provide with
            your account, such as your gender, mobile phone number, date of
            birth, anniversary date, user bio and website.
          </li>
          <li>
            <strong>Your content:</strong> Information you provide through our
            Services, including ordering details and history, contact
            information of people you provide to us for various features.
          </li>
          <li>
            <strong>Your searches and other activities:</strong> The search
            terms you have looked up and results you selected.
          </li>
          <li>
            <strong>Your browsing information:</strong> How long you used our
            Services and which features you used; the ads you clicked on.
          </li>
          <li>
            <strong>Your transactional information:</strong> If you make
            purchases through our Services, we may collect and store information
            about you to process your requests and automatically complete forms
            for future transactions.
          </li>
          <li>
            <strong>Image / video data:</strong> We may collect and process
            images and video recordings of individuals attending live events or
            visiting our office / store / other premises for security and safety
            purposes.
          </li>
        </ul>

        <h3 className="privacy-sub-title">
          2. Information We Collect Through Automatic Data Collection
          Technologies
        </h3>
        <p className="privacy-text">
          We may automatically collect certain information about the computer or
          devices (including mobile devices) you use to access the Services.
        </p>
        <ul className="privacy-list">
          <li>
            <strong>Usage information:</strong> Details of your use of our
            Services, including traffic data, location data, logs and other
            communication data.
          </li>
          <li>
            <strong>Computer and device information:</strong> IP address,
            operating systems, platforms, browser type, etc.
          </li>
          <li>
            <strong>Location information:</strong> Our applications collect
            real-time information about the location of your device, as
            permitted by you.
          </li>
          <li>
            <strong>Cookies and Other Electronic Tools:</strong> Grocify and its
            third parties with whom we partner, may use cookies, pixel tags, web
            beacons, mobile device IDs, "flash cookies" and other similar files
            or technologies.
          </li>
        </ul>

        <h3 className="privacy-sub-title">
          3. Information We Collect From Third Parties
        </h3>
        <p className="privacy-text">
          We may collect, process and store your user ID associated with any
          social media account (such as your Facebook and Google account) that
          you use to sign into the Services.
        </p>

        <h2 className="privacy-section-title">
          How we use the information we collect
        </h2>
        <p className="privacy-text">
          We use the information we collect from and about you for a variety of
          purposes, including to:
        </p>
        <ul className="privacy-list">
          <li>
            Administer our Services by sharing information with third parties
            (delivery partners, vendors).
          </li>
          <li>Process and respond to your queries and complaints.</li>
          <li>Understand our users and improve content and features.</li>
          <li>Send you communications via email, SMS, or WhatsApp.</li>
          <li>Detect and prevent fraud and abuse.</li>
          <li>Comply with legal requirements and obligations.</li>
        </ul>

        <h2 className="privacy-section-title">
          How we share the information we collect
        </h2>
        <p className="privacy-text">
          We may disclose personal information that we collect, or you provide,
          in the following ways:
        </p>
        <ul className="privacy-list">
          <li>To our subsidiaries and affiliates.</li>
          <li>To contractors, sellers, suppliers, and service providers.</li>
          <li>
            To an actual or potential buyer in the event of a merger or sale.
          </li>
          <li>To legal authorities when required by law.</li>
        </ul>

        <h2 className="privacy-section-title">
          Security: How we protect your information
        </h2>
        <p className="privacy-text">
          We have implemented appropriate physical, electronic, and managerial
          procedures to safeguard and help prevent unauthorized access to your
          information and to maintain data security. We follow generally
          accepted industry standards to protect the personal information
          submitted to us.
        </p>

        <h2 className="privacy-section-title">Miscellaneous</h2>
        <p className="privacy-text">
          <strong>Third party links:</strong> The Services may contain links to
          third-party websites. We are not responsible for the content or
          privacy practices of other websites.
        </p>
        <p className="privacy-text">
          <strong>Policy amendments:</strong> We reserve the right to amend this
          Privacy Policy from time to time to reflect changes in the law, our
          data collection and processing practices, or advances in technology.
        </p>

        <h2 className="privacy-section-title">Contact Us</h2>
        <p className="privacy-text">
          If you have any queries relating to the processing/ usage of
          information provided by you or Grocify's Privacy Policy, you may email
          the Data Protection Officer (DPO) at{" "}
          <a href="mailto:privacy@grocify.com" className="privacy-link">
            privacy@grocify.com
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
