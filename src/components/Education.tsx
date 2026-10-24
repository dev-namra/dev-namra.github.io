import type { ReactNode } from 'react';
import { profile } from '../data/profile';

function Card({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="rounded-[1.1rem] border-[3px] border-ink bg-white p-6 shadow-[6px_6px_0_0_var(--color-ink)] sm:p-8">
      <h3 className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-muted sm:text-xs sm:tracking-[0.22em]">
        {label}
      </h3>
      <ul className="mt-6 divide-y divide-rule">{children}</ul>
    </div>
  );
}

const Item = ({ title, lines }: { title: string; lines: string[] }) => (
  <li className="py-4 first:pt-0 last:pb-0">
    <p className="text-lg font-bold leading-snug tracking-[-0.01em]">{title}</p>
    {lines.filter(Boolean).map((line) => (
      <p key={line} className="mt-1 text-base leading-snug text-muted">
        {line}
      </p>
    ))}
  </li>
);

export default function Education() {
  const hasLicenses = profile.licenses.length > 0;
  const cols = hasLicenses ? 'lg:grid-cols-3' : 'lg:grid-cols-2';

  return (
    <section id="education" aria-labelledby="education-title" className="border-b-[3px] border-ink">
      <div className="mx-auto container px-6 py-16 md:px-10 md:py-20">
        {/* Label with a long accent line, then the heading */}
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

        <div className={`mt-10 grid gap-8 md:grid-cols-2 ${cols}`}>
          <Card label="Education">
            {profile.education.map((ed) => (
              <Item
                key={ed.title}
                title={ed.title}
                lines={[ed.org, ed.years]}
              />
            ))}
          </Card>

          <Card label="Certificates">
            {profile.certificates.map((c) => (
              <Item
                key={c.title}
                title={c.title}
                lines={[c.issuer + (c.date ? ` · ${c.date}` : '')]}
              />
            ))}
          </Card>

          {hasLicenses && (
            <Card label="Licences">
              {profile.licenses.map((l) => (
                <Item
                  key={l.title}
                  title={l.title}
                  lines={[l.issuer, l.valid ?? '']}
                />
              ))}
            </Card>
          )}
        </div>
      </div>
    </section>
  );
}
