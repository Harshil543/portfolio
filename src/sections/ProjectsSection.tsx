import { useEffect, useRef, useCallback } from 'react';
import { SectionNumber } from '@/components/SectionNumber';
import { StaggeredTextReveal } from '@/components/StaggeredTextReveal';
import { useIsTouchDevice } from '@/hooks/useMediaQuery';

interface Project {
  number: string;
  name: string;
  category: string;
  description: string;
  tags: string[];
  image: string;
  reversed: boolean;
}

const PROJECTS: Project[] = [
  {
    number: '01',
    name: 'BirdEarly',
    category: 'Real Estate Platform',
    description:
      'Developed property listing, search, filtering, and map-based exploration using Next.js, NestJS, PostgreSQL, and AWS. Built scalable backend APIs for property management and user workflows.',
    tags: ['Next.js', 'NestJS', 'PostgreSQL', 'AWS'],
    image: '/images/proj-birdearly.jpg',
    reversed: false,
  },
  {
    number: '02',
    name: 'Clarity',
    category: 'Property Bidding Platform',
    description:
      'Developed bidding workflows, dashboards, and property management using Next.js, NestJS, and PostgreSQL. Implemented business logic, notifications, and backend APIs for user engagement.',
    tags: ['Next.js', 'NestJS', 'PostgreSQL', 'Notifications'],
    image: '/images/proj-clarity.jpg',
    reversed: true,
  },
  {
    number: '03',
    name: 'SubIdea',
    category: 'Multi-Tenant SaaS Platform',
    description:
      'Developed user management, role-based access control, and business workflow features. Built scalable backend APIs and integrated PostgreSQL database operations.',
    tags: ['NestJS', 'PostgreSQL', 'RBAC', 'Workflow'],
    image: '/images/proj-subidea.jpg',
    reversed: false,
  },
  {
    number: '04',
    name: 'Bullit',
    category: 'FinTech Mobile Application',
    description:
      'Developed Android and iOS features using React Native and REST API integrations. Implemented user workflows, dashboard functionality, and mobile enhancements.',
    tags: ['React Native', 'REST API', 'Mobile', 'FinTech'],
    image: '/images/proj-bullit.jpg',
    reversed: true,
  },
];

