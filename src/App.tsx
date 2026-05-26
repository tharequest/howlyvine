import { useState, useEffect } from "react";
import type { Lang, Theme, Project } from "./types";
import { UI } from "./i18n";
import { DEFAULT_PROJECTS } from "./data";
import { fetchFromGist } from "./storage";
import LoginModal from "./components/LoginModal";
import Dashboard from "./components/Dashboard";
import AboutCard from "./components/AboutCard";
import LineWaveBackground from "./components/LineWaveBackground";

const LS = {
  theme: "hv_theme", lang: "hv_lang", user: "hv_user",
  projects: "hv_projects", gistId: "hv_gist_id",
  dataVer: "hv_data_ver",
};

// Bump this string whenever you edit DEFAULT_PROJECTS in data.ts
// so localStorage gets auto-cleared on next visit.
const DATA_VERSION = "v3";

function loadLS<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch { return fallback; }
}

// Social links — update to your handles
const SOCIALS = {
  talent: "https://talent.app/tharequest",
  x: "https://x.com/0xhowly",
  github: "https://github.com/tharequest",
  tiktok: "https://tiktok.com/@koecheng",
};

export default function App() {
  const [theme, setTheme] = useState<Theme>(() => loadLS<Theme>(LS.theme, "dark"));
  const [lang, setLang] = useState<Lang>(() => loadLS<Lang>(LS.lang, "en"));
  const [loggedInUser, setLoggedInUser] = useState<string | null>(() => loadLS<string | null>(LS.user, null));
  const [projects, setProjects] = useState<Project[]>(() => {
    // If data version changed (i.e. DEFAULT_PROJECTS was edited), clear stale cache
    const savedVer = localStorage.getItem(LS.dataVer);
    if (savedVer !== DATA_VERSION) {
      localStorage.removeItem(LS.projects);
      localStorage.setItem(LS.dataVer, DATA_VERSION);
    }
    return loadLS<Project[]>(LS.projects, DEFAULT_PROJECTS);
  });
  const [showLogin, setShowLogin] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);

  // On mount: if gist is configured, pull fresh data
  useEffect(() => {
    const gistId = localStorage.getItem(LS.gistId);
    if (gistId) {
      fetchFromGist(gistId).then((data) => {
        if (data?.projects?.length) {
          setProjects(data.projects);
          localStorage.setItem(LS.projects, JSON.stringify(data.projects));
        }
      });
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(LS.theme, JSON.stringify(theme));
  }, [theme]);
  useEffect(() => { localStorage.setItem(LS.lang, JSON.stringify(lang)); }, [lang]);
  useEffect(() => { localStorage.setItem(LS.user, JSON.stringify(loggedInUser)); }, [loggedInUser]);
  useEffect(() => { localStorage.setItem(LS.projects, JSON.stringify(projects)); }, [projects]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));
  const toggleLang = () => setLang((l) => (l === "en" ? "id" : "en"));

  const handleLogin = (username: string) => {
    setLoggedInUser(username);
    setShowLogin(false);
    setShowDashboard(true);
  };
  const handleLogout = () => { setLoggedInUser(null); setShowDashboard(false); };

  const t = UI[lang];

  return (
    <>
      {/* ─── Navbar ──────────────────────────────────────── */}
      <nav className="nav">
        <a href="#" className="nav-logo">howly<span className="logo-dot">.</span></a>

        {/* Hamburger (mobile) */}
        <button className="hamburger" onClick={() => setMenuOpen((o) => !o)} aria-label="Menu">
          <span /><span /><span />
        </button>

        <div className={`nav-right ${menuOpen ? "nav-open" : ""}`}>
          <div className="nav-links">
            <a href="#work" onClick={() => setMenuOpen(false)}>{t.work}</a>
            <a href="#about" onClick={() => setMenuOpen(false)}>{t.about}</a>
            <a href="#contact" onClick={() => setMenuOpen(false)}>{t.contact}</a>
          </div>
          <button className="lang-toggle" onClick={toggleLang}>{lang === "en" ? "ENG" : "IND"}</button>
          <button className="theme-toggle" onClick={toggleTheme}>{theme === "dark" ? "☀️" : "🌙"}</button>
          <button
            className="connect-btn"
            onClick={() => { setMenuOpen(false); loggedInUser ? setShowDashboard(true) : setShowLogin(true); }}
          >
            {loggedInUser ? loggedInUser : t.connect}
          </button>
        </div>
      </nav>

      {/* ─── Hero ────────────────────────────────────────── */}
      <section className="hero">
        <LineWaveBackground theme={theme} />
        <div className="hero-content">
          <h1 className="hero-name">
            <span className="hero-name-accent">Howly</span><span className="hero-name-vine">vine</span>
          </h1>
          <p className="hero-tagline">{t.tagline}</p>
          <div className="hero-actions">
            <a href="#work" className="btn btn-primary">{t.viewWork}</a>
            <a href={SOCIALS.github} target="_blank" rel="noopener noreferrer" className="btn">GitHub</a>
            <a href={SOCIALS.x} target="_blank" rel="noopener noreferrer" className="btn">X / Twitter</a>
            <a href={SOCIALS.talent} target="_blank" rel="noopener noreferrer" className="btn">Talent</a>
          </div>
        </div>
      </section>

      {/* ─── Work ────────────────────────────────────────── */}
      <section id="work" className="section">
        <span className="section-label">// {t.work.toLowerCase()}</span>
        {projects.length === 0 ? (
          <p className="empty-hint" style={{ marginTop: "2rem" }}>{t.noProjects}</p>
        ) : (
          <div className="projects-grid">
            {projects.map((project) => (
              <article className="project-card" key={project.id}>
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                <div className="badge-row">
                  {project.tech.map((tech) => <span className="badge" key={tech}>{tech}</span>)}
                </div>
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
                  {t.viewLive}
                </a>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* ─── About ───────────────────────────────────────── */}
      <section id="about" className="section about-section">
        <div className="about-layout">
          <div className="about-card-col">
            <AboutCard />
          </div>
          <div className="about-text-col">
            <span className="section-label">// {t.aboutMe}</span>
            <div className="about-body">
              <p>{t.aboutP1}</p>
            </div>
            <button className="read-more-btn" onClick={() => setShowAboutModal(true)}>
              {t.readMore} →
            </button>
            <div className="about-stack">
              {["React", "TypeScript", "Vite", "IPFS", "Solana", "Web3"].map((s) => (
                <span className="badge" key={s}>{s}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Contact ─────────────────────────────────────── */}
      <section id="contact" className="section">
        <span className="section-label">// {t.contact.toLowerCase()}</span>
        <p className="contact-intro">{t.findMe}</p>
        <div className="contact-grid">
          <a href={SOCIALS.talent} target="_blank" rel="noopener noreferrer" className="contact-card">
            <span className="contact-icon">
              <img src="https://talent.app/favicon.ico" alt="Talent" style={{width: '100%', height: '100%', objectFit: 'contain', borderRadius: '4px'}} />
            </span>
            <div>
              <p className="contact-name">Talent</p>
              {/* <p className="contact-handle">@tharequest</p> */}
            </div>
            <span className="contact-arrow">→</span>
          </a>

          <a href={SOCIALS.x} target="_blank" rel="noopener noreferrer" className="contact-card">
            <span className="contact-icon">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </span>
            <div>
              <p className="contact-name">X / Twitter</p>
              {/* <p className="contact-handle">@0xhowly</p> */}
            </div>
            <span className="contact-arrow">→</span>
          </a>

          <a href={SOCIALS.github} target="_blank" rel="noopener noreferrer" className="contact-card">
            <span className="contact-icon">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
            </span>
            <div>
              <p className="contact-name">GitHub</p>
              {/* <p className="contact-handle">@tharequest</p> */}
            </div>
            <span className="contact-arrow">→</span>
          </a>

          {/* <a href={SOCIALS.tiktok} target="_blank" rel="noopener noreferrer" className="contact-card">
            <span className="contact-icon">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.15 8.15 0 004.77 1.52V6.76a4.85 4.85 0 01-1-.07z"/></svg>
            </span>
            <div>
              <p className="contact-name">TikTok</p>
              <p className="contact-handle">@howlyvine</p>
            </div>
            <span className="contact-arrow">→</span>
          </a> */}
        </div>
      </section>

      {/* ─── Footer ──────────────────────────────────────── */}
      <footer className="footer">{t.footer}</footer>

      {/* ─── Modals ──────────────────────────────────────── */}
      {showLogin && (
        <LoginModal lang={lang} onLogin={handleLogin} onClose={() => setShowLogin(false)} />
      )}
      {showDashboard && loggedInUser && (
        <Dashboard
          lang={lang} username={loggedInUser}
          projects={projects}
          onUpdateProjects={setProjects}
          onLogout={handleLogout} onClose={() => setShowDashboard(false)}
        />
      )}

      {/* ─── About Modal ─────────────────────────────────── */}
      {showAboutModal && (
        <div className="modal-overlay" onClick={() => setShowAboutModal(false)}>
          <div className="modal about-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <span className="section-label">// {t.aboutMe}</span>
              <button className="modal-close" onClick={() => setShowAboutModal(false)}>✕</button>
            </div>
            <div className="about-body">
              <p>{t.aboutP1}</p>
              <p>{t.aboutP2}</p>
              <p>{t.aboutP3}</p>
              <p>{t.aboutP4}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}