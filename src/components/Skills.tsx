import { profile } from '../data/profile';

export default function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="border-b border-rule">
      <div className="mx-auto container px-6 py-16 md:px-10 md:py-20">
        {/* Label with a long accent line, then the heading */}
        <p className="flex items-center gap-4 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-muted sm:text-xs sm:tracking-[0.22em]">
          Skills
          <span aria-hidden className="h-[2px] max-w-[33rem] flex-1 bg-accent" />
        </p>

        <h2
          id="skills-title"
          className="mt-4 text-[clamp(2.25rem,4vw,3.25rem)] font-bold leading-none tracking-[-0.04em]"
        >
          What I work with
        </h2>

        <dl className="mt-10 border-t border-rule md:mt-12">
          {profile.skills.map((group) => (
            <div
              key={group.group}
              className="grid gap-x-8 gap-y-4 border-b border-rule py-6 md:grid-cols-[20rem_1fr] md:py-7"
            >
              <dt className="pt-2 font-bold uppercase tracking-[0.18em] text-muted sm:text-xs md:text-lg sm:tracking-[0.22em]">
                {group.group}
              </dt>
              <dd>
                <ul className="flex flex-wrap gap-2.5">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="cursor-default rounded-full border border-rule bg-surface px-4 py-2 text-[0.95rem] shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-teal hover:bg-teal/10 hover:shadow-md sm:text-base"
                    >
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