function SpotlightImage({ src, alt }: { src: string; alt: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const isTouch = useIsTouchDevice();

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isTouch || !containerRef.current || !maskRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      maskRef.current.style.maskImage = `radial-gradient(circle 150px at ${x}px ${y}px, transparent 0%, black 100%)`;
      maskRef.current.style.webkitMaskImage = `radial-gradient(circle 150px at ${x}px ${y}px, transparent 0%, black 100%)`;
    },
    [isTouch]
  );

  const handleMouseLeave = useCallback(() => {
    if (!maskRef.current) return;
    maskRef.current.style.maskImage = 'radial-gradient(circle 0px at 50% 50%, transparent 0%, black 100%)';
    maskRef.current.style.webkitMaskImage = 'radial-gradient(circle 0px at 50% 50%, transparent 0%, black 100%)';
  }, []);

  const handleTouchStart = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      if (!isTouch || !containerRef.current || !maskRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const touch = e.touches[0];
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;
      maskRef.current.style.maskImage = `radial-gradient(circle 150px at ${x}px ${y}px, transparent 0%, black 100%)`;
      maskRef.current.style.webkitMaskImage = `radial-gradient(circle 150px at ${x}px ${y}px, transparent 0%, black 100%)`;
      setTimeout(() => {
        if (maskRef.current) {
          maskRef.current.style.transition = 'mask-image 1s ease, -webkit-mask-image 1s ease';
          maskRef.current.style.maskImage = 'radial-gradient(circle 0px at 50% 50%, transparent 0%, black 100%)';
          maskRef.current.style.webkitMaskImage = 'radial-gradient(circle 0px at 50% 50%, transparent 0%, black 100%)';
        }
      }, 500);
    },
    [isTouch]
  );

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden cursor-crosshair"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
    >
      {/* Full color layer (bottom) */}
      <img src={src} alt={alt} className="w-full object-cover" style={{ aspectRatio: '3/2' }} loading="lazy" />

      {/* Grayscale layer (top) with spotlight mask */}
      <div
        ref={maskRef}
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'grayscale(100%) brightness(60%)',
          maskImage: 'radial-gradient(circle 0px at 50% 50%, transparent 0%, black 100%)',
          WebkitMaskImage: 'radial-gradient(circle 0px at 50% 50%, transparent 0%, black 100%)',
        }}
      />
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
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
      { threshold: 0.1 }
    );

    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  const textContent = (
    <div className="flex flex-col justify-center relative">
      {/* Decorative number */}
      <span
        className="absolute -top-4 right-0 font-mono font-bold"
        style={{
          fontSize: '48px',
          color: 'rgba(212,175,55,0.08)',
        }}
        aria-hidden="true"
      >
        {project.number}
      </span>

      <h3
        className="font-display font-bold text-pure-white uppercase"
        style={{
          fontSize: 'clamp(28px, 3.5vw, 42px)',
          lineHeight: 1.0,
          letterSpacing: '-0.02em',
        }}
      >
        {project.name}
      </h3>

      <span
        className="font-mono uppercase tracking-[0.06em] mt-2"
        style={{ fontSize: '12px', color: '#00B4D8' }}
      >
        {project.category}
      </span>

      <p
        className="font-display text-ash leading-relaxed mt-4"
        style={{ fontSize: 'clamp(15px, 1.1vw, 18px)' }}
      >
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2 mt-5">
        {project.tags.map((tag, i) => (
          <span
            key={i}
            className="border border-lead px-2.5 py-1 font-mono text-ash"
            style={{ fontSize: '10px' }}
          >
            {tag}
          </span>
        ))}
      </div>

      <span
        className="font-display font-medium text-ash mt-5 inline-flex items-center gap-2 cursor-default"
        style={{ fontSize: '14px' }}
      >
        View Project
        <span>→</span>
      </span>
    </div>
  );

  return (
    <div
      ref={cardRef}
      className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 transition-all duration-1000"
      style={{ opacity: 0, transform: 'translateY(60px)' }}
    >
      {project.reversed ? (
        <>
          <div className="lg:col-span-5 order-2 lg:order-1">{textContent}</div>
          <div className="lg:col-span-7 order-1 lg:order-2">
            <SpotlightImage src={project.image} alt={project.name} />
          </div>
        </>
      ) : (
        <>
          <div className="lg:col-span-7">
            <SpotlightImage src={project.image} alt={project.name} />
          </div>
          <div className="lg:col-span-5">{textContent}</div>
        </>
      )}
    </div>
  );
}

export function ProjectsSection() {
  return (
    <section
      id="projects"
      className="relative w-full section-padding overflow-hidden"
      style={{ backgroundColor: '#0A0A0A', zIndex: 2 }}
    >
      {/* Subtle background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        style={{ opacity: 0.08, zIndex: 0 }}
      >
        <source src="/videos/projects-ambient.mp4" type="video/mp4" />
      </video>

      <div className="section-container relative" style={{ zIndex: 1 }}>
        <SectionNumber number="04" />

        <div className="text-center mb-16">
          <h2
            className="font-display font-medium text-pure-white uppercase"
            style={{
              fontSize: 'clamp(36px, 5vw, 64px)',
              lineHeight: 0.9,
              letterSpacing: '-0.03em',
            }}
          >
            <StaggeredTextReveal mode="line">SELECTED WORKS</StaggeredTextReveal>
          </h2>
          <p
            className="font-display text-ash mt-4 leading-relaxed"
            style={{ fontSize: 'clamp(18px, 1.5vw, 22px)' }}
          >
            Projects that define my craft.
          </p>
        </div>

        <div className="space-y-24 lg:space-y-32">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={i} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
