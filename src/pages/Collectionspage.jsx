import React, { useState, useMemo, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import { useCart } from "../App";
import {
  Search, SlidersHorizontal, X, Star, ShoppingCart, Heart,
  Eye, Tag, ArrowRight, ChevronDown, Check, Sparkles,
} from "lucide-react";

// ─── Product Data ─────────────────────────────────────────────────────────────
const PRODUCTS = [
  { id:1, name:"Obsidian Pro Sneaker", brand:"ARCH", category:"Footwear", price:189, originalPrice:null, rating:4.8, reviews:342, badge:"Bestseller", color:"#1a1a2e", tags:["Minimal","Street"], description:"Engineered with full-grain leather uppers and a responsive foam midsole, the Obsidian Pro redefines everyday comfort. The hand-stitched welt construction ensures durability across thousands of miles. Comes with two lace sets — waxed cotton and reflective nylon.", sizes:["US 7","US 8","US 9","US 10","US 11","US 12"], img:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80" },
  { id:2, name:"Aurora Silk Dress", brand:"VELOUR", category:"Dresses", price:245, originalPrice:320, rating:4.9, reviews:189, badge:"Sale", color:"#2d1b69", tags:["Luxury","Evening"], description:"Woven from 100% mulberry silk sourced sustainably from Hangzhou, this bias-cut dress drapes effortlessly. The adjustable spaghetti straps and invisible zipper back ensure a perfect fit. Hand wash recommended; dry cleaning preferred.", sizes:["XS","S","M","L","XL"], img:"https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&q=80" },
  { id:3, name:"Crest Wool Jacket", brand:"NORDVIK", category:"Outerwear", price:420, originalPrice:null, rating:4.7, reviews:95, badge:"New", color:"#1c2d1c", tags:["Heritage","Formal"], description:"Double-faced Merino wool from New Zealand, tailored in a relaxed silhouette. Horn buttons, an interior phone pocket, and fully canvassed construction give this jacket a lifetime of structure and character. Dry clean only.", sizes:["S","M","L","XL","XXL"], img:"https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80" },
  { id:4, name:"Phantom Leather Tote", brand:"LEXA", category:"Bags", price:310, originalPrice:null, rating:4.6, reviews:214, badge:null, color:"#1a1a1a", tags:["Everyday","Minimal"], description:"Full-grain Italian leather tote with a structured base and magnetic snap closure. Interior features two zip pockets, six card slots, and a padded laptop sleeve. Brass hardware and cotton canvas lining. Develops a beautiful patina over time.", sizes:["One Size"], img:"https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80" },
  { id:5, name:"Mesa Linen Shirt", brand:"TERRA", category:"Tops", price:95, originalPrice:130, rating:4.5, reviews:441, badge:"Sale", color:"#8b6914", tags:["Casual","Summer"], description:"Stonewashed 100% European linen that softens with every wash. The relaxed fit and curved hem make it equally perfect tucked in or left out. Mother-of-pearl buttons and a single chest pocket complete the effortless look.", sizes:["XS","S","M","L","XL","XXL"], img:"https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&q=80" },
  { id:6, name:"Quartz Runner", brand:"PACE", category:"Footwear", price:155, originalPrice:null, rating:4.7, reviews:623, badge:"Bestseller", color:"#0f4c81", tags:["Sport","Performance"], description:"Carbon-fiber plate embedded in a lightweight PEBA foam midsole delivers explosive energy return. Engineered mesh upper with seamless Flyknit zones adapts to foot movement. Designed for 5K to marathon distances.", sizes:["US 6","US 7","US 8","US 9","US 10","US 11","US 12","US 13"], img:"https://images.unsplash.com/photo-1539185441755-769473a23570?w=600&q=80" },
  { id:7, name:"Solstice Maxi Coat", brand:"NORDVIK", category:"Outerwear", price:580, originalPrice:720, rating:4.9, reviews:77, badge:"Sale", color:"#2c1810", tags:["Luxury","Winter"], description:"Oversized silhouette cut from a heavyweight cashmere-wool blend. Fully lined in satin for smooth layering over bulky knitwear. Slash pockets, a single button closure, and dropped shoulders create an iconic sculptural shape.", sizes:["XS/S","M/L","XL/XXL"], img:"https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&q=80" },
  { id:8, name:"Prism Crossbody", brand:"LEXA", category:"Bags", price:185, originalPrice:null, rating:4.4, reviews:156, badge:"New", color:"#4a1942", tags:["Compact","Street"], description:"Structured pebbled leather body with an antique gold chain strap that transitions from shoulder to crossbody wear. Interior zip and card slots keep essentials organized. Fits a phone, keys, cards, and compact lip product.", sizes:["One Size"], img:"https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80" },
  { id:9, name:"Calibre Denim Jacket", brand:"INDIGO", category:"Outerwear", price:175, originalPrice:null, rating:4.6, reviews:308, badge:null, color:"#1a3a5c", tags:["Casual","Street"], description:"Selvedge Japanese denim woven on vintage shuttle looms in Okayama. Raw, unwashed finish that will fade uniquely to your lifestyle. Copper rivets, YKK zippers, and a slim-fit silhouette. Dry wash or spot clean for best fading.", sizes:["XS","S","M","L","XL","XXL"], img:"https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=600&q=80" },
  { id:10, name:"Vessel Ceramic Watch", brand:"HOROLOGE", category:"Accessories", price:695, originalPrice:null, rating:4.9, reviews:43, badge:"Premium", color:"#2c2c2c", tags:["Luxury","Minimal"], description:"41mm sandblasted ceramic case with a domed sapphire crystal. Swiss automatic movement with 72-hour power reserve, visible through the exhibition caseback. Five-link ceramic bracelet with micro-adjust deployment clasp. Water resistant to 100m.", sizes:["One Size"], img:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80" },
  { id:11, name:"Grove Cargo Pants", brand:"TERRA", category:"Bottoms", price:120, originalPrice:145, rating:4.5, reviews:267, badge:"Sale", color:"#3d4a2e", tags:["Utility","Casual"], description:"Relaxed-fit cargo pants in organic cotton canvas with a slight stretch for movement. Six pockets including two cargo pockets with snap closures. Drawstring-cinched ankle cuffs and an elastic waistband with internal tie for dial-in fit.", sizes:["XS","S","M","L","XL","XXL","3XL"], img:"https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&q=80" },
  { id:12, name:"Drift Knit Sweater", brand:"VELOUR", category:"Tops", price:165, originalPrice:null, rating:4.8, reviews:189, badge:"New", color:"#8b3a3a", tags:["Comfort","Winter"], description:"Chunky ribbed knit in a premium lambswool and alpaca blend. Relaxed crewneck with dropped shoulders, mock-button placket, and a slightly longer back hem. Machine washable on wool cycle. Available in seven colourways.", sizes:["XS","S","M","L","XL"], img:"https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80" },
  { id:13, name:"Eclipse Sunglasses", brand:"VISTA", category:"Accessories", price:210, originalPrice:260, rating:4.7, reviews:392, badge:"Sale", color:"#1a1a1a", tags:["Minimal","Summer"], description:"Acetate frames handcrafted in Sabae, Japan — the eyewear capital of the world. Zeiss CR-39 lenses with UV400 and polarization. Spring-hinge temples for a flexible fit. Case and cloth included. 2-year frame warranty.", sizes:["One Size"], img:"https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&q=80" },
  { id:14, name:"Apex Trail Boot", brand:"ARCH", category:"Footwear", price:270, originalPrice:null, rating:4.8, reviews:521, badge:"Bestseller", color:"#3d2b1f", tags:["Outdoor","Performance"], description:"Gore-Tex waterproof membrane with a Vibram Megagrip outsole engineered for wet rock, mud, and roots. 3mm lug depth across 80% of the sole. Padded ankle collar, speed-lacing system, and a reinforced toe cap for technical terrain.", sizes:["US 7","US 8","US 9","US 10","US 11","US 12"], img:"https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&q=80" },
  { id:15, name:"Sable Leather Belt", brand:"LEXA", category:"Accessories", price:85, originalPrice:null, rating:4.6, reviews:178, badge:null, color:"#2c1a0e", tags:["Classic","Formal"], description:"Full-grain bridle leather, 35mm wide, cut from a single piece to avoid seams. Solid brass buckle with an antique finish. Hand-beveled and burnished edges. Four adjustable holes. Develops rich patina over years of wear.", sizes:["28\"","30\"","32\"","34\"","36\"","38\"","40\""], img:"https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80" },
  { id:16, name:"Nova Puffer Vest", brand:"PACE", category:"Outerwear", price:145, originalPrice:180, rating:4.4, reviews:234, badge:"Sale", color:"#0f3d2e", tags:["Sport","Winter"], description:"700-fill recycled down insulation in a recycled ripstop nylon shell. Packable into its own chest pocket. YKK zippers, two hand pockets, and one internal security pocket. PFC-free DWR finish repels light rain and snow.", sizes:["XS","S","M","L","XL","XXL"], img:"https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600&q=80" },
];

const CATEGORIES = ["All", "Footwear", "Dresses", "Tops", "Bottoms", "Outerwear", "Bags", "Accessories"];
const SORT_OPTIONS = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Top Rated", value: "rating" },
  { label: "Most Reviewed", value: "reviews" },
];

// ─── Badge colours ────────────────────────────────────────────────────────────
const badgeStyle = (badge) => {
  const map = { Sale:"badge-sale", New:"badge-new", Bestseller:"badge-best", Premium:"badge-premium" };
  return map[badge] || "";
};

// ─── Star Rating ──────────────────────────────────────────────────────────────
function Stars({ rating }) {
  return (
    <span className="stars">
      {[1,2,3,4,5].map((i) => (
        <Star key={i} size={11} fill={i <= Math.round(rating) ? "currentColor" : "none"} />
      ))}
    </span>
  );
}

// ─── Product Card ─────────────────────────────────────────────────────────────
function ProductCard({ product, onOpen, delay }) {
  const [liked, setLiked] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAdd = (e) => {
    e.stopPropagation();
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <article
      className="product-card"
      style={{ animationDelay: `${delay}ms` }}
      onClick={() => onOpen(product)}
    >
      <div className="product-img-wrap">
        <img src={product.img} alt={product.name} className="product-img" loading="lazy" />
        <div className="product-color-dot" style={{ background: product.color }} />
        {product.badge && (
          <span className={`product-badge ${badgeStyle(product.badge)}`}>{product.badge}</span>
        )}
        <div className="product-overlay">
          <button
            className={`overlay-btn ${liked ? "liked" : ""}`}
            onClick={(e) => { e.stopPropagation(); setLiked((v) => !v); }}
            title="Wishlist"
          >
            <Heart size={16} fill={liked ? "currentColor" : "none"} />
          </button>
          <button className="overlay-btn" title="Quick view" onClick={(e) => { e.stopPropagation(); onOpen(product); }}>
            <Eye size={16} />
          </button>
        </div>
      </div>

      <div className="product-info">
        <p className="product-brand">{product.brand}</p>
        <h3 className="product-name">{product.name}</h3>
        <div className="product-meta">
          <Stars rating={product.rating} />
          <span className="product-reviews">({product.reviews})</span>
        </div>
        <div className="product-tags">
          {product.tags.map((t) => (
            <span key={t} className="product-tag">{t}</span>
          ))}
        </div>
        <div className="product-footer">
          <div className="product-price-wrap">
            <span className="product-price">${product.price}</span>
            {product.originalPrice && (
              <span className="product-original">${product.originalPrice}</span>
            )}
          </div>
          <button
            className={`add-cart-btn ${added ? "added" : ""}`}
            onClick={handleAdd}
          >
            {added ? <Check size={15} /> : <ShoppingCart size={15} />}
          </button>
        </div>
      </div>
    </article>
  );
}

// ─── Product Modal ─────────────────────────────────────────────────────────────
function ProductModal({ product, onClose }) {
  const [selectedSize, setSelectedSize] = useState(null);
  const [added, setAdded] = useState(false);
  const [liked, setLiked] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const esc = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", esc);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", esc); };
  }, [onClose]);

  if (!product) return null;
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}><X size={20} /></button>

        <div className="modal-grid">
          <div className="modal-img-wrap">
            <img src={product.img} alt={product.name} className="modal-img" />
            {discount && <span className="modal-discount">–{discount}% off</span>}
          </div>

          <div className="modal-details">
            <div className="modal-top">
              <p className="product-brand modal-brand">{product.brand}</p>
              <span className={`product-badge ${badgeStyle(product.badge)}`}>{product.badge}</span>
            </div>
            <h2 className="modal-title">{product.name}</h2>

            <div className="modal-rating">
              <Stars rating={product.rating} />
              <span className="modal-rating-num">{product.rating}</span>
              <span className="product-reviews">· {product.reviews} reviews</span>
            </div>

            <div className="modal-price-row">
              <span className="modal-price">${product.price}</span>
              {product.originalPrice && (
                <span className="product-original modal-orig">${product.originalPrice}</span>
              )}
            </div>

            <p className="modal-desc">{product.description}</p>

            <div className="modal-sizes">
              <p className="modal-section-label">Select Size</p>
              <div className="size-grid">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    className={`size-btn ${selectedSize === s ? "size-selected" : ""}`}
                    onClick={() => setSelectedSize(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="modal-tags-row">
              <Tag size={13} />
              {product.tags.map((t) => (
                <span key={t} className="product-tag">{t}</span>
              ))}
            </div>

            <div className="modal-actions">
              <button
                className={`btn-primary modal-add-btn ${added ? "btn-success" : ""}`}
                onClick={() => { setAdded(true); setTimeout(() => setAdded(false), 2000); }}
                disabled={!selectedSize}
              >
                {added ? <><Check size={16} /> Added!</> : <><ShoppingCart size={16} /> {selectedSize ? "Add to Cart" : "Select a size"}</>}
              </button>
              <button
                className={`icon-btn modal-wish-btn ${liked ? "liked" : ""}`}
                onClick={() => setLiked((v) => !v)}
              >
                <Heart size={18} fill={liked ? "currentColor" : "none"} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Collections Page ─────────────────────────────────────────────────────────
export default function CollectionsPage() {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("featured");
  const [sortOpen, setSortOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const sortRef = useRef(null);

  useEffect(() => {
    const h = (e) => { if (sortRef.current && !sortRef.current.contains(e.target)) setSortOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const filtered = useMemo(() => {
    let list = [...PRODUCTS];
    if (category !== "All") list = list.filter((p) => p.category === category);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    else if (sort === "rating") list.sort((a, b) => b.rating - a.rating);
    else if (sort === "reviews") list.sort((a, b) => b.reviews - a.reviews);
    return list;
  }, [category, search, sort]);

  return (
    <div className="page-wrapper">
      <Navbar />

      {/* Page hero */}
      <section className="page-hero collections-hero">
        <div className="page-hero-bg" />
        <div className="page-hero-content">
          <span className="page-eyebrow"><Sparkles size={13} /> Curated Selection</span>
          <h1 className="page-title">Collections</h1>
          <p className="page-subtitle">
            {PRODUCTS.length} hand-picked pieces across {CATEGORIES.length - 1} categories.
          </p>
        </div>
      </section>

      {/* Controls */}
      <div className="collections-controls">
        {/* Search */}
        <div className="search-wrap">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search products, brands, tags…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button className="search-clear" onClick={() => setSearch("")}><X size={14} /></button>
          )}
        </div>

        <div className="controls-right">
          {/* Sort */}
          <div className="sort-wrap" ref={sortRef}>
            <button className="sort-btn" onClick={() => setSortOpen((v) => !v)}>
              <SlidersHorizontal size={15} />
              {SORT_OPTIONS.find((o) => o.value === sort)?.label}
              <ChevronDown size={14} className={sortOpen ? "chevron-open" : ""} />
            </button>
            {sortOpen && (
              <div className="sort-dropdown">
                {SORT_OPTIONS.map((o) => (
                  <button
                    key={o.value}
                    className={`sort-option ${sort === o.value ? "sort-active" : ""}`}
                    onClick={() => { setSort(o.value); setSortOpen(false); }}
                  >
                    {sort === o.value && <Check size={13} />}
                    {o.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          <span className="results-count">{filtered.length} products</span>
        </div>
      </div>

      {/* Category pills */}
      <div className="category-pills-wrap">
        <div className="category-pills">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              className={`category-pill ${category === c ? "pill-active" : ""}`}
              onClick={() => setCategory(c)}
            >
              {c}
              {c !== "All" && (
                <span className="pill-count">
                  {PRODUCTS.filter((p) => p.category === c).length}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <main className="collections-grid-wrap">
        {filtered.length === 0 ? (
          <div className="empty-state">
            <Search size={48} className="empty-icon" />
            <h3>No products found</h3>
            <p>Try a different search term or category.</p>
            <button className="btn-primary" onClick={() => { setSearch(""); setCategory("All"); }}>
              Clear filters <ArrowRight size={15} />
            </button>
          </div>
        ) : (
          <div className="products-grid">
            {filtered.map((p, i) => (
              <ProductCard key={p.id} product={p} onOpen={setSelectedProduct} delay={i * 40} />
            ))}
          </div>
        )}
      </main>

      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </div>
  );
}