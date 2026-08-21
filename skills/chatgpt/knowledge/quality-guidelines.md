# Writing quality content, not just valid content

`reference/curriculum-json-shapes.md` gets a file past the schema. This file is
about the judgment calls the schema can't make for you — content that's valid JSON
but pedagogically weak still passes validation, so check against this too before
calling a new competency or task done.

## Design backward: capability first, task second

Write the competency as a real-world capability someone either has or doesn't —
"can resolve a merge conflict without losing work," not "completes the Git
module." Only once that's written should you design a task that would actually
demonstrate it. Designing forward from "what's the next task in this module"
tends to produce activities that keep an apprentice busy without pinning down
what they should walk away able to do.

## Write levels that name an observable difference

A weak level description restates the competency at a bigger size ("understands
branching and merging"). A strong one names something a mentor could actually
watch for: "can complete a scoped branching/merging task with limited guidance
and produce evidence of the result." Use verbs that describe an action a mentor
can check — can complete, can diagnose, can defend a trade-off, can teach — never
mental-state verbs like "understands" or "knows," which no mentor can verify.
Each of the five levels (Foundation, Apprentice, Practitioner, Journeyman,
Mastery Evidence) should read as a genuinely different thing a person can be
trusted with, not five sizes of the same sentence.

## Design for the signal the app actually computes

Today, a competency only reaches Apprentice once one approved task references it,
and Practitioner once three do — full mechanics in
`apprenti.dev/docs/mentor-competency-growth`. A competency touched by a single
task will never cross into Practitioner automatically, no matter how good that
task is. If a competency is worth naming, give it at least three tasks somewhere
across the curriculum path. A competency that will only ever be referenced by one
task isn't really a competency — it's a note about that task dressed up as a
capability; either fold it into an existing, recurring competency or don't create
it.

## Reuse competency ids across curricula deliberately

Because `competencies/{id}.json` is a shared library across every curriculum in a
repository, check the existing library before writing a new file when a second
curriculum is added. If it genuinely needs the same capability an existing id
already measures, reference that id — don't create a near-duplicate
(`"git-basics"` alongside `"git"`) that fragments one real skill into two shallow
signals that never individually reach Practitioner. Only mint a new id for an
actually different capability.

## Evidence should be inspectable, never a claim

"I did it" is not evidence — that's the line apprentices see in the app, and it's
the bar to author against. Every `evidence` string should describe something a
mentor can actually open: a commit, a specific file, a test run, a resolved
conflict. If the only way to check an evidence expectation is to ask the
apprentice and take their word for it, rewrite it.

## Acceptance criteria should be checkable, not judged

A criterion a mentor has to form an *opinion* about is one two different mentors
will decide differently on:

- Weak: `"Code is clean and well organized"`
- Checkable: `"No function in the submitted diff exceeds 40 lines"`

Ask, for every criterion: could two mentors reading the same submission disagree
about whether it's met? If yes, rewrite it as a fact instead of a judgment. Keep
every criterion paired with something in `evidence` that would actually let a
mentor check it — a criterion nothing in the evidence list points at is
unverifiable by construction.

## Ask for process, not just a final answer

A task whose only evidence is a finished file or a final answer is the easiest
kind to satisfy with a single pasted AI response and no understanding, and the
hardest for a mentor to tell apart from genuine work afterward. Prefer evidence
that only exists if the work happened over time: commit history showing
incremental progress rather than one commit, a note about a specific decision or
conflict encountered partway through, a reflection answering what was tried and
what's still unclear. This isn't about banning AI — pair it with a deliberate
`aiPolicy` choice on the task — it's about evidence that's hard to fake even when
AI assistance was genuinely used and disclosed.

## Calibrate difficulty to the task's place in the path

A `term.json`'s `tasks` order is the academic path an apprentice actually walks.
Use it deliberately: each task should ask for a little more independence or
ambiguity than the one before it, not repeat the same difficulty under a new
name or jump straight from guided to unguided. Don't leave a term flat-easy until
one disproportionately hard task at the end.

## The app's submission minimums are a floor, not a target

Submission is blocked below a 20-character reflection and an 8-character
evidence note. That floor exists to stop an empty submission, not to define what
a good one looks like — don't write task instructions that would be satisfied by
"did it, works fine." Make the bar for a substantive reflection obvious for that
specific task: what question you actually want answered.
