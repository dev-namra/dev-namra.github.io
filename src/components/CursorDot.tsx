import { useEffect, useRef } from 'react';

/**
 * A small dot that follows the mouse on every section of the page.
 * Only on devices with a real mouse, and not for people who prefer reduced motion.
 * Render it once, for example in App.tsx next to <Hero /> and the other sections.
 */
export default function CursorDot() {
  const dot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = dot.current;
    if (!el) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const root = document.documentElement;
    root.classList.add('dot-cursor');

    const target = { x: 0, y: 0 };
    const pos = { x: 0, y: 0 };
    let frame = 0;
    let seen = false;

    const draw = () => {
      pos.x += (target.x - pos.x) * 0.45;
      pos.y += (target.y - pos.y) * 0.45;
      el.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;

      const settled =
        Math.abs(target.x - pos.x) < 0.2 && Math.abs(target.y - pos.y) < 0.2;
      frame = settled ? 0 : requestAnimationFrame(draw);
    };

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;

      if (!seen) {
        pos.x = target.x;
        pos.y = target.y;
        seen = true;
      }
      el.style.opacity = '1';
      if (!frame) frame = requestAnimationFrame(draw);
    };

    const onLeave = () => {
      el.style.opacity = '0';
    };

    window.addEventListener('pointermove', onMove);
    root.addEventListener('pointerleave', onLeave);

    return () => {
      cancelAnimationFrame(frame);
      root.classList.remove('dot-cursor');
      window.removeEventListener('pointermove', onMove);
      root.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return <div ref={dot} className="cursor-dot" aria-hidden />;
}
