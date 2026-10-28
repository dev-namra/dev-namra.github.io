import { profile } from '../data/profile';
import { asset } from '../data/projects';

// Which paragraph of profile.about is shown large at the top.
// Index 0 is the short lead sentence.
const LEAD_INDEX = 0;

export default function About() {
  const lead = profile.about[LEAD_INDEX] ?? profile.about[0];
  const rest = profile.about.filter((_, i) => i !== LEAD_INDEX);

  return (
    <section id="about" aria-labelledby="about-title" className="border-b border-rule">
      <div className="mx-auto container px-6 py-16 md:px-10 md:py-20">
        {/* Label with a long accent line, then the heading */}
        <p className="flex items-center gap-4 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-muted sm:text-xs sm:tracking-[0.22em]">
          About
          <span aria-hidden className="h-[2px] max-w-[33rem] flex-1 bg-accent" />
        </p>

        <h2
          id="about-title"
          className="mt-4 text-[clamp(2.25rem,4vw,3.25rem)] font-bold leading-none tracking-[-0.04em]"
        >
          Hi there.
        </h2>

        <div className="mt-10 flex flex-col md:flex-row gap-10 md:mt-12 items-start">
          {/* Portrait: rounded rectangle with a hard shadow */}
          <figure className="mx-auto w-full max-w-[15rem] lg:mx-0 lg:max-w-[22rem]">
            <img
              src={asset(profile.photo.src)}
              alt={profile.photo.alt}
              width={800}
              height={1000}
              loading="lazy"
              className="aspect-[4/5] w-full rounded-[22px] border border-rule object-cover object-[65%_35%] shadow-[0_14px_34px_rgba(15,45,46,0.10)]"
            />
          </figure>

          {/* Large lead sentence, then smaller grey paragraphs */}
          <div className="w-full">
            <p className="text-[1rem] sm:text-[2rem] lg:text-[1.25rem] font-medium leading-[1.4] tracking-[-0.03em]">
              {lead}
            </p>

            <div className="mt-8 space-y-5 text-base leading-[1.9] text-muted sm:text-lg">
              {rest.map((para) => (
                <p key={para}>{para}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
