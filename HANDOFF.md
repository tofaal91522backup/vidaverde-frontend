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
| **Section** | Round 2 — not started |
| **Next step** | **Auth Step 0** — types ([ROUND2_AUTH_INTEGRATION.md](docs/plan/ROUND2_AUTH_INTEGRATION.md)) |
| **Backend commit** | `63c01f5` (see `.claude/api-sync.json`) |
| **Last updated** | 2026-09-12 — Claude |

### What was just done
- Round 1 public marketing integration committed — the site runs entirely on the
  real API, no mocks left.
- Bruno collection synced to backend `63c01f5`.
- Round 2 plans written (`docs/plan/ROUND2_*.md`). **No `src/` code changed for Round 2 yet.**

### What the next session does
Open `docs/plan/ROUND2_AUTH_INTEGRATION.md` and do **Step 0** (types + schema base).
**One step per turn, nothing more.** Wait for the user to say "next" before the step after.

### Known state
Working tree is clean as of the last commit. Nothing half-finished.

---

## 🔁 Protocol — both tools follow this

### Before starting work
1. **Read this file** to find the current position.
2. `git log --oneline -5` — see the last five commits.
3. `git status` — check for uncommitted or half-finished work.
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
