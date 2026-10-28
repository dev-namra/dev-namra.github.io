import { profile } from '../data/profile';

const year = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="border-t border-rule">
      <div className="mx-auto container flex flex-wrap items-center justify-between gap-x-8 gap-y-4 px-6 py-6 md:px-10">
        <p className="text-sm text-muted">
          © {year} <span className="font-semibold text-ink">{profile.name}</span> · {profile.based}
        </p>

        <p className="text-sm text-muted">Thanks for reading all the way down.</p>


      </div>
    </footer>
  );
}
