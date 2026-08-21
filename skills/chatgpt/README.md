# ChatGPT (Custom GPT) — apprenti.dev curriculum author

This one is different from the other packages. Claude Code, Cursor, OpenAI
Codex, OpenCode, and GitHub Copilot all read an instructions file directly out
of your repository, automatically, every session. Plain ChatGPT has no
equivalent — there's no file it discovers on its own. The closest thing is a
**Custom GPT**: a personal, reusable assistant configuration with its own
Instructions field and uploaded Knowledge files, that you set up once and
reuse across sessions.

This is a template for **your own** Custom GPT — nothing here publishes
anything under the apprenti.dev name, and no apprenti.dev-branded GPT is
required to use it.

## Setting it up

1. In ChatGPT, go to **Explore GPTs → Create** (or **My GPTs → Create a GPT**).
2. Give it any name you like (e.g. "My Curriculum Author") and, in the
   **Configure** tab, paste the contents of `INSTRUCTIONS.md` into the
   **Instructions** field.
3. Under **Knowledge**, upload all three files from `knowledge/`:
   `curriculum-json-shapes.md`, `quality-guidelines.md`,
   `validation-checklist.md`.
4. Save. That's it — no restart, no registration step beyond saving the GPT.

If your ChatGPT plan's Instructions field rejects the paste as too long,
trim opportunistically from the end of `INSTRUCTIONS.md` — the three
Knowledge files carry the full detail either way, so nothing is lost, only
how much stays always-in-context versus fetched on demand.

## The one thing that's genuinely different here

This Custom GPT has **no access to your repository** — not your files, not
your Git history, nothing, unless you explicitly upload or paste something
into a chat with it. Every session, you'll need to:

1. Paste or upload the specific file(s) you want it to look at or edit
   (a `task.json`, a `term.json`, whatever's relevant).
2. Ask for the change you want.
3. Copy its response back into your repository yourself, and commit it
   yourself — this GPT can't do either of those things for you.

That's a real workflow cost compared to the repo-native packages, but it
still gets you the same correctness guardrails (the exact JSON shapes,
locale-overlay rules, personal-data boundaries, and pedagogical guidance) in
a tool a lot of people already have open anyway.

## Keeping it up to date

Whenever this package changes upstream, re-paste `INSTRUCTIONS.md` into your
Custom GPT's Instructions field and re-upload the three `knowledge/` files
over the old ones (ChatGPT lets you replace an uploaded Knowledge file with a
new one of the same name). Nothing else about your GPT's configuration needs
to change.
