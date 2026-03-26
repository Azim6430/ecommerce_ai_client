import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../App";
import {
  LogIn,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  XCircle,
  Zap,
} from "lucide-react";
import '../App.css'

export default function LoginPage() {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [showPw, setShowPw] = useState(false);

  const validate = () => {
    const e = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Please enter a valid email address.";
    if (!form.password) e.password = "Password is required.";
    return e;
  };

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    setServerError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    try {
      await login({ email: form.email, password: form.password });
      navigate("/");
    } catch (err) {
      setServerError(err.message || "Login failed.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-bg">
        <div className="auth-blob blob-1" />
        <div className="auth-blob blob-2" />
        <div className="auth-blob blob-3" />
      </div>

      <div className="auth-card">
        <div className="auth-brand">
          <Zap size={28} className="brand-icon" />
          <span className="brand-name">Nexus</span>
        </div>

        <div className="auth-header">
          <h1 className="auth-title">Welcome back</h1>
          <p className="auth-subtitle">Sign in to continue to your workspace.</p>
        </div>

        {serverError && (
          <div className="alert alert-error">
            <XCircle size={16} />
            <span>{serverError}</span>
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <div className={`field-group ${errors.email ? "has-error" : ""}`}>
            <label className="field-label">Email Address</label>
            <div className="input-wrap">
              <Mail size={16} className="input-icon" />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="jane@company.com"
                className="field-input"
                autoComplete="email"
              />
            </div>
            {errors.email && <p className="field-error">{errors.email}</p>}
          </div>

          <div className={`field-group ${errors.password ? "has-error" : ""}`}>
            <label className="field-label">Password</label>
            <div className="input-wrap">
              <Lock size={16} className="input-icon" />
              <input
                type={showPw ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Your password"
                className="field-input"
                autoComplete="current-password"
              />
              <button
                type="button"
                className="toggle-pw"
                onClick={() => setShowPw((v) => !v)}
                tabIndex={-1}
              >
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && <p className="field-error">{errors.password}</p>}
          </div>

          <button
            type="submit"
            className="btn-primary btn-full"
            disabled={loading}
          >
            {loading ? (
              <span className="spinner" />
            ) : (
              <>
                <LogIn size={17} />
                Sign In
                <ArrowRight size={17} className="btn-arrow" />
              </>
            )}
          </button>
        </form>

        <p className="auth-switch">
          Don't have an account?{" "}
          <Link to="/signup" className="auth-link">
            Create one free
          </Link>
        </p>
      </div>
    </div>
  );
}