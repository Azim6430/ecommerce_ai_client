import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../App";
import { useTheme } from "../App";
import {
  Zap, Sun, Moon, Menu, X, ShoppingBag, User, LogOut, ChevronDown,
} from "lucide-react";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/collections", label: "Collections" },
  { to: "/new-in", label: "New In" },
  { to: "/sale", label: "Sale" },
  { to: "/about", label: "About" },
];

export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const userRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (userRef.current && !userRef.current.contains(e.target))
        setUserMenuOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => setMenuOpen(false), [location.pathname]);

  const initials = currentUser?.name
    ? currentUser.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "";

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    navigate("/");
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
        <div className="navbar-inner">
          {/* Brand */}
          <Link to="/" className="nav-brand">
            <Zap size={22} className="brand-icon" />
            <span className="brand-name">Nexus</span>
          </Link>

          {/* Desktop links */}
          <ul className="nav-links">
            {NAV_LINKS.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className={`nav-link ${location.pathname === l.to ? "nav-link-active" : ""} ${l.label === "Sale" ? "nav-link-sale" : ""}`}
                >
                  {l.label}
                  {l.label === "New In" && <span className="nav-badge">New</span>}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right actions */}
          <div className="nav-right">
            {/* Theme toggle */}
            <button className="icon-btn nav-icon-btn" onClick={toggleTheme} title="Toggle theme">
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Cart */}
            <button className="icon-btn nav-icon-btn cart-btn">
              <ShoppingBag size={18} />
              <span className="cart-count">3</span>
            </button>

            {/* User */}
            {currentUser ? (
              <div className="user-dropdown-wrap" ref={userRef}>
                <button
                  className="user-nav-btn"
                  onClick={() => setUserMenuOpen((v) => !v)}
                >
                  <div className="user-avatar-sm">{initials}</div>
                  <span className="user-nav-name">{currentUser.name.split(" ")[0]}</span>
                  <ChevronDown size={14} className={`chevron ${userMenuOpen ? "chevron-open" : ""}`} />
                </button>
                {userMenuOpen && (
                  <div className="user-dropdown">
                    <div className="user-dropdown-header">
                      <p className="ud-name">{currentUser.name}</p>
                      <p className="ud-email">{currentUser.email}</p>
                    </div>
                    <div className="user-dropdown-body">
                      <Link to="/" className="ud-item" onClick={() => setUserMenuOpen(false)}>
                        <User size={14} /> Dashboard
                      </Link>
                      <button className="ud-item ud-logout" onClick={handleLogout}>
                        <LogOut size={14} /> Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="nav-auth">
                <Link to="/login" className="btn-ghost">Sign in</Link>
                <Link to="/signup" className="btn-primary btn-sm">Join free</Link>
              </div>
            )}

            {/* Mobile burger */}
            <button className="icon-btn nav-icon-btn burger-btn" onClick={() => setMenuOpen((v) => !v)}>
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div className={`mobile-drawer ${menuOpen ? "drawer-open" : ""}`}>
        <ul className="mobile-nav-links">
          {NAV_LINKS.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                className={`mobile-nav-link ${location.pathname === l.to ? "mobile-nav-active" : ""} ${l.label === "Sale" ? "mobile-sale" : ""}`}
              >
                {l.label}
                {l.label === "New In" && <span className="nav-badge">New</span>}
              </Link>
            </li>
          ))}
        </ul>
        {!currentUser && (
          <div className="mobile-auth">
            <Link to="/login" className="btn-outline btn-full">Sign in</Link>
            <Link to="/signup" className="btn-primary btn-full">Create account</Link>
          </div>
        )}
      </div>
    </>
  );
}