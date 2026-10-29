import type { MouseEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { profile } from '../data/profile';
import { scrollToId } from '../lib/scroll';
import ThemeToggle from './ThemeToggle';

const items = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'work', label: 'Work' },
  { id: 'contact', label: 'Contact' },
];

export default function Header() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { cv } = profile.links;

  const go = (id: string) => (e: MouseEvent) => {
    e.preventDefault();
    if (pathname === '/') scrollToId(id);
    else navigate('/', { state: { scrollTo: id } });
  };

  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-paper/85 backdrop-blur">
      <div className="mx-auto flex container items-center justify-between gap-4 px-6 py-3 md:px-10">
        <Link to="/" aria-label={`${profile.name}, home`} className="logo">
          {profile.initials}
        </Link>
        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex gap-8">
            {items.map((item) => (
              <li key={item.id}>
                <a
                  href="#/"
                  onClick={go(item.id)}
                  className="text-lg text-graphite underline-offset-4 transition-colors hover:text-teal hover:underline"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          {cv ? (
            <a href={cv} className="pill btn-solid" download>
              Download CV
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M8 2v9M4 7.5l4 4 4-4M3 14h10" />
              </svg>
            </a>
          ) : (
            <a href="#/" onClick={go('contact')} className="pill btn-solid">
              Get in touch
            </a>
          )}
        </div>
      </div>
      {/* Phone navigation: the same links in a scrolling row, so no menu is needed. */}
      <nav aria-label="Main, small screens" className="border-t border-rule md:hidden">
        <ul className="flex gap-5 overflow-x-auto px-6 py-2">
          {items.map((item) => (
            <li key={item.id} className="shrink-0">
              <a href="#/" onClick={go(item.id)} className="text-[0.95rem] text-graphite">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
