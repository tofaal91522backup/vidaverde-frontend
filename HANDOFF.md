# HANDOFF — where the work stands

> **Both Claude Code and Codex read this file first and update it last.**
> When one tool runs out of tokens, the other reads this and resumes from the
> same place.
>
> This file holds **only the current position**. The full plans live in `docs/plan/`.

---

## 📍 Current position

| | |
|---|---|
| **Active plan** | [docs/plan/ROUND2_INDEX.md](docs/plan/ROUND2_INDEX.md) |
| **Section** | Round 2 → Public (11 of 18 steps overall) |
| **Next step** | **Public Step 4** — teacher_count on pricing cards + checkout restriction error, last step of the section ([ROUND2_PUBLIC_INTEGRATION.md](docs/plan/ROUND2_PUBLIC_INTEGRATION.md)) |
| **Backend commit** | `63c01f5` (see `.claude/api-sync.json`) |
| **Last updated** | 2026-09-12 — Claude |

### What was just done
**Public Step 3 — teacher-first entry.** Teacher profiles now list the packages
that can be bought with that teacher, and every "Book with X" call to action
routes through it.

This also repaired a regression Step 2 introduced: four CTAs still pointed at
`/book?teacher=<id>`, which after the reorder dropped the visitor on the package
screen with their chosen teacher nowhere in sight.

### What the next session does
Open `docs/plan/ROUND2_PUBLIC_INTEGRATION.md` and do **Step 4** — `teacher_count`
on the pricing cards and a readable error when checkout rejects a teacher who is
not allowed on the package. That is the last step of the Public section; after it,
move to `docs/plan/ROUND2_STUDENT_INTEGRATION.md`.

### Needs manual testing before it ships
- **Booking flow (Steps 2-3)** — the largest UI change in Round 2 and entirely
  untested. Walk it end to end from both entry points: package-first from the
  pricing section, and teacher-first from a teacher card. Include a package with
  no availability in the next 7 days, and widening the window to 14 and 21.
- **Auth section** — all of it. Most urgent: `INTEGRATION_TEST.md` Phase J (token
  refresh), and confirming whether `EMAIL_VERIFICATION_REQUIRED` is on or off.

Nothing is half-finished. Working tree clean.

---

## 🔁 Protocol — both tools follow this

### Before starting work
1. **Run `npm run handoff`.** It reports whether this file is still accurate.
   This file is only true up to the commit that last touched it; anything
   committed after that — by the other tool, or by the user by hand after a
   session ran out of tokens — is work this file does not know about. The script
   lists exactly those commits.
2. **If it says STALE**, read those commits (`git diff --stat <sha>..HEAD`)
   before trusting "Next step" below. That step may already be done, or half done.
3. **Read this file** for the current position.
4. Read the active plan file's **Progress Log** table to find the first ⬜ step.

### After finishing a step (never skip this)
1. Mark the plan file's **Progress Log** row ✅ — date, what was done, files touched.
2. **Update the "📍 Current position" block above** — all four rows.
3. Run `npx tsc --noEmit` and confirm it is clean.
4. **Commit.** Message format:
   ```
   round2(<section>): step <N> — <what was done>
   ```
   For example: `round2(auth): step 0 — registration and verify response types`
5. Stop. Wait for the user to say "next" before starting the following step.

### When switching tools
- **Never switch tools with uncommitted work.** The other tool reads `git log` to
  understand what happened; anything uncommitted is invisible to it.
- If you have to stop mid-step: commit what exists with a `wip:` prefix and write
  plainly under "What was just done" above what is half-finished and what is left.

### If a session dies mid-step and the user commits by hand
That is fine and needs no special care. The commit alone does not say where in the
plan the work stopped, but `npm run handoff` will flag this file as stale and name
the commit, so the next session knows to read the diff instead of trusting the
"Next step" row. Nothing is lost — the next session just re-derives the position
from the diff and corrects this file before carrying on.

---

## 📚 Where things are

| What | Where |
|---|---|
| **Coding conventions** (shared by both tools) | [CLAUDE.md](CLAUDE.md) — `AGENTS.md` is a symlink to it |
| Round 2 plans (current work) | [docs/plan/ROUND2_INDEX.md](docs/plan/ROUND2_INDEX.md) |
| Round 1, already done | `docs/plan/{STUDENT,ADMIN,PUBLIC}_API_INTEGRATION.md` |
| Manual test plan | [docs/plan/INTEGRATION_TEST.md](docs/plan/INTEGRATION_TEST.md) |
| API spec (source of truth) | [docs/bruno/](docs/bruno/) |
| API changelogs (the backlog) | [docs/api-changes/](docs/api-changes/) |
| Test credentials | `docs/plan/CREDS.json` |

> The plan files under `docs/plan/` are written in Banglish because the user reads
> them too. This file and `CLAUDE.md` are the machine-facing protocol, so they stay
> in English.

---

## 🚫 Rules for both tools

1. **Never hand-edit `docs/bruno/`.** It is a mirror — every sync wipes and rewrites it.
2. **Do not run a build on every step.** Use `npx tsc --noEmit`. When a real build is
   needed use `npm run build`, **never** `npx dotenv -e .env -- next build` — `.env`
   sets `NODE_ENV=development`, which breaks the build in a way that looks like a
   code bug.
3. **One step at a time.** Do not start the next feature early.
4. **No mock data.** If an endpoint does not exist, do not fake it in the UI — record
   "backend does not have this" in the plan file instead.
5. **Never write to the backend repo.** Read-only, always.
