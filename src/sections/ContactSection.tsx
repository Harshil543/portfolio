import { useEffect, useRef } from 'react';
import { SectionNumber } from '@/components/SectionNumber';
import { StaggeredTextReveal } from '@/components/StaggeredTextReveal';
import { StateRevealHover } from '@/components/StateRevealHover';

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

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

    if (infoRef.current) observer.observe(infoRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full section-padding"
      style={{
        background: 'linear-gradient(to bottom, #0A0A0A 0%, #111111 100%)',
        zIndex: 2,
      }}
    >
      <div className="section-container flex flex-col items-center text-center">
        <SectionNumber number="06" />

        {/* Eyebrow */}
        <p
          className="font-display font-medium uppercase text-ash tracking-[0.15em] transition-all duration-800"
          style={{ fontSize: 'clamp(11px, 1.2vw, 13px)' }}
        >
          LET'S BUILD SOMETHING
        </p>

        {/* Main CTA with state reveal */}
        <div className="mt-8 w-full max-w-4xl">
          <StateRevealHover
            className="cursor-pointer"
            panelClassName="flex items-center justify-center"
            revealContent={
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 p-8">
                <a
                  href="https://linkedin.com/in/harshil-sondagar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-pure-white hover:underline hover:decoration-highlight transition-all"
                  style={{ fontSize: 'clamp(14px, 1.5vw, 18px)' }}
                >
                  <span className="text-ash mr-2">[LI]</span>
                  LinkedIn
                </a>
                <a
                  href="https://github.com/harshil543"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-pure-white hover:underline hover:decoration-highlight transition-all"
                  style={{ fontSize: 'clamp(14px, 1.5vw, 18px)' }}
                >
                  <span className="text-ash mr-2">[GH]</span>
                  GitHub
                </a>
                <a
                  href="tel:+916359437354"
                  className="font-mono text-pure-white hover:underline hover:decoration-highlight transition-all"
                  style={{ fontSize: 'clamp(14px, 1.5vw, 18px)' }}
                >
                  <span className="text-ash mr-2">[PH]</span>
                  6359437354
                </a>
              </div>
            }
          >
            <div className="py-8 px-4">
              <a
                href="mailto:sondagarharshil0@gmail.com"
                className="font-display font-bold text-pure-white underline underline-offset-8 transition-all hover:decoration-highlight"
                style={{
                  fontSize: 'clamp(28px, 5vw, 56px)',
                  textDecorationColor: 'rgba(212,175,55,0.5)',
                  lineHeight: 1.2,
                  wordBreak: 'break-all',
                }}
              >
                <StaggeredTextReveal mode="word" triggerOnLoad delay={0.2} staggerDelay={0.06}>
                  sondagarharshil0@gmail.com
                </StaggeredTextReveal>
              </a>
            </div>
          </StateRevealHover>
        </div>

        {/* Location note */}
        <div
          ref={infoRef}
          className="mt-8 transition-all duration-800"
          style={{ opacity: 0, transform: 'translateY(20px)' }}
        >
          <p
            className="font-display text-ash leading-relaxed"
            style={{ fontSize: 'clamp(16px, 1.2vw, 18px)' }}
          >
            Based in Ahmedabad, Gujarat, India — Open to remote opportunities worldwide.
          </p>

          {/* Response time badge */}
          <div className="mt-4 inline-block">
            <span
              className="font-mono text-ash border border-lead px-3.5 py-1.5"
              style={{ fontSize: '11px', opacity: 0.6 }}
            >
              Typically responds within 24 hours
            </span>
          </div>
        </div>

        {/* Bottom decorative element */}
        <div className="flex items-center justify-center mt-12">
          <span className="w-1 h-1 bg-ash" />
          <div className="w-[60px] h-px bg-lead" />
          <span className="w-1.5 h-1.5 bg-highlight" />
          <div className="w-[60px] h-px bg-lead" />
          <span className="w-1 h-1 bg-ash" />
        </div>
      </div>
    </section>
  );
}
