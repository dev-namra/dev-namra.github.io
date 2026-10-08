import { Link } from 'react-router-dom';
import {
  asset,
  projectsInSeries,
  seriesInfo,
  sheetNumber,
  sideProjects,
  subSheetNumber,
  type Project,
  type SeriesCode,
} from '../data/projects';
import Flow from './Flow';
import SectionHeading from './SectionHeading';

const seriesCodes: SeriesCode[] = ['BA', 'AR'];

function Thumb({ project }: { project: Project }) {
  if (project.thumb) {
    return (
      <img
        src={asset(project.thumb.src)}
        alt={project.thumb.alt}
        loading="lazy"
        className="aspect-[3/2] w-full border-2 border-ink bg-black object-cover"
      />
    );
  }
  if (project.flow) {
    return (
      <div className="grid aspect-[3/2] place-items-center border-2 border-ink p-5">
        <div className="w-full max-w-[16rem]">
          <Flow steps={project.flow} compact />
        </div>
      </div>
    );
  }
  return (
    <div
      aria-hidden
      className="display grid aspect-[3/2] place-items-center border-2 border-ink text-7xl text-rule md:text-8xl"
    >
      {sheetNumber(project)}
    </div>
  );
}

function ProjectRow({ project }: { project: Project }) {
  const accent = project.series === 'BA' ? 'text-gold' : 'text-ink';

  return (
    <li className="group relative border-t border-rule py-10 first:border-t-2 first:border-ink">
      <div className="grid grid-cols-[minmax(0,1fr)] gap-x-10 gap-y-6 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <Thumb project={project} />

        <div>
          <p className="sheet-no text-base text-graphite">
            <span className={accent}>{sheetNumber(project)}</span>
            <span className="mx-2" aria-hidden>
              /
            </span>
            {project.period}
            <span className="mx-2" aria-hidden>
              /
            </span>
            {project.type}
            {project.draft && (
              <span className="label ml-3 border border-graphite px-2 py-0.5 text-sm font-medium">
                Draft, hidden when published
              </span>
            )}
          </p>

          <h4 className="display mt-2 text-4xl md:text-5xl">
            <Link
              to={`/project/${project.slug}`}
              className="underline-offset-[0.12em] after:absolute after:inset-0 group-hover:underline group-hover:decoration-2"
            >
              {project.title}
            </Link>
          </h4>
          <p className="label mt-2 text-lg text-graphite">{project.subtitle}</p>
          <p className="mt-4 max-w-[56ch] text-lg leading-[1.6]">{project.summary}</p>

          {project.sub.length > 0 && (
            <ul className="mt-6 space-y-1.5 border-l-2 border-ink pl-5">
              {project.sub.map((s, i) => (
                <li key={s.title} className="flex gap-4">
                  <span className="sheet-no w-[4.5rem] shrink-0 text-graphite">
                    {subSheetNumber(project, i)}
                  </span>
                  <span>{s.title}</span>
                </li>
              ))}
            </ul>
          )}

          <ul className="mt-6 flex flex-wrap gap-2">
            {project.scope.map((tag) => (
              <li key={tag} className="rounded-full border border-rule px-3 py-0.5 text-sm text-graphite">
                {tag}
              </li>
            ))}
          </ul>

          <p className="label mt-6 text-lg underline underline-offset-4">Read the case study</p>
        </div>
      </div>
    </li>
  );
}

export default function Work() {
  return (
    <section id="work" aria-labelledby="work-title" className="border-b-[3px] border-ink">
      <div className="mx-auto max-w-[1400px] px-6 py-16 md:px-10 md:py-20">
        <SectionHeading
          id="work-title"
          intro="Two series of work: the software and automation I built for BIM teams, and the architecture I drew before that."
        >
          Selected work
        </SectionHeading>

        {seriesCodes.map((code) => {
          const list = projectsInSeries(code);
          if (list.length === 0) return null;
          const info = seriesInfo[code];
          return (
            <div key={code} id={info.id} className="mt-16">
              <div className="flex flex-wrap items-baseline gap-x-5 gap-y-1">
                <span className={`sheet-no text-3xl ${code === 'BA' ? 'text-gold' : 'text-ink'}`}>
                  {code}
                </span>
                <h3 className="display text-4xl md:text-5xl">{info.title}</h3>
              </div>
              <p className="mt-3 max-w-[52ch] text-lg leading-[1.6] text-graphite">{info.intro}</p>
              <ol className="mt-8">
                {list.map((p) => (
                  <ProjectRow key={p.slug} project={p} />
                ))}
              </ol>
            </div>
          );
        })}

        <div className="mt-16">
          <h3 className="display text-3xl md:text-4xl">Also built</h3>
          <p className="mt-2 max-w-[52ch] text-lg text-graphite">
            Smaller front-end projects, live on the web.
          </p>
          <ul className="mt-6 border-t-2 border-ink">
            {sideProjects.map((p) => (
              <li
                key={p.title}
                className="grid gap-x-8 gap-y-2 border-b border-rule py-5 md:grid-cols-[16rem_1fr_auto] md:items-baseline"
              >
                <a
                  href={p.href}
                  target="_blank"
                  rel="noreferrer"
                  className="display text-2xl underline-offset-4 hover:underline"
                >
                  {p.title}
                </a>
                <span className="text-lg">{p.description}</span>
                <span className="text-sm text-graphite">{p.tags.join(', ')}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
