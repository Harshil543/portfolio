import { useLocomotive } from '@/context/LocomotiveContext';

export function Footer() {
  const { scrollTo } = useLocomotive();

  return (
    <footer className="w-full bg-ink border-t border-lead" style={{ padding: '80px 0 40px' }}>
      <div className="section-container">
        {/* Top row */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div>
            <h3 className="font-display font-bold text-2xl text-pure-white">
              Harshil Sondagar
            </h3>
            <p className="font-display text-sm text-ash mt-1">
              Full Stack Developer
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
            <a
              href="https://linkedin.com/in/harshil-sondagar"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-ash hover:text-pure-white transition-colors"
            >
              <span className="text-ash-dark mr-2">[LI]</span>
              LinkedIn
            </a>
            <a
              href="#"
              className="font-mono text-xs text-ash hover:text-pure-white transition-colors"
            >
              <span className="text-ash-dark mr-2">[GH]</span>
              GitHub
            </a>
            <a
              href="mailto:sondagarharshil0@gmail.com"
              className="font-mono text-xs text-ash hover:text-pure-white transition-colors"
            >
              <span className="text-ash-dark mr-2">[EM]</span>
              Email
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-lead my-12" />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-display text-[13px] text-ash">
            Ahmedabad, Gujarat, India
          </p>
          <p className="font-display text-[13px] text-ash">
            &copy; 2024 Harshil Sondagar
          </p>
        </div>

        {/* Decorative endcap line */}
        <div className="flex items-center justify-center mt-10">
          <span className="w-1 h-1 bg-highlight" />
          <div className="w-[120px] h-px bg-highlight" />
          <span className="w-1 h-1 bg-highlight" />
        </div>

        {/* Version stamp */}
        <div className="flex justify-between items-center mt-6">
          <span className="font-mono text-[10px] text-ash" style={{ opacity: 0.2 }}>
            v1.0.0
          </span>

          {/* Back to top */}
          <button
            onClick={() => scrollTo('#')}
            className="w-12 h-12 border border-lead flex items-center justify-center text-ash hover:bg-highlight hover:text-ink hover:border-highlight transition-all duration-300"
            aria-label="Back to top"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 14V2M8 2L3 7M8 2L13 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
}
