import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { Link } from 'react-router-dom';
import {
  asset,
  projectsInSeries,
  seriesInfo,
  sheetNumber,
  sideProjects,
  type Project,
  type SeriesCode,
} from '../data/projects';
import Flow from './Flow';

const seriesCodes: SeriesCode[] = ['BA', 'AR'];

// Tab labels. BIM first, because that is the work you are applying for.
const tabLabel: Record<SeriesCode, string> = {
  BA: 'BIM and automation',
  AR: 'Architecture and interiors',
};

const pad = (n: number) => String(n).padStart(2, '0');

// White frame with a thick border and a hard shadow, like the rest of the site.
const frame =
  'rounded-[22px] border border-rule bg-surface shadow-[0_14px_34px_rgba(15,45,46,0.10)]';

function Thumb({ project }: { project: Project }) {
  if (project.thumb) {
  return (
    <div className={`${frame} overflow-hidden`}>
      <img
        src={asset(project.thumb.src)}
        alt={project.thumb.alt}
        loading="lazy"
        className="aspect-[16/10] w-full object-cover"
      />
    </div>
  );
}
  if (project.flow) {
    return (
      <div className={`${frame} grid aspect-[16/10] place-items-center p-6`}>
        <div className="w-full max-w-[18rem]">
          <Flow steps={project.flow} compact />
        </div>
      </div>
    );
  }
  // No image yet: a calm placeholder that still looks intentional.
  return (
    <div
      aria-hidden
      className={`${frame} grid aspect-[16/10] place-items-center bg-accent/15 text-6xl font-bold tracking-[-0.04em] text-ink/25 md:text-7xl`}
    >
      {sheetNumber(project)}
    </div>
  );
}

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const to = `/project/${project.slug}`;

  return (
    <li className="py-10 first:pt-2 md:py-14">
      <div className="grid items-center gap-x-[clamp(2rem,5vw,5rem)] gap-y-8 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
        <Link to={to} tabIndex={-1} aria-hidden className="block pb-2 pr-2">
          <Thumb project={project} />
        </Link>

        <div className="min-w-0">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-muted sm:text-xs sm:tracking-[0.22em]">
            {pad(index + 1)} / {project.period} · {project.type}
            {project.draft && (
              <span className="ml-3 rounded border border-muted px-2 py-0.5 normal-case tracking-normal">
                Draft, hidden when published
              </span>
            )}
          </p>

          <h3 className="mt-3 text-[clamp(2.25rem,4.4vw,4rem)] font-bold leading-[1.02] tracking-[-0.045em]">
            <Link to={to}>{project.title}</Link>
          </h3>

          <p className="mt-3 text-lg leading-snug text-muted sm:text-xl">{project.subtitle}</p>
          <p className="mt-4 max-w-[46ch] text-base leading-[1.7] text-muted sm:text-lg">
            {project.summary}
          </p>

          <ul className="mt-6 flex flex-wrap gap-2">
            {project.scope.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-rule px-3 py-1.5 text-sm text-muted"
              >
                {tag}
              </li>
            ))}
          </ul>

          <Link to={to} className="cta mt-8">
            <span className="cta__fill" aria-hidden />
            <span className="cta__text">Read the case study</span>
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
          </Link>
        </div>
      </div>
    </li>
  );
}

