import { useEffect, useState } from 'react';

const format = new Intl.NumberFormat('en-GB');
const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Counts from 0 to `to` after `delay` ms. The final value is always available to screen readers.
export default function CountUp({
  to,
  prefix = '',
  suffix = '',
  delay = 900,
  duration = 1200,
}: {
  to: number;
  prefix?: string;
  suffix?: string;
  delay?: number;
  duration?: number;
}) {
  const [value, setValue] = useState(() => (prefersReducedMotion() ? to : 0));

  useEffect(() => {
    if (prefersReducedMotion()) return;
    let frame = 0;
    const timer = window.setTimeout(() => {
      const started = performance.now();
      const tick = (now: number) => {
        const t = Math.min((now - started) / duration, 1);
        setValue(Math.round(to * (1 - Math.pow(1 - t, 3))));
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }, delay);
    return () => {
      window.clearTimeout(timer);
      cancelAnimationFrame(frame);
    };
  }, [to, delay, duration]);

  return (
    <b>
      <span className="sr-only">
        {prefix}
        {format.format(to)}
        {suffix}
      </span>
      <span aria-hidden>
        {prefix}
        {format.format(value)}
        {suffix}
      </span>
    </b>
  );
}
