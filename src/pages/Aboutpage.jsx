import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import {
  Zap, Heart, Globe, Leaf, Shield, Award, Users, Package,
  ArrowRight, Star, Sparkles, MapPin, Mail, Send,
  Share2, Link2, ChevronDown,
} from "lucide-react";

// ─── Animated counter ─────────────────────────────────────────────────────────
function Counter({ end, suffix = "", duration = 1800 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        let start = 0;
        const step = end / (duration / 16);
        const t = setInterval(() => {
          start += step;
          if (start >= end) { setCount(end); clearInterval(t); }
          else setCount(Math.floor(start));
        }, 16);
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [end, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

// ─── Section header ────────────────────────────────────────────────────────────
function SectionHeader({ eyebrow, title, subtitle }) {
  return (
    <div className="about-section-header">
      <span className="page-eyebrow"><Sparkles size={13}/> {eyebrow}</span>
      <h2 className="about-section-title">{title}</h2>
      {subtitle && <p className="about-section-subtitle">{subtitle}</p>}
    </div>
  );
}

// ─── Team member ──────────────────────────────────────────────────────────────
const TEAM = [
  { name:"Aria Chen", role:"Co-founder & CEO", bio:"Former head of product at Lyst. Built Nexus from a single spreadsheet of curated finds.", avatar:"AC", gradient:"135deg, #6366f1, #ec4899", location:"London, UK" },
  { name:"Marcus Webb", role:"Co-founder & Creative Director", bio:"15 years in fashion editorial. Obsessed with the intersection of craft and commerce.", avatar:"MW", gradient:"135deg, #f59e0b, #ef4444", location:"New York, USA" },
  { name:"Priya Nair", role:"Head of Curation", bio:"Trained buyer for 10 years at Net-a-Porter. Her taste is our algorithm.", avatar:"PN", gradient:"135deg, #10b981, #6366f1", location:"Mumbai, India" },
  { name:"Tom Sato", role:"Head of Technology", bio:"Previously Staff Engineer at Shopify. Makes the fast feel effortless.", avatar:"TS", gradient:"135deg, #0ea5e9, #10b981", location:"Tokyo, Japan" },
];

const VALUES = [
  { icon:<Leaf size={22}/>, title:"Sustainability First", desc:"Every brand we carry is assessed on material sourcing, labour practices, and environmental impact. No exceptions." },
  { icon:<Shield size={22}/>, title:"Authentic Quality", desc:"We authenticate every product. Our team of buyers and curators personally tests items before they're listed." },
  { icon:<Heart size={22}/>, title:"Community Driven", desc:"Our community of 300,000+ members shape what we stock. Upvotes, reviews, and wishlists directly influence buying decisions." },
  { icon:<Globe size={22}/>, title:"Global Reach", desc:"Worldwide shipping to 140+ countries with transparent duties and taxes calculated at checkout. No surprises." },
];

const MILESTONES = [
  { year:"2019", event:"Founded in a Shoreditch studio with 40 curated brands." },
  { year:"2020", event:"Launched mobile app. Crossed 50,000 members during lockdown." },
  { year:"2021", event:"Series A — $8M raised. Expanded to 200 brands across 20 countries." },
  { year:"2022", event:"Introduced sustainability scoring for all products." },
  { year:"2023", event:"Reached 500,000 orders shipped. Launched Nexus for Business." },
  { year:"2024", event:"Series B — $30M. Opened London flagship concept store." },
  { year:"2025", event:"1M+ community members. Became carbon-neutral." },
];

const FAQS = [
  { q:"How do you select brands?", a:"Every brand goes through a 40-point assessment covering material quality, ethical production, design innovation, and sustainability credentials. Only about 15% of brands that apply make it onto Nexus." },
  { q:"What is your returns policy?", a:"We offer 30-day free returns on all full-price items. Sale items are eligible for exchange only. Items must be unworn with all tags attached." },
  { q:"Do you ship internationally?", a:"Yes — we ship to 140+ countries. Duties and taxes are calculated at checkout so there are no surprise charges at delivery. Express and standard options are available." },
  { q:"How does the sustainability score work?", a:"Our scoring covers four pillars: materials (certified organic/recycled), production (fair wages, safe conditions), carbon footprint, and packaging. Scores are updated annually." },
];

export default function AboutPage() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="page-wrapper">
      <Navbar />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="page-hero about-hero">
        <div className="page-hero-bg about-hero-bg"/>
        <div className="about-hero-content">
          <span className="page-eyebrow"><Sparkles size={13}/> Our Story</span>
          <h1 className="page-title about-page-title">
            Fashion that means<br/>
            <span className="gradient-text">something more.</span>
          </h1>
          <p className="about-hero-desc">
            Nexus is a curated marketplace for considered fashion — where every
            item is chosen for its craft, its ethics, and its longevity. We
            exist to make shopping better: for people, and for the planet.
          </p>
          <div className="about-hero-ctas">
            <a href="/collections" className="btn-primary btn-lg">
              Shop Collections <ArrowRight size={17}/>
            </a>
            <a href="/new-in" className="btn-outline btn-lg">
              New Arrivals
            </a>
          </div>
        </div>
      </section>

      {/* ── Stats ─────────────────────────────────────────────────────────── */}
      <section className="about-stats-section">
        <div className="about-stats-grid">
          {[
            { icon:<Users size={22}/>, num:1000000, suffix:"+", label:"Community Members" },
            { icon:<Package size={22}/>, num:500, suffix:"K+", label:"Orders Shipped" },
            { icon:<Award size={22}/>, num:320, suffix:"+", label:"Curated Brands" },
            { icon:<Globe size={22}/>, num:140, suffix:"+", label:"Countries" },
          ].map((s, i) => (
            <div className="about-stat-card" key={i}>
              <div className="about-stat-icon">{s.icon}</div>
              <p className="about-stat-num">
                <Counter end={s.num} suffix={s.suffix}/>
              </p>
              <p className="about-stat-label">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Mission ─────────────────────────────────────────────────────── */}
      <section className="about-section">
        <div className="about-section-inner about-mission">
          <div className="about-mission-text">
            <SectionHeader eyebrow="Our Mission" title="Curation over consumption." />
            <p className="about-body">
              The fashion industry produces 92 million tonnes of textile waste
              per year. We believe the answer isn't to shop less — it's to shop
              smarter. Every item on Nexus is chosen because it deserves to be
              owned, worn for years, and passed on.
            </p>
            <p className="about-body">
              We partner with independent ateliers, certified B-Corp brands, and
              heritage manufacturers who share our obsession with quality and
              accountability. If it doesn't meet our standard, it doesn't get
              listed. Simple as that.
            </p>
            <div className="about-mission-tags">
              {["B-Corp Partners","Certified Materials","Fair Wages","Carbon Neutral Shipping"].map(t=>(
                <span key={t} className="product-tag about-tag"><Star size={11}/> {t}</span>
              ))}
            </div>
          </div>
          <div className="about-mission-visual">
            <div className="mission-visual-grid">
              <img src="https://images.unsplash.com/photo-1558171813-b45e6b00b085?w=400&q=80" alt="craftsmanship" className="mv-img mv-img-1"/>
              <img src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=400&q=80" alt="production" className="mv-img mv-img-2"/>
              <img src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400&q=80" alt="fashion" className="mv-img mv-img-3"/>
            </div>
          </div>
        </div>
      </section>

      {/* ── Values ──────────────────────────────────────────────────────── */}
      <section className="about-section about-section-alt">
        <div className="about-section-inner">
          <SectionHeader eyebrow="What We Stand For" title="Our values, in action." subtitle="Four principles guide every decision we make — from the brands we list to the boxes we ship in." />
          <div className="values-grid">
            {VALUES.map((v, i) => (
              <div className="value-card" key={i} style={{ animationDelay: `${i*80}ms` }}>
                <div className="value-icon">{v.icon}</div>
                <h3 className="value-title">{v.title}</h3>
                <p className="value-desc">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline ─────────────────────────────────────────────────────── */}
      <section className="about-section">
        <div className="about-section-inner">
          <SectionHeader eyebrow="Since 2019" title="Our journey so far." />
          <div className="timeline">
            {MILESTONES.map((m, i) => (
              <div className="timeline-item" key={i} style={{ animationDelay: `${i*70}ms` }}>
                <div className="timeline-year">{m.year}</div>
                <div className="timeline-connector">
                  <div className="timeline-dot-lg"/>
                  {i < MILESTONES.length - 1 && <div className="timeline-vert-line"/>}
                </div>
                <div className="timeline-text">{m.event}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ─────────────────────────────────────────────────────────── */}
      <section className="about-section about-section-alt">
        <div className="about-section-inner">
          <SectionHeader eyebrow="The People" title="Meet the team." subtitle="A small team with big taste — and an even bigger commitment to getting it right." />
          <div className="team-grid">
            {TEAM.map((m, i) => (
              <div className="team-card" key={i} style={{ animationDelay: `${i*80}ms` }}>
                <div className="team-avatar" style={{ background: `linear-gradient(${m.gradient})` }}>{m.avatar}</div>
                <h3 className="team-name">{m.name}</h3>
                <p className="team-role">{m.role}</p>
                <p className="team-bio">{m.bio}</p>
                <div className="team-location"><MapPin size={12}/> {m.location}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="about-section">
        <div className="about-section-inner faq-inner">
          <SectionHeader eyebrow="Got Questions?" title="Frequently asked." />
          <div className="faq-list">
            {FAQS.map((f, i) => (
              <div className={`faq-item ${openFaq===i?"faq-open":""}`} key={i}>
                <button className="faq-q" onClick={()=>setOpenFaq(openFaq===i?null:i)}>
                  <span>{f.q}</span>
                  <ChevronDown size={18} className={`faq-chevron ${openFaq===i?"open":""}`}/>
                </button>
                <div className="faq-a-wrap">
                  <p className="faq-a">{f.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact / CTA ─────────────────────────────────────────────────── */}
      <section className="about-cta-section">
        <div className="about-cta-inner">
          <Zap size={36} className="about-cta-icon"/>
          <h2 className="about-cta-title">Ready to shop differently?</h2>
          <p className="about-cta-sub">Join over a million people who shop with intention on Nexus.</p>
          <div className="about-cta-btns">
            <a href="/signup" className="btn-primary btn-lg">Create free account <ArrowRight size={17}/></a>
            <a href="mailto:hello@nexus.shop" className="btn-outline btn-lg"><Mail size={16}/> Say hello</a>
          </div>
          <div className="about-socials">
            <button className="social-link" aria-label="Send"><Send size={19}/></button>
            <button className="social-link" aria-label="Share"><Share2 size={19}/></button>
            <button className="social-link" aria-label="Link"><Link2 size={19}/></button>
          </div>
        </div>
      </section>

      <footer className="hero-footer">
        <p>© {new Date().getFullYear()} Nexus. Curated with care.</p>
      </footer>
    </div>
  );
}