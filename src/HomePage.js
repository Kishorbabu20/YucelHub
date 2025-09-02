import React, { useEffect, useState } from "react";
import IconImg from "./assets/Icon.png";
import HeroImg from "./assets/Hero.png";
import TeamImg1 from "./assets/Team.png";
import TeamImg2 from "./assets/Team2.png";
import TeamImg3 from "./assets/Team3.png";
import ServiceImg0 from "./assets/Service.png";
import ServiceImg1 from "./assets/Service1.png";
import ServiceImg2 from "./assets/Service2.png";
import ServiceImg3 from "./assets/Service3.png";
import WhatWeDoImg from "./assets/Whatwedo.png";
import TestimonialImg from "./assets/Testimonial.png";
import BookingModal from "./components/BookingModal";
import "./styles/HomePage.css";


export const Header = ({ onBookCallClick }) => {
  const [hash, setHash] = useState(window.location.hash || "#/home");
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash || "#/home");
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const isActive = (target) => {
    if (target === "#/home") {
      return hash === "" || hash === "#/home" || (!hash.startsWith("#/") && hash !== "#/services");
    }
    return hash === target || hash.startsWith(target);
  };

  return (
    <header className={"header"}>
    <div className="top-bar">
        {/* YucelHub Logo with stylized Y icon */}
        <a href="#/home" className="logo-link">
      <div className="logo-container">
            <img src={IconImg} alt="Yucel Hub" className="logo-image" />
            <div className="logo-text">
              <span className="logo-text-large">YucelHub</span>
            </div>
      </div>
        </a>
        
        {/* Mobile menu toggle */}
        <button
          className="menu-toggle"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen ? "true" : "false"}
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        {/* Navigation links */}
        <nav className={"nav-links" + (menuOpen ? " open" : "") } onClick={() => setMenuOpen(false)}>
          <a href="#/services" className={isActive("#/services") ? "active" : ""}>Services</a>
          <a href="#/portfolio" className={isActive("#/portfolio") ? "active" : ""}>Portfolio</a>
          <a href="#/partner" className={isActive("#/partner") ? "active" : ""}>Partner With Us</a>
          <a href="#/about" className={isActive("#/about") ? "active" : ""}>About Us</a>
          <a href="#/career" className={isActive("#/career") ? "active" : ""}>Career</a>
          {/* Book a Call inside mobile menu */}
          <button className="btn-primary book-call-mobile" onClick={onBookCallClick}>
            <span className="phone-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.25 4.5A2.25 2.25 0 0 1 4.5 2.25H7A2.25 2.25 0 0 1 9.25 4.5c0 1.067.171 2.093.49 3.053.162.49.04 1.03-.32 1.39L7.9 10.46a13.5 13.5 0 006.64 6.64l1.517-1.52c.36-.36.9-.482 1.39-.32a11.25 11.25 0 003.053.49A2.25 2.25 0 0 1 22.5 18v2.25A2.25 2.25 0 0 1 20.25 22.5C11.29 22.5 3.75 14.96 3.75 6A2.25 2.25 0 0 1 6 3.75H4.5A2.25 2.25 0 0 1 2.25 4.5z"/>
              </svg>
            </span>
            <span>Book a Call</span>
          </button>
        </nav>
        
        {/* Book a Call button with phone icon */}
        <button className="btn-primary book-call-button" onClick={onBookCallClick}>
          <span className="phone-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.25 4.5A2.25 2.25 0 0 1 4.5 2.25H7A2.25 2.25 0 0 1 9.25 4.5c0 1.067.171 2.093.49 3.053.162.49.04 1.03-.32 1.39L7.9 10.46a13.5 13.5 0 006.64 6.64l1.517-1.52c.36-.36.9-.482 1.39-.32a11.25 11.25 0 003.053.49A2.25 2.25 0 0 1 22.5 18v2.25A2.25 2.25 0 0 1 20.25 22.5C11.29 22.5 3.75 14.96 3.75 6A2.25 2.25 0 0 1 6 3.75H4.5A2.25 2.25 0 0 1 2.25 4.5z"/>
            </svg>
          </span>
          <span>Book a Call</span>
        </button>
    </div>
  </header>
);
};

