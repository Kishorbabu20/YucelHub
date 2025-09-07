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
        <nav className={"nav-links" + (menuOpen ? " open" : "")} onClick={() => setMenuOpen(false)}>
          <a href="#/services" className={isActive("#/services") ? "active" : ""}>Services</a>
          <a href="#/portfolio" className={isActive("#/portfolio") ? "active" : ""}>Portfolio</a>
          <a href="#/partner" className={isActive("#/partner") ? "active" : ""}>Partner With Us</a>
          <a href="#/about" className={isActive("#/about") ? "active" : ""}>About Us</a>
          <a href="#/career" className={isActive("#/career") ? "active" : ""}>Career</a>
          {/* Book a Call inside mobile menu */}
          <button className="btn-primary book-call-mobile" onClick={onBookCallClick}>
            <span className="phone-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.25 4.5A2.25 2.25 0 0 1 4.5 2.25H7A2.25 2.25 0 0 1 9.25 4.5c0 1.067.171 2.093.49 3.053.162.49.04 1.03-.32 1.39L7.9 10.46a13.5 13.5 0 006.64 6.64l1.517-1.52c.36-.36.9-.482 1.39-.32a11.25 11.25 0 003.053.49A2.25 2.25 0 0 1 22.5 18v2.25A2.25 2.25 0 0 1 20.25 22.5C11.29 22.5 3.75 14.96 3.75 6A2.25 2.25 0 0 1 6 3.75H4.5A2.25 2.25 0 0 1 2.25 4.5z" />
              </svg>
            </span>
            <span>Book a Call</span>
          </button>
        </nav>

        {/* Book a Call button with phone icon */}
        <button className="btn-primary book-call-button" onClick={onBookCallClick}>
          <span className="phone-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.25 4.5A2.25 2.25 0 0 1 4.5 2.25H7A2.25 2.25 0 0 1 9.25 4.5c0 1.067.171 2.093.49 3.053.162.49.04 1.03-.32 1.39L7.9 10.46a13.5 13.5 0 006.64 6.64l1.517-1.52c.36-.36.9-.482 1.39-.32a11.25 11.25 0 003.053.49A2.25 2.25 0 0 1 22.5 18v2.25A2.25 2.25 0 0 1 20.25 22.5C11.29 22.5 3.75 14.96 3.75 6A2.25 2.25 0 0 1 6 3.75H4.5A2.25 2.25 0 0 1 2.25 4.5z" />
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
            <button className="btn-primary" onClick={() => { window.location.hash = '#/contact'; setTimeout(() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' }), 0); }}>Build your team</button>
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
              <div key={project.id} className="hw-card" onClick={() => goToProject(project.id)} style={{ cursor: 'pointer' }}>
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

const ServicesSection = () => {
  const [expandedService, setExpandedService] = useState(null); // No service expanded by default

  const services = [
    {
      id: 1,
      title: "Post Production & Creative",
      description: "From raw footage to a polished final cut, we bring your vision to life with expert editing, cinematic color grading, and dynamic sound design.",
      tags: ["Podcast Video editing", "TikTok & Reels Editing", "Photo Retouching & Enhancement", "Professional Video Editing", "VFX", "2D Animation"]
    },
    {
      id: 2,
      title: "Content & Marketing",
      description: "We create compelling content and manage a powerful social media presence to tell your brand's story and engage your audience.",
      tags: ["Social Media Management", "Content Creation"]
    },
    {
      id: 3,
      title: "Design & Branding",
      description: "We craft a cohesive brand identity, from memorable logos to stunning visuals, that makes a lasting impression and sets you apart.",
      tags: ["UI/UX Design", "Graphic Design", "Product Design", "Social Media Design"]
    },
    {
      id: 4,
      title: "Digital Solutions",
      description: "We build custom websites and digital experiences with seamless user interfaces, ensuring your online presence is both functional",
      tags: ["Web Development", "Software Development", "Website Maintenance", "User Experience Optimization"]
    }
  ];

  const toggleService = (serviceId) => {
    setExpandedService(expandedService === serviceId ? null : serviceId);
  };

  const handleServiceImageClick = (serviceId) => {
    // Navigate to services page with specific service highlighted
    window.location.hash = `#/services?service=${serviceId}`;
    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, 0);
  };

  return (
    <section className="services-section">
      <div className="services-header">
        <h2 className="section-title">Our Services</h2>
        <p className="services-description">
          Yucel Hub has everything you need to build your dream team. Don't just take our word for it — let the work speak for itself.
        </p>
      </div>

      <div className="services-accordion">
        {services.map((service) => (
          <div key={service.id} className="service-item">
            <div className="service-header" onClick={() => toggleService(service.id)}>
              <div className="service-number">0{service.id}.</div>
              <h3 className="service-title">{service.title}</h3>
              <div className="service-toggle">
                {expandedService === service.id ? "×" : "+"}
              </div>
            </div>

            {expandedService === service.id && (
              <div className="service-content">
                <div className="service-details">
                  <p className="service-description">{service.description}</p>
                  <div className="service-tags">
                    {service.tags.map((tag, index) => (
                      <span key={index} className="service-tag">{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="service-image" onClick={() => handleServiceImageClick(service.id)} style={{ cursor: 'pointer' }}>
                  <img src={ServiceImg3} alt={service.title} />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

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

const StatsSection = () => (
  <section className="stats-section">
    <div className="stats-container">
      <h2 className="stats-headline">
        <span className="stats-dash">—</span> WE BUILD THE BRANDS<br />THAT CAN'T BE IGNORED!
      </h2>
      <div className="stats-grid">
        <div className="stat-item">
          <div className="stat-number">80+</div>
          <div className="stat-label">Brands Worldwide</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">200+</div>
          <div className="stat-label">Projects Completed</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">15+</div>
          <div className="stat-label">International Clients</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">25+</div>
          <div className="stat-label">Collaborations</div>
        </div>
      </div>
    </div>
  </section>
);

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
      <StatsSection />
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