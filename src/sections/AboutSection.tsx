import { useEffect, useRef } from 'react';
import { SectionNumber } from '@/components/SectionNumber';
import { StaggeredTextReveal } from '@/components/StaggeredTextReveal';

const STATS = [
  { value: '2+', label: 'Years Experience' },
  { value: '10+', label: 'Projects Delivered' },
  { value: '4', label: 'Domains Worked' },
];

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

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

    if (statsRef.current) {
      const items = statsRef.current.querySelectorAll('.stat-item');
      items.forEach((item, i) => {
        const el = item as HTMLElement;
        el.style.transitionDelay = `${0.3 + i * 0.15}s`;
        observer.observe(el);
      });
    }

    if (bodyRef.current) {
      observer.observe(bodyRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full section-padding overflow-hidden"
      style={{ backgroundColor: '#0A0A0A', zIndex: 2 }}
    >
      {/* Ambient background video */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          style={{ opacity: 0.35 }}
        >
          <source src="/videos/about-ambient.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="section-container relative" style={{ zIndex: 1 }}>
        <SectionNumber number="01" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left - Portrait */}
          <div className="lg:col-span-5 relative">
            <div className="relative">
              <img
                src="/images/about-port.png"
                alt="Harshil Sondagar"
                className="w-full object-cover"
                style={{
                  filter: 'contrast(1.05) brightness(0.95)',
                  aspectRatio: '1/1.15',
                }}
                loading="lazy"
              />

              {/* Dimension annotations */}
              <div className="absolute -top-4 left-0 right-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
                <div className="w-full h-px bg-ash" style={{ opacity: 0.2 }} />
                <span className="absolute font-mono text-[10px] text-ash" style={{ opacity: 0.5, top: '-16px' }}>
                  H: 480
                </span>
              </div>

              <div className="absolute top-0 -left-4 bottom-0 flex flex-col items-center justify-center pointer-events-none" aria-hidden="true">
                <div className="h-full w-px bg-ash" style={{ opacity: 0.2 }} />
                <span
                  className="absolute font-mono text-[10px] text-ash -rotate-90"
                  style={{ opacity: 0.5, left: '-24px' }}
                >
                  W: 360
                </span>
              </div>

              {/* Crosshair */}
              <div className="absolute bottom-2 right-2 pointer-events-none" aria-hidden="true">
                <svg width="12" height="12" viewBox="0 0 12 12" stroke="#8A8A8A" strokeWidth="1" opacity="0.3">
                  <line x1="0" y1="0" x2="12" y2="12" />
                  <line x1="12" y1="0" x2="0" y2="12" />
                </svg>
              </div>
            </div>

            <p className="font-mono text-[9px] text-ash mt-2" style={{ opacity: 0.2 }} aria-hidden="true">
              ORIGIN: TL
            </p>
          </div>

          {/* Right - Bio */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Label */}
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1 h-1 bg-highlight" />
              <span
                className="font-display font-medium uppercase text-ash tracking-[0.1em]"
                style={{ fontSize: 'clamp(11px, 1.2vw, 13px)' }}
              >
                ABOUT
              </span>
            </div>

            {/* Heading */}
            <h2
              className="font-display font-medium text-pure-white uppercase"
              style={{
                fontSize: 'clamp(28px, 4vw, 42px)',
                lineHeight: 1.0,
                letterSpacing: '-0.02em',
              }}
            >
              <StaggeredTextReveal mode="line" threshold={0.1}>
                {`Building digital experiences\nwith precision & craft.`}
              </StaggeredTextReveal>
            </h2>

            {/* Body */}
            <div
              ref={bodyRef}
              className="mt-8 transition-all duration-1000"
              style={{ opacity: 0, transform: 'translateY(30px)' }}
            >
              <p className="font-display text-pure-white leading-relaxed" style={{ fontSize: 'clamp(16px, 1.2vw, 18px)' }}>
                I'm Harshil Sondagar, a Full Stack Developer with a passion for crafting production-grade web applications. With expertise spanning React, Node.js, and cloud architecture, I bring ideas to life through clean code and thoughtful design.
              </p>
              <p className="font-display text-pure-white leading-relaxed mt-4" style={{ fontSize: 'clamp(16px, 1.2vw, 18px)' }}>
                Currently at GTCSYS, I develop scalable solutions across real estate, healthcare, SaaS, and fintech domains. Every project is an opportunity to push boundaries and deliver excellence.
              </p>
            </div>

            {/* Stats */}
            <div ref={statsRef} className="mt-10 flex flex-wrap items-center gap-6 lg:gap-8">
              {STATS.map((stat, i) => (
                <div key={i} className="flex items-center gap-6 lg:gap-8">
                  <div
                    className="stat-item transition-all duration-700"
                    style={{ opacity: 0, transform: 'translateY(20px)' }}
                  >
                    <div className="font-display font-bold text-highlight text-4xl">{stat.value}</div>
                    <div
                      className="font-mono uppercase text-ash tracking-[0.08em] mt-1"
                      style={{ fontSize: '11px' }}
                    >
                      {stat.label}
                    </div>
                  </div>
                  {i < STATS.length - 1 && (
                    <div className="w-px h-10 bg-lead hidden sm:block" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
