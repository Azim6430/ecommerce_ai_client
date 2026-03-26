import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import {
  Clock, ShoppingCart, Heart, Check, Star,
  Flame, Percent, Eye,
} from "lucide-react";

const SALE_PRODUCTS = [
  { id:1, name:"Aurora Silk Dress", brand:"VELOUR", category:"Dresses", price:245, original:320, rating:4.9, reviews:189, img:"https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&q=80", endsIn:{ h:4, m:22 }, tags:["Luxury","Evening"], description:"100% mulberry silk bias-cut dress with adjustable straps." },
  { id:2, name:"Mesa Linen Shirt", brand:"TERRA", category:"Tops", price:95, original:130, rating:4.5, reviews:441, img:"https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&q=80", endsIn:{ h:12, m:5 }, tags:["Casual","Summer"], description:"Stonewashed 100% European linen, relaxed fit." },
  { id:3, name:"Solstice Maxi Coat", brand:"NORDVIK", category:"Outerwear", price:580, original:720, rating:4.9, reviews:77, img:"https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&q=80", endsIn:{ h:2, m:48 }, tags:["Luxury","Winter"], description:"Cashmere-wool blend, satin-lined, oversized silhouette." },
  { id:4, name:"Quartz Runner", brand:"PACE", category:"Footwear", price:155, original:195, rating:4.7, reviews:623, img:"https://images.unsplash.com/photo-1539185441755-769473a23570?w=600&q=80", endsIn:{ h:8, m:15 }, tags:["Sport","Performance"], description:"Carbon-plate race shoe with PEBA foam midsole." },
  { id:5, name:"Grove Cargo Pants", brand:"TERRA", category:"Bottoms", price:120, original:145, rating:4.5, reviews:267, img:"https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&q=80", endsIn:{ h:24, m:0 }, tags:["Utility","Casual"], description:"Organic cotton canvas with stretch and multiple pockets." },
  { id:6, name:"Eclipse Sunglasses", brand:"VISTA", category:"Accessories", price:210, original:260, rating:4.7, reviews:392, img:"https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&q=80", endsIn:{ h:6, m:33 }, tags:["Minimal","Summer"], description:"Handcrafted in Sabae with Zeiss polarized lenses." },
  { id:7, name:"Nova Puffer Vest", brand:"PACE", category:"Outerwear", price:145, original:180, rating:4.4, reviews:234, img:"https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600&q=80", endsIn:{ h:18, m:44 }, tags:["Sport","Winter"], description:"700-fill recycled down in a packable recycled ripstop shell." },
  { id:8, name:"Prism Crossbody", brand:"LEXA", category:"Bags", price:160, original:210, rating:4.4, reviews:156, img:"https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80", endsIn:{ h:10, m:0 }, tags:["Compact","Street"], description:"Pebbled leather with antique gold chain strap." },
  { id:9, name:"Cobalt Parka", brand:"NORDVIK", category:"Outerwear", price:380, original:480, rating:4.9, reviews:61, img:"https://images.unsplash.com/photo-1611042553365-9b101441c135?w=600&q=80", endsIn:{ h:3, m:17 }, tags:["Winter","Outdoor"], description:"3-in-1 insulated system with waterproof shell." },
];

const CATS = ["All","Footwear","Dresses","Tops","Bottoms","Outerwear","Bags","Accessories"];