export default function Work() {
  const available = seriesCodes.filter((c) => projectsInSeries(c).length > 0);
  const [active, setActive] = useState<SeriesCode>(available[0] ?? 'BA');
  const tabRefs = useRef<Partial<Record<SeriesCode, HTMLButtonElement | null>>>({});

  // Links such as /#core-architecture open the matching tab.
  useEffect(() => {
    const fromHash = () => {
      const hash = window.location.hash.replace('#', '');
      const code = available.find((c) => seriesInfo[c].id === hash);
      if (code) {
        setActive(code);
        requestAnimationFrame(() =>
          document.getElementById('work-tabs')?.scrollIntoView({ behavior: 'smooth', block: 'start' }),
        );
      }
    };
    fromHash();
    window.addEventListener('hashchange', fromHash);
    return () => window.removeEventListener('hashchange', fromHash);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    const i = available.indexOf(active);
    let next = i;
    if (e.key === 'ArrowRight') next = (i + 1) % available.length;
    else if (e.key === 'ArrowLeft') next = (i - 1 + available.length) % available.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = available.length - 1;
    else return;
    e.preventDefault();
    const code = available[next];
    setActive(code);
    tabRefs.current[code]?.focus();
  };

  const info = seriesInfo[active];
  const list = projectsInSeries(active);

  return (
    <section id="work" aria-labelledby="work-title" className="border-b border-rule">
      <div className="mx-auto container px-6 py-16 md:px-10 md:py-20">
        {/* Label with a long accent line, then the heading */}
        <p className="flex items-center gap-4 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-muted sm:text-xs sm:tracking-[0.22em]">
          Selected work
          <span aria-hidden className="h-[2px] max-w-[33rem] flex-1 bg-accent" />
        </p>

        <h2
          id="work-title"
          className="mt-4 text-[clamp(2.25rem,4vw,3.25rem)] font-bold leading-none tracking-[-0.04em]"
        >
          Projects worth opening
        </h2>
        <p className="mt-4 max-w-[52ch] text-lg leading-[1.6] text-muted">
          Choose a tab: the software and automation I built for BIM teams, or the architecture and
          interiors I designed before that.
        </p>

        {/* Folder-style tabs: the active tab joins the content below it */}
        <div
          id="work-tabs"
          role="tablist"
          aria-label="Type of work"
          className="mt-10 flex scroll-mt-24 items-end gap-2 border-b-2 border-rule"
        >
          {available.map((code) => {
            const on = code === active;
            return (
              <button
                key={code}
                ref={(el) => {
                  tabRefs.current[code] = el;
                }}
                role="tab"
                id={`tab-${code}`}
                type="button"
                aria-selected={on}
                aria-controls={`panel-${code}`}
                tabIndex={on ? 0 : -1}
                onClick={() => setActive(code)}
                onKeyDown={onKeyDown}
                className={`relative flex-1 rounded-t-2xl border-2 border-b-0 px-3 text-center text-sm font-semibold leading-tight transition-colors duration-150 sm:flex-none sm:px-7 sm:text-lg ${
                  on
                    ? 'z-10 -mb-[2px] border-rule bg-surface pb-[calc(0.875rem+2px)] pt-[0.875rem] shadow-[inset_0_5px_0_0_var(--color-teal)] sm:pt-[1.125rem]'
                    : 'border-rule bg-ink/[0.05] py-3 text-muted hover:bg-teal/10 hover:text-ink sm:py-3.5'
                }`}
              >
                {tabLabel[code]}
                <span
                  className={`ml-2 rounded-full px-2 py-0.5 text-xs ${
                    on ? 'bg-accent text-ink' : 'bg-ink/10'
                  }`}
                >
                  {projectsInSeries(code).length}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active tab */}
        <div
          role="tabpanel"
          id={`panel-${active}`}
          aria-labelledby={`tab-${active}`}
          tabIndex={0}
          className="pt-8 focus:outline-none"
        >
          <p className="max-w-[52ch] text-lg leading-[1.6] text-muted">{info.intro}</p>
          <ol className="mt-8 divide-y divide-rule">
            {list.map((p, i) => (
              <ProjectRow key={p.slug} project={p} index={i} />
            ))}
          </ol>
        </div>

        <div className="mt-16">
          <h3 className="text-3xl font-bold tracking-[-0.03em] md:text-4xl">Also built</h3>
          <p className="mt-2 max-w-[52ch] text-lg text-muted">
            Smaller front-end projects, live on the web.
          </p>
          <ul className="mt-6 border-t border-rule">
            {sideProjects.map((p) => (
              <li
                key={p.title}
                className="grid gap-x-8 gap-y-2 border-b border-rule py-5 md:grid-cols-[16rem_1fr_auto] md:items-baseline"
              >
                <a
                  href={p.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-2xl font-bold underline-offset-4 hover:underline"
                >
                  {p.title}
                </a>
                <span className="text-lg">{p.description}</span>
                <span className="text-sm text-muted">{p.tags.join(', ')}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
