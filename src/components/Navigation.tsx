import { useState, useEffect } from 'react';
import { useLocomotive } from '@/context/LocomotiveContext';

const NAV_LINKS = [
  { label: 'About', target: '#about' },
  { label: 'Skills', target: '#skills' },
  { label: 'Experience', target: '#experience' },
  { label: 'Projects', target: '#projects' },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const { scrollTo } = useLocomotive();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);

      // Determine active section
      const sections = ['about', 'skills', 'experience', 'projects', 'education', 'contact'];
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (target: string) => {
    setMenuOpen(false);
    scrollTo(target);
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 w-full h-20 flex items-center justify-between transition-all duration-300"
        style={{
          zIndex: 100,
          padding: '0 24px',
          backgroundColor: scrolled ? 'rgba(10, 10, 10, 0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(8px)' : 'none',
        }}
      >
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-highlight" />
          <span className="font-mono text-lg font-medium tracking-[0.12em] text-pure-white uppercase">
            H.S
          </span>
        </div>

        {/* Center links - desktop */}
        <div className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.target)}
              className="relative font-display text-sm uppercase tracking-[0.06em] transition-colors duration-300 pb-1"
              style={{
                color: activeSection === link.target.slice(1) ? '#FFFFFF' : '#8A8A8A',
                borderBottom: activeSection === link.target.slice(1) ? '1px solid #D4AF37' : '1px solid transparent',
              }}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Right - Contact button */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => handleNavClick('#contact')}
            className="hidden lg:block font-display text-[13px] font-medium uppercase tracking-wide border px-6 py-2.5 transition-all duration-300 hover:bg-highlight hover:border-highlight hover:text-ink"
            style={{
              borderColor: '#8A8A8A',
              color: '#8A8A8A',
            }}
          >
            Contact
          </button>

          {/* Hamburger - mobile */}
          <button
            className="lg:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span
              className="block w-6 transition-all duration-300"
              style={{
                height: '1px',
                backgroundColor: '#8A8A8A',
                transform: menuOpen ? 'rotate(45deg) translateY(5px)' : 'none',
              }}
            />
            <span
              className="block w-6 transition-all duration-300"
              style={{
                height: '1px',
                backgroundColor: '#8A8A8A',
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              className="block w-6 transition-all duration-300"
              style={{
                height: '1px',
                backgroundColor: '#8A8A8A',
                transform: menuOpen ? 'rotate(-45deg) translateY(-5px)' : 'none',
              }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div
        className="fixed inset-0 flex flex-col items-center justify-center gap-8 transition-all duration-500 lg:hidden"
        style={{
          zIndex: 99,
          backgroundColor: 'rgba(10, 10, 10, 0.98)',
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'auto' : 'none',
          backdropFilter: 'blur(12px)',
        }}
      >
        {NAV_LINKS.map((link) => (
          <button
            key={link.label}
            onClick={() => handleNavClick(link.target)}
            className="font-display text-3xl font-medium uppercase tracking-wide text-pure-white hover:text-highlight transition-colors"
          >
            {link.label}
          </button>
        ))}
        <button
          onClick={() => handleNavClick('#contact')}
          className="font-display text-3xl font-medium uppercase tracking-wide text-pure-white hover:text-highlight transition-colors"
        >
          Contact
        </button>
      </div>
    </>
  );
}
