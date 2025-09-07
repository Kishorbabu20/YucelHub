import React, { useState, useEffect } from "react";
import { Header } from "./HomePage";
import "./styles/Portfolio.css";
import ProjectService from "./services/projectService";

function PortfolioHero() {
  return (
    <section className="po-hero">
      <div className="po-hero-content">
        <div className="po-hero-text">
          <h1 className="po-title">PORTFOLIO</h1>
          <p className="po-eyebrow">CHECK OUT <span className="po-eyebrow-highlight">OUR WORKS</span></p>
          <p className="po-sub">Here are some of the things we've built</p>
        </div>
        <div className="po-scroll-indicator">
          <img src={require("./assets/scroll.gif")} alt="Scroll down" className="po-scroll-gif" />
        </div>
      </div>
    </section>
  );
}

function PortfolioFilters({ activeFilter, setActiveFilter, projects }) {
  // Get unique categories from projects
  const categories = ["All", ...new Set(projects.map(p => p.category).filter(Boolean))];

  return (
    <section className="po-filters">
      <div className="po-filters-inner">
        {categories.map((filter) => (
          <button
            key={filter}
            className={`po-filter-btn ${activeFilter === filter ? 'active' : ''}`}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>
    </section>
  );
}

function PortfolioGrid({ projects, loading }) {

  const goToProject = (id) => {
    window.location.href = `/project/${id}`;
  };

  return (
    <section className="po-projects">
      <div className="po-projects-inner">
        {loading ? (
          <div className="po-loading">Loading projects...</div>
        ) : (
          <div className="po-projects-grid">
            {projects.map((project) => (
              <div className="po-project-card" key={project.id} onClick={() => goToProject(project.id)} style={{ cursor: "pointer" }}>
                <div className="po-project-image">
                  <img src={project.imageUrl || project.image || "/assets/Service3.png"} alt={project.title} />
                  <div className="po-project-overlay">
                    <button className="po-project-overlay-btn" onClick={(e) => { e.stopPropagation(); goToProject(project.id); }}>View Project</button>
                  </div>
                </div>
                <div className="po-project-content">
                  <h3 className="po-project-title">{project.title}</h3>
                  <p className="po-project-description">{project.description}</p>
                  <div className="po-project-tags">
                    {(project.tools || project.tags || []).map((tag) => (
                      <span key={tag} className="po-project-tag">{tag}</span>
                    ))}
                  </div>
                  <button className="po-project-btn" onClick={(e) => { e.stopPropagation(); goToProject(project.id); }}>View Project</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function PortfolioCTA() {
  return (
    <section className="po-cta">
      <div className="po-cta-inner">
        <h2 className="po-cta-title">Ready to Start Your Project?</h2>
        <p className="po-cta-description">
          Let's discuss how we can help bring your vision to life with our expertise in post-production, design, and branding.
        </p>
        <button className="po-cta-btn">Get Started Today</button>
      </div>
    </section>
  );
}

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load projects from admin system
    const loadProjects = () => {
      try {
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

  // Filter projects based on active filter
  const filteredProjects = activeFilter === "All"
    ? projects
    : projects.filter(project => project.category === activeFilter);

  return (
    <div className="po-container">
      <Header />
      <PortfolioHero />
      <PortfolioFilters activeFilter={activeFilter} setActiveFilter={setActiveFilter} projects={projects} />
      <PortfolioGrid projects={filteredProjects} loading={loading} />
      <PortfolioCTA />
    </div>
  );
}