import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../App";
import Navbar from "../components/Navbar";
import {
  Zap,
  ArrowRight,
  BarChart3,
  ShieldCheck,
  Layers,
  Users,
  LogOut,
  Folder,
  CheckSquare,
  Flame,
  Star,
  TrendingUp,
  Bell,
  Settings,
  ChevronRight,
  Globe,
  Clock,
  Award,
} from "lucide-react";

// ─── Public Hero ─────────────────────────────────────────────────────────────
function Hero() {
  return (
    <div className="hero-page">
      <div className="hero-bg">
        <div className="hero-orb orb-1" />
        <div className="hero-orb orb-2" />
        <div className="hero-orb orb-3" />
        <div className="hero-grid" />
      </div>

      <Navbar />

      <main className="hero-main">
        <div className="hero-badge">
          <Flame size={14} />
          <span>Now in public beta — join 10,000+ teams</span>
        </div>
        <h1 className="hero-headline">
          Build faster.<br />
          <span className="gradient-text">Ship smarter.</span>
        </h1>
        <p className="hero-desc">
          Nexus unifies your projects, tasks, and analytics into one
          blazing-fast workspace. Stop context-switching. Start delivering.
        </p>
        <div className="hero-cta">
          <Link to="/signup" className="btn-primary btn-lg">
            Start for free <ArrowRight size={18} />
          </Link>
          <Link to="/login" className="btn-outline btn-lg">
            Sign in
          </Link>
        </div>
        <p className="hero-fine">No credit card required. Free forever plan.</p>
      </main>

      <section className="features-section">
        <div className="features-grid">
          {[
            {
              icon: <BarChart3 size={22} />,
              title: "Live Analytics",
              desc: "Real-time dashboards that surface what matters.",
            },
            {
              icon: <ShieldCheck size={22} />,
              title: "Enterprise Security",
              desc: "SOC 2 Type II, SSO, and granular permissions.",
            },
            {
              icon: <Layers size={22} />,
              title: "Unified Workspace",
              desc: "Projects, tasks, docs, and wikis — one place.",
            },
            {
              icon: <Users size={22} />,
              title: "Team Collaboration",
              desc: "Comments, mentions, and live presence.",
            },
          ].map((f) => (
            <div className="feature-card" key={f.title}>
              <div className="feature-icon">{f.icon}</div>
              <h3 className="feature-title">{f.title}</h3>
              <p className="feature-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="hero-footer">
        <p>© {new Date().getFullYear()} Nexus. Built with React + localStorage magic.</p>
      </footer>
    </div>
  );
}

// ─── Stat Card ─────────────────────────────────────────────────────────────
function StatCard({ icon, label, value, color, delta }) {
  return (
    <div className="stat-card" style={{ "--accent": color }}>
      <div className="stat-icon">{icon}</div>
      <div className="stat-body">
        <p className="stat-label">{label}</p>
        <p className="stat-value">{value}</p>
        {delta && <p className="stat-delta">+{delta}% this week</p>}
      </div>
    </div>
  );
}

// ─── Activity Item ─────────────────────────────────────────────────────────
function Activity({ icon, text, time }) {
  return (
    <div className="activity-item">
      <div className="activity-icon">{icon}</div>
      <div className="activity-body">
        <p className="activity-text">{text}</p>
        <p className="activity-time">{time}</p>
      </div>
      <ChevronRight size={14} className="activity-arrow" />
    </div>
  );
}

// ─── Dashboard ───────────────────────────────────────────────────────────────
function Dashboard({ user }) {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const h = new Date().getHours();
    if (h < 12) setGreeting("Good morning");
    else if (h < 17) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, []);

  const stats = user.stats || {
    projects: 4,
    tasks: 18,
    streak: 7,
    score: 420,
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const joinDate = new Date(user.createdAt).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="dashboard-page">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-brand">
          <Zap size={22} className="brand-icon" />
          <span className="brand-name">Nexus</span>
        </div>

        <nav className="sidebar-nav">
          {[
            { icon: <BarChart3 size={18} />, label: "Dashboard", active: true },
            { icon: <Folder size={18} />, label: "Projects" },
            { icon: <CheckSquare size={18} />, label: "Tasks" },
            { icon: <Users size={18} />, label: "Team" },
            { icon: <Globe size={18} />, label: "Analytics" },
          ].map((item) => (
            <button
              key={item.label}
              className={`sidebar-link ${item.active ? "active" : ""}`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="sidebar-link">
            <Settings size={18} />
            <span>Settings</span>
          </button>
          <button className="sidebar-link logout-link" onClick={handleLogout}>
            <LogOut size={18} />
            <span>Log out</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="dash-main">
        {/* Top bar */}
        <header className="dash-topbar">
          <div>
            <p className="dash-greeting">{greeting},</p>
            <h2 className="dash-username">{user.name} 👋</h2>
          </div>
          <div className="topbar-right">
            <button className="icon-btn">
              <Bell size={18} />
              <span className="notif-dot" />
            </button>
            <div className="user-avatar">{initials}</div>
          </div>
        </header>

        {/* Stats */}
        <section className="stats-row">
          <StatCard
            icon={<Folder size={20} />}
            label="Active Projects"
            value={stats.projects}
            color="#6366f1"
            delta={12}
          />
          <StatCard
            icon={<CheckSquare size={20} />}
            label="Tasks Completed"
            value={stats.tasks}
            color="#10b981"
            delta={8}
          />
          <StatCard
            icon={<Flame size={20} />}
            label="Day Streak"
            value={`${stats.streak} days`}
            color="#f59e0b"
          />
          <StatCard
            icon={<Star size={20} />}
            label="Nexus Score"
            value={stats.score}
            color="#ec4899"
            delta={5}
          />
        </section>

        {/* Two-column content */}
        <div className="dash-content-grid">
          {/* Activity */}
          <div className="dash-card">
            <div className="dash-card-header">
              <h3 className="dash-card-title">Recent Activity</h3>
              <TrendingUp size={16} className="card-icon-muted" />
            </div>
            <div className="activity-list">
              <Activity
                icon={<Folder size={14} />}
                text="Created project 'Q3 Roadmap'"
                time="2 hours ago"
              />
              <Activity
                icon={<CheckSquare size={14} />}
                text="Completed 5 tasks in Sprint 12"
                time="Yesterday"
              />
              <Activity
                icon={<Users size={14} />}
                text="Invited 3 team members"
                time="2 days ago"
              />
              <Activity
                icon={<Award size={14} />}
                text="Earned 'First Streak' badge"
                time="3 days ago"
              />
              <Activity
                icon={<Globe size={14} />}
                text="Published workspace to team"
                time="Last week"
              />
            </div>
          </div>

          {/* Profile card */}
          <div className="dash-card profile-dash-card">
            <div className="dash-card-header">
              <h3 className="dash-card-title">Your Profile</h3>
              <Settings size={16} className="card-icon-muted" />
            </div>

            <div className="profile-avatar-lg">{initials}</div>
            <p className="profile-name-lg">{user.name}</p>
            <p className="profile-email-lg">{user.email}</p>

            <div className="profile-meta">
              <div className="meta-item">
                <Clock size={13} />
                <span>Member since {joinDate}</span>
              </div>
              <div className="meta-item">
                <ShieldCheck size={13} />
                <span>Free Plan</span>
              </div>
            </div>

            <button className="btn-primary btn-sm" style={{ marginTop: "1.25rem", width: "100%", justifyContent: "center" }}>
              Upgrade to Pro <ArrowRight size={14} />
            </button>

            <button className="btn-outline btn-sm logout-btn-card" onClick={handleLogout}>
              <LogOut size={14} /> Sign out
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

// ─── Landing (Dynamic) ───────────────────────────────────────────────────────
export default function LandingPage() {
  const { currentUser } = useAuth();
  return currentUser ? <Dashboard user={currentUser} /> : <Hero />;
}