import { profile } from '../data/profile';
import SectionHeading from './SectionHeading';

export default function Education() {
  return (
    <section id="education" aria-labelledby="education-title" className="border-b-[3px] border-ink">
      <div className="mx-auto max-w-[1400px] px-6 py-16 md:px-10 md:py-20">
        <SectionHeading id="education-title">Education and certificates</SectionHeading>

        <ol className="mt-10 border-t-2 border-ink">
          {profile.education.map((ed) => (
            <li
              key={ed.title}
              className="grid gap-x-8 gap-y-1 border-b border-rule py-6 md:grid-cols-[1fr_18rem_7rem]"
            >
              <div>
                <h3 className="display text-2xl md:text-3xl">{ed.title}</h3>
                <p className="mt-2 max-w-[56ch] text-lg leading-[1.6] text-graphite">{ed.note}</p>
              </div>
              <p className="text-lg md:pt-1">{ed.org}</p>
              <p className="sheet-no text-graphite md:pt-1.5 md:text-right">{ed.years}</p>
            </li>
          ))}
        </ol>

        <h3 className="display mt-14 text-3xl md:text-4xl">Certificates and courses</h3>
        <ul className="mt-6 grid gap-x-10 border-t-2 border-ink md:grid-cols-2">
          {profile.certificates.map((c) => (
            <li
              key={c.title}
              className="flex flex-wrap items-baseline justify-between gap-x-4 border-b border-rule py-3"
            >
              <span className="text-lg font-semibold">{c.title}</span>
              <span className="text-sm text-graphite">
                {[c.issuer, 'date' in c ? c.date : ''].filter(Boolean).join(', ')}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
