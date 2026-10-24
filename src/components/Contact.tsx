import { profile } from '../data/profile';

export default function Contact() {
  const { email, linkedin, github, cv } = profile.links;

  return (
    <section id="contact" aria-labelledby="contact-title">
      <div className="mx-auto container px-6 py-16 md:px-10 md:py-24">
        <h2
          id="contact-title"
          className="display max-w-[16ch] text-balance text-[clamp(2rem,7vw,6rem)]"
        >
          Hiring for BIM, automation or architecture?
        </h2>
        <p className="mt-8 max-w-[44ch] text-2xl leading-[1.45]">
          If your models, schedules or spreadsheets are doing too much by hand, write to me.
        </p>

        <p className="mt-10">
          <a
            href={`mailto:${email}`}
            className="display break-all text-3xl underline underline-offset-[0.15em] hover:text-gold md:text-5xl"
          >
            {email}
          </a>
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <a href={github} target="_blank" rel="noreferrer" className="btn">
            GitHub
          </a>
          <a href={linkedin} target="_blank" rel="noreferrer" className="btn">
            LinkedIn
          </a>
          {cv && (
            <a href={cv} className="btn btn-solid" download>
              CV (PDF)
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
