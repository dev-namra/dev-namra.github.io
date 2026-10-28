import { asset, type Pdf } from '../data/projects';

/** Shows a project's PDF on the page, or a "coming soon" card when it isn't ready yet. */
export default function ProjectPdf({
  pdf,
  comingSoon,
}: {
  pdf?: Pdf;
  comingSoon?: boolean;
}) {
  if (comingSoon) {
    return (
      <section
        aria-label="Coming soon"
        className="my-10 grid place-items-center rounded-[22px] border border-dashed border-teal/60 bg-surface px-6 py-20 text-center"
      >
        <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-on-accent">
          Coming soon
        </span>
        <p className="display mt-5 text-[clamp(1.75rem,4vw,2.75rem)]">This portfolio is on its way.</p>
        <p className="mt-3 max-w-[40ch] text-base leading-relaxed text-muted">
          I’m putting the drawings and design work together. Check back soon, or get in touch and I’ll send it to you.
        </p>
      </section>
    );
  }

  if (!pdf) return null;
  const url = asset(pdf.src);

  return (
    <section aria-label={pdf.title} className="my-10">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-semibold tracking-[-0.02em]">{pdf.title}</h2>
        <div className="flex flex-wrap gap-2">
          <a href={url} target="_blank" rel="noopener noreferrer" className="ghost">
            Open in new tab
          </a>
          <a href={url} download className="ghost">
            Download PDF
          </a>
        </div>
      </div>

      <div className="overflow-hidden rounded-[22px] border border-rule bg-surface shadow-[0_14px_34px_rgba(15,45,46,0.10)]">
        <iframe
          title={pdf.title}
          src={`${url}#view=FitH`}
          className="block h-[75vh] min-h-[28rem] w-full"
          loading="lazy"
        />
      </div>
      <p className="mt-3 text-sm text-muted">
        Can’t see the PDF? Use “Open in new tab”. Some phone browsers show only the first page here.
      </p>
    </section>
  );
}
