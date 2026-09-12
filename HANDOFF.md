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
| **Section** | ✅ Round 2 complete — all 18 steps |
| **Next step** | **Manual testing** — no code left to write. Order and checklist below |
| **Backend commit** | `63c01f5` (see `.claude/api-sync.json`) |
| **Last updated** | 2026-09-12 — Claude |

### What was just done
**Admin Step 2 — restriction column. Round 2 is complete, all 18 steps.**

Round 2 covered backend `f7ccf8b` -> `63c01f5`:
- **Auth (7)** — student registration, email verification, resend, and a token
  refresh that had never actually run.
- **Public (5)** — booking reordered to package-first, teacher-first entry.
- **Student (3)** — teacher pickers restricted to what the package allows.
- **Admin (3)** — the UI to restrict a package in the first place.

### What the next session does
**Do not start new features.** Nothing in Round 2 has been run in a browser, and
the Public booking flow in particular was rewritten end to end. Test it, in this
order, since each unblocks the next:

1. **Admin** — restrict a package to one or two teachers and save, then reopen it
   and confirm the selection stuck. Everything below needs a restricted package
   to exist; there are none in the seed data.
2. **Public booking** — the largest change in Round 2. Walk it from both entry
   points (a pricing card, and a teacher card), including a package with no
   availability in the next 7 days and widening the window to 14 and 21. Check
   the restricted package offers only its own teachers.
3. **Student** — book-class from the sidebar and from the My Packages "Book a
   class" shortcut (which passes `?package=`), plus reschedule. Confirm both
   pickers respect the restriction.
4. **Auth** — registration, verification and resend. **Phase J (token refresh)
   is blocked**: with a 30-day access token it cannot be triggered, and with a
   30-day refresh token it could not succeed anyway. It needs the backend setting
   changed first (see below).

### Answered from the backend source (2026-09-12)

- **`EMAIL_VERIFICATION_REQUIRED` is `True` by default** (`server/.env.example`,
  `AGENTS.md`), so the verify-email path is the live one. Note that only
  registration creates an `EmailAddress` row — seeded users and guest-checkout
  students count as verified, so the verify flow cannot be tested with an old
  account.
- **Teachers have no slug.** Only the Blog model has one, so teacher URLs stay
  UUID-based unless the backend adds a field.
- **Seed data restricts no packages**, confirming Admin Step 1 is the only way to
  create a restricted one.

### One thing the backend developer needs to change

**`ACCESS_TOKEN_LIFETIME` is 30 days and `REFRESH_TOKEN_LIFETIME` is also 30
days, with `ROTATE_REFRESH_TOKENS` off** (`server/server/settings.py`). Both
tokens are issued at login and expire together, so a refresh can never succeed:
by the time the access token is rejected, the refresh token is dead too. Our
session cookie expires at 15 days anyway, so the path is never even reached.

The Step 5 fix is correct and the interceptor bug it fixed was real, but the code
cannot run under these settings, and Phase J cannot be tested. A refresh token is
only meaningful with a short access token — typically 15-60 minutes for access
and 30 days for refresh.

### Still open, not answerable from the repo

- The 20-class price. The seed still carries `"250.00"` with an `UNRESOLVED`
  comment: the spec says $250.00, the copy deck says $254.64. A product decision.
- **`upload.bru` is wrong.** It documents `url` and `size`; the API returns
  `stored_path` and `compression_started`, because `server/utils/upload.py`
  spreads the external transfer service's JSON verbatim. A doc fix, not a
  question.

### When the testing is done
Run the api-sync skill to see whether the backend has moved on again. The
changelogs in `docs/api-changes/` are the backlog.

### Known gaps going into testing

These are real and worth knowing before you start, so a known gap is not mistaken
for a new bug:

1. **No `middleware.ts` and no route guards.** A signed-out visitor can open
   `/dashboard/admin`, and a student can open the admin dashboard. Carried over
   from Round 1, out of Round 2's scope, never fixed.
2. **Phase J (token refresh) cannot run** until the backend shortens
   `ACCESS_TOKEN_LIFETIME`. See above.
3. **Four eslint errors remain**, all pre-existing and untouched:
   `ui/carousel.tsx`, `ui/sidebar.tsx`, `hooks/use-mobile.ts`,
   `shared/form-related/multi-step-form-wrapper.tsx` — shadcn-generated or
   unused. The build passes; these are lint-only.
4. **`/public/teachers/:id/slots/` is no longer called anywhere.** The
   package-teachers endpoint returns the same slots, so it was superseded rather
   than dropped. Not a regression; noted so its absence is not read as one.
5. **The 20-class price is still unresolved** ($250.00 vs $254.64).

Verified before handing over: `npm run build` passes, 49/49 static pages;
`npx tsc --noEmit` clean; eslint clean apart from the four above.

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
