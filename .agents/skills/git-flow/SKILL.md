---
name: git-flow
description: Stage, commit, and optionally push this repo using the project's three keyword shortcuts. Use whenever the user says "claude:commit" (stage + commit only), "claude:push" (stage + commit + push, no deploy), or "claude:deploy" (stage + commit with the 2devs:deploy tag + push, which triggers the VPS deploy workflow). Also use when the user asks to commit/push/deploy this project without naming a keyword.
allowed-tools: Bash, Read, Grep, Glob
---

# git-flow — commit / push / deploy shortcuts

Three keywords, three amounts of work. Everything else about them is identical.

| Keyword | `git add .` | commit | `2devs:deploy` in message | push |
|---|---|---|---|---|
| `claude:commit` | yes | yes | no | **no** |
| `claude:push` | yes | yes | no | yes |
| `claude:deploy` | yes | yes | **yes** | yes |

`2devs:deploy` is not decoration — `.github/workflows/deploy.yaml` runs only when the
pushed commit message contains that string, and it builds and ships to the VPS. So it
goes in on `claude:deploy` and **never** on the other two.

If the user names no keyword, ask which of the three they want rather than guessing —
the difference between them is a production deploy.

## Steps

1. **Stage everything:** `git add .` from the client root.

2. **Look at what that staged** — `git status --short` and `git diff --cached --stat`.
   This is a real review step, not a formality:
   - If a file looks like it carries secrets (`.env*`, `*.pem`, `*.key`, credentials,
     tokens, dumps) **read it before continuing** and tell the user rather than
     committing it. A harmless-looking filename is not proof.
   - If something obviously unrelated got swept in (stray `res.json`, scratch scripts,
     editor files, build output), say so and ask before including it.
   - Nothing staged? Say so and stop — do not create an empty commit.

3. **Write the message from the actual diff**, not from memory of the conversation.
   Read the staged changes if the stat alone doesn't tell you what changed.

   Repo convention (see `git log`):
   - One short lowercase imperative summary line — what changed, not what files moved.
   - For `claude:deploy`, append ` 2devs:deploy` to that summary line.
   - Add a body paragraph when the change needs context; skip it for small ones.
   - No `Co-Authored-By` trailer and no other Claude/AI attribution line — the commit
     message ends with the summary (and body, if any).

   Use the **Bash** tool with a heredoc for multi-line messages — PowerShell here-strings
   do not work for this:
   ```bash
   git commit -m "$(cat <<'EOF'
   summary line here 2devs:deploy

   Optional body.
   EOF
   )"
   ```

4. **Push** (`claude:push` and `claude:deploy` only): `git push origin main`.
   - Never `--force`, and never `--no-verify` / `--no-gpg-sign`.
   - If a hook fails, fix the cause or report it — do not bypass it.
   - If the push is rejected as non-fast-forward, stop and tell the user; do not
     auto-pull/rebase over their work.

5. **Report back**: the commit hash and summary, whether it was pushed, and — for
   `claude:deploy` — that the deploy workflow will now run. If GitHub prints warnings
   on push (dependabot alerts, etc.), pass them along but don't treat them as failures.

## Notes

- Run everything from the client root (`e:\CSE\ONGSHAK\projects\Discover-Ai-frontend\client`).
- Branch is normally `main`, which is also the deploy branch. If HEAD is on some other
  branch, say which branch you're about to push and confirm before pushing.
- The workflow only fires for pushes to `main` — an `2devs:deploy` commit pushed anywhere
  else will not deploy. Mention that if it comes up.
