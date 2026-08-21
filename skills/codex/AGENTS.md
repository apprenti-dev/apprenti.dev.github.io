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

**`task.json`** — `id`, `term`, `module`, `title`, `objective`, `whyThisMatters`,
`estimatedHours`, `evidence: []` (a plain array of strings, not a typed object —
each one is guidance you write describing something a mentor can actually open and
inspect: a commit, a specific file, a test run, a resolved conflict — never a claim
only the apprentice could confirm; what's actually submitted today is one evidence
note meant to satisfy every string here, not a form with one field per item),
`acceptanceCriteria: []`, `aiPolicy: {mode, allowedCapabilities[],
solutionGenerationAllowed, disclosureRequired}` (default `solutionGenerationAllowed:
false` and `disclosureRequired: true` unless a task deliberately overrides),
`competencies: []`, `resources: []`, `instructionsFile` (usually
`"instructions.md"` — the long-form Markdown narrative; don't inline long prose into
`task.json` itself).

`aiPolicy.allowedCapabilities` controls exactly four apprentice-facing modes:
`explain`, `hint`, `quiz`, `coach` — default `["explain", "hint", "quiz"]`, so
`coach` is off until added. `solutionGenerationAllowed` is a separate boolean
gating a fifth mode, `solution`, that can produce a complete solution — default
`false`, and only reachable once a conversation is scoped to that task. `review`
and `mentor` are a different, mentor-facing AI surface, always available to
mentors regardless of this policy — never put them in `allowedCapabilities`.

**`term.json`** — `{schemaVersion, id, title, tasks: [id, id, ...]}`. The `tasks`
array's **order** is the academic path — not folder or filename order.

**`curriculum.json`** — also carries `sourceLocale` / `contentLocales` for human
written-language overlays. Never confuse these with a curriculum's own `languages`
field, which lists **programming** languages taught (e.g. Python, C).

**`competencies/{id}.json`** — always exactly five levels, in order: Foundation,
Apprentice, Practitioner, Journeyman, Mastery Evidence. Today the app doesn't
actually read this array to assign a level automatically — it just counts approved
tasks per competency id (one reaches Apprentice, three reach Practitioner). See
"Writing quality content" below for what that means for how you design one.

## Writing quality content, not just valid content

The shapes above get a file past the schema; a competency or task that's valid
JSON can still be pedagogically weak. Before calling one done:

- **Design backward.** Write the competency as a real capability someone either
  has or doesn't ("can resolve a merge conflict without losing work"), then design
  the task to demonstrate it — not the other way around.
- **Write levels with checkable verbs.** "Can complete," "can diagnose," "can
  defend a trade-off," "can teach" — not "understands" or "knows," which no
  mentor can verify.
- **Give a competency at least three tasks somewhere in the path** if you want
  the app's automatic Apprentice/Practitioner signal to mean anything — a
  competency referenced by only one task can never reach Practitioner
  automatically, and probably isn't a real competency, just a note about that
  task.
- **Reuse competency ids across curricula deliberately.** Check the shared
  library before minting a new id for a capability an existing one already
  measures.
- **Make every `evidence` string inspectable**, never a claim — "I did it" is not
  evidence.
- **Make every `acceptanceCriteria` item checkable, not judged** — "no function
  exceeds 40 lines" beats "code is clean," because two mentors can't disagree
  about the former. Pair each criterion with a matching `evidence` string.
- **Prefer evidence of process over a final answer alone** — incremental commit
  history, a note about a specific decision made partway through — since a
  final-answer-only task is the easiest to satisfy with one pasted AI response
  and no understanding.
- **Calibrate difficulty to the task's place in `term.json`'s order** — each task
  should ask for a little more independence than the one before it.
- **Treat the 20-char reflection / 8-char evidence-note minimums as a floor**,
  not a quality target — write task instructions that make a substantive answer
  obvious for that specific task.

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
- No dangling `resources`/`competencies` references.
- Every overlay file's `id` matches its canonical file's `id`.
- No empty-string overlay values (omit the field instead).
- JSON is valid and matches the shapes above.

## Voice for learner-facing text

Calm, professional, developer-oriented. Never call the product an "LMS" or a
"course," and never call an apprentice a "student" or a mentor an "instructor." No
gamification language (points, streaks, badges, game-style leveling — the five
competency levels are an assessment scale, not a game). The product's motto is
"LEARN BY DOING. GROW THROUGH MENTORSHIP." — don't invent alternate slogans.

## Where to point a human for more

- `apprenti.dev/docs` — full docs hub, including "For Content Creators" — the
  "creating quality content for learners" series there (how competencies and
  evidence connect, designing competencies and levels, writing tasks that
  produce real evidence) is what the "Writing quality content" section above is
  condensed from.
- `apprenti.dev/curricula` — the curricula catalog; the reference curriculum at
  `apprenti-dev/software-engineering-base` (54 tasks, 11 terms) is a real, working
  example to study.

---

*This file is one of several equivalent per-tool instruction packages
(`.claude/skills/apprenti-curriculum-author/`, `.cursor/rules/apprenti-curriculum-author.mdc`,
this `AGENTS.md`, and an OpenCode variant) generated from the same source in the
apprentiapp repository's `skills/` directory. If your project already has its own
`AGENTS.md`, merge this content into it rather than overwriting yours — or split it
into a nested `curriculum/AGENTS.md` if you'd rather scope it to that subtree (Codex
loads `AGENTS.md` files from nested directories too).*
