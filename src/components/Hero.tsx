
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
} from 'react';
import { profile } from '../data/profile';
import { scrollToId } from '../lib/scroll';
import CountUp from './CountUp';
import bimBuilding from '../assets/bim-building.png';


const delay = (ms: number) =>
  ({ '--delay': `${ms}ms` }) as CSSProperties;

const words = profile.headline.flatMap((part) =>
  part.text
    .split(' ')
    .filter(Boolean)
    .map((word) => ({
      word,
      strong: 'strong' in part && part.strong === true,
    })),
);

const headlineText = profile.headline.map((part) => part.text).join(' ');
const lastWordMs = 480 + words.length * 45;

export default function Hero() {
  const section = useRef<HTMLElement>(null);
  const lines = useRef<HTMLDivElement>(null);
  const light = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const [imageFailed, setImageFailed] = useState(false);

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

      dot.current!.style.transform =
        `translate3d(${dotPos.x}px, ${dotPos.y}px, 0)`;

      light.current!.style.transform =
        `translate3d(${lightPos.x - 272}px, ${lightPos.y - 272}px, 0)`;

      lines.current!.style.transform = `translate3d(${
        (0.5 - lightPos.x / width) * 20
      }px, ${(0.5 - lightPos.y / height) * 16}px, 0)`;

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

      target.x = e.clientX - box.left;
      target.y = e.clientY - box.top;

      if (el.dataset.on !== '1') {
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

  const jump = (id: string) => (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    scrollToId(id);
  };

  return (
    <section
      ref={section}
      data-on="0"
      aria-label="Introduction"
      className="hero relative overflow-hidden border-b border-rule"
    >
      {/* Background effects */}
      <div ref={lines} className="hero__lines" aria-hidden />
      <div className="hero__glow" aria-hidden />
      <div ref={light} className="hero__light" aria-hidden />
      <div ref={dot} className="hero__dot" aria-hidden />

      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-[clamp(1.25rem,6.5vw,7rem)] py-[clamp(2rem,4vw,4rem)]">
        <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-8">

          {/* Left: introduction */}
          <div className="min-w-0">
            <p
              className="mb-5 flex items-center gap-3 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-muted sm:text-xs sm:tracking-[0.22em]"
              style={delay(50)}
            >
              <span className="h-[2px] w-8 shrink-0 bg-accent sm:w-10" />
              BIM / Digital Construction / Architecture
            </p>

            <h1
              aria-label={profile.name}
              className="name text-[clamp(3.5rem,8.5vw,8rem)] leading-[0.83] tracking-[-0.075em]"
            >
              <span aria-hidden className="name-line block overflow-hidden">
                <span className="name-rise block" style={delay(100)}>
                  Namra
                </span>
              </span>

              <span aria-hidden className="name-line block overflow-hidden">
                <span className="name-rise block" style={delay(220)}>
                  Mahak
                </span>
              </span>
            </h1>

            <p className="mt-6 max-w-[24em] text-[clamp(1.15rem,2.2vw,2rem)] font-medium leading-[1.25] tracking-[-0.035em] sm:mt-8">
              <span className="sr-only">{headlineText}</span>

              <span aria-hidden>
                {words.map((w, i) => (
                  <span key={`${w.word}-${i}`}>
                    <span className="word inline-block overflow-hidden align-bottom">
                      <span
                        className={w.strong ? 'font-bold' : undefined}
                        style={delay(480 + i * 45)}
                      >
                        {w.word}
                      </span>
                    </span>{' '}
                  </span>
                ))}
              </span>
            </p>

            {/* Actions */}
            <div
              className="intro mt-7 flex flex-col items-start gap-4 sm:mt-9 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4"
              style={delay(lastWordMs + 100)}
            >
              <a
                href="#work"
                onClick={jump('work')}
                className="cta"
              >
                <span className="cta__fill" aria-hidden />
                <span className="cta__text">See the work</span>

                <span className="cta__icon" aria-hidden>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 8h10M9 4l4 4-4 4" />
                  </svg>
                </span>
              </a>

              <a
                href="#contact"
                onClick={jump('contact')}
                className="ghost"
              >
                <span className="ghost__dot" aria-hidden />
                Let’s build something together
                <span className="ghost__badge">Get in touch</span>
              </a>
            </div>
          </div>

          {/* Right: BIM building visual */}
          <div className="bim-visual relative mx-auto w-full min-w-0 max-w-[680px] lg:ml-auto">
            <div
              className="absolute left-1/2 top-1/2 aspect-square w-[76%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/15"
              aria-hidden
            />

            <div className="relative z-10 flex min-h-[280px] items-center justify-center sm:min-h-[380px] lg:min-h-[460px]">
              {!imageFailed ? (
                <img
                  src={bimBuilding}
                  alt="Architectural BIM model showing building structure and services"
                  className="relative z-10 block max-h-[460px] w-full object-contain"
                  loading="eager"
                  onError={() => setImageFailed(true)}
                />
              ) : (
                <div className="relative z-10 flex min-h-[280px] w-full flex-col items-center justify-center gap-4 p-6 text-center sm:min-h-[380px]">
                  <svg
                    viewBox="0 0 240 200"
                    className="w-full max-w-[320px]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    aria-hidden="true"
                  >
                    <path d="M40 150 120 105 200 150 120 195 40 150Z" />
                    <path d="M40 150V65L120 20 200 65V150" />
                    <path d="M120 20V105M40 65 120 110 200 65M65 80V135M95 98V165M145 98V165M175 80V135" />
                    <path d="M40 95 120 140 200 95M40 120 120 165 200 120" strokeDasharray="4 4" />
                    <path d="M65 50 145 5M95 67 175 22" strokeDasharray="3 4" />
                  </svg>
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
                    BIM / Digital Construction
                  </p>
                </div>
              )}
            </div>

            {/* Floating software card */}
            <div className="absolute left-0 top-[10%] z-20 max-w-[75%] rounded-xl border border-rule bg-paper/95 px-3 py-2.5 shadow-sm backdrop-blur-sm sm:rounded-2xl sm:px-5 sm:py-3">
              <p className="text-[0.65rem] font-medium text-muted sm:text-sm">
                ◇ &nbsp; Revit / Navisworks / APS
              </p>
            </div>

            {/* Floating automation card */}
            <div className="absolute right-0 top-[25%] z-20 rounded-xl border border-rule bg-paper/95 px-3 py-2.5 shadow-sm backdrop-blur-sm sm:rounded-2xl sm:px-5 sm:py-3">
              <p className="text-[0.65rem] font-semibold sm:text-sm">
                Automation
              </p>
              <p className="text-[0.65rem] text-muted sm:text-sm">
                & APIs
              </p>
            </div>

            {/* Floating data card */}
            <div className="absolute bottom-[15%] right-0 z-20 rounded-xl border border-rule bg-paper/95 px-3 py-2.5 shadow-sm backdrop-blur-sm sm:rounded-2xl sm:px-5 sm:py-3">
              <p className="text-[0.65rem] font-semibold sm:text-sm">
                Data / Dashboards
              </p>
              <p className="text-[0.65rem] text-muted sm:text-sm">
                Power BI
              </p>
            </div>

            <p className="mt-3 text-right text-[0.58rem] font-semibold uppercase tracking-[0.12em] text-muted sm:text-xs sm:tracking-[0.15em]">
              <span className="mr-2 inline-block h-[2px] w-6 translate-y-[-3px] bg-accent sm:w-8" />
              Better data / Smarter buildings
            </p>
          </div>
        </div>

        {/* Stats */}
        <ul
          className="s-stats intro mt-10 grid grid-cols-2 gap-x-4 gap-y-6 border-t border-rule pt-7 sm:mt-14 sm:grid-cols-4 sm:gap-x-6 sm:pt-8"
          style={delay(lastWordMs + 250)}
          aria-label="Highlights"
        >
          {profile.stats.map((stat) => (
            <li key={stat.label} className="flex min-w-0 flex-col gap-2">
              <CountUp
                to={stat.to}
                prefix={stat.prefix ?? ''}
                suffix={stat.suffix ?? ''}
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
