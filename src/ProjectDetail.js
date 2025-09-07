import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "./HomePage";
import ProjectService from "./services/projectService";
import "./styles/ProjectDetail.css";

export default function ProjectDetail() {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    console.log("ProjectDetail - projectId from URL:", projectId);
    if (projectId) {
      const projectData = ProjectService.getProjectById(projectId);
      console.log("ProjectDetail - loaded project data:", projectData);
      setProject(projectData);
    }
  }, [projectId]);

  const handleBack = () => {
    window.location.href = "/portfolio";
  };

  return (
    <div className="pd-container">
      <Header />

      {/* Hero */}
      <section className="pd-hero">
        <div className="pd-hero-inner">
          <div className="pd-hero-text">
            <span className="pd-badge"># {project?.category || "Loading..."}</span>
            <h1 className="pd-title">{project?.title || "Loading Project..."}</h1>
            <p className="pd-lead">
              {project?.description || "Loading project description..."}
            </p>

            <div className="pd-client">
              <span className="pd-client-icon" aria-hidden>◎</span>
              <div>
                <div className="pd-client-label">Client</div>
                <div className="pd-client-name">{project?.client || "Loading..."}</div>
              </div>
            </div>
          </div>

          <div className="pd-hero-image">
            <img src={project?.imageUrl || "/assets/Service3.png"} alt="Project hero" />
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="pd-gallery">
        <div className="pd-section-inner">
          <h2 className="pd-section-title">Project Gallery</h2>
          <div className="pd-gallery-grid">
            {project?.galleryImages ? (
              project.galleryImages.map((image, index) => (
                <img key={index} src={image} alt={`Gallery ${index + 1}`} />
              ))
            ) : (
              <>
                <img src="/assets/Service3.png" alt="Gallery 1" />
                <img src="/assets/Service3.png" alt="Gallery 2" />
                <img src="/assets/Service3.png" alt="Gallery 3" />
                <img src="/assets/Service3.png" alt="Gallery 4" />
              </>
            )}
          </div>
        </div>
      </section>

      {/* Tools */}
      <section className="pd-tools">
        <div className="pd-section-inner">
          <h2 className="pd-section-title">Tools & Technologies</h2>
          <div className="pd-tags">
            {project?.tools ? (
              project.tools.map((tool) => (
                <span key={tool} className="pd-tag">{tool}</span>
              ))
            ) : (
              ["Loading tools..."].map((tool) => (
                <span key={tool} className="pd-tag">{tool}</span>
              ))
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pd-cta">
        <div className="pd-cta-inner">
          <h2 className="pd-cta-title">Ready to Start Your Project?</h2>
          <p className="pd-cta-description">
            Let's discuss how we can help bring your vision to life with our expertise in post-production, design, and branding.
          </p>
          <button className="pd-cta-btn" onClick={handleBack}>Get Started Today</button>
        </div>
      </section>
    </div>
  );
}
