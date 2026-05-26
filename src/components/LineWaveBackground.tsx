import { useEffect, useRef } from "react";

interface Props {
  theme: "dark" | "light";
}

export default function LineWaveBackground({ theme }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const themeRef = useRef(theme);
  const tRef = useRef(0);

  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const tick = () => {
      const W = canvas.width;
      const H = canvas.height;
      const t = tRef.current;
      const isDark = themeRef.current === "dark";

      ctx.clearRect(0, 0, W, H);

      const numLines = 22;

      for (let i = 0; i < numLines; i++) {
        const frac = i / (numLines - 1);

        // Setiap garis punya fase sendiri supaya gerakannya terlihat
        const phase = frac * Math.PI * 2;

        // START: bottom-right
        const x0 = W * 0.25 + frac * W * 0.95;
        const y0 = H * 1.05;

        // END: top-left
        const x1 = -W * 0.1 + frac * W * 0.65;
        const y1 = -H * 0.05;

        // Control point bow — masing-masing garis bergerak dengan fase berbeda
        // sehingga ada efek gelombang mengalir
        const bow =
          Math.sin(t * 0.8 + phase) * W * 0.12 +
          Math.cos(t * 0.5 + phase * 0.7) * W * 0.06;

        const midY = H * 0.5;

        const cp1x = x0 + bow * 0.8;
        const cp1y = y0 - (y0 - midY) * 0.45;
        const cp2x = x1 + bow * 0.6;
        const cp2y = y1 + (midY - y1) * 0.45;

        // Opacity juga bergelombang per-garis biar lebih hidup
        const mid = 1 - Math.abs(frac - 0.5) * 2;
        const centerBoost = Math.max(0, mid);
        const pulse = 0.5 + 0.5 * Math.sin(t * 1.2 + phase);

        let r, g, b, alpha;
        if (isDark) {
          r = Math.round(180 + centerBoost * 40);
          g = Math.round(190 + centerBoost * 30);
          b = Math.round(220 + centerBoost * 35);
          alpha = (0.04 + centerBoost * 0.07) * (0.6 + pulse * 0.4);
        } else {
          r = Math.round(208 + centerBoost * 18);
          g = Math.round(198 + centerBoost * 5);
          b = Math.round(215 + centerBoost * 8);
          alpha = (0.06 + centerBoost * 0.12) * (0.6 + pulse * 0.4);
        }

        ctx.beginPath();
        ctx.moveTo(x0, y0);
        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x1, y1);
        ctx.strokeStyle = `rgba(${r},${g},${b},${alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Kecepatan lebih terasa
      tRef.current += 0.022;
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        display: "block",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}