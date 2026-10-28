import type { ReactNode } from 'react';
import { profile } from '../data/profile';

const Icon = ({ children }: { children: ReactNode }) => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {children}
  </svg>
);

const CapIcon = () => (
  <Icon>
    <path d="m3 9 9-5 9 5-9 5z" />
    <path d="M7 11.5V16c0 1.2 2.2 2.5 5 2.5s5-1.3 5-2.5v-4.5" />
    <path d="M21 9v5" />
  </Icon>
);

const RibbonIcon = () => (
  <Icon>
    <circle cx="12" cy="9" r="5" />
    <path d="m9 13.5-1.5 7 4.5-2.5 4.5 2.5-1.5-7" />
  </Icon>
);

const BadgeIcon = () => (
  <Icon>
    <path d="M12 3 4.5 6v5.5c0 4.5 3 7.7 7.5 9.5 4.5-1.8 7.5-5 7.5-9.5V6z" />
    <path d="m9 12 2 2 4-4" />
  </Icon>
);

function SubHeading({ children }: { children: ReactNode }) {
  return (
    <h3 className="flex items-center gap-4 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-muted sm:text-xs sm:tracking-[0.22em]">
      {children}
      <span aria-hidden className="h-px flex-1 bg-rule" />
    </h3>
  );
}

function Tile({ icon, title, meta }: { icon: ReactNode; title: string; meta: string }) {
  return (
    <li className="flex items-start gap-4 rounded-2xl border border-rule bg-surface p-5 transition duration-200 hover:-translate-y-0.5 hover:border-teal hover:shadow-[0_10px_24px_rgba(15,45,46,0.10)]">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-teal/10 text-teal">{icon}</span>
      <span className="min-w-0">
        <span className="block text-base font-semibold leading-snug tracking-[-0.01em]">{title}</span>
        {meta && <span className="mt-1 block text-sm text-muted">{meta}</span>}
      </span>
    </li>
  );
}

export default function Education() {
  const hasLicenses = profile.licenses.length > 0;

  return (
    <section id="education" aria-labelledby="education-title" className="border-b border-rule">
      <div className="mx-auto container px-6 py-16 md:px-10 md:py-20">
        <p className="flex items-center gap-4 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-muted sm:text-xs sm:tracking-[0.22em]">
          Credentials
          <span aria-hidden className="h-[2px] max-w-[33rem] flex-1 bg-accent" />
        </p>

        <h2
          id="education-title"
          className="mt-4 text-[clamp(2.25rem,4vw,3.25rem)] font-bold leading-none tracking-[-0.04em]"
        >
          {hasLicenses ? 'Education, certificates, licences' : 'Education and certificates'}
        </h2>

        {/* Degrees */}
        <div className="mt-10">
          <SubHeading>Education</SubHeading>
          <ol className="mt-6 grid gap-6 md:grid-cols-2">
            {profile.education.map((ed) => (
              <li
                key={ed.title}
                className="relative overflow-hidden rounded-[22px] border border-rule bg-surface p-6 shadow-[0_14px_34px_rgba(15,45,46,0.10)] sm:p-8"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-teal text-white">
                    <CapIcon />
                  </span>
                  <span className="rounded-full bg-accent/15 px-3 py-1 text-sm font-semibold text-gold">
                    {ed.years}
                  </span>
                </div>

                <h4 className="mt-6 text-2xl font-bold leading-tight tracking-[-0.03em] sm:text-[1.65rem]">
                  {ed.title}
                </h4>
                <p className="mt-2 text-base font-medium text-teal">{ed.org}</p>
                {'note' in ed && ed.note && (
                  <p className="mt-4 max-w-[52ch] text-sm leading-relaxed text-muted sm:text-base">{ed.note}</p>
                )}
              </li>
            ))}
          </ol>
        </div>

        {/* Certificates */}
        <div className="mt-14">
          <SubHeading>Certificates</SubHeading>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {profile.certificates.map((c) => (
              <Tile
                key={c.title}
                icon={<RibbonIcon />}
                title={c.title}
                meta={c.issuer + (c.date ? ` · ${c.date}` : '')}
              />
            ))}
          </ul>
        </div>

        {/* Licences, only when there are some */}
        {hasLicenses && (
          <div className="mt-14">
            <SubHeading>Licences and registrations</SubHeading>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {profile.licenses.map((l) => (
                <Tile
                  key={l.title}
                  icon={<BadgeIcon />}
                  title={l.title}
                  meta={[l.issuer, l.valid].filter(Boolean).join(' · ')}
                />
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
