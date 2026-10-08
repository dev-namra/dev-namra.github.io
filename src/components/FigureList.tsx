import { asset, type Figure } from '../data/projects';

// Shows project images. While running `npm run dev`, an empty list shows a dashed
// frame as a reminder to add images. The built site shows nothing for an empty list.
export default function FigureList({
  figures,
  placeholder = false,
}: {
  figures: Figure[];
  placeholder?: boolean;
}) {
  if (figures.length === 0) {
    if (!placeholder || !import.meta.env.DEV) return null;
    return (
      <div className="grid aspect-[16/9] place-items-center border border-dashed border-graphite text-sm text-graphite">
        Dev only: add images to “figures” in src/data/projects.ts
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {figures.map((fig, i) => (
        <figure key={fig.src}>
          <img
            src={asset(fig.src)}
            alt={fig.alt}
            loading="lazy"
            className="w-full border border-rule"
          />
          <figcaption className="mt-2 text-sm text-graphite">
            <span className="label text-ink">Fig. {i + 1}</span> {fig.caption}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
