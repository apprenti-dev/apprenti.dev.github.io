# Validation checklist

Run through every item below before presenting curriculum changes as finished. Fix
what you can; flag what you can't verify from the files you can see.

## Identity

- [ ] No two objects (tasks, resources, competencies, terms) share the same `id`.
- [ ] No `id` was derived from a file path or folder name — check it was written
      deliberately and is stable if the file moves.
- [ ] Every `schemaVersion` is present and an integer.

## Structural integrity

- [ ] Every task id listed in a `term.json`'s `tasks` array has a matching task
      folder on disk (no **ghost** entries — an id with nothing behind it).
- [ ] Every task folder on disk is listed in some `term.json` (no **orphan**
      folders — a task nothing points to).
- [ ] Every `competencies` / `resources` reference on a task resolves to a real
      file in `competencies/` or `resources/` (no dangling references).
- [ ] If this repository uses the multi-curriculum layout, a nested
      `curricula/<slug>/resources/{id}.json` or `.../competencies/{id}.json` is only
      present where an override was intended — not an accidental duplicate of a
      root-level file with the same id.

## Locale overlays (if any exist)

- [ ] Every overlay file's `id` matches its canonical file's `id` exactly.
- [ ] No overlay file sets `id`, `schemaVersion`, `term`, `module`,
      `estimatedHours`, a competency/resource id, `aiPolicy`, `instructionsFile`,
      `statusModel`, a folder path, or a URL (unless deliberately localizing a
      resource URL) — those are canonical-only fields.
- [ ] No overlay field is an empty string — if there's nothing to translate yet,
      the field is omitted from the overlay file entirely.
- [ ] No `curriculum/` content was copied into a parallel `en/`/`tr/` folder tree.
- [ ] Locale codes in file names are short language codes only (`[a-z]{2,8}`,
      e.g. `tr`, not `tr-TR`) — never a path segment with `..`, `/`, or `\`.
- [ ] No folder slug was translated (e.g. `year-1/term-1` stays as-is in every
      locale).
- [ ] Overlaid list fields (`evidence`, `acceptanceCriteria`) replace the whole
      list, not individual items — nothing was partially merged item-by-item.
- [ ] Nothing in this change assumes the app's UI/Appearance language implies a
      particular content locale — those are independent settings.

## Quality (see `quality-guidelines.md` for the reasoning behind each)

- [ ] Every `acceptanceCriteria` item is a fact a mentor can check without forming
      a subjective opinion — not "clean code," but something checkable.
- [ ] Every `acceptanceCriteria` item has a matching `evidence` expectation that
      would actually let a mentor verify it.
- [ ] Every `evidence` item describes something inspectable (a commit, a file, a
      test run) — never a claim only the apprentice could confirm.
- [ ] A competency introduced or newly referenced by this change is reachable by
      at least three tasks somewhere in the curriculum path — or that's flagged
      explicitly as a deliberate exception, not an oversight.
- [ ] A new competency's level descriptions use checkable verbs (can complete,
      can diagnose, can defend, can teach), not mental-state verbs (understands,
      knows).

## AI policy

- [ ] Every `task.json` has an `aiPolicy` block.
- [ ] `solutionGenerationAllowed` is `false` unless there's a deliberate, stated
      reason for a specific task to allow it.
- [ ] `disclosureRequired` is `true` unless there's a deliberate, stated reason to
      turn it off for a specific task.

## Voice

- [ ] Learner-facing text doesn't say "LMS," "course," "student," or "instructor."
- [ ] No gamification language (points, streaks, badges, game-style "leveling up").
- [ ] No invented alternate slogan in place of "LEARN BY DOING. GROW THROUGH
      MENTORSHIP."

## Personal data

- [ ] Nothing was created, edited, or deleted under `learners/<id>/` or
      `mentors/<id>/`.
