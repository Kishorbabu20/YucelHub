import React, { useState } from "react";
import { Header } from "./HomePage";
import "./styles/PartnerPage.css";
import PartnerImg from "./assets/Partner.png";
import BookingModal from "./components/BookingModal";

function PartnerHero({ onBookCallClick }) {
  return (
    <section className="pt-hero">
      <div className="pt-hero-content">
        <div className="pt-hero-text">
          <h1 className="pt-title">
            <span className="pt-highlight">Earn</span> commissions for every successful referral
          </h1>
          <p className="pt-sub">Refer your clients and connections to us and earn for every successful project. Join our partner program and start earning today.</p>
          <button className="pt-btn-primary" onClick={onBookCallClick}>Join Now — it's free</button>
        </div>
        <div className="pt-hero-image">
          <img src={PartnerImg} alt="Partnership handshake" />
        </div>
      </div>
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
      <h2>Referral Program Tiers</h2>
      <p className="pt-models-sub">Choose the referral tier that best fits your network and earning potential.</p>
      <div className="pt-models-grid">
        <ModelCard
          title="Bronze Partner"
          desc="Perfect for individuals and small businesses looking to earn from referrals."
          bullets={[
            "5% commission rate",
            "Basic referral tracking",
            "Email support",
            "Monthly payouts",
          ]}
          duration="1+ referrals"
          ideal="Freelancers, small agencies, individual consultants"
        />
        <ModelCard
          title="Silver Partner"
          desc="Ideal for established businesses with regular referral opportunities."
          bullets={[
            "10% commission rate",
            "Advanced tracking dashboard",
            "Priority support",
            "Bi-weekly payouts",
          ]}
          duration="5+ referrals"
          ideal="Marketing agencies, consultants, business networks"
        />
        <ModelCard
          title="Gold Partner"
          desc="For high-volume referrers with exclusive benefits and premium support."
          bullets={[
            "15% commission rate",
            "Dedicated account manager",
            "Custom marketing materials",
            "Weekly payouts",
          ]}
          duration="15+ referrals"
          ideal="Large agencies, enterprise partners, strategic alliances"
        />
      </div>
    </section>
  );
}

function Process() {
  const steps = [
    { n: "01", t: "Sign Up", d: "Join our referral program for free and get your unique referral link." },
    { n: "02", t: "Share & Refer", d: "Share your referral link with clients and connections who need our services." },
    { n: "03", t: "Track Progress", d: "Monitor your referrals through our dashboard and track project progress." },
    { n: "04", t: "Earn Commissions", d: "Get paid automatically when your referrals become successful projects." },
  ];
  return (
    <section className="pt-process">
      <div className="pt-process-inner">
        <h2>How It Works</h2>
        <p>Simple steps to start earning commissions from your referrals.</p>
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
    { t: "High Commission Rates", d: "Earn up to 15% commission on every successful referral project." },
    { t: "Easy Referral Process", d: "Simple referral system with tracking and automated payouts." },
    { t: "No Upfront Costs", d: "Join our partner program completely free with no hidden fees." },
    { t: "Dedicated Support", d: "Get dedicated account management and marketing support for your referrals." },
  ];

  return (
    <section className="pt-benefits">
      <div className="pt-benefits-inner">
        <h2>Why Partner With Us</h2>
        <p className="pt-benefits-sub">Join our referral program and start earning commissions today</p>
        <div className="pt-benefits-grid">
          <div className="pt-benefits-list">
            <ul>
              {items.map((b, i) => (
                <li key={i}><span className="dot" /> <div><strong>{b.t}</strong><p>{b.d}</p></div></li>
              ))}
            </ul>
          </div>
          <div className="pt-benefits-image">
            <img src={PartnerImg} alt="Partnership benefits" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default function PartnerPage() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const handleBookCallClick = () => {
    setIsBookingModalOpen(true);
  };

  return (
    <div className="pt-container">
      <Header onBookCallClick={handleBookCallClick} />
      <PartnerHero onBookCallClick={handleBookCallClick} />
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </div>
  );
}


