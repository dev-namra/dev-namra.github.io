import { useEffect, type ReactNode } from 'react';
import { Link, useParams } from 'react-router-dom';
import FigureList from '../components/FigureList';
import Flow from '../components/Flow';
import TitleBlock from '../components/TitleBlock';
import { profile } from '../data/profile';
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
    <article className="mx-auto max-w-[1400px] px-6 pb-24 md:px-10">
      <Link
        to="/"
        state={{ scrollTo: 'work' }}
        className="label inline-block py-6 text-graphite underline-offset-4 hover:underline"
      >
        All work
      </Link>

      <header className="grid gap-x-8 gap-y-8 border-t-[3px] border-ink pb-14 pt-8 md:grid-cols-[8rem_1fr_16rem]">
        <span className={`sheet-no text-2xl ${accent}`}>{sheet}</span>
        <div>
          <h1 className="display text-[clamp(2.75rem,8vw,7rem)] leading-[0.92]">{project.title}</h1>
          <p className="label mt-4 text-xl text-graphite">{project.subtitle}</p>
          <p className="mt-6 max-w-[40ch] text-2xl leading-[1.45]">{project.summary}</p>
        </div>
        <dl className="space-y-4 text-sm md:self-end">
          {facts.map((f) => (
            <div key={f.label}>
              <dt className="label text-graphite">{f.label}</dt>
              <dd className="mt-0.5">{f.value}</dd>
            </div>
          ))}
        </dl>
      </header>

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
          <div className="border-t-2 border-ink">
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
          <ol className="border-t-2 border-ink">
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
            <dl className="mt-8 max-w-[40rem] border-t-2 border-ink">
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

      <div className="border-t-[3px] border-ink pt-10">
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

      {next && (
        <Link
          to={`/project/${next.slug}`}
          className="group mt-16 block border-t-[3px] border-ink pt-8"
        >
          <span className="label text-graphite">Next sheet</span>
          <span className="mt-2 flex flex-wrap items-baseline gap-x-5">
            <span className={`sheet-no text-xl ${next.series === 'BA' ? 'text-gold' : 'text-ink'}`}>
              {sheetNumber(next)}
            </span>
            <span className="display text-4xl underline-offset-[0.12em] group-hover:underline group-hover:decoration-2 md:text-6xl">
              {next.title}
            </span>
          </span>
        </Link>
      )}
    </article>
  );
}
