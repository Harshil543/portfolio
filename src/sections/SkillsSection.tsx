import { useEffect, useRef } from 'react';
import { SectionNumber } from '@/components/SectionNumber';
import { StaggeredTextReveal } from '@/components/StaggeredTextReveal';
import { StateRevealHover } from '@/components/StateRevealHover';

const SKILL_CATEGORIES = [
  {
    name: 'Languages',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8A8A8A" strokeWidth="1.5">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    count: '5 technologies',
    tags: ['JavaScript', 'TypeScript', 'Python', 'HTML5', 'CSS3'],
  },
  {
    name: 'Frameworks & Libraries',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8A8A8A" strokeWidth="1.5">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
    count: '9 technologies',
    tags: ['React.js', 'Next.js', 'Vue.js', 'Node.js', 'NestJS', 'Express.js', 'FastAPI', 'React Native', 'Tailwind CSS'],
  },
  {
    name: 'Databases',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8A8A8A" strokeWidth="1.5">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
        <path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3" />
      </svg>
    ),
    count: '4 technologies',
    tags: ['PostgreSQL', 'MongoDB', 'MySQL', 'GraphQL'],
  },
  {
    name: 'Cloud & DevOps',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8A8A8A" strokeWidth="1.5">
        <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
      </svg>
    ),
    count: '5 technologies',
    tags: ['AWS EC2', 'AWS S3', 'Lambda', 'Docker', 'CI/CD'],
  },
  {
    name: 'AI Development',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8A8A8A" strokeWidth="1.5">
        <path d="M12 2l2.4 4.8L20 8l-3.6 3.6L17.6 18 12 15.2 6.4 18l1.2-6.4L4 8l5.6-1.2z" />
      </svg>
    ),
    count: '6 tools',
    tags: ['Cursor', 'Lovable', 'ChatGPT', 'GitHub Copilot', 'Claude', 'Windsurf'],
  },
  {
    name: 'Core Skills',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8A8A8A" strokeWidth="1.5">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
    count: '7 areas',
    tags: ['REST APIs', 'WebSocket', 'Auth & AuthZ', 'Responsive Design', 'Agile', 'Problem Solving', 'Git'],
  },
];

export function SkillsSection() {
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.skill-card');
            cards.forEach((card, i) => {
              const el = card as HTMLElement;
              el.style.transitionDelay = `${i * 0.1}s`;
              el.style.opacity = '1';
              el.style.transform = 'translateY(0)';
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (cardsRef.current) observer.observe(cardsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="skills"
      className="relative w-full section-padding"
      style={{ backgroundColor: '#0A0A0A', zIndex: 2 }}
    >
      <div className="section-container">
        <SectionNumber number="02" />

        <div className="text-center mb-12">
          <h2
            className="font-display font-medium text-pure-white uppercase"
            style={{
              fontSize: 'clamp(36px, 5vw, 64px)',
              lineHeight: 0.9,
              letterSpacing: '-0.03em',
            }}
          >
            <StaggeredTextReveal mode="line">TECHNICAL ARSENAL</StaggeredTextReveal>
          </h2>
          <p
            className="font-display text-ash mt-4 leading-relaxed"
            style={{ fontSize: 'clamp(18px, 1.5vw, 22px)' }}
          >
            Technologies & tools I work with daily.
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {SKILL_CATEGORIES.map((cat, i) => (
            <div
              key={i}
              className="skill-card border border-lead transition-all duration-700"
              style={{
                opacity: 0,
                transform: 'translateY(40px)',
                backgroundColor: '#1A1A1A',
              }}
            >
              <StateRevealHover
                className="h-36 lg:h-40 cursor-pointer"
                panelClassName="bg-[#151515]"
                revealContent={
                  <div className="p-6 flex flex-wrap content-center gap-2 h-full">
                    {cat.tags.map((tag, j) => (
                      <span
                        key={j}
                        className="border border-lead px-3 py-1.5 font-mono text-pure-white"
                        style={{ fontSize: '11px' }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                }
              >
                <div className="p-6 flex items-center gap-4 h-full">
                  {cat.icon}
                  <div>
                    <h3
                      className="font-display font-medium text-pure-white uppercase tracking-[0.04em]"
                      style={{ fontSize: '18px' }}
                    >
                      {cat.name}
                    </h3>
                    <p className="font-mono text-ash mt-1" style={{ fontSize: '12px' }}>
                      {cat.count}
                    </p>
                  </div>
                </div>
              </StateRevealHover>

              {/* Highlight line on hover */}
              <div
                className="h-0.5 bg-highlight transition-transform duration-300 origin-left scale-x-0 group-hover:scale-x-100"
                style={{ marginTop: '-2px' }}
              />
            </div>
          ))}
        </div>

        {/* Bottom decorative line */}
        <div className="flex items-center justify-center mt-12">
          <span className="w-1 h-1 bg-highlight" />
          <div className="w-full max-w-3xl h-px bg-lead" />
          <span className="w-1 h-1 bg-highlight" />
        </div>
      </div>
    </section>
  );
}
