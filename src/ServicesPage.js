import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
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

const ServiceCard = React.forwardRef(({
  category,
  title,
  description,
  tags = [],
  image,
  alt,
  onBookCallClick,
  reversed = false,
  isHighlighted = false,
}, ref) => {
  return (
    <section
      ref={ref}
      className={`sp-service-card ${isHighlighted ? 'highlighted' : ''}`}
    >
      <div className={`sp-card-content ${reversed ? 'reversed' : ''}`}>
        <div className="sp-card-text">
          <p className="sp-card-category">{category}</p>
          <h2 className="sp-card-title">{title}</h2>
          <p className="sp-card-description">{description}</p>
          <div className="sp-card-tags">
            {tags.map((tag, index) => (
              <span key={index} className="sp-tag">{tag}</span>
            ))}
          </div>
          <div className="sp-expert-quality">
            <span className="sp-star">★</span>
            <span>Expert quality guaranteed</span>
          </div>
          <button className="sp-get-started-btn" onClick={() => { window.location.href = '/contact'; }}>get started</button>
        </div>
        <div className="sp-card-image">
          <img src={image} alt={alt} />
        </div>
      </div>
    </section>
  );
});

function FinalCTA({ onBookCallClick }) {
  const handlePortfolioClick = () => {
    window.location.href = '/portfolio';
  };

  return (
    <section className="sp-final-cta">
      <div className="sp-final-inner">
        <h2>Ready to Transform Your Business?</h2>
        <p>Let's discuss your project and how we can help you achieve your goals.</p>
        <div className="sp-cta-actions">
          <button className="sp-btn-primary" onClick={() => { window.location.href = '/contact'; }}>get started</button>
          <button className="sp-btn-secondary" onClick={handlePortfolioClick}>View Our Works</button>
        </div>
      </div>
    </section>
  );
}

export default function ServicesPage() {
  const location = useLocation();
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [highlightedService, setHighlightedService] = useState(null);

  // Create refs for each service card
  const serviceRefs = {
    1: useRef(null),
    2: useRef(null),
    3: useRef(null),
    4: useRef(null),
  };

  const handleBookCallClick = () => {
    setIsBookingModalOpen(true);
  };

  // Handle URL parameters and scroll to specific service
  useEffect(() => {
    const handleServiceNavigation = () => {
      const urlParams = new URLSearchParams(location.search);
      const serviceId = urlParams.get('service');

      if (serviceId && serviceRefs[serviceId]) {
        setHighlightedService(parseInt(serviceId));

        // Scroll to the specific service after a short delay
        setTimeout(() => {
          serviceRefs[serviceId].current?.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          });
        }, 500);

        // Remove highlight after 3 seconds
        setTimeout(() => {
          setHighlightedService(null);
        }, 3000);
      }
    };

    // Check on initial load
    handleServiceNavigation();
  }, [location.search]);

  return (
    <div className="sp-container">
      <Header onBookCallClick={handleBookCallClick} />
      <ServiceHero />

      <div className="sp-services-grid">
        <ServiceCard
          ref={serviceRefs[1]}
          category="Creative polishing, technical precision"
          title="Post-Production & Creative"
          description="Our post-production team combines technical expertise with creative vision to transform your raw footage into compelling visual stories. We use industry-standard software and cutting-edge techniques to deliver professional-quality results that exceed expectations."
          tags={[
            "Podcast Video editing",
            "TikTok & Reels Editing",
            "Photo Retouching & Enhancement",
            "Professional Video Editing",
            "VFX",
            "2D Animation"
          ]}
          image={ServicePageImg1}
          alt="Post Production & Creative"
          onBookCallClick={handleBookCallClick}
          reversed={false}
          isHighlighted={highlightedService === 1}
        />

        <ServiceCard
          ref={serviceRefs[2]}
          category="Inspired messaging, audience engagement"
          title="Content & Marketing"
          description="Our content and marketing strategies are designed to build meaningful connections with your audience. We combine data-driven insights with creative storytelling to develop content that not only looks great but drives real business results."
          tags={[
            "Social Media Management",
            "Content creation"
          ]}
          image={ServicePageImg2}
          alt="Content & Marketing"
          onBookCallClick={handleBookCallClick}
          reversed={true}
          isHighlighted={highlightedService === 2}
        />

        <ServiceCard
          ref={serviceRefs[3]}
          category="Creative expression, market recognition"
          title="Design & Marketing"
          description="Your brand is more than just a logo—it's the complete visual and emotional experience your customers have with your business. We create comprehensive brand systems that tell your story and connect with your audience on every touchpoint."
          tags={[
            "UX/UI Design",
            "Graphic Design",
            "Product Design",
            "Social Media Design"
          ]}
          image={ServicePageImg3}
          alt="Design & Marketing"
          onBookCallClick={handleBookCallClick}
          reversed={false}
          isHighlighted={highlightedService === 3}
        />

        <ServiceCard
          ref={serviceRefs[4]}
          category="Innovative problem-solving, seamless integration"
          title="Digital Solutions"
          description="In today's digital landscape, your website is often the first impression customers have of your business. We create fast, responsive, and user-friendly digital solutions that not only look stunning but drive conversions and business growth."
          tags={[
            "Web Development",
            "Software Development",
            "Website Maintenance",
            "User Experience Optimization"
          ]}
          image={ServicePageImg4}
          alt="Digital Solutions"
          onBookCallClick={handleBookCallClick}
          reversed={true}
          isHighlighted={highlightedService === 4}
        />
      </div>

      <FinalCTA onBookCallClick={handleBookCallClick} />
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </div>
  );
}


