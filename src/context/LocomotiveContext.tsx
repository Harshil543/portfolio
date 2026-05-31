import { createContext, useContext, useCallback } from 'react';

interface LocomotiveContextType {
  scrollTo: (target: string | number) => void;
}

const LocomotiveContext = createContext<LocomotiveContextType>({
  scrollTo: () => {},
});

export function useLocomotive() {
  return useContext(LocomotiveContext);
}

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const scrollTo = useCallback((target: string | number) => {
    if (typeof target === 'string') {
      if (target === '#') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const el = document.querySelector(target);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } else {
      window.scrollTo({ top: target, behavior: 'smooth' });
    }
  }, []);

  return (
    <LocomotiveContext.Provider value={{ scrollTo }}>
      {children}
    </LocomotiveContext.Provider>
  );
}
