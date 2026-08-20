# Curriculum JSON shapes

Every durable structured object in an apprenti.dev curriculum carries a permanent,
path-independent identity:

```json
{
  "schemaVersion": 1,
  "id": "stable-id"
}
```

## Repository layout

### Single curriculum (the common case)

```
/
  curriculum.json
  curriculum/
    year-1/
      term-1/
        term.json
        <module>/
          <task-id>/
            task.json
            instructions.md
  resources/
    <resource-id>.json
  competencies/
    <competency-id>.json
  schemas/
    *.schema.json
```

### Several curricula in one repository

```
/
  curricula.json
  curricula/
    software-engineering/
      curriculum.json
      curriculum/...
    data-analytics-ai/
      curriculum.json
      curriculum/...
  resources/          # shared library, referenced by id from any curriculum
  competencies/
  schemas/
```

`resources/{id}.json` and `competencies/{id}.json` live once at the repository root
and are shared by every curriculum in that working copy by id. A nested
`curricula/<slug>/resources/{id}.json` with the same id is an explicit **override**,
not a second library — don't create one by accident.

### Personal overlays (never curriculum content)

```
learners/<learner-id>/   # apprentice's own records: profile, task state,
                          # reflections, evidence, notes, work log, submissions
mentors/<mentor-id>/     # mentor's own records: reviews, mentor notes
```

These live inside the same working copy but are never part of the shareable
curriculum. A curriculum-authoring assistant should never write to them.

## `task.json`

```json
{
  "schemaVersion": 1,
  "id": "y1t1-002",
  "term": "year-1/term-1",
  "module": "foundations",
  "title": "Set up your development environment",
  "objective": "Have a working, reproducible dev environment for the rest of the term.",
  "whyItMatters": "Every later task assumes this environment exists and works.",
  "estimatedHours": 3,
  "evidence": {
    "type": "repository",
    "description": "A commit showing your configured environment and a passing smoke test."
  },
  "acceptanceCriteria": [
    "The smoke test script runs without errors.",
    "The environment is reproducible from a clean checkout."
  ],
  "aiPolicy": {
    "mode": "guided",
    "allowedCapabilities": ["explain", "hint", "quiz"],
    "solutionGenerationAllowed": false,
    "disclosureRequired": true
  },
  "competencies": ["dev-environment-setup"],
  "resources": ["intro-to-toolchains"],
  "instructionsFile": "instructions.md"
}
```

Notes:

- `id` is permanent. It does not encode the task's current term/module — `term` and
  `module` fields carry that, and can change independently of `id`.
- `evidence.type` is one of: `repository`, `commit`, `tag`, `url`, `markdown`,
  `file_reference`, `screenshot_reference`, `test_result`, `benchmark`, `demo`,
  `other`. Pick whichever a mentor can actually open and inspect — never something
  that only proves a claim was made.
- `aiPolicy.allowedCapabilities` controls exactly four apprentice-facing task-detail
  modes: `explain`, `hint`, `quiz`, `coach`. Omit one and it shows as *disabled*, not
  hidden, in the app, so omission is a deliberate authoring choice, not an oversight.
  Unspecified defaults to `["explain", "hint", "quiz"]` — `coach` is off until a task
  adds it. `review` and `mentor` are a *different*, mentor-facing AI surface (pre-review
  and the mentor-packet assistant) that is always available to mentors regardless of
  this list — don't put them in `allowedCapabilities`, they aren't apprentice modes.
- `aiPolicy.solutionGenerationAllowed` is a separate boolean, not part of
  `allowedCapabilities` — it gates the fifth, most powerful mode (`solution`, which
  can produce a complete solution) and should default to `false`. Only set it `true`
  for a task where walking through a generated solution is itself the point. Even when
  `true`, solution generation only ever runs once a conversation is explicitly scoped
  to that task, never in the general curriculum-wide chat.
- `aiPolicy.disclosureRequired` should default to `true` — turn it off deliberately
  per task, never globally.
- `instructions.md` (referenced by `instructionsFile`) holds the long-form narrative
  instructions in Markdown — don't inline long prose into `task.json` itself.

## `term.json`

```json
{
  "schemaVersion": 1,
  "id": "year-1/term-1",
  "title": "Term 1 — Foundations",
  "tasks": ["y1t1-001", "y1t1-002", "y1t1-003"]
}
```

The `tasks` array's **order** is what the app treats as the academic path — not
folder sort order, not filename order. Reordering a term means editing this array,
not renaming folders.

## `curriculum.json` / `curricula.json`

```json
{
  "schemaVersion": 1,
  "id": "software-engineering",
  "title": "Software Engineering apprenticeship",
  "description": "A Git-native path from first principles to independent, reviewed work.",
  "sourceLocale": "en",
  "contentLocales": ["en", "tr"]
}
```

