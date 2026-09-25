import { useEffect, useState } from 'react';

export function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable custom cursor on non-touch devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const isClickable =
          target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.tagName === 'INPUT' ||
          target.closest('button') ||
          target.closest('a') ||
          target.getAttribute('role') === 'button';
        setIsHovering(!!isClickable);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      className="pointer-events-none fixed z-50 transition-transform duration-75 ease-out"
      style={{
        left: `${pos.x}px`,
        top: `${pos.y}px`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      {/* Outer Tactical Crosshairs Ring */}
      <div
        className={`relative flex items-center justify-center transition-all duration-200 ${
          isHovering
            ? 'w-10 h-10 border-2 border-amber rotate-45 scale-110'
            : 'w-7 h-7 border border-cyan/70'
        } rounded-full`}
      >
        {/* Center dot */}
        <div
          className={`w-1 h-1 rounded-full ${
            isHovering ? 'bg-amber shadow-glow-amber' : 'bg-cyan shadow-glow-cyan'
          }`}
        />

        {/* Crosshair ticks */}
        <div className="absolute -top-1 w-0.5 h-1 bg-cyan/80" />
        <div className="absolute -bottom-1 w-0.5 h-1 bg-cyan/80" />
        <div className="absolute -left-1 w-1 h-0.5 bg-cyan/80" />
        <div className="absolute -right-1 w-1 h-0.5 bg-cyan/80" />
      </div>

      {/* Floating Coordinate Label */}
      <div className="absolute left-6 top-3 text-[9px] font-mono text-steel/70 whitespace-nowrap bg-void/80 px-1 rounded pointer-events-none">
        X:{pos.x} Y:{pos.y}
      </div>
    </div>
  );
}
