import { useEffect, useState, type MouseEvent } from 'react';
import { profile } from '../data/profile';
import { scrollToId } from '../lib/scroll';

const idFor = (i: number) => `job-${i}`;

export default function Experience() {
  const jobs = profile.experience;
  const [active, setActive] = useState(0);

  // Highlight the left-hand item for the card that is in the middle of the screen.
  useEffect(() => {
    const cards = jobs.map((_, i) => document.getElementById(idFor(i)));
    const seen = new Map<Element, boolean>();

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => seen.set(e.target, e.isIntersecting));
        const first = cards.findIndex((c) => c && seen.get(c));
        if (first !== -1) setActive(first);
      },
      { rootMargin: '-35% 0px -55% 0px' },
    );

    cards.forEach((c) => c && io.observe(c));
    return () => io.disconnect();
  }, [jobs]);

  const jump = (i: number) => (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setActive(i);
    scrollToId(idFor(i));
  };

  return (
    <section id="experience" aria-labelledby="experience-title" className="border-b-[3px] border-ink">
      <div className="mx-auto container px-6 py-16 md:px-10 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)] lg:gap-x-[clamp(2rem,6vw,6rem)]">
          {/* Left: heading and the list of roles (sticky on large screens) */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <p className="flex items-center gap-4 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-muted sm:text-xs sm:tracking-[0.22em]">
              Experience
              <span aria-hidden className="h-[2px] max-w-[33rem] flex-1 bg-accent" />
            </p>

            <h2
              id="experience-title"
              className="mt-4 text-[clamp(2.25rem,4vw,3.25rem)] font-bold leading-none tracking-[-0.04em]"
            >
              Where I’ve been
            </h2>

            <nav aria-label="Roles" className="mt-10 hidden lg:block">
              <ul className="space-y-1">
                {jobs.map((job, i) => {
                  const on = i === active;
                  return (
                    <li key={`${job.org}-${job.title}`}>
                      <a
                        href={`#${idFor(i)}`}
                        onClick={jump(i)}
                        aria-current={on ? 'true' : undefined}
                        className={`flex gap-4 rounded-xl px-4 py-3.5 transition-colors duration-200 ${
                          on ? 'bg-white border border-accent' : 'hover:bg-ink/[0.04]'
                        }`}
                      >
                        <span
                          aria-hidden
                          className={`mt-[0.55rem] h-3 w-3 shrink-0 rounded-full border-[1.5px] border-ink transition-colors duration-200 ${
                            on ? 'bg-accent' : 'bg-transparent'
                          }`}
                        />
                        <span className="min-w-0">
                          <span
                            className={`block text-lg leading-snug transition-colors duration-200 ${
                              on ? 'font-medium bold' : 'text-muted'
                            }`}
                          >
                            {job.title}
                          </span>
                          <span className="mt-1 block text-sm text-muted">
                            {job.org} · {job.place} · {job.years}
                          </span>
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          {/* Right: one card per role */}
          <ol className="space-y-8">
            {jobs.map((job, i) => (
              <li key={`${job.org}-${job.title}`}>
                <article
                  id={idFor(i)}
                  className="scroll-mt-24 rounded-[1.1rem] border-[3px] border-ink bg-white p-6 shadow-[6px_6px_0_0_var(--color-ink)] sm:p-8"
                >
                  <p className="text-base">
                    <span className="font-semibold">{job.years}</span>
                    <span className="text-muted"> · {job.org} · {job.place}</span>
                  </p>

                  <h3 className="mt-3 text-2xl font-bold leading-tight tracking-[-0.03em] sm:text-3xl">
                    {job.title}
                  </h3>

                  <ul className="mt-5 space-y-3">
                    {job.points.map((point) => (
                      <li key={point} className="flex gap-4 text-base leading-[1.7] sm:text-lg">
                        <span
                          aria-hidden
                          className="mt-[0.6rem] h-2.5 w-2.5 shrink-0 border-[1.5px] border-ink bg-accent"
                        />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  {'tags' in job && job.tags && job.tags.length > 0 && (
                    <ul className="mt-6 flex flex-wrap gap-2">
                      {job.tags.map((tag) => (
                        <li
                          key={tag}
                          className="rounded-lg border border-rule px-3 py-1.5 text-sm text-muted"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                  )}
                </article>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
