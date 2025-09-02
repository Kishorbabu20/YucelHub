import React, { useState } from "react";
import { Header } from "./HomePage";
import "./styles/ContactPage.css";
import BookingModal from "./components/BookingModal";

export default function ContactPage() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    details: "",
  });

  const handleScheduleCall = () => {
    setIsBookingModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const to = "praveen@yucelhub.in";
    const subject = encodeURIComponent(`New contact from ${formData.name || "YucelHub site"}`);
    const lines = [
      `Name: ${formData.name}`,
      `Email: ${formData.email}`,
      `Company: ${formData.company}`,
      `Phone: ${formData.phone}`,
      "",
      "Project Details:",
      formData.details,
    ];
    const body = encodeURIComponent(lines.join("\n"));
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
  };
  return (
    <div className="ct-container">
      <Header onBookCallClick={handleScheduleCall} />

      <section className="ct-hero">
        <p className="ct-eyebrow">Let's start something incredible together</p>
        <h1 className="ct-title">Ready to transform your
          <br />vision into reality?</h1>
        <p className="ct-subtitle">Choose how you'd like to work with us and let's build something extraordinary.</p>
      </section>

      <section className="ct-card">
        <div className="ct-card-inner">
          <h2 className="ct-card-title">Get in touch</h2>

          <form className="ct-form" onSubmit={handleSubmit}>
            <div className="ct-grid">
              <label className="ct-field">
                <span className="ct-label">Name</span>
                <input type="text" name="name" placeholder="Your full name" value={formData.name} onChange={handleChange} required />
              </label>
              <label className="ct-field">
                <span className="ct-label">Email Address</span>
                <input type="email" name="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} required />
              </label>
              <label className="ct-field">
                <span className="ct-label">Company</span>
                <input type="text" name="company" placeholder="Your Company" value={formData.company} onChange={handleChange} />
              </label>
              <label className="ct-field">
                <span className="ct-label">Phone Number</span>
                <input type="tel" name="phone" placeholder="+1 (555) 000-0000" value={formData.phone} onChange={handleChange} />
              </label>
            </div>

            <label className="ct-field ct-full">
              <span className="ct-label">Project Details</span>
              <textarea rows="5" name="details" placeholder="Tell us about your project, goal, and any specific requirements..." value={formData.details} onChange={handleChange}></textarea>
            </label>

            <div className="ct-actions">
              <button className="ct-btn ct-btn-primary" type="submit">Send Message</button>
              <button className="ct-btn ct-btn-secondary" type="button" onClick={handleScheduleCall}>Schedule a Call</button>
            </div>

            <hr className="ct-sep" />

            <div className="ct-direct">
              <p className="ct-direct-title">Prefer to reach out directly ?</p>
              <div className="ct-chips">
                <a className="ct-chip" href="mailto:praveen@yucelhub.in">praveen@yucelhub.in</a>
                <a className="ct-chip" href="tel:+919629212455">+91 9629212455</a>
              </div>
            </div>
          </form>
        </div>
      </section>
      <BookingModal 
        isOpen={isBookingModalOpen} 
        onClose={() => setIsBookingModalOpen(false)} 
      />
    </div>
  );
}


