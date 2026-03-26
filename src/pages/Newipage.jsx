import React, { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import {
  Bell, BellRing, X, Clock, Sparkles, ShoppingCart,
  Heart, Check, Star, Flame, Zap, Package, Eye,
} from "lucide-react";

// ─── New arrivals data ────────────────────────────────────────────────────────
const NEW_ARRIVALS = [
  { id:1, name:"Zenith Air Trainer", brand:"ARCH", category:"Footwear", price:220, hoursAgo:2, isHot:true, img:"https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=600&q=80", description:"Cloud-like cushioning meets race-ready geometry. Limited first drop.", rating:4.9, stock:12 },
  { id:2, name:"Ivory Linen Co-ord Set", brand:"TERRA", category:"Tops", price:175, hoursAgo:5, isHot:true, img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80", description:"Matching blazer and trouser set in enzyme-washed linen. Summer staple.", rating:4.8, stock:8 },
  { id:3, name:"Graphite Slim Watch", brand:"HOROLOGE", category:"Accessories", price:520, hoursAgo:8, isHot:false, img:"https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?w=600&q=80", description:"Swiss quartz movement in a DLC-coated stainless steel case. 30m water resistant.", rating:4.7, stock:25 },
  { id:4, name:"Mocha Suede Chelsea Boot", brand:"ARCH", category:"Footwear", price:295, hoursAgo:12, isHot:false, img:"https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=600&q=80", description:"Nubuck suede upper with elastic gussets and a leather stacked heel.", rating:4.6, stock:19 },
  { id:5, name:"Cobalt Parka", brand:"NORDVIK", category:"Outerwear", price:480, hoursAgo:18, isHot:true, img:"https://images.unsplash.com/photo-1611042553365-9b101441c135?w=600&q=80", description:"Insulated 3-in-1 system — wear the shell alone or with the inner puffer.", rating:4.9, stock:6 },
  { id:6, name:"Onyx Mini Bag", brand:"LEXA", category:"Bags", price:155, hoursAgo:22, isHot:false, img:"https://images.unsplash.com/photo-1594938298603-c8148c4b4f47?w=600&q=80", description:"Compact structured bag in tumbled calfskin with a detachable strap.", rating:4.5, stock:34 },
  { id:7, name:"Umber Ribbed Midi Skirt", brand:"VELOUR", category:"Bottoms", price:130, hoursAgo:26, isHot:false, img:"https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=600&q=80", description:"Heavyweight jersey rib with a waist-shaping wide waistband. Midi length.", rating:4.7, stock:22 },
  { id:8, name:"Storm Shell Jacket", brand:"PACE", category:"Outerwear", price:310, hoursAgo:30, isHot:true, img:"https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=600&q=80", description:"2.5-layer Gore-Tex with a packable hood and pit-zip ventilation.", rating:4.8, stock:9 },
];

// ─── In-app drop notifications ────────────────────────────────────────────────
const DROPS = [
  { id:1, icon:<Flame size={15}/>, color:"#ef4444", text:"Zenith Air Trainer is selling fast — only 12 left!", time:"2 min ago" },
  { id:2, icon:<Zap size={15}/>, color:"#f59e0b", text:"New drop alert: Cobalt Parka just landed!", time:"15 min ago" },
  { id:3, icon:<Package size={15}/>, color:"#6366f1", text:"Storm Shell Jacket restocked in all sizes.", time:"1 hr ago" },
  { id:4, icon:<Bell size={15}/>, color:"#10b981", text:"Subscribe to get early access to next week's drop.", time:"2 hr ago" },
];

// ─── Toast notification ───────────────────────────────────────────────────────
function Toast({ msg, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [onClose]);
  return (
    <div className="toast">
      <Check size={15} className="toast-icon" />
      <span>{msg}</span>
      <button className="toast-close" onClick={onClose}><X size={13} /></button>
    </div>
  );
}

// ─── Notification Bell Panel ──────────────────────────────────────────────────
function NotificationPanel({ open, onClose, drops, onSubscribe, subscribed }) {
  const ref = useRef(null);
  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) onClose(); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [onClose]);

  return (
    <div className={`notif-panel ${open ? "notif-panel-open" : ""}`} ref={ref}>
      <div className="notif-panel-header">
        <div className="notif-panel-title">
          <BellRing size={17} />
          <span>Drop Alerts</span>
        </div>
        <button className="notif-panel-close" onClick={onClose}><X size={16} /></button>
      </div>

      <div className="notif-panel-body">
        {drops.map((d) => (
          <div className="notif-item" key={d.id}>
            <span className="notif-item-icon" style={{ color: d.color, background: d.color + "22" }}>
              {d.icon}
            </span>
            <div className="notif-item-body">
              <p className="notif-item-text">{d.text}</p>
              <p className="notif-item-time"><Clock size={11} /> {d.time}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="notif-panel-footer">
        <button className={`btn-primary btn-full ${subscribed ? "btn-success" : ""}`} onClick={onSubscribe}>
          {subscribed ? <><Check size={15}/> Subscribed!</> : <><Bell size={15}/> Subscribe to drops</>}
        </button>
      </div>
    </div>
  );
}

// ─── New Arrival Card ─────────────────────────────────────────────────────────
function NewArrivalCard({ item, delay, onToast }) {
  const [liked, setLiked] = useState(false);
  const [added, setAdded] = useState(false);
  const timeLabel = item.hoursAgo < 24 ? `${item.hoursAgo}h ago` : `${Math.floor(item.hoursAgo/24)}d ago`;

  const handleAdd = () => {
    setAdded(true);
    onToast(`${item.name} added to cart!`);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <article className="product-card new-arrival-card" style={{ animationDelay: `${delay}ms` }}>
      <div className="product-img-wrap">
        <img src={item.img} alt={item.name} className="product-img" loading="lazy" />
        {item.isHot && <span className="product-badge badge-sale"><Flame size={11}/> Hot</span>}
        <span className="arrival-time-badge"><Clock size={11}/> {timeLabel}</span>
        <div className="product-overlay">
          <button className={`overlay-btn ${liked ? "liked" : ""}`} onClick={() => setLiked(v=>!v)}>
            <Heart size={16} fill={liked ? "currentColor" : "none"} />
          </button>
          <button className="overlay-btn"><Eye size={16}/></button>
        </div>
        <div className="stock-bar">
          <div className="stock-bar-fill" style={{ width: `${Math.min(100, (item.stock / 40) * 100)}%` }} />
        </div>
        <p className="stock-label">Only {item.stock} left</p>
      </div>
      <div className="product-info">
        <p className="product-brand">{item.brand}</p>
        <h3 className="product-name">{item.name}</h3>
        <p className="arrival-desc">{item.description}</p>
        <div className="product-meta">
          <span className="stars">
            {[1,2,3,4,5].map(i=><Star key={i} size={11} fill={i<=Math.round(item.rating)?"currentColor":"none"}/>)}
          </span>
          <span className="product-reviews">{item.rating}</span>
        </div>
        <div className="product-footer">
          <span className="product-price">${item.price}</span>
          <button className={`add-cart-btn ${added?"added":""}`} onClick={handleAdd}>
            {added ? <Check size={15}/> : <ShoppingCart size={15}/>}
          </button>
        </div>
      </div>
    </article>
  );
}

// ─── NewInPage ────────────────────────────────────────────────────────────────
export default function NewInPage() {
  const [notifOpen, setNotifOpen] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [toast, setToast] = useState(null);
  const [filter, setFilter] = useState("All");
  const categories = ["All", ...new Set(NEW_ARRIVALS.map(a => a.category))];

  const filtered = filter === "All" ? NEW_ARRIVALS : NEW_ARRIVALS.filter(a => a.category === filter);

  const handleSubscribe = () => {
    setSubscribed(true);
    setToast("You're subscribed to drop alerts! 🎉");
  };

  return (
    <div className="page-wrapper">
      <Navbar />

      {/* Page hero */}
      <section className="page-hero newin-hero">
        <div className="page-hero-bg newin-hero-bg" />
        <div className="page-hero-content">
          <span className="page-eyebrow"><Sparkles size={13} /> Just Dropped</span>
          <h1 className="page-title">New In</h1>
          <p className="page-subtitle">Fresh arrivals, curated weekly. Be the first to shop.</p>
          <button
            className={`btn-primary notif-subscribe-btn ${subscribed?"btn-success":""}`}
            onClick={() => setNotifOpen(true)}
          >
            <Bell size={16}/> {subscribed ? "Subscribed to drops" : "Get drop alerts"}
          </button>
        </div>

        {/* Floating notification bell */}
        <div className="notif-bell-wrap">
          <button
            className={`notif-bell-btn ${notifOpen?"notif-bell-active":""}`}
            onClick={() => setNotifOpen((v) => !v)}
          >
            <BellRing size={22}/>
            <span className="notif-count">{DROPS.length}</span>
          </button>
          <NotificationPanel
            open={notifOpen}
            onClose={() => setNotifOpen(false)}
            drops={DROPS}
            onSubscribe={handleSubscribe}
            subscribed={subscribed}
          />
        </div>
      </section>

      {/* Category pills */}
      <div className="category-pills-wrap">
        <div className="category-pills">
          {categories.map(c => (
            <button key={c} className={`category-pill ${filter===c?"pill-active":""}`} onClick={()=>setFilter(c)}>
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Drop timeline label */}
      <div className="timeline-label">
        <span className="timeline-dot" />
        <span>Latest drops — updated every Monday &amp; Thursday</span>
        <span className="timeline-line" />
      </div>

      {/* Grid */}
      <main className="collections-grid-wrap">
        <div className="products-grid">
          {filtered.map((item, i) => (
            <NewArrivalCard key={item.id} item={item} delay={i*50} onToast={setToast} />
          ))}
        </div>
      </main>

      {/* Toast */}
      {toast && <Toast msg={toast} onClose={() => setToast(null)} />}
    </div>
  );
}