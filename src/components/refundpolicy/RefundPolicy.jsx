import React, { useEffect } from "react";
import "./refundpolicy.scss";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";

const RefundPolicy = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <Navbar />
            <div className="refund-container">
                <header className="refund-header">
                    <h1>Refund & Cancellation Policy</h1>
                    <p>Understand our refund and cancellation guidelines before making a purchase.</p>
                </header>

                <section className="refund-section">
                    <h3>1. Cancellation Policy</h3>
                    <p>
                        You may cancel your premium membership subscription at any time by contacting
                        our support team. Upon cancellation:
                    </p>
                    <ul>
                        <li>Your premium features will remain active until the end of the current billing period.</li>
                        <li>No further charges will be applied after cancellation.</li>
                        <li>Your basic profile and account will remain active unless you choose to delete it.</li>
                    </ul>
                </section>

                <section className="refund-section">
                    <h3>2. Refund Eligibility</h3>
                    <p>
                        Refunds may be considered under the following circumstances:
                    </p>
                    <ul>
                        <li>If a payment was charged multiple times due to a technical error.</li>
                        <li>If the amount debited is higher than the plan price displayed at checkout.</li>
                        <li>If a refund request is made within 7 days of purchase and no premium services have been used.</li>
                    </ul>
                    <p>
                        All refund requests are reviewed on a case-by-case basis by our team.
                    </p>
                </section>

                <section className="refund-section">
                    <h3>3. Refund Process</h3>
                    <p>
                        To request a refund, please follow these steps:
                    </p>
                    <ul>
                        <li>Send an email to <strong>ornateinteriod@gmail.com</strong> with your registered name, phone number, and transaction details.</li>
                        <li>Include the reason for requesting a refund.</li>
                        <li>Our team will review your request and respond within 3–5 business days.</li>
                    </ul>
                    <p>
                        If the refund is approved, it will be credited back to the original payment method
                        within 7–10 business days.
                    </p>
                </section>

                <div className="refund-highlight">
                    <h3>⚠️ Non-Refundable Cases</h3>
                    <ul>
                        <li>If premium services (e.g., viewing contact details, sending interests) have already been used.</li>
                        <li>If the membership has been active for more than 7 days.</li>
                        <li>If the account has been suspended or terminated due to violation of our Terms & Conditions.</li>
                        <li>Promotional or discounted memberships are non-refundable.</li>
                        <li>Change of mind after purchase does not qualify for a refund.</li>
                    </ul>
                </div>

                <section className="refund-section">
                    <h3>4. Refund Timeline</h3>
                    <p>
                        Once a refund is approved, the processing timeline varies based on the payment method:
                    </p>
                    <ul>
                        <li><strong>UPI / Net Banking:</strong> 5–7 business days</li>
                        <li><strong>Credit / Debit Card:</strong> 7–10 business days</li>
                        <li><strong>Wallet:</strong> 3–5 business days</li>
                    </ul>
                    <p>
                        Please note that the actual time for the refund to reflect in your account may vary
                        depending on your bank or payment provider.
                    </p>
                </section>

                <section className="refund-section">
                    <h3>5. Chargebacks</h3>
                    <p>
                        If you initiate a chargeback or dispute through your bank without first contacting us,
                        your account may be suspended. We encourage you to reach out to our support team first
                        to resolve any billing concerns.
                    </p>
                </section>

                <section className="refund-contact-section">
                    <h3>Contact Us for Refunds</h3>
                    <p>
                        For any refund or cancellation related queries, please contact us:
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

export default RefundPolicy;
