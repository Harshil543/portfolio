import { useEffect, useRef } from 'react';

interface MousePos {
  x: number;
  y: number;
  normX: number;
  normY: number;
}

const mousePos: MousePos = { x: 0, y: 0, normX: 0, normY: 0 };

export function useMousePositionRef() {
  const ref = useRef<MousePos>(mousePos);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;
      mousePos.normX = e.clientX / window.innerWidth;
      mousePos.normY = e.clientY / window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return ref;
}

export function getMousePos(): MousePos {
  return mousePos;
}
