import { profile } from '../data/profile';
import { asset } from '../data/projects';
import SectionHeading from './SectionHeading';

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="border-b-[3px] border-ink">
      <div className="mx-auto max-w-[1400px] px-6 py-16 md:px-10 md:py-20">
        <SectionHeading id="about-title">Hi there.</SectionHeading>

        <div className="mt-10 grid gap-10 md:grid-cols-[18rem_1fr] md:gap-16">
          <figure className="max-w-xs md:max-w-none">
            <img
              src={asset(profile.photo.src)}
              alt={profile.photo.alt}
              width={800}
              height={800}
              loading="lazy"
              className="aspect-square w-full border-2 border-ink object-cover"
            />
          </figure>
          <div className="max-w-[60ch] space-y-5 text-xl leading-[1.7]">
            {profile.about.map((para) => (
              <p key={para}>{para}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
