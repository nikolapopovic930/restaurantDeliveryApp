import React from "react";
import { Link } from "react-router-dom";
import Carousel from "../../Carousel/Carousel";
import "./Home.css";

export default function Home() {
  return (
    <div className="home-wrapper">

      {/* ---------- CAROUSEL ---------- */}
      <section className="carousel-section">
        <Carousel />
      </section>

      {/* ---------- HERO (tekstualni) ---------- */}
      <section className="hero">
        <h1>Dobrodošli u <span>Moja Dostava</span></h1>
        <p>Najukusnija jela iz Vašeg omiljenog restorana - direktno na Vaša vrata.</p>
        <Link to="/menu" className="cta-btn">Pogledaj meni</Link>
      </section>

      {/* ---------- FEATURES ---------- */}
      <section className="features">
        <div className="feature-card">
          <span className="emoji">🍅</span>
          <h3>Sveži sastojci</h3>
          <p>Svako jelo spremamo od lokalnih, sezonskih namirnica.</p>
        </div>

        <div className="feature-card">
          <span className="emoji">⚡</span>
          <h3>Brza dostava</h3>
          <p>Prosečno vreme isporuke manje od&nbsp;30&nbsp;minuta.</p>
        </div>

        <div className="feature-card">
          <span className="emoji">⭐</span>
          <h3>Ocena 4.9/5</h3>
          <p>Više od&nbsp;5 000 zadovoljnih kupaca svake godine.</p>
        </div>
      </section>

    </div>
  );
}

