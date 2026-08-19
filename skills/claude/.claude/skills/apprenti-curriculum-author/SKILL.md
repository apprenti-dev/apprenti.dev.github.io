---
name: apprenti-curriculum-author
description: Author and edit apprenti.dev curriculum content correctly — tasks, terms, resources, competencies, and locale overlays in the Git-native JSON+Markdown format. Use whenever creating or editing files inside an apprenti.dev curriculum repository (a repo containing curriculum.json or curricula.json), or when asked to write a task, term, resource, competency, or translation for one.
---

# apprenti.dev curriculum author

apprenti.dev is a Git-native, offline-first apprenticeship app. A "curriculum" is not
a database — it's a folder of JSON (structure) and Markdown (narrative) files in a Git
repository, read directly by the app. This skill helps you create and edit those files
correctly. It is **not** for editing the Flutter app itself, and it never touches
personal apprentice/mentor data.

Load `reference/curriculum-json-shapes.md` before writing or editing any `task.json`,
`term.json`, `curriculum.json`/`curricula.json`, `resources/*.json`, or
`competencies/*.json` file, or any locale overlay of one — it has the exact field
shapes and worked examples. Load `reference/validation-checklist.md` before presenting
any change as finished — run every item on it first.

## Hard boundaries — never violate these

- **Never create, edit, or delete anything under `learners/<id>/` or `mentors/<id>/`.**
  Those are personal, pair-owned records (profile, reflections, submissions, reviews) —
  not curriculum content. If asked to touch them, stop and explain why you won't.
- **Never invent an `id` from a file path.** Every task, resource, and competency has
  a permanent `id` that is independent of where it lives. A task can move between
  modules or terms without its `id` ever changing.
- **Never duplicate a `resources/{id}.json` or `competencies/{id}.json`** that already
  exists at the repository root into a per-curriculum folder just to "keep things
  together." A nested copy with the same id is an explicit **override**, not a new
  resource — only create one if you're deliberately overriding, and say so.
- **Never fork `curriculum/` into parallel `en/`/`tr/` trees**, and never rename a
  canonical file to `*.en.*`. Locales are sibling overlay files
  (`instructions.md` + `instructions.tr.md`), not folder copies — see the locale
  section in the reference file.
- **Never assume the app's UI language tells you what content locale an apprentice
  wants.** Content locale is a separate, per-curriculum choice, decoupled from
  Appearance after the first attach — see the reference file.
- **Never commit, push, or publish anything on your own initiative.** Editing files is
  fine; deciding when something is "ready to commit" or "ready to share" is a human
  decision. If you think a change is publish-ready, say so — don't act on it.

## Repository shapes

A repository holds either one curriculum (root `curriculum.json` + `curriculum/`) or
several side by side (root `curricula.json` + `curricula/<slug>/curriculum.json` each).
Either way, `resources/`, `competencies/`, and `schemas/` live once at the repository
root and are shared by id across every curriculum in that working copy — see the
reference file for the full tree.

## Voice for any learner-facing text you write

Task titles, objectives, "why this matters" copy, and resource descriptions should be
calm, professional, and developer-oriented:

- Never call the product an "LMS" or a "course," and never call an apprentice a
  "student" or a mentor an "instructor."
- No gamification language — no points, streaks, badges, or "levels" framed as a game
  mechanic (the five competency levels — Foundation, Apprentice, Practitioner,
  Journeyman, Mastery Evidence — are an assessment scale, not a game).
- The product's motto is "LEARN BY DOING. GROW THROUGH MENTORSHIP." Don't invent
  alternate slogans in generated content.

## Where to point a human for more

- `apprenti.dev/docs` — the full docs hub, including a "For Content Creators" section
  covering curriculum structure, authoring with apprenti creator, AI policy, locale
  overlays, and publishing/forking.
- `apprenti.dev/curricula` — the curricula catalog, currently listing the reference
  curriculum at `apprenti-dev/software-engineering-base` (54 tasks, 11 terms) as a
  real, working example to study.