const HeroSection = ({ onBookCallClick }) => (
  <section className="hero-section">
    <div className="hero-content">
      <div className="hero-text-container">
        <h1 className="hero-headline">
          <span className="highlight-number">80+</span>Companies worldwide trust us to scale faster with dedicated technology and creative teams — trained, deployed In-house, and fully managed.
        </h1>
      </div>
      <div className="hero-bottom-content">
      <div className="hero-image-container">
          <div className="hero-image-background">
        <img
              src={HeroImg}
              alt="Yucel Hub hero"
          className="hero-image"
        />
      </div>
        </div>
        <div className="hero-description-container">
          <div className="hero-description">
            <p>
              One Suit for your Project Based to full-time technology and creativity, Yucel Hub delivers embedded teams that work like your own — without the operational cost.
        </p>
        <p>Pay only for your team, not the overhead.</p>
          </div>
        <div className="hero-buttons">
          <button className="btn-primary" onClick={() => { window.location.hash = '#/contact'; setTimeout(() => window.scrollTo({top:0,left:0,behavior:'smooth'}), 0); }}>Build your team</button>
            <button className="btn-secondary" onClick={onBookCallClick}>Book a free call</button>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const TeamSection = () => (
  <section className="team-section">
    <div className="team-header">
      <p className="section-header">How to start with Yucel Hub</p>
    <h2 className="section-title">Your Technology And Creative Team, <span className="highlight">Simplified.</span></h2>
      <p className="section-subtitle">A flexible technology and creative team that help you dominate the industry</p>
    </div>
    <div className="team-cards">
      <div className="team-card">
        <div className="card-image">
          <img src={TeamImg1} alt="Business professionals in office" />
        </div>
        <div className="card-content">
          <h3>Project-Based Or Full-Time Support</h3>
          <p>Get exactly what your business needs — project-based support or fully embedded teams without the overhead.</p>
        </div>
      </div>
      
      <div className="team-card">
        <div className="card-image">
          <img src={TeamImg2} alt="Person working at desk" />
        </div>
        <div className="card-content">
          <h3>Post-Production, Graphic Design, UX/UI, And Development</h3>
          <p>Yucel Hub Delivers Embedded Teams That Work Like Your Own — Minus The Operational Hassle.</p>
        </div>
      </div>
      
      <div className="team-card">
        <div className="card-image">
          <img src={TeamImg3} alt="Growth chart" />
          
      </div>
        <div className="card-content">
          <h3>Cut Costs, Grow Faster</h3>
          <p>Save Up To 3x — Pay Only For The Creative And Tech Talent You Need. Trusted By 80+ Companies Worldwide.</p>
      </div>
      </div>
    </div>
  </section>
);

const LogoBanner = () => (
  <section className="logo-banner">
    <div className="banner-content">
      <span className="logo-text">LOGO</span>
      <span className="logo-text">LOGO</span>
      <span className="logo-text">LOGO</span>
      <span className="logo-text">LOGO</span>
    </div>
  </section>
);

const PortfolioSection = () => {
  const [scrollIndex, setScrollIndex] = useState(0);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const trackRef = React.useRef(null);

  // Import ProjectService to load projects
  useEffect(() => {
    const loadProjects = async () => {
      try {
        // Dynamic import to avoid circular dependencies
        const { default: ProjectService } = await import('./services/projectService');
        const adminProjects = ProjectService.getAllProjects();
        setProjects(adminProjects || []);
      } catch (error) {
        console.error("Error loading projects:", error);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  const scrollBy = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    const cardWidth = el.firstChild ? el.firstChild.getBoundingClientRect().width + 16 : 320;
    const next = Math.max(0, Math.min(projects.length - 1, scrollIndex + dir));
    setScrollIndex(next);
    el.scrollTo({ left: next * cardWidth, behavior: 'smooth' });
  };

  const goToProject = (id) => {
    window.location.hash = `#/project?id=${id}`;
  };

  // Show loading state if no projects
  if (loading || projects.length === 0) {
    return (
      <section className="portfolio-section">
        <div className="portfolio-inner">
          <h2 className="portfolio-title">Our Works</h2>
          <p className="portfolio-sub">Not just portfolios — these are stories we've stitched together with passion, design, and innovation.</p>
          <div className="portfolio-loading">
            <p>Loading our latest projects...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="portfolio-section">
      <div className="portfolio-inner">
        <h2 className="portfolio-title">Our Works</h2>
        <p className="portfolio-sub">Not just portfolios — these are stories we've stitched together with passion, design, and innovation.</p>

        <div className="hw-carousel">
          <div className="hw-track" ref={trackRef}>
            {projects.slice(0, 4).map((project) => (
              <div key={project.id} className="hw-card" onClick={() => goToProject(project.id)} style={{cursor:'pointer'}}>
                <img 
                  src={project.imageUrl || project.image || ServiceImg3} 
                  alt={project.title} 
                  onError={(e) => {
                    e.target.src = ServiceImg3;
                  }}
                />
                <div className="hw-card-overlay" />
                <div className="hw-card-title">
                  <div>{project.title.split(' ').slice(0, 2).join(' ')}</div>
                  <div>{project.title.split(' ').slice(2).join(' ')}</div>
                </div>
              </div>
            ))}
          </div>

          {projects.length > 1 && (
            <div className="hw-arrows">
              <button className="hw-arrow" onClick={() => scrollBy(-1)}>‹</button>
              <button className="hw-arrow" onClick={() => scrollBy(1)}>›</button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

const ServicesSection = () => (
  <section className="services-section">
    <div className="services-header">
    <h2 className="section-title">Our Services</h2>
      <p className="services-description">
        Yucel Hub has everything you need to build your dream team. Don't just take our word for it — let the work speak for itself.
      </p>
    </div>
    <div className="services-grid">
      {/* Service 1: Post Production - Image Left, Content Right */}
      <div className="service-card">
        {/* Mobile title above image */}
        <div className="content-top mobile-only">
          <p className="service-category">Creative polishing, technical precise</p>
          <h3>Post-Production</h3>
        </div>
        <div className="card-image-left">
          <img src={ServiceImg0} alt="Post Production" />
        </div>
        <div className="card-content-right">
          <div className="content-top">
            <p className="service-category">Creative polishing, technical precise</p>
            <h3>Post-Production</h3>
          </div>
          <div className="content-bottom">
            <p className="service-description">From raw footage to a cinematic final cut — we edit, color grade, and design sound to bring your vision to life.</p>
            <button className="btn-primary" onClick={() => { window.location.hash = '#/contact'; setTimeout(() => window.scrollTo({top:0,left:0,behavior:'smooth'}), 0); }}>Let's Talk</button>
          </div>
        </div>
      </div>

      {/* Service 2: Design & Experience - Content Left, Image Right */}
      <div className="service-card reversed">
        {/* Mobile title above image */}
        <div className="content-top mobile-only">
          <p className="service-category">Design that works and feels right</p>
          <h3>Design & Experience</h3>
        </div>
        <div className="card-content-left">
          <div className="content-top">
            <p className="service-category">Design that works and feels right</p>
          <h3>Design & Experience</h3>
          </div>
          <div className="content-bottom">
            <p className="service-description">We blend branding and UI/UX into one powerful creative layer — building visual identities and digital experiences that connect with people and perform across platforms.</p>
            <button className="btn-primary" onClick={() => { window.location.hash = '#/contact'; setTimeout(() => window.scrollTo({top:0,left:0,behavior:'smooth'}), 0); }}>Let's Talk</button>
          </div>
        </div>
        <div className="card-image-right">
          <img src={ServiceImg1} alt="Design & Experience" />
        </div>
      </div>

      {/* Service 3: Web & App Development - Image Left, Content Right */}
      <div className="service-card">
        {/* Mobile title above image */}
        <div className="content-top mobile-only">
          <p className="service-category">Scalable, modern, and built to last</p>
          <h3>Web & App Development</h3>
        </div>
        <div className="card-image-left">
          <img src={ServiceImg2} alt="Web & App Development" />
        </div>
        <div className="card-content-right">
          <div className="content-top">
            <p className="service-category">Scalable, modern, and built to last</p>
          <h3>Web & App Development</h3>
          </div>
          <div className="content-bottom">
            <p className="service-description">We develop custom websites and apps using modern frameworks like React and Next.js — clean, fast, and tailored to your logic.</p>
            <button className="btn-primary" onClick={() => { window.location.hash = '#/contact'; setTimeout(() => window.scrollTo({top:0,left:0,behavior:'smooth'}), 0); }}>Let's Talk</button>
          </div>
        </div>
      </div>

      {/* Service 4: Product Development - Content Left, Image Right */}
      <div className="service-card reversed">
        {/* Mobile title above image */}
        <div className="content-top mobile-only">
          <p className="service-category">From concept to company</p>
          <h3>Product Development</h3>
        </div>
        <div className="card-content-left">
          <div className="content-top">
            <p className="service-category">From concept to company</p>
          <h3>Product Development</h3>
          </div>
          <div className="content-bottom">
            <p className="service-description">We help you bring product ideas to life — from initial strategy and brand to full design, development, and launch. Our work on Diallock AI is proof, built in-house, serving real users, scaling fast.</p>
            <button className="btn-primary" onClick={() => { window.location.hash = '#/contact'; setTimeout(() => window.scrollTo({top:0,left:0,behavior:'smooth'}), 0); }}>Let's Talk</button>
          </div>
        </div>
        <div className="card-image-right">
          <img src={ServiceImg3} alt="Product Development" />
        </div>
      </div>
    </div>
  </section>
);

const WhatWeDoSection = ({ onBookCallClick }) => {
  const handleServicesClick = () => {
    window.location.hash = '#/services';
    // Ensure we land at the top of Services page (header visible)
    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, 0);
  };
  const handleContactClick = () => {
    window.location.hash = '#/contact';
    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, 0);
  };

  return (
  <section className="what-we-do-section">
      <h2 className="section-title">What Yucel Hub can do for you</h2>
      <p className="intro-text">We prioritize your return on investment with dedicated teams that ensure creative control and seamless collaboration. Our global scalability allows us to adapt to your needs, no matter where you are located.</p>
    <div className="what-we-do-content">
      <div className="image-container">
          <img src={WhatWeDoImg} alt="What Yucel Hub can do for you" className="what-we-do-image" />
      </div>
      <div className="text-container">
          <h3 className="sub-heading">Who is <span className="highlight">YucelHub</span>?</h3>
          <p className="description">Yucel Hub is a remote-first creative and technology team built to support ambitious brands. We help brands scale with flexible teams across video editing, graphic/UX design, and web & app development — all fully managed and built to match your workflow. Think of us as your extended team — creative, scalable, and seamless.</p>
          
          <p className="bold-statement">We're not just service providers. We're creative collaborators.</p>
          
          <p className="conclusion">At Yucel Hub, we simplify the complex — giving you flexible, scalable teams that feel in-house, without the overhead, delays, or hiring headaches.</p>
          
        <div className="buttons-group">
            <button className="btn-primary" onClick={handleContactClick}>Let's Talk</button>
            <button className="btn-secondary" onClick={handleServicesClick}>Our Services</button>
        </div>
      </div>
    </div>
  </section>
);
};

const TestimonialsSection = () => (
  <section className="testimonials-section">
    <h2 className="section-title">Review that speak volumes.</h2>
    <p className="testimonials-subtitle">Don't just take our word for it. here what people say about us.</p>
    
    <div className="testimonials-grid">
      {/* Image Testimonial Card */}
      <div className="testimonial-card illustrated">
        <img src={TestimonialImg} alt="Testimonial" className="testimonial-image" />
      </div>

      {/* Text Testimonial Card 1 */}
      <div className="testimonial-card text-card">
        <div className="quote-indicator">//</div>
        <p className="review-text">"The attention to detail in Quanta is unmatched. Every section feels well thought out, making our agency's portfolio shine effortlessly"</p>
        <div className="author-info">
          <h4>Rhea Ripley</h4>
          <p className="client-title">Founder of Monarch Studio</p>
          </div>
            <div className="rating-stars">★★★★★</div>
      </div>

      {/* Text Testimonial Card 2 */}
      <div className="testimonial-card text-card enhanced">
        <div className="stars-row">★★★★★</div>
        <div className="quote-row">
          <span className="quote-accent">//</span>
          <p className="review-text">Yucel Hub completely transformed how we manage our creative projects. The interface is sleek, and the support team actually listens. It’s like having a digital command center for our entire business.</p>
        </div>
        <div className="author-strip">
          <div className="author-avatar">
            <img src="/assets/review-person-1.jpg" alt="Rhea Ripley" />
          </div>
          <div className="author-meta">
            <h4>Rhea Ripley</h4>
            <p className="client-title">Founder of Monarch Studio</p>
          </div>
          </div>
        </div>

      {/* Text Testimonial Card 3 */}
      <div className="testimonial-card text-card enhanced">
        <div className="stars-row">★★★★★</div>
        <div className="quote-row">
          <span className="quote-accent">//</span>
          <p className="review-text">Yucel Hub completely transformed how we manage our creative projects. The interface is sleek, and the support team actually listens. It’s like having a digital command center for our entire business.</p>
      </div>
        <div className="author-strip">
          <div className="author-avatar">
            <img src="/assets/review-person-2.jpg" alt="Rhea Ripley" />
          </div>
          <div className="author-meta">
            <h4>Rhea Ripley</h4>
            <p className="client-title">Founder of Monarch Studio</p>
          </div>
        </div>
      </div>
    </div>

    <div className="testimonials-navigation">
      <button className="nav-arrow prev-arrow">‹</button>
      <button className="nav-arrow next-arrow">›</button>
    </div>
  </section>
);


// --- Main HomePage Component ---
function HomePage() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const handleBookCallClick = () => {
    setIsBookingModalOpen(true);
  };

  return (
    <div className="home-container">
      <Header onBookCallClick={handleBookCallClick} />
      <HeroSection onBookCallClick={handleBookCallClick} />
      <TeamSection />
      <LogoBanner />
      <PortfolioSection />
      <ServicesSection />
      <WhatWeDoSection onBookCallClick={handleBookCallClick} />
      
      <TestimonialsSection />
      <BookingModal 
        isOpen={isBookingModalOpen} 
        onClose={() => setIsBookingModalOpen(false)} 
      />
      {/* The image does not show a traditional footer, but one could be added here */}
    </div>
  );
}

export default HomePage;