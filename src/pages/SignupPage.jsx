import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../App";
import {
  UserPlus,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Zap,
} from "lucide-react";
import '../App.css'

export default function SignupPage() {
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [success, setSuccess] = useState(false);

  const passwordRules = [
    { label: "At least 8 characters", ok: form.password.length >= 8 },
    { label: "One uppercase letter", ok: /[A-Z]/.test(form.password) },
    { label: "One number", ok: /\d/.test(form.password) },
  ];

  const validate = () => {
    const e = {};
    if (!form.name.trim() || form.name.trim().length < 2)
      e.name = "Name must be at least 2 characters.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Please enter a valid email address.";
    if (form.password.length < 8)
      e.password = "Password must be at least 8 characters.";
    if (!/[A-Z]/.test(form.password))
      e.password = "Password must contain an uppercase letter.";
    if (!/\d/.test(form.password))
      e.password = "Password must contain a number.";
    if (form.password !== form.confirm)
      e.confirm = "Passwords do not match.";
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
      await register({ name: form.name.trim(), email: form.email, password: form.password });
      setSuccess(true);
      setTimeout(() => navigate("/"), 900);
    } catch (err) {
      setServerError(err.message || "Signup failed.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-bg">
        <div className="auth-blob blob-1" />
        <div className="auth-blob blob-2" />
        <div className="auth-blob blob-3" />
      </div>

      <div className="auth-card signup-card">
        <div className="auth-brand">
          <Zap size={28} className="brand-icon" />
          <span className="brand-name">Nexus</span>
        </div>

        <div className="auth-header">
          <h1 className="auth-title">Create your account</h1>
          <p className="auth-subtitle">
            Join thousands of teams building with Nexus.
          </p>
        </div>

        {serverError && (
          <div className="alert alert-error">
            <XCircle size={16} />
            <span>{serverError}</span>
          </div>
        )}

        {success && (
          <div className="alert alert-success">
            <CheckCircle2 size={16} />
            <span>Account created! Redirecting…</span>
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          {/* Name */}
          <div className={`field-group ${errors.name ? "has-error" : ""}`}>
            <label className="field-label">Full Name</label>
            <div className="input-wrap">
              <User size={16} className="input-icon" />
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Jane Smith"
                className="field-input"
                autoComplete="name"
              />
            </div>
            {errors.name && <p className="field-error">{errors.name}</p>}
          </div>

          {/* Email */}
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

          {/* Password */}
          <div className={`field-group ${errors.password ? "has-error" : ""}`}>
            <label className="field-label">Password</label>
            <div className="input-wrap">
              <Lock size={16} className="input-icon" />
              <input
                type={showPw ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Min. 8 characters"
                className="field-input"
                autoComplete="new-password"
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

            {form.password.length > 0 && (
              <ul className="pw-rules">
                {passwordRules.map((r) => (
                  <li key={r.label} className={r.ok ? "rule-ok" : "rule-bad"}>
                    {r.ok ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                    {r.label}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Confirm */}
          <div className={`field-group ${errors.confirm ? "has-error" : ""}`}>
            <label className="field-label">Confirm Password</label>
            <div className="input-wrap">
              <Lock size={16} className="input-icon" />
              <input
                type={showConfirm ? "text" : "password"}
                name="confirm"
                value={form.confirm}
                onChange={handleChange}
                placeholder="Repeat password"
                className="field-input"
                autoComplete="new-password"
              />
              <button
                type="button"
                className="toggle-pw"
                onClick={() => setShowConfirm((v) => !v)}
                tabIndex={-1}
              >
                {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.confirm && <p className="field-error">{errors.confirm}</p>}
          </div>

          <button
            type="submit"
            className="btn-primary btn-full"
            disabled={loading || success}
          >
            {loading ? (
              <span className="spinner" />
            ) : (
              <>
                <UserPlus size={17} />
                Create Account
                <ArrowRight size={17} className="btn-arrow" />
              </>
            )}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account?{" "}
          <Link to="/login" className="auth-link">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}