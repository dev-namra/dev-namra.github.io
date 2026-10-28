import { useEffect, type ReactNode } from 'react';
import { Link, useParams } from 'react-router-dom';
import FigureList from '../components/FigureList';
import Flow from '../components/Flow';
import TitleBlock from '../components/TitleBlock';
import { profile } from '../data/profile';
import ProjectVideo from '../components/ProjectVideo';

import {
  asset,
  seriesInfo,
  sheetNumber,
  subSheetNumber,
  visibleProjects,
} from '../data/projects';
import NotFound from './NotFound';

const defaultTitle = document.title;

function Block({ label, children }: { label: string; children: ReactNode }) {
  return (
    <section className="grid gap-x-8 gap-y-4 border-t border-rule py-10 md:grid-cols-[8rem_1fr]">
      <h2 className="label text-lg">{label}</h2>
      <div>{children}</div>
    </section>
  );
}

export default function ProjectPage() {
  const { slug } = useParams();
  const list = visibleProjects();
  const index = list.findIndex((p) => p.slug === slug);
  const project = list[index];

  useEffect(() => {
    if (project) document.title = `${project.title} | ${profile.name}`;
    return () => {
      document.title = defaultTitle;
    };
  }, [project]);

  if (!project) return <NotFound />;

  const sheet = sheetNumber(project);
  const accent = project.series === 'BA' ? 'text-gold' : 'text-ink';

  const next = list.length > 1 ? list[(index + 1) % list.length] : null;
  const prev = list.length > 1 ? list[(index - 1 + list.length) % list.length] : null;
  const hasVisuals = project.figures.length > 0 || !!project.comparisons?.length || !!project.flow;
  const showFigures = project.figures.length > 0 || (import.meta.env.DEV && !hasVisuals);
  const hasPairs = !!project.challenges?.length && project.challenges.length === project.solutions?.length;

  const facts = [
    { label: 'Role', value: project.role },
    { label: 'Organisation', value: project.organisation },
    { label: 'Place', value: project.place },
    { label: 'Period', value: project.period },
    ...(project.scope.length > 0 ? [{ label: 'Scope and tools', value: project.scope.join(', ') }] : []),
  ];

  return (
    <article className="mx-auto container px-6 pb-24 md:px-10">
      <Link
  to="/"
  state={{ scrollTo: 'work' }}
  className="my-6 inline-flex items-center gap-2 rounded-2xl bg-teal px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_22px_rgba(31,122,116,0.3)] transition hover:-translate-y-0.5"
>
  <span aria-hidden>←</span> All work
</Link>

      <header className="border-t border-rule pt-8 md:pt-10">
        <div className="flex items-center gap-4">
          <span className={`sheet-no text-lg ${accent}`}>{sheet}</span>
          <span aria-hidden className="h-[2px] w-16 bg-accent" />
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">{project.type}</span>
        </div>

        <h1 className="display mt-6 text-[clamp(2.75rem,8vw,6.5rem)] leading-[0.92]">{project.title}</h1>
        <p className="mt-5 max-w-[34ch] text-xl font-medium leading-snug text-teal sm:text-2xl">{project.subtitle}</p>
        <p className="mt-5 max-w-[56ch] text-base leading-relaxed text-muted sm:text-lg">{project.summary}</p>

        <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-6 border-y border-rule py-6 md:grid-cols-4">
          {facts.map((f) => (
            <div key={f.label}>
              <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">{f.label}</dt>
              <dd className="mt-1.5 text-base font-medium">{f.value}</dd>
            </div>
          ))}
        </dl>
      </header>

      <ProjectVideo video={project.video} />

      <Block label="Brief">
        <div className="max-w-[62ch] space-y-5 text-xl leading-[1.7]">
          {project.brief.map((para) => (
            <p key={para}>{para}</p>
          ))}
        </div>
      </Block>

      {project.flow && (
        <Block label="How it fits together">
          <Flow steps={project.flow} />
        </Block>
      )}

      {project.thumb && (
        <Block label="Figures">
          <FigureList figures={[project.thumb, ...project.figures]} />
        </Block>
      )}

      {!project.thumb && showFigures && (
        <Block label="Figures">
          <FigureList figures={project.figures} placeholder />
        </Block>
      )}

      {project.comparisons && project.comparisons.length > 0 && (
        <Block label="Before and after">
          <div className="space-y-10">
            {project.comparisons.map((c) => (
              <div key={c.label}>
                <h3 className="display text-2xl">{c.label}</h3>
                <div className="mt-4 grid gap-6 md:grid-cols-2">
                  {[c.before, c.after].map((fig) => (
                    <figure key={fig.src}>
                      <img
                        src={asset(fig.src)}
                        alt={fig.alt}
                        loading="lazy"
                        className="w-full border border-rule"
                      />
                      <figcaption className="label mt-2 text-sm text-graphite">{fig.caption}</figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Block>
      )}

      <Block label="Approach">
        <ul className="max-w-[62ch]">
          {project.approach.map((step) => (
            <li key={step} className="border-b border-rule py-3 text-xl leading-[1.6] first:pt-0">
              {step}
            </li>
          ))}
        </ul>
      </Block>

      {hasPairs && project.challenges && project.solutions && (
        <Block label="Challenges and solutions">
          <div className="border-t border-rule">
            {project.challenges.map((challenge, i) => (
              <div
                key={challenge}
                className="grid gap-x-10 gap-y-2 border-b border-rule py-5 md:grid-cols-2"
              >
                <p>
                  <span className="label block text-sm text-graphite">Challenge</span>
                  <span className="text-lg leading-[1.6]">{challenge}</span>
                </p>
                <p>
                  <span className="label block text-sm text-gold">Solution</span>
                  <span className="text-lg leading-[1.6]">{project.solutions?.[i]}</span>
                </p>
              </div>
            ))}
          </div>
        </Block>
      )}

      {project.sub.length > 0 && (
        <Block label="Sub-projects">
          <ol className="border-t border-rule">
            {project.sub.map((s, i) => (
              <li
                key={s.title}
                className="grid gap-x-8 gap-y-2 border-b border-rule py-6 md:grid-cols-[6rem_1fr]"
              >
                <span className="sheet-no text-graphite">{subSheetNumber(project, i)}</span>
                <div className="max-w-[62ch]">
                  <h3 className="display text-3xl">{s.title}</h3>
                  <p className="mt-2 text-lg leading-[1.6] text-graphite">{s.summary}</p>
                </div>
              </li>
            ))}
          </ol>
        </Block>
      )}

      {(project.outcome.length > 0 || project.note) && (
        <Block label={project.outcome.length > 0 ? 'Outcome' : 'Note'}>
          {project.outcome.length > 0 && (
            <div className="max-w-[62ch] space-y-5 text-xl leading-[1.7]">
              {project.outcome.map((para) => (
                <p key={para}>{para}</p>
              ))}
            </div>
          )}
          {project.metrics && project.metrics.length > 0 && (
            <dl className="mt-8 max-w-[40rem] border-t border-rule">
              {project.metrics.map((m) => (
                <div
                  key={m.label}
                  className="flex items-baseline justify-between gap-6 border-b border-rule py-3"
                >
                  <dt>{m.label}</dt>
                  <dd className="display text-4xl">{m.value}</dd>
                </div>
              ))}
            </dl>
          )}
          {project.note && (
            <p className="mt-8 max-w-[62ch] text-sm leading-[1.6] text-graphite">{project.note}</p>
          )}
        </Block>
      )}

      <div className="border-t border-rule pt-10">
        <TitleBlock
          className="md:ml-auto md:max-w-md"
          rows={[
            { label: 'Project', value: project.title },
            { label: 'Sheet', value: sheet },
            { label: 'Series', value: seriesInfo[project.series].title },
            { label: 'Period', value: project.period },
            { label: 'Scale', value: 'Not to scale' },
            { label: 'Drawn by', value: profile.name },
          ]}
        />
      </div>

     {(prev || next) && (
  <nav
    aria-label="Other sheets"
    className="mt-16 grid gap-8 border-t border-rule pt-8 md:grid-cols-2"
  >
    {prev && (
      <Link to={`/project/${prev.slug}`} className="group block">
        <span className="label text-graphite">← Previous sheet</span>
        <span className="mt-2 flex flex-wrap items-baseline gap-x-4">
          <span className={`sheet-no text-lg ${prev.series === 'BA' ? 'text-gold' : 'text-ink'}`}>
            {sheetNumber(prev)}
          </span>
          <span className="display text-3xl underline-offset-[0.12em] group-hover:underline group-hover:decoration-2 md:text-4xl">
            {prev.title}
          </span>
        </span>
      </Link>
    )}

    {next && (
      <Link to={`/project/${next.slug}`} className="group block md:col-start-2 md:text-right">
        <span className="label text-graphite">Next sheet →</span>
        <span className="mt-2 flex flex-wrap items-baseline gap-x-4 md:justify-end">
          <span className={`sheet-no text-lg ${next.series === 'BA' ? 'text-gold' : 'text-ink'}`}>
            {sheetNumber(next)}
          </span>
          <span className="display text-3xl underline-offset-[0.12em] group-hover:underline group-hover:decoration-2 md:text-4xl">
            {next.title}
          </span>
        </span>
      </Link>
    )}
  </nav>
)}
    </article>
  );
}
