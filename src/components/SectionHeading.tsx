import type { ReactNode } from 'react';

// One heading style for every top-level section, so they read as a set.
export default function SectionHeading({
  id,
  children,
  intro,
}: {
  id: string;
  children: ReactNode;
  intro?: string;
}) {
  return (
    <div>
      <h2 id={id} className="display text-5xl md:text-7xl">
        {children}
      </h2>
      {intro && <p className="mt-4 max-w-[48ch] text-lg leading-[1.6] text-graphite">{intro}</p>}
    </div>
  );
}
