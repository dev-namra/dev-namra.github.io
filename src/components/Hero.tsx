import { useEffect, useRef, type CSSProperties, type MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { profile } from '../data/profile';
import { projectsInSeries } from '../data/projects';
import { scrollToId } from '../lib/scroll';
import CountUp from './CountUp';

const delay = (ms: number) => ({ '--delay': `${ms}ms` }) as CSSProperties;

// Splits the headline into words so each one can rise out of its own mask.
const words = profile.headline.flatMap((part) =>
  part.text
    .split(' ')
    .filter(Boolean)
    .map((word) => ({ word, strong: 'strong' in part && part.strong === true })),
);
const headlineText = profile.headline.map((part) => part.text).join('');
const lastWordMs = 480 + words.length * 45;

export default function Hero() {
  const section = useRef<HTMLElement>(null);
  const lines = useRef<HTMLDivElement>(null);
  const light = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const featured = projectsInSeries('BA')[0];
  const featuredStat = featured?.metrics?.[0];

  // Cursor dot, yellow light and grid drift. Skipped on touch screens and for reduced motion.
  useEffect(() => {
    const el = section.current;
    if (!el || !lines.current || !light.current || !dot.current) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    el.classList.add('hero--pointer');
    const target = { x: 0, y: 0 };
    const dotPos = { x: 0, y: 0 };
    const lightPos = { x: 0, y: 0 };
    let width = 1;
    let height = 1;
    let frame = 0;

    const draw = () => {
      dotPos.x += (target.x - dotPos.x) * 0.45;
      dotPos.y += (target.y - dotPos.y) * 0.45;
      lightPos.x += (target.x - lightPos.x) * 0.09;
      lightPos.y += (target.y - lightPos.y) * 0.09;
      dot.current!.style.transform = `translate3d(${dotPos.x}px, ${dotPos.y}px, 0)`;
      light.current!.style.transform = `translate3d(${lightPos.x - 272}px, ${lightPos.y - 272}px, 0)`;
      lines.current!.style.transform = `translate3d(${(0.5 - lightPos.x / width) * 36}px, ${
        (0.5 - lightPos.y / height) * 24
      }px, 0)`;
      const settled =
        Math.abs(target.x - dotPos.x) < 0.2 &&
        Math.abs(target.y - dotPos.y) < 0.2 &&
        Math.abs(target.x - lightPos.x) < 0.2 &&
        Math.abs(target.y - lightPos.y) < 0.2;
      frame = settled ? 0 : requestAnimationFrame(draw);
    };

    const onMove = (e: PointerEvent) => {
      const box = el.getBoundingClientRect();
      width = box.width;
      height = box.height;
      const first = el.dataset.on !== '1';
      target.x = e.clientX - box.left;
      target.y = e.clientY - box.top;
      if (first) {
        dotPos.x = lightPos.x = target.x;
        dotPos.y = lightPos.y = target.y;
        el.dataset.on = '1';
      }
      if (!frame) frame = requestAnimationFrame(draw);
    };
    const onLeave = () => {
      el.dataset.on = '0';
    };

    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => {
      cancelAnimationFrame(frame);
      el.classList.remove('hero--pointer');
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  const jump = (id: string) => (e: MouseEvent) => {
    e.preventDefault();
    scrollToId(id);
  };

  return (
    <section ref={section} data-on="0" aria-label="Introduction" className="hero border-b border-rule">
      <div ref={lines} className="hero__lines" aria-hidden />
      <div className="hero__glow" aria-hidden />
      <div ref={light} className="hero__light" aria-hidden />
      <div ref={dot} className="hero__dot" aria-hidden />

      <div className="mx-auto max-w-[1400px] px-6 pb-16 pt-14 md:px-10 md:pt-16">
        <div className="intro flex items-center gap-5" style={delay(0)}>
          <p className="eyebrow">{profile.based}</p>
          <span aria-hidden className="hidden h-px max-w-[32rem] flex-1 bg-graphite/40 sm:block" />
          <p className="eyebrow hidden lg:block">Open to roles in {profile.availability}</p>
        </div>
        <p className="eyebrow intro mt-2 sm:hidden" style={delay(60)}>
          Open to roles in {profile.availability}
        </p>

        <h1
          aria-label={profile.name}
          className="name mt-6 text-[clamp(4.5rem,21vw,7rem)] md:mt-8 md:text-[clamp(6rem,11.5vw,13rem)]"
        >
          <span aria-hidden className="name-line">
            <span className="name-rise" style={delay(100)}>
              Namra
            </span>
          </span>
          <span aria-hidden className="name-line">
            <span className="name-rise" style={delay(220)}>
              Mahak
            </span>
          </span>
        </h1>

        <p className="mt-8 max-w-[15.5em] text-[clamp(1.6rem,3.7vw,3.6rem)] font-medium leading-[1.16] tracking-[-0.02em] md:mt-10">
          <span className="sr-only">{headlineText}</span>
          <span aria-hidden>
            {words.map((w, i) => (
              <span key={`${w.word}-${i}`}>
                <span className="word">
                  <span className={w.strong ? 'font-bold' : undefined} style={delay(480 + i * 45)}>
                    {w.word}
                  </span>
                </span>{' '}
              </span>
            ))}
          </span>
        </p>

        <div
          className="intro mt-10 flex flex-wrap items-center gap-x-6 gap-y-5"
          style={delay(lastWordMs + 100)}
        >
          <a href="#/" onClick={jump('work')} className="cta">
            <span className="cta__fill" aria-hidden />
            <span className="cta__text">See the work</span>
            <span className="cta__icon" aria-hidden>
              <svg
                width="18"
                height="18"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </span>
          </a>
          {featured && (
            <Link to={`/project/${featured.slug}`} className="ghost">
              <span className="ghost__dot" aria-hidden />
              Start with {featured.title}
              {featuredStat && (
                <span className="ghost__badge">
                  {featuredStat.value} {featuredStat.label.toLowerCase()}
                </span>
              )}
            </Link>
          )}
        </div>

        <ul
          className="s-stats intro mt-14"
          style={delay(lastWordMs + 250)}
          aria-label="Highlights"
        >
          {profile.stats.map((stat) => (
            <li key={stat.label}>
              <CountUp
                to={stat.to}
                prefix={'prefix' in stat ? stat.prefix : ''}
                suffix={'suffix' in stat ? stat.suffix : ''}
                delay={lastWordMs + 400}
              />
              <span>{stat.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
