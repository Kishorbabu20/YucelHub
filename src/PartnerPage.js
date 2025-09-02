import React from "react";
import { Header } from "./HomePage";
import "./styles/PartnerPage.css";
import PartnerImg from "./assets/Partner.png";

function PartnerHero() {
  return (
    <section className="pt-hero">
      <p className="pt-eyebrow">Partnership that scales with you</p>
      <h1 className="pt-title">Partner with Yucel Hub for flexible, scalable creative solutions</h1>
      <p className="pt-sub">We believe in partnerships that grow with your business. Whether you need project‑based support or a dedicated team, we adapt to your workflow and timeline.</p>
      <button className="pt-btn-primary">Start Partnership discussion</button>
    </section>
  );
}

function ModelCard({ title, desc, bullets = [], duration, ideal }) {
  return (
    <div className="pt-card">
      <h3 className="pt-card-title">{title}</h3>
      <p className="pt-card-desc">{desc}</p>
      <div className="pt-card-block">
        <h4>What's Included:</h4>
        <ul>
          {bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      </div>
      <div className="pt-meta"><span>Duration :</span><span>{duration}</span></div>
      <div className="pt-meta"><span>Ideal for :</span><span>{ideal}</span></div>
    </div>
  );
}

function Models() {
  return (
    <section className="pt-models">
      <h2>Choose Your Partnership Model</h2>
      <p className="pt-models-sub">We offer flexible partnership models to match your specific needs and budget.</p>
      <div className="pt-models-grid">
        <ModelCard
          title="Project‑Based Partnership"
          desc="Perfect for specific projects with defined scope and timeline. Get our expertise when you need it most."
          bullets={[
            "Defined scope and timeline",
            "Fixed project cost",
            "Dedicated project team",
            "Regular progress updates",
          ]}
          duration="2‑8 weeks"
          ideal="Specific campaigns, product launches, website redesigns"
        />
        <ModelCard
          title="Retainer Partnership"
          desc="Ongoing collaboration for consistent creative and technical support. Your extended team on demand"
          bullets={[
            "Monthly allocated hours",
            "Priority support",
            "Flexible scope adjustment",
            "Long‑term relationship building",
          ]}
          duration="3+ months"
          ideal="Ongoing marketing needs, continuous development, brand management"
        />
        <ModelCard
          title="Embedded Team"
          desc="Full‑time dedicated team members who work as part of your internal team. Maximum integration and efficiency."
          bullets={[
            "Dedicated team members",
            "Full‑time availability",
            "Deep project knowledge",
            "Seamless communication",
          ]}
          duration="6+ months"
          ideal="Large projects, product development, scaling operations"
        />
      </div>
    </section>
  );
}

function Process() {
  const steps = [
    { n: "01", t: "Discovery call", d: "We start with a comprehensive discussion about your goals, challenges, and vision." },
    { n: "02", t: "Planning & Strategy", d: "We develop a customized approach and timeline that fits your specific needs." },
    { n: "03", t: "Team Assembly", d: "We assign the perfect team members based on your project requirements." },
    { n: "04", t: "Execution & Delivery", d: "We work closely with you to bring your vision to life with regular check‑ins." },
  ];
  return (
    <section className="pt-process">
      <div className="pt-process-inner">
        <h2>Our Partnership Process</h2>
        <p>A streamlined approach to get you from idea to execution quickly and efficiently.</p>
        <div className="pt-steps">
          {steps.map((s) => (
            <div className="pt-step" key={s.n}>
              <div className="pt-step-num">{s.n}</div>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Benefits() {
  const items = [
    { t: "Cost Effective", d: "Save up to 3x compared to hiring in‑house teams or traditional agencies." },
    { t: "Scalable Team", d: "Scale your team up or down based on project needs without hiring overhead." },
    { t: "Global Expertise", d: "Access to world‑class talent across multiple time zones and disciplines." },
    { t: "Proven Track Record", d: "Trusted by 80+ companies worldwide with a history of successful partnerships." },
  ];

  return (
    <section className="pt-benefits">
      <div className="pt-benefits-inner">
        <h2>Choose Your Partnership Model</h2>
        <div className="pt-benefits-grid">
          <div className="pt-benefits-list">
            <ul>
              {items.map((b, i) => (
                <li key={i}><span className="dot" /> <div><strong>{b.t}</strong><p>{b.d}</p></div></li>
              ))}
            </ul>
          </div>
          <div className="pt-benefits-image">
            <img src={PartnerImg} alt="Workshop" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default function PartnerPage() {
  return (
    <div className="pt-container">
      <Header />
      <PartnerHero />
      <Models />
      <Process />
      <Benefits />
    </div>
  );
}


