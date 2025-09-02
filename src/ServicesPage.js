import React, { useState } from "react";
import { Header } from "./HomePage";
import BookingModal from "./components/BookingModal";
import "./styles/ServicesPage.css";
import ServicePageImg1 from "./assets/Servicepage.png";
import ServicePageImg2 from "./assets/Servicepage2.png";
import ServicePageImg3 from "./assets/Servicepage3.png";
import ServicePageImg4 from "./assets/Servicepage4.png";

function ServiceHero() {
  return (
    <section className="sp-hero">
      <p className="sp-eyebrow">Our complete service offering</p>
      <h1 className="sp-title">Everything You Need To Build And Scale Your Digital Presence</h1>
      <p className="sp-subtitle">Yucel Hub delivers end-to-end creative and technical solutions. From initial concept to final deployment, we're your dedicated team for growth.</p>
    </section>
  );
}

function ServiceRow({
  reversed = false,
  category,
  title,
  description,
  bullets = [],
  image,
  alt,
  onBookCallClick,
}) {
  return (
    <section className={"sp-row" + (reversed ? " reversed" : "")}> 
      <div className="sp-col text">
        {category && <p className="sp-category">{category}</p>}
        <h2 className="sp-row-title">{title}</h2>
        <p className="sp-row-desc">{description}</p>
        <div className="sp-offer">
          <h3>What we offer:</h3>
          <ul>
            {bullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        </div>
        <button className="sp-btn-primary" onClick={() => { window.location.hash = '#/contact'; setTimeout(() => { window.scrollTo({ top: 0, left: 0, behavior: 'smooth' }); }, 0); }}>get started</button>
      </div>
      <div className="sp-col image">
        <img src={image} alt={alt} />
      </div>
    </section>
  );
}

function FinalCTA({ onBookCallClick }) {
  const handlePortfolioClick = () => {
    window.location.hash = '#/portfolio';
    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, 0);
  };

  return (
    <section className="sp-final-cta">
      <div className="sp-final-inner">
        <h2>Ready to get started?</h2>
        <p>Let's discuss your project and how we can help you achieve your goals.</p>
        <div className="sp-cta-actions">
          <button className="sp-btn-primary" onClick={() => { window.location.hash = '#/contact'; setTimeout(() => { window.scrollTo({ top: 0, left: 0, behavior: 'smooth' }); }, 0); }}>get started</button>
          <button className="sp-btn-secondary" onClick={handlePortfolioClick}>View Portfolio</button>
        </div>
      </div>
    </section>
  );
}

export default function ServicesPage() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const handleBookCallClick = () => {
    setIsBookingModalOpen(true);
  };

  return (
    <div className="sp-container">
      <Header onBookCallClick={handleBookCallClick} />
      <ServiceHero />

      <ServiceRow
        category="Creative polishing, technical precision"
        title="Post-Production"
        description="From raw footage to a cinematic final cut — we edit, color grade, and design sound to bring your vision to life. Our post-production team handles everything from basic editing to complex visual effects."
        bullets={[
          "Video editing and color grading",
          "Audio mixing and sound design",
          "Motion graphics and animation",
          "Visual effects and compositing",
        ]}
        image={ServicePageImg1}
        alt="Post Production"
        onBookCallClick={handleBookCallClick}
      />

      <ServiceRow
        reversed
        category="Design that works and feels right"
        title="Design & Experience"
        description="We blend branding and UI/UX into one powerful creative layer — building visual identities and digital experiences that connect with people and perform across platforms."
        bullets={[
          "Brand identity and visual design",
          "UI/UX design for web and mobile",
          "Graphic design and marketing materials",
          "Design systems and style guides",
        ]}
        image={ServicePageImg2}
        alt="Design & Experience"
        onBookCallClick={handleBookCallClick}
      />

      <ServiceRow
        category="Scalable, modern, and built to last"
        title="Web & App Development"
        description="We develop custom websites and apps using modern frameworks like React and Next.js — clean, fast, and tailored to your logic."
        bullets={[
          "Custom web development",
          "Mobile app development",
          "E‑commerce solutions",
          "API development and integration",
        ]}
        image={ServicePageImg3}
        alt="Web & App Development"
        onBookCallClick={handleBookCallClick}
      />

      <ServiceRow
        reversed
        category="From concept to company"
        title="Product Development"
        description="We help you bring product ideas to life — from initial strategy and brand to full design, development, and launch. Our work on Diallock AI is proof, built in‑house, serving real users, scaling fast."
        bullets={[
          "Product strategy and planning",
          "MVP development and testing",
          "Full‑stack product development",
          "Go‑to‑market strategy",
        ]}
        image={ServicePageImg4}
        alt="Product Development"
        onBookCallClick={handleBookCallClick}
      />

      <FinalCTA onBookCallClick={handleBookCallClick} />
      <BookingModal 
        isOpen={isBookingModalOpen} 
        onClose={() => setIsBookingModalOpen(false)} 
      />
    </div>
  );
}


