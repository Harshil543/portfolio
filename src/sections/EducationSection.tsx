import { useEffect, useRef } from 'react';
import { SectionNumber } from '@/components/SectionNumber';
import { StaggeredTextReveal } from '@/components/StaggeredTextReveal';

export function EducationSection() {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.15 }
    );

    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="education"
      className="relative w-full"
      style={{
        backgroundColor: '#0A0A0A',
        paddingTop: '80px',
        paddingBottom: '120px',
        zIndex: 2,
      }}
    >
      <div className="section-container">
        <SectionNumber number="05" />

        <h2
          className="font-display font-medium text-pure-white uppercase text-center"
          style={{
            fontSize: 'clamp(36px, 5vw, 64px)',
            lineHeight: 0.9,
            letterSpacing: '-0.03em',
          }}
        >
          <StaggeredTextReveal mode="line">EDUCATION</StaggeredTextReveal>
        </h2>

        <div className="flex justify-center mt-12">
          <div
            ref={cardRef}
            className="relative w-full max-w-[800px] border border-lead p-8 lg:p-12 transition-all duration-1000"
            style={{
              backgroundColor: '#1A1A1A',
              opacity: 0,
              transform: 'translateY(40px)',
            }}
          >
            {/* Corner brackets */}
            <div className="corner-bracket corner-bracket-tl" aria-hidden="true" />
            <div className="corner-bracket corner-bracket-br" aria-hidden="true" />

            {/* Institution label */}
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1 h-1 bg-cyan-trace" />
              <span
                className="font-mono uppercase tracking-[0.08em]"
                style={{ fontSize: 'clamp(11px, 1vw, 13px)', color: '#00B4D8' }}
              >
                SILVER OAK COLLEGE OF ENGINEERING & TECHNOLOGY
              </span>
            </div>

            {/* Degree */}
            <h3
              className="font-display font-bold text-pure-white"
              style={{
                fontSize: 'clamp(28px, 3vw, 36px)',
                lineHeight: 1.1,
              }}
            >
              <StaggeredTextReveal mode="line" threshold={0.1}>
                Bachelor of Technology (B.Tech) in Information Technology
              </StaggeredTextReveal>
            </h3>

            {/* Location */}
            <div className="flex items-center gap-2 mt-3">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="#8A8A8A" strokeWidth="1">
                <path d="M5 0C3.34 0 2 1.34 2 3c0 2.25 3 7 3 7s3-4.75 3-7c0-1.66-1.34-3-3-3z" />
                <circle cx="5" cy="3" r="1" />
              </svg>
              <span className="font-display text-ash" style={{ fontSize: 'clamp(16px, 1.2vw, 18px)' }}>
                Ahmedabad, India
              </span>
            </div>

            {/* Period row */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-6">
              <span className="font-mono text-pure-white" style={{ fontSize: '14px' }}>
                2020 — 2024
              </span>
              <span
                className="font-mono font-medium pill-pulse border px-4 py-1.5"
                style={{
                  fontSize: '13px',
                  color: '#D4AF37',
                  borderColor: 'rgba(212,175,55,0.6)',
                }}
              >
                CGPA: 9.20 / 10
              </span>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-lead my-6" />

            {/* Achievement note */}
            <p className="font-display text-ash leading-relaxed" style={{ fontSize: '15px' }}>
              Graduated with distinction. Strong foundation in software engineering, data structures, algorithms, and system design.
            </p>

            {/* Right edge dimension */}
            <div className="absolute top-1/2 -right-6 -translate-y-1/2 pointer-events-none hidden lg:block" aria-hidden="true">
              <div className="flex flex-col items-center">
                <div className="w-px h-16 bg-ash" style={{ opacity: 0.1 }} />
                <span className="font-mono text-[10px] text-ash mt-1 -rotate-90" style={{ opacity: 0.15 }}>
                  H: 4Y
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
