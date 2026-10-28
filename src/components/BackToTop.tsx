import { useEffect, useState } from 'react';

/**
 * Round "back to top" button. It stays hidden near the top of any page and
 * fades in after you have scrolled SHOW_AFTER pixels. Render it once, in App.tsx.
 */
const SHOW_AFTER = 400; // pixels. Change this number to show it sooner or later.

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => setVisible(window.scrollY > SHOW_AFTER);

    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => {
      window.removeEventListener('scroll', update);
      };
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      className={`fixed bottom-6 right-6 z-50 grid h-12 w-12 place-items-center rounded-[14px] bg-teal text-white shadow-[0_10px_22px_rgba(31,122,116,0.3)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_28px_rgba(31,122,116,0.38)] md:bottom-8 md:right-8 md:h-14 md:w-14 ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      }`}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 19V5M5 12l7-7 7 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
