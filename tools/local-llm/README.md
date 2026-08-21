# Local LLM catalog tooling

**This directory is a mirror, not the source.** The canonical version of
`New-GgufCatalog.ps1` lives in the apprentiapp repository at
`apprentiapp/tools/local-llm/`. Whenever it changes there, copy the updated
file into this directory before rebuilding this site.

```bash
# from a checkout of apprentiapp, with this repo as a sibling directory:
cp tools/local-llm/New-GgufCatalog.ps1 ../apprenti.dev.github.io/tools/local-llm/New-GgufCatalog.ps1
```

`npm run build` (and `npm run dev`) copies this file into
`public/downloads/New-GgufCatalog.ps1` automatically (see
`scripts/build-skill-packages.mjs`), where it's linked from
`/docs/creator-hosting-local-ai-models`.
