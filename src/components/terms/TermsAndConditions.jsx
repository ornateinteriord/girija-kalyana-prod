import React, { useEffect } from "react";
import "./terms.scss";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";

const TermsAndConditions = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <div className="terms-container">
        <header className="terms-header">
          <h1>Terms & Conditions</h1>
          <p>Please read these terms carefully before using our services.</p>
        </header>

        <section className="terms-section">
          <h3>1. Acceptance of Terms</h3>
          <p>
            By accessing or using the GirijaKalyana website and services operated by Ornate Pvt. Ltd,
            you agree to be bound by these Terms and Conditions. If you do not agree to all the terms,
            please do not use our services.
          </p>
          <p>
            These Terms constitute a legally binding agreement between you and the Company regarding
            your use of the website and related matrimony services.
          </p>
        </section>

        <section className="terms-section">
          <h3>2. Eligibility</h3>
          <p>
            To register on GirijaKalyana, you must:
          </p>
          <ul>
            <li>Be at least 18 years of age (for women) or 21 years of age (for men) as per Indian law.</li>
            <li>Be legally competent to enter into a binding contract under the Indian Contract Act, 1872.</li>
            <li>Not be a person barred from receiving services under the laws of India.</li>
          </ul>
        </section>

        <section className="terms-section">
          <h3>3. Registration & Account</h3>
          <p>
            You agree to provide accurate, current, and complete information during registration.
            You are responsible for maintaining the confidentiality of your account credentials.
            Any activity that occurs under your account is your sole responsibility.
          </p>
          <p>
            The Company reserves the right to suspend or terminate your account if any information
            provided is found to be inaccurate, misleading, or fraudulent.
          </p>
        </section>

        <section className="terms-section">
          <h3>4. Membership & Payments</h3>
          <p>
            GirijaKalyana offers both free and premium membership plans. Premium plans provide
            access to additional features such as viewing contact details, sending personalized
            interests, and priority profile listing.
          </p>
          <ul>
            <li>All payments are processed securely through Razorpay payment gateway.</li>
            <li>Membership fees are non-transferable to another user.</li>
            <li>Prices and plans are subject to change without prior notice.</li>
            <li>Refunds, if applicable, will be governed by our <a href="/refund-policy">Refund Policy</a>.</li>
          </ul>
        </section>

        <section className="terms-section">
          <h3>5. User Conduct</h3>
          <p>
            While using our services, you agree not to:
          </p>
          <ul>
            <li>Post or share false, misleading, or deceptive profile information.</li>
            <li>Harass, abuse, or threaten other users in any manner.</li>
            <li>Use the platform for any unlawful, fraudulent, or commercial purpose.</li>
            <li>Attempt to gain unauthorized access to other accounts or system resources.</li>
            <li>Share any obscene, defamatory, or offensive content.</li>
          </ul>
          <p>
            Violation of these rules may result in immediate account suspension or termination
            without refund.
          </p>
        </section>

        <section className="terms-section">
          <h3>6. Profile Verification</h3>
          <p>
            While GirijaKalyana takes reasonable steps to verify user profiles, we do not guarantee
            the authenticity or accuracy of any profile information. Users are advised to exercise
            their own judgement and due diligence before making any decisions.
          </p>
        </section>

        <section className="terms-section">
          <h3>7. Intellectual Property</h3>
          <p>
            All content on GirijaKalyana — including logos, text, graphics, images, software, and
            design — is the intellectual property of Ornate Pvt. Ltd and is protected by applicable
            copyright and trademark laws. You may not reproduce, distribute, or create derivative
            works from any content without prior written permission.
          </p>
        </section>

        <section className="terms-section">
          <h3>8. Limitation of Liability</h3>
          <p>
            GirijaKalyana and Ornate Pvt. Ltd shall not be liable for any direct, indirect,
            incidental, special, or consequential damages arising out of or in connection with
            the use of our services. This includes, but is not limited to, damages for loss of
            data, revenue, or goodwill.
          </p>
          <p>
            The Company does not guarantee any specific outcomes from the use of our matrimony
            services.
          </p>
        </section>

        <section className="terms-section">
          <h3>9. Privacy</h3>
          <p>
            Your use of GirijaKalyana is also governed by our{" "}
            <a href="/privacy-policy">Privacy Policy</a>, which describes how we collect, use,
            and protect your personal information. By using our services, you consent to the
            collection and use of your information as described therein.
          </p>
        </section>

        <section className="terms-section">
          <h3>10. Modifications to Terms</h3>
          <p>
            Ornate Pvt. Ltd reserves the right to modify these Terms and Conditions at any time.
            Changes will be effective immediately upon posting on the website. Continued use of
            the service after any modifications constitutes acceptance of the revised terms.
          </p>
        </section>

        <section className="terms-section">
          <h3>11. Governing Law</h3>
          <p>
            These Terms and Conditions shall be governed by and construed in accordance with the
            laws of India. Any disputes arising out of or relating to these terms shall be subject
            to the exclusive jurisdiction of the courts of Bangalore, Karnataka.
          </p>
        </section>

        <section className="terms-contact-section">
          <h3>Contact Us</h3>
          <p>
            If you have any questions about these Terms and Conditions, please contact us:
          </p>
          <p><strong>Company:</strong> Ornate Pvt. Ltd</p>
          <p><strong>Address:</strong> #148/E, 2nd Floor, 17th Main Vijaynagar, Bangalore - 560040</p>
          <p><strong>Phone:</strong> +91 9148824442</p>
          <p><strong>Email:</strong> ornateinteriod@gmail.com</p>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default TermsAndConditions;