function useCountdown(h, m) {
  const [secs, setSecs] = useState(h * 3600 + m * 60);
  useEffect(() => {
    const t = setInterval(() => setSecs((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, []);
  const hh = Math.floor(secs / 3600);
  const mm = Math.floor((secs % 3600) / 60);
  const ss = secs % 60;
  return `${String(hh).padStart(2,"0")}:${String(mm).padStart(2,"0")}:${String(ss).padStart(2,"0")}`;
}

function SaleCard({ p, delay }) {
  const countdown = useCountdown(p.endsIn.h, p.endsIn.m);
  const [liked, setLiked] = useState(false);
  const [added, setAdded] = useState(false);
  const disc = Math.round((1 - p.price / p.original) * 100);
  const isUrgent = p.endsIn.h < 6;

  return (
    <article className="product-card sale-card" style={{ animationDelay: `${delay}ms` }}>
      <div className="product-img-wrap">
        <img src={p.img} alt={p.name} className="product-img" loading="lazy" />
        <span className="product-badge badge-sale sale-disc-badge">
          <Percent size={11}/> {disc}% OFF
        </span>
        <div className={`sale-timer ${isUrgent ? "timer-urgent" : ""}`}>
          <Clock size={11}/>
          <span>{countdown}</span>
        </div>
        <div className="product-overlay">
          <button className={`overlay-btn ${liked?"liked":""}`} onClick={()=>setLiked(v=>!v)}>
            <Heart size={16} fill={liked?"currentColor":"none"}/>
          </button>
          <button className="overlay-btn"><Eye size={16}/></button>
        </div>
      </div>
      <div className="product-info">
        <p className="product-brand">{p.brand}</p>
        <h3 className="product-name">{p.name}</h3>
        <p className="arrival-desc">{p.description}</p>
        <div className="product-meta">
          <span className="stars">
            {[1,2,3,4,5].map(i=><Star key={i} size={11} fill={i<=Math.round(p.rating)?"currentColor":"none"}/>)}
          </span>
          <span className="product-reviews">({p.reviews})</span>
        </div>
        <div className="product-tags">{p.tags.map(t=><span key={t} className="product-tag">{t}</span>)}</div>
        <div className="product-footer">
          <div className="product-price-wrap">
            <span className="product-price">${p.price}</span>
            <span className="product-original">${p.original}</span>
            <span className="save-label">Save ${p.original - p.price}</span>
          </div>
          <button className={`add-cart-btn ${added?"added":""}`} onClick={()=>{setAdded(true);setTimeout(()=>setAdded(false),2000);}}>
            {added?<Check size={15}/>:<ShoppingCart size={15}/>}
          </button>
        </div>
      </div>
    </article>
  );
}

export default function SalePage() {
  const [cat, setCat] = useState("All");
  const filtered = cat === "All" ? SALE_PRODUCTS : SALE_PRODUCTS.filter(p => p.category === cat);

  return (
    <div className="page-wrapper">
      <Navbar />

      {/* Hero */}
      <section className="page-hero sale-hero">
        <div className="page-hero-bg sale-hero-bg" />
        <div className="page-hero-content">
          <span className="page-eyebrow sale-eyebrow"><Flame size={14}/> Limited Time</span>
          <h1 className="page-title sale-title">Big Sale</h1>
          <p className="page-subtitle">Up to 30% off on premium pieces — while stocks last.</p>
          <div className="sale-hero-stats">
            <div className="sale-stat">
              <span className="sale-stat-num">{SALE_PRODUCTS.length}</span>
              <span className="sale-stat-label">Items on sale</span>
            </div>
            <div className="sale-stat-divider"/>
            <div className="sale-stat">
              <span className="sale-stat-num">30%</span>
              <span className="sale-stat-label">Max discount</span>
            </div>
            <div className="sale-stat-divider"/>
            <div className="sale-stat">
              <span className="sale-stat-num">⏰</span>
              <span className="sale-stat-label">Ends Sunday</span>
            </div>
          </div>
        </div>
      </section>

      {/* Category pills */}
      <div className="category-pills-wrap">
        <div className="category-pills">
          {CATS.filter(c => c==="All" || SALE_PRODUCTS.some(p=>p.category===c)).map(c => (
            <button key={c} className={`category-pill ${cat===c?"pill-active":""}`} onClick={()=>setCat(c)}>
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <main className="collections-grid-wrap">
        <div className="products-grid">
          {filtered.map((p,i)=><SaleCard key={p.id} p={p} delay={i*45}/>)}
        </div>
      </main>
    </div>
  );
}