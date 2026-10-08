import { profile } from '../data/profile';
import SectionHeading from './SectionHeading';

// Newest first. The numbers give each role a reference (the list is a sequence in time).
export default function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="border-b-[3px] border-ink">
      <div className="mx-auto max-w-[1400px] px-6 py-16 md:px-10 md:py-20">
        <SectionHeading
          id="experience-title"
          intro="Five roles across two countries, newest first. Open any row for the detail."
        >
          Experience
        </SectionHeading>

        <ol className="mt-10 border-t-2 border-ink">
          {profile.experience.map((role, i) => (
            <li key={role.title + role.org + role.years} className="border-b border-rule">
              <details open={i === 1} className="group">
                <summary className="grid cursor-pointer list-none grid-cols-[2.5rem_1fr] gap-x-4 gap-y-1 py-5 marker:content-none md:grid-cols-[4rem_1fr_14rem_7rem] md:gap-x-8 [&::-webkit-details-marker]:hidden">
                  <span className="sheet-no pt-1 text-graphite">{String(i + 1).padStart(2, '0')}</span>
                  <span>
                    <span className="display block text-2xl underline-offset-4 group-hover:underline md:text-3xl">
                      {role.title}
                    </span>
                    <span className="mt-1 block text-lg text-graphite">{role.org}</span>
                  </span>
                  <span className="col-start-2 text-graphite md:col-start-auto md:pt-1">{role.place}</span>
                  <span className="sheet-no col-start-2 text-graphite md:col-start-auto md:pt-1 md:text-right">
                    {role.years}
                  </span>
                </summary>
                <div className="pb-8 md:pl-24">
                  <ul className="max-w-[62ch] list-disc space-y-2 pl-5 text-lg leading-[1.6]">
                    {role.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                  {'tags' in role && role.tags && (
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {role.tags.map((tag) => (
                        <li key={tag} className="rounded-full border border-rule px-3 py-0.5 text-sm text-graphite">
                          {tag}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </details>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
