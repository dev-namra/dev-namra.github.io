import { profile } from '../data/profile';

export default function Contact() {
  const { email, linkedin, github, cv } = profile.links;

  return (
    <section id="contact" aria-labelledby="contact-title">
  <div className="bg-[#0b2425] px-5 py-16 sm:px-8 md:px-10 md:py-20">
    <div className="relative mx-auto container px-6 py-16 md:px-10 md:py-20 overflow-hidden text-[#f4f1ea]">
          {/* soft coral glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-0 -top-0 h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(closest-side,rgba(255,107,74,0.28),transparent)]"
          />
      
          <div className="relative">
            <p className="flex items-center gap-4 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-[#9db3b2] sm:text-xs sm:tracking-[0.22em]">
              Contact
              <span aria-hidden className="h-[2px] w-16 bg-accent" />
            </p>

            <h2
              id="contact-title"
              className="mt-5 max-w-[18ch] text-balance text-[clamp(2.25rem,6vw,5rem)] font-bold leading-[0.98] tracking-[-0.05em]"
            >
              Hiring for BIM, automation or <span className="text-accent">architecture?</span>
            </h2>

            <p className="mt-6 max-w-[46ch] text-base leading-relaxed text-[#9db3b2] sm:text-xl">
              If your models, schedules or spreadsheets are doing too much by hand, write to me.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3 sm:gap-4">
              <a
                href={`mailto:${email}`}
                className="inline-flex max-w-full items-center gap-3 break-all rounded-2xl bg-accent px-6 py-3.5 text-base font-semibold text-[#0f2d2e] shadow-[0_10px_22px_rgba(255,107,74,0.3)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_28px_rgba(255,107,74,0.4)] sm:text-lg"
              >
                {email}
                <span aria-hidden>→</span>
              </a>

              <a
                href={linkedin}
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl border-[1.5px] border-dashed border-[#2f7a74] px-5 py-3.5 text-base font-semibold text-[#8fd3cc] transition hover:border-solid hover:bg-white/5"
              >
                LinkedIn ↗
              </a>
              <a
                href={github}
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl border-[1.5px] border-dashed border-[#2f7a74] px-5 py-3.5 text-base font-semibold text-[#8fd3cc] transition hover:border-solid hover:bg-white/5"
              >
                GitHub ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
