# AI skill packages for curriculum authoring

**This directory is a mirror, not the source.** The canonical version of these
packages lives in the apprentiapp repository at `apprentiapp/skills/` — since that's
where the curriculum format itself is defined and versioned. Whenever the format
changes there, copy the updated files into this directory (same relative layout)
before rebuilding this site.

```bash
# from a checkout of apprentiapp, with this repo as a sibling directory:
rm -rf ../apprenti.dev.github.io/skills
cp -r skills ../apprenti.dev.github.io/skills
# then restore this file, since it's website-specific:
git -C ../apprenti.dev.github.io checkout -- skills/README.md
```

## What this becomes on the website

`npm run build` (and `npm run dev`) first runs `scripts/build-skill-packages.mjs`,
which zips each tool's folder here into a downloadable package under
`public/downloads/`:

| Source folder | Downloadable package |
|---|---|
| `skills/claude/` | `public/downloads/apprenti-skill-claude.zip` |
| `skills/cursor/` | `public/downloads/apprenti-skill-cursor.zip` |
| `skills/codex/` | `public/downloads/apprenti-skill-codex.zip` |
| `skills/opencode/` | `public/downloads/apprenti-skill-opencode.zip` |

Each folder's contents unzip directly into a content creator's curriculum
repository at the paths shown — e.g. `skills/claude/.claude/skills/...` unzips to
`.claude/skills/...` in their project.

These packages are presented to visitors on `/skills` (the product page) and
documented in depth at `/docs/creator-ai-skill-packages`.
