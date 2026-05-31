import { useEffect, useRef, useState } from 'react';
import { StaggeredTextReveal } from '@/components/StaggeredTextReveal';
import { getMousePos } from '@/hooks/useMousePosition';

export function HeroSection() {
  const [coords, setCoords] = useState('X: 0.00 / Y: 0.00');
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const updateCoords = () => {
      const pos = getMousePos();
      setCoords(
        `X: ${pos.normX.toFixed(2)} / Y: ${pos.normY.toFixed(2)}`
      );
      rafRef.current = requestAnimationFrame(updateCoords);
    };
    rafRef.current = requestAnimationFrame(updateCoords);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <section
      id="hero"
      className="relative w-full min-h-[700px] overflow-hidden flex items-center justify-center"
      style={{ height: '100vh', backgroundColor: '#0A0A0A', zIndex: 2 }}
    >
      {/* Video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0.35, zIndex: 0 }}
      >
        <source src="/videos/hero-loop.mp4" type="video/mp4" />
      </video>

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          zIndex: 1,
          background:
            'linear-gradient(to bottom, rgba(10,10,10,0.7) 0%, rgba(10,10,10,0.3) 50%, rgba(10,10,10,1) 100%)',
        }}
      />

      {/* Blueprint corner brackets */}
      <div className="absolute inset-12 pointer-events-none" style={{ zIndex: 2 }}>
        {/* Top-left */}
        <div className="corner-bracket corner-bracket-tl bracket-pulse" />
        {/* Top-right */}
        <div className="corner-bracket corner-bracket-tr bracket-pulse bracket-pulse-delay-1" />
        {/* Bottom-left */}
        <div className="corner-bracket corner-bracket-bl bracket-pulse bracket-pulse-delay-2" />
        {/* Bottom-right */}
        <div className="corner-bracket corner-bracket-br bracket-pulse bracket-pulse-delay-3" />
      </div>

      {/* Section number */}
      <div className="absolute top-12 left-12 flex items-center gap-2" style={{ zIndex: 3 }} aria-hidden="true">
        <span className="w-1 h-1 bg-highlight" />
        <span className="font-mono text-[11px] text-highlight tracking-wider">00</span>
      </div>

      {/* Coordinate label */}
      <div
        className="absolute top-12 right-12 font-mono text-[10px] tracking-wider"
        style={{ zIndex: 3, color: 'rgba(138,138,138,0.25)' }}
        aria-hidden="true"
      >
        {coords}
      </div>

      {/* Main content */}
      <div className="relative text-center" style={{ zIndex: 3 }}>
        {/* Name */}
        <h1 className="font-display font-bold uppercase text-pure-white"
          style={{
            fontSize: 'clamp(48px, 8vw, 96px)',
            lineHeight: 0.85,
            letterSpacing: '-0.04em',
          }}
        >
          <StaggeredTextReveal mode="character" triggerOnLoad delay={0.3} staggerDelay={0.02}>
            HARSHIL SONDAGAR
          </StaggeredTextReveal>
        </h1>

        {/* Role subtitle */}
        <div
          className="mt-6 opacity-0 animate-fade-in"
          style={{
            animationDelay: '1.5s',
            animationFillMode: 'forwards',
          }}
        >
          <p
            className="font-display uppercase text-ash"
            style={{
              fontSize: 'clamp(11px, 1.2vw, 13px)',
              letterSpacing: '0.2em',
            }}
          >
            FULL STACK DEVELOPER
          </p>
        </div>

        {/* Location badge */}
        <div
          className="mt-8 inline-flex items-center gap-3 opacity-0 animate-fade-in"
          style={{
            animationDelay: '1.7s',
            animationFillMode: 'forwards',
          }}
        >
          <span className="w-1.5 h-1.5 bg-highlight" />
          <span
            className="font-mono text-ash border border-lead px-4 py-2"
            style={{ fontSize: '12px' }}
          >
            Ahmedabad, Gujarat, India
          </span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 scroll-bob"
        style={{ zIndex: 3 }}
      >
        <div className="flex items-center">
          <span className="w-1 h-1 bg-ash" style={{ opacity: 0.3 }} />
          <div className="w-20 h-px bg-ash" style={{ opacity: 0.3 }} />
          <span className="w-1 h-1 bg-ash" style={{ opacity: 0.3 }} />
        </div>
        <span
          className="font-mono uppercase text-[10px] tracking-[0.15em]"
          style={{ color: 'rgba(138,138,138,0.4)' }}
        >
          SCROLL TO EXPLORE
        </span>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.8s ease forwards;
        }
      `}</style>
    </section>
  );
}
