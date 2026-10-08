import { profile } from '../data/profile';

export default function Footer() {
  return (
    <footer className="border-t-[3px] border-ink">
      <div className="mx-auto flex max-w-[1400px] flex-wrap items-baseline justify-between gap-x-8 gap-y-3 px-6 py-6 md:px-10">
        <a
          href="#/"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0 });
          }}
          className="label text-lg underline-offset-4 hover:underline"
        >
          Back to top
        </a>
        <p className="text-sm text-graphite">
          {profile.name}, {profile.based}
        </p>
        <p className="text-sm text-graphite">Thanks for reading all the way down.</p>
      </div>
    </footer>
  );
}
