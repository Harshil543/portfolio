import React, { useEffect, useRef, useCallback } from 'react';
import { useReducedMotion } from '@/hooks/useMediaQuery';

type SplitMode = 'character' | 'word' | 'line';

interface StaggeredTextRevealProps {
  children: string;
  mode?: SplitMode;
  as?: React.ElementType;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  triggerOnLoad?: boolean;
  threshold?: number;
}

export function StaggeredTextReveal({
  children,
  mode = 'line',
  as: Tag = 'div',
  className = '',
  delay = 0,
  staggerDelay,
  triggerOnLoad = false,
  threshold = 0.15,
}: StaggeredTextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);
  const prefersReducedMotion = useReducedMotion();

  const defaultStagger = mode === 'character' ? 0.02 : mode === 'word' ? 0.06 : 0.08;
  const actualStagger = staggerDelay ?? defaultStagger;

  const reveal = useCallback(() => {
    if (!containerRef.current || hasAnimated.current) return;
    hasAnimated.current = true;

    const items = containerRef.current.querySelectorAll(
      mode === 'character' ? '.char-inner' : '.line-inner'
    );

    items.forEach((item, i) => {
      const el = item as HTMLElement;
      const totalDelay = delay + i * actualStagger;
      if (prefersReducedMotion) {
        el.style.transitionDelay = '0s';
        el.classList.add('revealed');
      } else {
        el.style.transitionDelay = `${totalDelay}s`;
        // Force reflow
        void el.offsetWidth;
        el.classList.add('revealed');
      }
    });
  }, [mode, delay, actualStagger, prefersReducedMotion]);

  useEffect(() => {
    if (triggerOnLoad) {
      const timer = setTimeout(reveal, 100);
      return () => clearTimeout(timer);
    }

    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            reveal();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [reveal, triggerOnLoad, threshold]);

  const renderContent = () => {
    if (mode === 'character') {
      const chars = children.split('');
      return chars.map((char, i) => (
        <span
          key={i}
          className="char-inner"
          style={{
            transitionDelay: prefersReducedMotion ? '0s' : `${delay + i * actualStagger}s`,
            whiteSpace: char === ' ' ? 'pre' : undefined,
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ));
    }

    if (mode === 'word') {
      const words = children.split(' ');
      return words.map((word, i) => (
        <span key={i} className="line-wrapper" style={{ display: 'inline-block', marginRight: '0.3em' }}>
          <span
            className="line-inner"
            style={{
              transitionDelay: prefersReducedMotion ? '0s' : `${delay + i * actualStagger}s`,
            }}
          >
            {word}
          </span>
        </span>
      ));
    }

    // line mode
    const lines = children.split('\n').filter((l) => l.trim());
    return lines.map((line, i) => (
      <span key={i} className="line-wrapper" style={{ display: 'block' }}>
        <span
          className="line-inner"
          style={{
            transitionDelay: prefersReducedMotion ? '0s' : `${delay + i * actualStagger}s`,
          }}
        >
          {line.trim()}
        </span>
      </span>
    ));
  };

  return (
    <Tag ref={containerRef} className={className}>
      {renderContent()}
    </Tag>
  );
}
