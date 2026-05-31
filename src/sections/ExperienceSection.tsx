import { useEffect, useRef } from 'react';
import { SectionNumber } from '@/components/SectionNumber';
import { StaggeredTextReveal } from '@/components/StaggeredTextReveal';

interface ExperienceBlock {
  role: string;
  company?: string;
  period: string;
  duration: string;
  description: string;
  achievements: string[];
  image: string;
  figLabel: string;
  reversed: boolean;
}

const EXPERIENCES: ExperienceBlock[] = [
  {
    role: 'FULL STACK DEVELOPER',
    company: 'GTCSYS',
    period: 'May 2024 — Present',
    duration: '1+ Year',
    description:
      'Contributing to development of production-grade web apps across real estate, healthcare, SaaS, and fintech domains. Building scalable backend services, responsive frontends, and cloud infrastructure.',
    achievements: [
      'Developed scalable backend services and REST APIs using Node.js, NestJS, PostgreSQL',
      'Built responsive, SEO-friendly web applications with React.js, Next.js, TypeScript',
      'Implemented authentication systems, role-based access control, workflow automation',
      'Integrated payment gateways, cloud storage, and third-party APIs',
      'Deployed on AWS (EC2, S3, Lambda) with CI/CD pipelines',
    ],
    image: '/images/exp-gtcsys.jpg',
    figLabel: 'FIG. 1 — GTCSYS WORKSPACE',
    reversed: false,
  },
  {
    role: 'FREELANCE FULL STACK DEVELOPER',
    period: 'Apr 2023 — Apr 2024',
    duration: '1 Year',
    description:
      'Delivered full-stack web and mobile applications from requirement gathering to deployment. Built responsive frontends, robust backends, and managed cloud infrastructure for diverse clients.',
    achievements: [
      'Delivered web and mobile applications end-to-end',
      'Built responsive frontends with React.js, Next.js, TypeScript',
      'Developed backend services with Node.js, Express.js, PostgreSQL, MongoDB',
      'Built React Native apps for Android and iOS',
      'Managed cloud deployment, hosting, and production support',
    ],
    image: '/images/exp-freelance.jpg',
    figLabel: 'FIG. 2 — FREELANCE WORKSPACE',
    reversed: true,
  },
];

function ExperienceBlockComponent({ exp }: { exp: ExperienceBlock }) {
  const blockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';

            // Stagger bullets
            const bullets = el.querySelectorAll('.exp-bullet');
            bullets.forEach((b, i) => {
              const bullet = b as HTMLElement;
              bullet.style.transitionDelay = `${0.3 + i * 0.08}s`;
              bullet.style.opacity = '1';
              bullet.style.transform = 'translateX(0)';
            });

            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (blockRef.current) observer.observe(blockRef.current);
    return () => observer.disconnect();
  }, []);

  const textContent = (
    <div className="flex flex-col justify-center">
      <div className="flex items-center gap-2 mb-3">
        <span className="w-1 h-1 bg-highlight" />
        <span
          className="font-display font-medium text-highlight uppercase tracking-[0.06em]"
          style={{ fontSize: 'clamp(11px, 1vw, 13px)' }}
        >
          {exp.role}
        </span>
      </div>

      {exp.company && (
        <h3
          className="font-display font-bold text-pure-black uppercase"
          style={{
            fontSize: 'clamp(28px, 3.5vw, 42px)',
            lineHeight: 1.0,
            letterSpacing: '-0.02em',
          }}
        >
          {exp.company}
        </h3>
      )}

      {!exp.company && (
        <h3
          className="font-display font-bold text-pure-black uppercase"
          style={{
            fontSize: 'clamp(28px, 3.5vw, 42px)',
            lineHeight: 1.0,
            letterSpacing: '-0.02em',
          }}
        >
          {exp.role}
        </h3>
      )}

      <div className="flex items-center gap-4 mt-3">
        <span className="font-mono text-ash" style={{ fontSize: '12px' }}>
          {exp.period}
        </span>
        <span
          className="font-mono text-ash border border-light-border px-3 py-1"
          style={{ fontSize: '11px' }}
        >
          {exp.duration}
        </span>
      </div>

      <p
        className="font-display text-pure-black leading-relaxed mt-5"
        style={{ fontSize: 'clamp(15px, 1.1vw, 18px)' }}
      >
        {exp.description}
      </p>

      <ul className="mt-5 space-y-3">
        {exp.achievements.map((ach, i) => (
          <li
            key={i}
            className="exp-bullet flex items-start gap-3 transition-all duration-700"
            style={{ opacity: 0, transform: 'translateX(-10px)' }}
          >
            <span className="w-1 h-1 bg-highlight mt-2 flex-shrink-0" />
            <span
              className="font-display text-pure-black leading-relaxed"
              style={{ fontSize: '15px' }}
            >
              {ach}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );

  const imageContent = (
    <div className="relative">
      <img
        src={exp.image}
        alt={exp.figLabel}
        className="w-full object-cover"
        style={{ aspectRatio: '16/9' }}
        loading="lazy"
      />
      <p
        className="font-mono mt-2"
        style={{ fontSize: '9px', color: 'rgba(138,138,138,0.4)' }}
        aria-hidden="true"
      >
        {exp.figLabel}
      </p>
      {/* Dimension annotation */}
      <div className="absolute top-0 right-0 pointer-events-none" aria-hidden="true">
        <div className="flex items-start">
          <div className="w-px h-8 bg-ash" style={{ opacity: 0.15 }} />
          <span className="font-mono text-[10px] text-ash ml-1" style={{ opacity: 0.15 }}>
            S: 2024
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div
      ref={blockRef}
      className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 transition-all duration-1000"
      style={{ opacity: 0, transform: 'translateY(60px)' }}
    >
      {exp.reversed ? (
        <>
          <div className="lg:col-span-5">{imageContent}</div>
          <div className="lg:col-span-7">{textContent}</div>
        </>
      ) : (
        <>
          <div className="lg:col-span-7">{textContent}</div>
          <div className="lg:col-span-5">{imageContent}</div>
        </>
      )}
    </div>
  );
}

export function ExperienceSection() {
  return (
    <section
      id="experience"
      className="relative w-full section-padding"
      style={{ backgroundColor: '#F5F5F0', zIndex: 2 }}
    >
      <div className="section-container">
        <SectionNumber number="03" />

        <h2
          className="font-display font-medium text-pure-black uppercase"
          style={{
            fontSize: 'clamp(36px, 5vw, 64px)',
            lineHeight: 0.9,
            letterSpacing: '-0.03em',
          }}
        >
          <StaggeredTextReveal mode="line">EXPERIENCE</StaggeredTextReveal>
        </h2>
        <p
          className="font-display mt-4 leading-relaxed"
          style={{ fontSize: 'clamp(18px, 1.5vw, 22px)', color: '#6A6A6A' }}
        >
          Professional journey & contributions.
        </p>

        <div className="mt-16 space-y-20">
          {EXPERIENCES.map((exp, i) => (
            <ExperienceBlockComponent key={i} exp={exp} />
          ))}
        </div>
      </div>
    </section>
  );
}
