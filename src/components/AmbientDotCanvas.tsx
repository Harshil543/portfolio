import { useEffect, useRef } from 'react';
import { getMousePos } from '@/hooks/useMousePosition';

interface Dot {
  baseX: number;
  baseY: number;
  size: number;
  opacity: number;
  phase: number;
  speed: number;
  repelX: number;
  repelY: number;
}

export function AmbientDotCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotsRef = useRef<Dot[]>([]);
  const rafRef = useRef<number>(0);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
      initDots();
    };

    const initDots = () => {
      const count = 60;
      dotsRef.current = Array.from({ length: count }, () => ({
        baseX: Math.random() * window.innerWidth,
        baseY: Math.random() * window.innerHeight,
        size: 1.5 + Math.random() * 1,
        opacity: 0.1 + Math.random() * 0.2,
        phase: Math.random() * Math.PI * 2,
        speed: 0.0003 + Math.random() * 0.0005,
        repelX: 0,
        repelY: 0,
      }));
    };

    resize();
    window.addEventListener('resize', resize);

    const animate = () => {
      timeRef.current += 16;
      const time = timeRef.current;
      const w = window.innerWidth;
      const h = window.innerHeight;

      ctx.clearRect(0, 0, w, h);

      const mouse = getMousePos();

      dotsRef.current.forEach((dot) => {
        // Drift
        const driftX = dot.baseX + Math.sin(time * dot.speed + dot.phase) * 30;
        const driftY = dot.baseY + Math.cos(time * dot.speed * 0.7 + dot.phase) * 20;

        // Mouse repulsion
        const dx = driftX - mouse.x;
        const dy = driftY - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 150) {
          const force = (150 - dist) / 150;
          const angle = Math.atan2(dy, dx);
          dot.repelX += Math.cos(angle) * force * 2;
          dot.repelY += Math.sin(angle) * force * 2;
        }

        // Spring back
        dot.repelX *= 0.95;
        dot.repelY *= 0.95;

        const x = driftX + dot.repelX;
        const y = driftY + dot.repelY;

        ctx.beginPath();
        ctx.arc(x, y, dot.size, 0, Math.PI * 2);
        ctx.globalAlpha = dot.opacity;
        ctx.fillStyle = '#8A8A8A';
        ctx.fill();
      });

      ctx.globalAlpha = 1;
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        pointerEvents: 'none',
      }}
    />
  );
}
