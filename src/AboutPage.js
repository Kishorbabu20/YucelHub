import React from "react";
import { Header } from "./HomePage";
import "./styles/AboutPage.css";
import AboutHeroImg from "./assets/About.png";
import AboutStoryImg from "./assets/About1.png";

function AboutHero() {
  return (
    <section className="ab-hero">
      <div className="ab-hero-inner">
        <div className="ab-hero-text">
          <p className="ab-eyebrow">About Yucel Hub</p>
          <h1 className="ab-title">We're creative collaborators, not just service providers</h1>
          <p className="ab-lead">
            Yucel Hub is a remote-first creative and technology team built to support ambitious brands.
            We help companies scale with flexible teams across video editing, graphic/UX design, and web & app development — all fully managed and built to match your workflow.
          </p>
          <p className="ab-lead">Think of us as your extended team — creative, scalable, and seamless.</p>
        </div>
        <div className="ab-hero-image">
          <img src={AboutHeroImg} alt="Team collaborating" />
        </div>
      </div>
    </section>
  );
}

function ImpactBand() {
  const items = [
    { value: "80+", label: "Brands Worldwide" },
    { value: "200+", label: "Projects Completed" },
    { value: "15+", label: "International Clients" },
    { value: "25+", label: "Collaborations" },
  ];
  return (
    <section className="ab-impact">
      <div className="ab-impact-inner">
        <h2>Our Impact in Numbers</h2>
        <p>Trusted by companies worldwide to deliver exceptional results.</p>
        <div className="ab-stats">
          {items.map((it, i) => (
            <div key={i} className="ab-stat">
              <div className="ab-stat-value">{it.value}</div>
              <div className="ab-stat-label">{it.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function OurStory() {
  return (
    <section className="ab-story">
      <div className="ab-story-inner">
        <div className="ab-story-image">
          <img src={AboutStoryImg} alt="Our story" />
        </div>
        <div className="ab-story-text">
          <h2>Our Story</h2>
          <p>
            Yucel Hub was founded with a simple vision: to bridge the gap between ambitious brands and world‑class creative talent.
            We saw businesses struggling with the overhead of hiring, the limitations of traditional agencies, and the challenges of finding reliable partners.
          </p>
          <p>
            Starting as a small team of passionate creatives and developers, we’ve grown into a global network of specialists who share our commitment to excellence and collaboration.
            Our remote‑first approach allows us to work with the best talent regardless of location.
          </p>
          <p>
            Today, we’re proud to be trusted by 80+ companies worldwide, from startups to established enterprises, helping them scale faster and more efficiently than ever before.
          </p>
        </div>
      </div>
    </section>
  );
}

function CoreValues() {
  const values = [
    {
      title: "Creative Excellence",
      desc:
        "We believe in pushing creative boundaries and delivering work that stands out in the marketplace.",
      icon: "🎨"
    },
    {
      title: "Technical Innovation",
      desc:
        "We stay at the forefront of technology to build solutions that are modern, scalable, and efficient.",
      icon: "⭐"
    },
    {
      title: "Collaborative Spirit",
      desc:
        "We work as an extension of your team, fostering open communication and shared success.",
      icon: "💬"
    },
    {
      title: "Global Impact",
      desc:
        "We help businesses worldwide scale and succeed through our remote‑first approach.",
      icon: "🌍"
    },
  ];

  return (
    <section className="ab-values">
      <div className="ab-values-inner">
        <h2>Our Core Values</h2>
        <p className="ab-values-sub">
          These values guide everything we do and shape how we work with our partners.
        </p>
        <div className="ab-values-grid">
          {values.map((v, i) => (
            <div key={i} className="ab-value-card">
              <div className="ab-value-icon">{v.icon}</div>
              <h3>{v.title}</h3>
              <p>{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <div className="ab-container">
      <Header />
      <AboutHero />
      <ImpactBand />
      <OurStory />
      <CoreValues />
    </div>
  );
}


