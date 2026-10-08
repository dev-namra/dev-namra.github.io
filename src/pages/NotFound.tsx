import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10">
      <h1 className="display text-6xl md:text-8xl">Sheet not found</h1>
      <p className="mt-6 max-w-[40ch] text-xl text-graphite">
        This project doesn’t exist or has been moved. Go back to the full list of work.
      </p>
      <Link
        to="/"
        state={{ scrollTo: 'work' }}
        className="label mt-8 inline-block text-lg underline underline-offset-4"
      >
        All work
      </Link>
    </div>
  );
}
