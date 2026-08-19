# apprenti.dev curriculum author — agent instructions

This repository is (or contains) an **apprenti.dev curriculum**: a Git-native,
offline-first apprenticeship path made of JSON (structure) and Markdown (narrative)
files, read directly by the apprenti.dev app — not a database. These instructions
govern how to create and edit curriculum content correctly. They are not about
editing the apprenti.dev app itself, and they never apply to personal
apprentice/mentor data.

## Hard boundaries — never violate these

- **Never create, edit, or delete anything under `learners/<id>/` or `mentors/<id>/`.**
  Those are personal, pair-owned records (profile, reflections, submissions, reviews)
  — not curriculum content. If asked to touch them, stop and explain why.
- **Never invent an `id` from a file path.** Every task, resource, and competency has
  a permanent `id` independent of where it lives; a task can move between modules or
  terms without its `id` ever changing.
- **Never duplicate a `resources/{id}.json` or `competencies/{id}.json`** that already
  exists at the repository root into a per-curriculum folder — a nested copy with the
  same id is an explicit override, not a new resource.
- **Never fork `curriculum/` into parallel `en/`/`tr/` trees**, and never rename a
  canonical file to `*.en.*`. Locales are sibling overlay files, not folder copies.
- **Never commit, push, or publish on your own initiative.** Editing files is fine;
  deciding something is ready to commit or share is a human decision.

## Repository shapes

Single curriculum: root `curriculum.json` + `curriculum/year-1/term-1/term.json` +
`curriculum/.../<task-id>/{task.json,instructions.md}`. Multiple curricula in one
repo: root `curricula.json` + `curricula/<slug>/curriculum.json` each. Either way,
`resources/`, `competencies/`, and `schemas/` live once at the repository root,
shared by id across every curriculum in that working copy.

## Core JSON shapes

Every durable object carries `{"schemaVersion": 1, "id": "stable-id"}`.

**`task.json`** — `id`, `term`, `module`, `title`, `objective`, `whyItMatters`,
`estimatedHours`, `evidence: {type, description}` (type is one of `repository`,
`commit`, `tag`, `url`, `markdown`, `file_reference`, `screenshot_reference`,
`test_result`, `benchmark`, `demo`, `other` — pick something a mentor can actually
open and inspect), `acceptanceCriteria: []`, `aiPolicy: {mode, allowedCapabilities[],
solutionGenerationAllowed, disclosureRequired}` (default `solutionGenerationAllowed:
false` and `disclosureRequired: true` unless a task deliberately overrides),
`competencies: []`, `resources: []`, `instructionsFile` (usually
`"instructions.md"` — the long-form Markdown narrative; don't inline long prose into
`task.json` itself).

**`term.json`** — `{schemaVersion, id, title, tasks: [id, id, ...]}`. The `tasks`
array's **order** is the academic path — not folder or filename order.

**`curriculum.json`** — also carries `sourceLocale` / `contentLocales` for human
written-language overlays. Never confuse these with a curriculum's own `languages`
field, which lists **programming** languages taught (e.g. Python, C).

**`competencies/{id}.json`** — always exactly five levels, in order: Foundation,
Apprentice, Practitioner, Journeyman, Mastery Evidence.

## Locale overlays

**Content locale is not the app's UI language.** Appearance language is chrome
only. A curriculum's content locale — which language its task/term/curriculum
prose displays in — is a separate, per-curriculum choice made on the curriculum
picker, from that manifest's `contentLocales`/`sourceLocale`. It only seeds from
the current Appearance language on first attach (and only if that language is
offered); after that, the two settings are fully decoupled — changing Appearance
later never reloads or re-resolves curriculum content into a different language.
Never assume a UI language implies anything about content-locale preference.

For canonical file `{stem}.{ext}`, a `tr` overlay is `{stem}.tr.{ext}` sitting right
next to it (`task.json` + `task.tr.json`, `instructions.md` + `instructions.tr.md`).
`instructions.{locale}.md` is used if present, else the canonical file — an overlay
must never retarget `instructionsFile`. Overlay files are sparse — only translatable
prose fields.

**Never overlay:** `id`, `schemaVersion`, `term`, `module`, `estimatedHours`,
competency/resource ids, `aiPolicy`, `instructionsFile`, `statusModel`, any folder
path, or a URL — unless the overlay is deliberately supplying a localized resource
URL. These are identity and structure, canonical-only. Never translate a folder
slug (e.g. `year-1/term-1` stays exactly that in every locale).

An overlay whose `id` doesn't match its canonical file's `id` is silently ignored by
the app — treat that as an authoring bug, not a feature. Locale codes in file names
must be a short language code (`[a-z]{2,8}`, e.g. `tr`, not `tr-TR`) — never a path
segment containing `..`, `/`, or `\`.

Fallback at read time: a present, non-empty overlay field wins; otherwise the
canonical value is used. A missing overlay file is not an error. List fields
(`evidence`, `acceptanceCriteria`) are replaced wholesale by a present, non-empty
overlay list — there is no item-by-item merge. Search indexes both the resolved
title/instructions and the source English title, so switching content locale never
makes search go blind.

In translations, keep Git terminology (`commit`, `branch`, `merge`, `rebase`,
`clone`, `pull`, `push`, `fork`, `working tree`) in English, and never write an
empty string as a placeholder — omit the field from the overlay instead.

## Validation checklist — run before presenting any change as finished

- No two objects share the same `id`.
- Every task id in a `term.json` has a matching folder on disk (no ghost entries).
- Every task folder on disk is listed in some `term.json` (no orphan folders).

---

*This file is one of several equivalent per-tool instruction packages
(`.claude/skills/apprenti-curriculum-author/`, `.cursor/rules/apprenti-curriculum-author.mdc`,
an OpenAI Codex `AGENTS.md`, and this OpenCode variant) generated from the same
source in the apprentiapp repository's `skills/` directory. OpenCode reads
`AGENTS.md` the same way Codex does — if your project already has its own
`AGENTS.md`, merge this content into it rather than overwriting yours. You can also
register additional instruction files (without touching your main `AGENTS.md`) via
the `instructions` array in `opencode.json` or `~/.config/opencode/opencode.json`,
or regenerate project guidance any time with the `/init` command.*
