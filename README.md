# apprenti.dev

**Learn by doing. Grow through mentorship.**

apprenti.dev is a free, Git-native, offline-first, AI-assisted apprenticeship app. There's no application backend — a Git repository is the durable, synchronized store, and SQLite is a fast local projection for offline browsing, search, and AI indexing.

🌐 **[apprenti.dev](https://apprenti.dev)**

## What Is apprenti.dev?

apprenti.dev is deliberately **not an LMS**. There's no course catalog, no quiz-and-certificate model, and no backend deciding what "done" means. Two roles share the app:

- **Apprentices** follow a curated path, do real work, and submit evidence for review.
- **Mentors** review submissions, approve or request revisions, and track competency growth from approved work — not self-reported progress.

A companion tool, **apprenti creator** (a VS Code / Cursor / VSCodium extension), lets curriculum authors build and maintain a path visually — writing the exact same Git files the app reads.

The first official path is the **Software Engineering apprenticeship**, but the app itself is curriculum-agnostic: any mentor can fork it or author an entirely new one.

## About This Repo

This repository contains the **apprenti.dev marketing and documentation site**, deployed at [apprenti.dev](https://apprenti.dev).

### Pages

- **Home** — Product overview, how it works, features, and screenshots
- **About** — The idea behind apprenti.dev
- **Docs** — Documentation hub organized by audience
  - For Apprentices — getting started, working through your path, submitting evidence, using AI assistance, search
  - For Mentors — reviewing submissions, mentoring & communication, repository setup, competency growth
  - For Content Creators — curriculum structure, authoring with apprenti creator, AI policy, locale overlays, publishing & forking
  - Privacy Policy & Terms of Use
- **Contact** — GitHub Discussions and Issues

### Tech Stack

- **[Astro](https://astro.build/)** — Static site generation
- **[React](https://react.dev/)** — Interactive UI components
- **[Tailwind CSS](https://tailwindcss.com/)** — Utility-first styling
- **[Framer Motion](https://www.framer.com/motion/)** — Scroll animations and transitions
- **[Radix UI](https://www.radix-ui.com/)** — Accessible component primitives
- **[Lucide Icons](https://lucide.dev/)** — Icon library

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- npm

### Development

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev
```

The site will be available at `http://localhost:4321`.

### Production Build

```bash
npm run build
npm run preview   # preview the production build locally
```

## Deployment

The site is automatically deployed to GitHub Pages via the included GitHub Actions workflow on every push to `main`. The custom domain is set via `public/CNAME`.

## Project Structure

```
/
├── .github/workflows/     # GitHub Pages deployment
├── public/                # Static assets (favicon, CNAME, placeholder screenshots)
├── src/
│   ├── components/        # React & Astro UI components
│   ├── img/               # Brand assets cropped from the apprenti.dev logo sheet
│   ├── layouts/           # Page layouts
│   ├── lib/               # Utility functions
│   ├── pages/             # All site pages and docs
│   │   └── docs/          # Apprentice / Mentor / Content Creator guides, Privacy, Terms
│   └── styles/            # Global CSS (theme tokens)
├── astro.config.js        # Astro configuration
├── tailwind.config.mjs    # Tailwind CSS configuration (apprenti brand palette)
└── package.json
```

## Brand assets

The images under `src/img/brand/` are cropped from the app's master logo sheet (`apprentiapp/branding/apprenti_logos_all_in_one.png`). No individual SVG/PNG brand assets exist yet upstream — see that repo's `docs/branding.md` for the source of truth on colors, wordmark, and imagery. The screenshots under `public/screenshots/mobile/` are placeholders generated for this site and are meant to be replaced with real app screenshots.

## License

The original site template is MIT licensed — see [LICENSE](LICENSE). apprenti.dev's own product, content, and branding are not covered by that template license.
