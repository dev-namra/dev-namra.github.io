import { profile } from '../data/profile';
import SectionHeading from './SectionHeading';

export default function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="border-b-[3px] border-ink">
      <div className="mx-auto max-w-[1400px] px-6 py-16 md:px-10 md:py-20">
        <SectionHeading id="skills-title" intro="What I reach for, grouped by the job it does.">
          Skills
        </SectionHeading>

        <dl className="mt-10 border-t-2 border-ink">
          {profile.skills.map((group) => (
            <div
              key={group.group}
              className="grid gap-x-8 gap-y-3 border-b border-rule py-6 md:grid-cols-[16rem_1fr]"
            >
              <dt className="display text-3xl">{group.group}</dt>
              <dd>
                <ul className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li key={item} className="rounded-full border-2 border-ink px-4 py-1 text-base">
                      {item}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
