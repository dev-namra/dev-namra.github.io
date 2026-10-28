import type { Video } from '../data/projects';

/** Walk-through video for a project page. Renders nothing when a project has no video. */
export default function ProjectVideo({ video }: { video?: Video }) {
  if (!video) return null;

  // Works whether the site is served from "/" or a sub-folder (e.g. GitHub Pages).
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const url = (p: string) => (p.startsWith('/') ? `${base}${p}` : p);

  return (
    <figure className="my-10">
      <div className="overflow-hidden rounded-[22px] border border-rule bg-surface shadow-[0_14px_34px_rgba(15,45,46,0.10)]">
        <video
          className="block aspect-video w-full bg-ink/5"
          controls
          playsInline
          preload="metadata"
          poster={url(video.poster)}
          aria-label={video.caption}
        >
          <source src={url(video.src)} type="video/mp4" />
          Your browser can’t play this video.{' '}
          <a href={url(video.src)} className="underline">
            Download it instead
          </a>
          .
        </video>
      </div>
      <figcaption className="mt-3 text-sm text-muted">{video.caption}</figcaption>
    </figure>
  );
}
