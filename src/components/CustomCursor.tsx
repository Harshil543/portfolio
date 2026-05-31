import { useEffect, useRef, useState } from 'react';
import { useIsTouchDevice } from '@/hooks/useMediaQuery';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const isTouch = useIsTouchDevice();
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (isTouch) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    let x = 0;
    let y = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const animate = () => {
      x += (targetX - x) * 0.15;
      y += (targetY - y) * 0.15;

      if (cursor) {
        cursor.style.transform = `translate(${x - (isHovering ? 16 : 8)}px, ${y - (isHovering ? 16 : 8)}px)`;
      }

      requestAnimationFrame(animate);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('state-reveal')
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('state-reveal')
      ) {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    const raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      cancelAnimationFrame(raf);
    };
  }, [isTouch, isHovering]);

  if (isTouch) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none"
      style={{
        zIndex: 9999,
        width: isHovering ? 32 : 16,
        height: isHovering ? 32 : 16,
        transition: 'width 0.2s, height 0.2s',
        mixBlendMode: 'difference',
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line x1="8" y1="0" x2="8" y2="16" stroke="#D4AF37" strokeWidth="1" />
        <line x1="0" y1="8" x2="16" y2="8" stroke="#D4AF37" strokeWidth="1" />
      </svg>
    </div>
  );
}