`sourceLocale` and `contentLocales` are about **human** written language for content
overlays (see below) — never reuse a curriculum's own `languages` field (which lists
**programming** languages the curriculum teaches, e.g. Python, C) for this purpose.

## `resources/{id}.json`

```json
{
  "schemaVersion": 1,
  "id": "intro-to-toolchains",
  "title": "Introduction to build toolchains",
  "kind": "article",
  "url": "https://example.com/toolchains",
  "description": "A short primer on what a toolchain is and why reproducibility matters."
}
```

## `competencies/{id}.json`

```json
{
  "schemaVersion": 1,
  "id": "dev-environment-setup",
  "title": "Development environment setup",
  "description": "Can configure a reproducible development environment from scratch.",
  "levels": [
    { "level": 1, "name": "Foundation", "description": "..." },
    { "level": 2, "name": "Apprentice", "description": "..." },
    { "level": 3, "name": "Practitioner", "description": "..." },
    { "level": 4, "name": "Journeyman", "description": "..." },
    { "level": 5, "name": "Mastery Evidence", "description": "..." }
  ]
}
```

The five official levels are always Foundation → Apprentice → Practitioner →
Journeyman → Mastery Evidence, in that order. Custom level counts are technically
allowed by schema, but the app's competency engine assumes exactly five — don't
diverge without calling it out explicitly.

## Locale overlays

A curriculum can ship in more than one written language without duplicating its
whole content tree. The source language stays canonical; every other language is a
sibling **overlay** file, never a parallel folder.

### Content locale is not the app's UI language

These are two independent settings — never conflate them:

- **Appearance language** — the app's own chrome (buttons, nav, labels). Set once,
  applies everywhere, has nothing to do with curriculum content.
- **Content locale** — which language a curriculum's *content* (titles, term
  headings, instructions) displays in. Chosen **per bound curriculum**, on the
  curriculum picker, from that manifest's `contentLocales` (plus `sourceLocale`).

When an apprentice first attaches a curriculum, its content locale seeds from the
current Appearance language *if* that language code is one of the curriculum's
offered `contentLocales` — otherwise it falls back to `sourceLocale`. After that
initial seed, the two settings are fully decoupled: changing Appearance later does
**not** reload Path or re-resolve content into a different language. A curriculum
author should never assume "the UI is in Turkish" implies "this apprentice wants
Turkish task content," or the reverse.

### The pattern

For any canonical file `{stem}.{ext}`, an overlay for locale `tr` is
`{stem}.tr.{ext}`, sitting right next to it:

```
curriculum.json
curriculum.tr.json
curriculum/year-1/term-1/term.json
curriculum/year-1/term-1/term.tr.json
curriculum/.../y1t1-002/task.json
curriculum/.../y1t1-002/task.tr.json
curriculum/.../y1t1-002/instructions.md
curriculum/.../y1t1-002/instructions.tr.md
```

`instructions.{locale}.md` is used if present, else the canonical `instructions.md`
— an overlay's `task.json` must never retarget `instructionsFile` to point somewhere
else.

Never copy `curriculum/` into parallel `en/`/`tr/` trees, and never rename the
canonical file to `*.en.*` — both break the overlay model and duplicate every id.
Locale codes used in file names must be a short language code (`tr`, not `tr-TR`;
pattern `[a-z]{2,8}`) — never a path segment containing `..`, `/`, or `\`.

### What can and cannot be overlaid

Overlay files are sparse — only translatable fields need to be present. Typical
overlay content: titles, objectives, "why this matters," evidence descriptions,
acceptance criteria.

**Never overlay:** `id`, `schemaVersion`, `term`, `module`, `estimatedHours`,
competency/resource **ids**, `aiPolicy`, `instructionsFile`, `statusModel`, any
folder path, or a URL — *unless* the overlay is deliberately supplying a localized
resource URL (a translated article at a different address, say). These are identity
and structure, not prose.

An overlay whose `id` doesn't match the canonical file's `id` is ignored by the app —
treat that as an authoring error to fix, not a feature. Never translate a folder
slug (e.g. `year-1/term-1` stays exactly that in every locale).

### Fallback

At read time: a present, non-empty overlay field wins; otherwise the canonical value
is used. A missing overlay file is not an error. For list fields (`evidence`,
`acceptanceCriteria`), there is no item-by-item merge — a present, non-empty overlay
list **replaces the whole list**; there's no partial overlay of individual list
items.

Search indexes both the resolved (locale-aware) title/instructions and the
**source** English title, so a search never goes blind just because content-locale
switched.

### Voice note for translations

Keep Git terminology (`commit`, `branch`, `merge`, `rebase`, `clone`, `pull`,
`push`, `fork`, `working tree`) in English regardless of target language. Keep task
ids, commands, code fences, and file names untouched. Never write an empty string
as a placeholder overlay value — omit the field from the overlay entirely instead.
