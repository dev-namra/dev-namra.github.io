# Namra Mahak portfolio

A Vite + React + TypeScript + Tailwind portfolio laid out like a drawing set. Sections run in this
order: hero with stats, about, skills, experience, selected work, education and certificates, contact.
Selected work has two series, **BA** (BIM automation) and **AR** (Core architecture). Each project is a
numbered sheet (BA-01) with numbered sub-projects (BA-01.1) and its own case-study page.

## Run it

```bash
npm install
npm run dev      # local site, draft projects visible
npm run build    # type-check, then production build into /dist
npm run preview  # serve the production build
```

On Windows, install Node.js LTS first. If PowerShell blocks `npm`, run
`Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` once, or use `npm.cmd`.

## Edit your content

- `src/data/profile.ts`: tagline, stats, About text, skills, experience, education, certificates, links.
- `src/data/projects.ts`: every project, sub-project, before/after pair and side project.

Text marked `EDIT` is a placeholder or an inference. Check it before you publish. Two to check first:

- The savings figure. The stats use about £15,000 (projected). Your older site says "£19,000+".
- The CV link. Put your PDF in `public/` and set `links.cv` in `profile.ts`. Empty hides the CV buttons.

### Drafts

A project with `draft: true` shows a "Draft" tag in `npm run dev` and is left out of the built site.
Revit API tools is a draft. Fill it in, then delete the `draft: true` line.

### Images

Put files in `public/projects/<project-name>/` and list them in the project's `figures`:

```ts
figures: [
  { src: '/projects/spark-construct/viewer.webp', alt: 'Model viewer open on a tablet', caption: 'Redacted model viewer.' },
],
```

Spark Construct has no screenshots on purpose: the originals show client project names and 3D models.
Add redacted versions when you have them. Convert large PNGs to WebP at about 1400px wide first.

## Deploy

The site uses hash URLs (`/#/project/spark-construct`) and relative asset paths, so the `dist`
folder works on any static host with no server settings: Netlify, Vercel or GitHub Pages.

## Design notes

- Colours: cream ground, near-black ink, yellow accent (`#FFD000`). A dark theme follows the system setting and
  the header toggle overrides it. Change the tokens in `src/index.css` under `@theme`.
- Type: Space Grotesk for everything, Space Mono for the eyebrow, dates and sheet numbers. Both are self-hosted through Fontsource.
- No animation libraries. The hero uses CSS and a few lines of script: the name and headline words rise on load, stats count up, and a yellow cursor light and dot follow the mouse. All of it is switched off for reduced-motion settings, and the light is skipped on touch screens.
