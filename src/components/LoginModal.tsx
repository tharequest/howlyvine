import { useState } from "react";
import type { Lang } from "../types";
import { UI } from "../i18n";

const ADMIN_USERNAME = import.meta.env.VITE_ADMIN_USERNAME as string;
const ADMIN_PASSWORD_HASH = import.meta.env.VITE_ADMIN_PASSWORD as string;

async function hashPassword(password: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

interface Props {
  lang: Lang;
  onLogin: (username: string) => void;
  onClose: () => void;
}

export default function LoginModal({ lang, onLogin, onClose }: Props) {
  const t = UI[lang];
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const hashed = await hashPassword(password);
    if (username === ADMIN_USERNAME && hashed === ADMIN_PASSWORD_HASH) {
      onLogin(username);
    } else {
      setError(t.wrongCredentials);
    }
    setLoading(false);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="login-title"
      >
        <h2 id="login-title" className="modal-title">
          {t.loginTitle}
        </h2>

        <form onSubmit={handleSubmit} className="modal-form">
          <label className="form-label">
            <span>{t.username}</span>
            <input
              className="form-input"
              type="text"
              autoComplete="username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setError("");
              }}
              required
              autoFocus
            />
          </label>

          <label className="form-label">
            <span>{t.password}</span>
            <input
              className="form-input"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              required
            />
          </label>

          {error && <p className="form-error">{error}</p>}

          <div className="modal-actions">
            <button type="button" className="btn" onClick={onClose}>
              {t.cancel}
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? "..." : t.loginBtn}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}