import { useState } from "react";
import type { Lang, Project } from "../types";
import { UI } from "../i18n";
import { fetchFromGist, saveToGist } from "../storage";

interface Props {
  lang: Lang;
  username: string;
  projects: Project[];
  onUpdateProjects: (projects: Project[]) => void;
  onLogout: () => void;
  onClose: () => void;
}

type Tab = "projects" | "sync";

const emptyProject = (): Omit<Project, "id"> => ({
  name: "", description: "", tech: [], link: "",
});

function genId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

const LS = { gistId: "hv_gist_id", token: "hv_gh_token" };

export default function Dashboard({ lang, username, projects, onUpdateProjects, onLogout, onClose }: Props) {
  const t = UI[lang];
  const [tab, setTab] = useState<Tab>("projects");

  // Project form state
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [projectForm, setProjectForm] = useState(emptyProject());
  const [techInput, setTechInput] = useState("");
  const [showProjectForm, setShowProjectForm] = useState(false);

  // Sync state
  const [gistId, setGistId] = useState(() => localStorage.getItem(LS.gistId) ?? "");
  const [ghToken, setGhToken] = useState(() => localStorage.getItem(LS.token) ?? "");
  const [syncStatus, setSyncStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");

  // ─── Project handlers ────────────────────────────────────────────────
  const openAddProject = () => {
    setEditingProject(null);
    setProjectForm(emptyProject());
    setTechInput("");
    setShowProjectForm(true);
  };

  const openEditProject = (p: Project) => {
    setEditingProject(p);
    setProjectForm({ name: p.name, description: p.description, tech: p.tech, link: p.link });
    setTechInput(p.tech.join(", "));
    setShowProjectForm(true);
  };

  const saveProject = (e: React.FormEvent) => {
    e.preventDefault();
    const tech = techInput.split(",").map((s) => s.trim()).filter(Boolean);
    if (editingProject) {
      onUpdateProjects(projects.map((p) =>
        p.id === editingProject.id ? { ...editingProject, ...projectForm, tech } : p
      ));
    } else {
      onUpdateProjects([...projects, { id: genId(), ...projectForm, tech }]);
    }
    setShowProjectForm(false);
  };

  const deleteProject = (id: string) => {
    if (window.confirm(t.deleteConfirm)) {
      onUpdateProjects(projects.filter((p) => p.id !== id));
    }
  };

  // ─── Sync handlers ────────────────────────────────────────────────────
  const saveSync = () => {
    localStorage.setItem(LS.gistId, gistId);
    localStorage.setItem(LS.token, ghToken);
  };

  const handleSync = async () => {
    saveSync();
    if (!gistId || !ghToken) { setSyncStatus("err"); return; }
    setSyncStatus("loading");
    const ok = await saveToGist(gistId, ghToken, { projects });
    setSyncStatus(ok ? "ok" : "err");
    setTimeout(() => setSyncStatus("idle"), 3000);
  };

  const handleFetchFromGist = async () => {
    saveSync();
    if (!gistId) { setSyncStatus("err"); return; }
    setSyncStatus("loading");
    const data = await fetchFromGist(gistId);
    if (data) {
      onUpdateProjects(data.projects);
      setSyncStatus("ok");
    } else {
      setSyncStatus("err");
    }
    setTimeout(() => setSyncStatus("idle"), 3000);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal modal-wide" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        {/* Header */}
        <div className="dash-header">
          <div>
            <p className="dash-welcome">{t.welcome} <strong>{username}</strong></p>
            <h2 className="modal-title" style={{ marginTop: "0.25rem" }}>{t.adminPanel}</h2>
          </div>
          <div className="dash-header-actions">
            <button className="btn" onClick={onLogout}>{t.logout}</button>
            <button className="btn" onClick={onClose} aria-label="Close">✕</button>
          </div>
        </div>

        {/* Stats */}
        <div className="dash-stats">
          <div className="stat-card">
            <span className="stat-num">{projects.length}</span>
            <span className="stat-label">{t.projects}</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="dash-tabs">
          <button className={`dash-tab${tab === "projects" ? " active" : ""}`} onClick={() => setTab("projects")}>
            {t.manageProjects}
          </button>
          <button className={`dash-tab${tab === "sync" ? " active" : ""}`} onClick={() => setTab("sync")}>
            {t.syncSettings}
          </button>
        </div>

        {/* Projects Tab */}
        {tab === "projects" && (
          <div className="dash-content">
            {!showProjectForm ? (
              <>
                <button className="btn btn-primary dash-add-btn" onClick={openAddProject}>
                  + {t.addProject}
                </button>
                <div className="admin-list">
                  {projects.length === 0 && <p className="empty-hint">{t.noProjects}</p>}
                  {projects.map((p) => (
                    <div className="admin-item" key={p.id}>
                      <div className="admin-item-info">
                        <span className="admin-item-name">{p.name}</span>
                        <span className="admin-item-sub">{p.tech.join(", ")}</span>
                      </div>
                      <div className="admin-item-actions">
                        <button className="btn btn-sm" onClick={() => openEditProject(p)}>{t.edit}</button>
                        <button className="btn btn-sm btn-danger" onClick={() => deleteProject(p.id)}>{t.delete}</button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <form onSubmit={saveProject} className="modal-form">
                <h3 className="form-section-title">{editingProject ? t.editProject : t.addProject}</h3>
                <label className="form-label">
                  <span>{t.name}</span>
                  <input className="form-input" type="text" value={projectForm.name}
                    onChange={(e) => setProjectForm({ ...projectForm, name: e.target.value })}
                    required autoFocus />
                </label>
                <label className="form-label">
                  <span>{t.description}</span>
                  <textarea className="form-input form-textarea" value={projectForm.description}
                    onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                    required rows={3} />
                </label>
                <label className="form-label">
                  <span>{t.tech} <small className="hint">{t.techHint}</small></span>
                  <input className="form-input" type="text" value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    placeholder="React, TypeScript, Vite" />
                </label>
                <label className="form-label">
                  <span>{t.link}</span>
                  <input className="form-input" type="url" value={projectForm.link}
                    onChange={(e) => setProjectForm({ ...projectForm, link: e.target.value })}
                    placeholder="https://..." required />
                </label>
                <div className="modal-actions">
                  <button type="button" className="btn" onClick={() => setShowProjectForm(false)}>{t.cancel}</button>
                  <button type="submit" className="btn btn-primary">{t.save}</button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Sync Tab */}
        {tab === "sync" && (
          <div className="dash-content">
            <div className="sync-hint-box">
              <p style={{ fontFamily: "var(--mono)", fontSize: "0.75rem", color: "var(--text-muted)", lineHeight: 1.6 }}>
                {t.syncHint}
              </p>
            </div>
            <div className="modal-form" style={{ marginTop: "1rem" }}>
              <label className="form-label">
                <span>{t.gistId}</span>
                <input className="form-input" type="text" value={gistId}
                  onChange={(e) => setGistId(e.target.value)}
                  placeholder="abc123def456..." />
              </label>
              <label className="form-label">
                <span>{t.ghToken}</span>
                <input className="form-input" type="password" value={ghToken}
                  onChange={(e) => setGhToken(e.target.value)}
                  placeholder="ghp_..." />
              </label>
              {syncStatus === "ok" && <p className="sync-ok">{t.syncSuccess}</p>}
              {syncStatus === "err" && <p className="form-error">{t.syncError}</p>}
              <div className="modal-actions">
                <button className="btn" onClick={handleFetchFromGist} disabled={syncStatus === "loading"}>
                  ↓ Pull from Gist
                </button>
                <button className="btn btn-primary" onClick={handleSync} disabled={syncStatus === "loading"}>
                  {syncStatus === "loading" ? "Syncing…" : `↑ ${t.syncNow}`}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
