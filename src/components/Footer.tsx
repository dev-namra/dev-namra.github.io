import { Link } from 'react-router-dom';
import { profile } from '../data/profile';

const year = new Date().getFullYear();

const sections = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'work', label: 'Work' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];

const linkCls =
  'text-base text-ink/80 underline-offset-4 transition hover:text-teal hover:underline';

function Column({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-muted sm:text-xs sm:tracking-[0.22em]">
        {title}
      </h3>
      <ul className="mt-5 space-y-3">{children}</ul>
    </div>
  );
}

export default function Footer() {
  const { email, linkedin, github, cv } = profile.links;

  return (
    <footer className="relative overflow-hidden border-t border-rule">
      <div className="mx-auto container px-6 pb-10 pt-14 md:px-10 md:pt-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div className='flex flex-col item-start'>
            <p className="max-w-[30ch] text-base leading-relaxed text-muted">
              BIM and digital construction specialist. Architect first, developer second.
            </p>
            <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-teal/10 px-3 py-1.5 text-sm font-medium text-teal">
              <span aria-hidden className="h-2 w-2 rounded-full bg-accent" />
              Open to roles in the UAE, Europe and the UK, or remote
            </p>
          </div>

          <Column title="Explore">
            {sections.map((s) => (
              <li key={s.id}>
                <Link to="/" state={{ scrollTo: s.id }} className={linkCls}>
                  {s.label}
                </Link>
              </li>
            ))}
          </Column>

          <Column title="Elsewhere">
            <li>
              <a href={linkedin} target="_blank" rel="noreferrer" className={linkCls}>
                LinkedIn ↗
              </a>
            </li>
            <li>
              <a href={github} target="_blank" rel="noreferrer" className={linkCls}>
                GitHub ↗
              </a>
            </li>
            {cv && (
              <li>
                <a href={cv} download className={linkCls}>
                  Download CV
                </a>
              </li>
            )}
          </Column>

          <Column title="Get in touch">
            <li>
              <a href={`mailto:${email}`} className={`${linkCls} break-all`}>
                {email}
              </a>
            </li>
            <li className="text-base text-muted">{profile.based}</li>
          </Column>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-x-8 gap-y-4 border-t border-rule pt-6">
          <p className="text-sm text-muted">
            © {year} {profile.name}. Designed and built by me.
          </p>
          <p className="text-sm text-muted">Thanks for reading all the way down.</p>
        </div>
      </div>
    </footer>
  );
}
