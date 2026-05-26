export default function AboutCard() {
  return (
    <div className="about-card-scene">
      {/* Floating badges */}
      <div className="fb fb-top-right">
        <span className="fb-dot" />
        Web3
      </div>
      <div className="fb fb-left">
        <span className="fb-dot" />
        Base 🔥
      </div>
      <div className="fb fb-bottom-right">
        <span className="fb-dot" />
        Crypto Enthusiast
      </div>
      <div className="fb fb-bottom-left">
        <span className="fb-dot" />
        Open Source
      </div>

      {/* Main floating card */}
      <div className="about-card">
        {/* Hex deco ring */}
        <div className="card-hex-ring" aria-hidden="true">
          <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polygon
              points="100,6 190,52 190,148 100,194 10,148 10,52"
              stroke="currentColor"
              strokeWidth="1"
              fill="none"
              strokeDasharray="4 6"
              opacity="0.25"
            />
          </svg>
        </div>

        <div className="card-avatar-wrap">
          <img src="/avatar.png" alt="howlyvine" className="card-avatar" />
        </div>

        <p className="card-name">howlyvine</p>
        <p className="card-role">Developer · Designer</p>

        <div className="card-badges">
          <span className="badge">React</span>
          <span className="badge">TypeScript</span>
          <span className="badge">Crypto</span>
        </div>
      </div>
    </div>
  );
}
