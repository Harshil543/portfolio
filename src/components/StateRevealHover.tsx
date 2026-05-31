import { useState, useCallback } from 'react';
import { useIsTouchDevice } from '@/hooks/useMediaQuery';

interface StateRevealHoverProps {
  children: React.ReactNode;
  revealContent: React.ReactNode;
  className?: string;
  panelClassName?: string;
}

export function StateRevealHover({
  children,
  revealContent,
  className = '',
  panelClassName = '',
}: StateRevealHoverProps) {
  const isTouch = useIsTouchDevice();
  const [active, setActive] = useState(false);

  const handleClick = useCallback(() => {
    if (isTouch) {
      setActive((prev) => !prev);
    }
  }, [isTouch]);

  return (
    <div
      className={`state-reveal ${active ? 'active' : ''} ${className}`}
      onClick={handleClick}
    >
      <div className="state-default relative z-[1]">{children}</div>
      <div className={`state-panel ${panelClassName}`}>
        <div className="state-hidden-inner w-full h-full">{revealContent}</div>
      </div>
    </div>
  );
}
