# Section D + Verdict — Open Items

Source: `VidaVerde_CopyDeck_Review_Findings.docx` (Connor, July 2026)
Scope: Section D (emails) and the review's closing verdict. Last updated: 2026-07-19

Companion files: `SectionA_Open_Items.md`, `SectionB_Open_Items.md`, `SectionC_Open_Items.md`

---

## Section D — Emails

**No code changes made. Nothing in Section D is actionable from this repo.**

The review found the email sequences sound: the nurture sequence (Day 0/3/7/14) and post-booking sequence (immediate / 24h-before / 1h-after) match the spec's timing and intent exactly, and the voice is right. It raised two notes, both of which sit outside this codebase.

The email templates are not in this repo. It holds the lead-capture **form** (`home/components/LeadCaptureSection.tsx`) but nothing that sends or renders email. Same blocker as A6 — see `SectionA_Open_Items.md`.

### D1 — Email 4's "limited availability" urgency claim

The review wants this verified before it ships: do teacher slots actually fill up? An urgency claim that is not true is a credibility risk.

**Related finding on the site.** The same claim exists in the web copy, in three places:

| File | Text |
|---|---|
| `marketing/components/TeachersSection.tsx:156` | "Limited availability" |
| `courses/components/OnlineTeachersSection.tsx:87` | "Limited availability" |
| `courses/teacher-profile/index.tsx:32` | "Limited availability. Book soon" |

All three are driven by a `teacher.accepting` boolean, so the copy is conditional rather than a blanket claim — that is the right design.

**But every teacher in the data is currently `accepting: true`** (`TeachersSection.tsx:21-65`, `courses/data/online-classes.data.ts:139-181`). So:

1. The "Limited availability" text never actually renders today — no false urgency is being shown. Good.
2. The data is hardcoded in the component files, not fetched from a backend. It will never change on its own, so the flag will stay `true` until someone edits the file.

**Open questions:**
- Does the school want teacher availability to be real (driven by the backend), or is a static "accepting new students" state fine for launch?
- If the answer to D1 is "no, slots don't really fill", the urgency angle should be dropped from Email 4 *and* this UI branch should be reconsidered.

### D2 — Email 3's testimonial placeholder

Email 3 has a testimonial placeholder that depends on the 5 outcome-focused testimonials in the To-Supply tracker. If those don't arrive, the email is blocked.

**State on the site:** six testimonials exist on the homepage (`home/data/marketing.data.ts:106-145`), from real named students with country and programme detail. Dates run 2019–2023.

**Open questions:**
- Do the 5 outcome-focused testimonials in the To-Supply tracker exist yet, or are these six all there is?
- Are these six considered outcome-focused, or does the school still owe new ones? The tracker is the authority here, not the site.
- The most recent is from 2023. Worth asking whether newer testimonials are available.

---

## Verdict — where the project actually stands

The review's closing verdict was: *"Nothing here blocks Figma work except A1–A3 (a form bug, a factual error about AECEE, and a price conflict). Fix Section A, lift the missing homestay-preview copy from the spec (B1), and assign owners for B4–B7."*

Checked against the code, that verdict is now largely out of date — much of it was already built.

| Verdict item | Actual state |
|---|---|
| A1 form bug | Never existed in code. `contact/index.tsx:10-12` was always correct. Bug is in the copy deck document only. |
| A2 AECEE error | **Fixed** — correct Ecuadorian name and URL, EN and ES. |
| A3 price conflict | **Still open.** The only true blocker left. Both `$250` and `$254.64` are live in the code at once. See `SectionA_Open_Items.md`. |
| B1 homestay preview | Never missing from the site — already built with the spec's copy. Missing from the deck only. |
| B4–B7 owners | Still unassigned. See `SectionB_Open_Items.md`. |
| Section C | Five of six items already matched the deck; C5 fixed; C6 blocked. See `SectionC_Open_Items.md`. |

### The pattern worth reporting back

Repeatedly, the review flagged gaps that exist in the **copy deck document** but were already implemented on the **site** — A1, B1, most of Section C. The developer appears to have built from the spec directly, and those decisions were never folded back into the deck.

This matters: **the deck is now behind the build.** Anyone designing in Figma from the deck will reintroduce problems that are already solved, and will miss content that already exists.

**Recommended:** before the next round, reconcile the copy deck against the live site rather than against the spec. That is a documentation task, not a development one, and it should probably happen before Figma work starts.

---

## Still-stale source documents

Fixed in code but **not** in the source docs — anyone reading these will get the old, wrong values:

| File | Line | Stale content |
|---|---|---|
| `docs/4_VV_CopyDeck_v2.md` | 40 | Old AECEE expansion — "Association of Spanish Language Schools" |
| `docs/4_VV_CopyDeck_v2.md` | 537 | Old AECEE expansion + `aecee.es` link |
| `docs/website-spec-v2.md` | 186 | `4,781 Students Taught` — code now uses `4,700+` everywhere |

Held back deliberately: the A3 price fix will touch these same documents, so it is worth doing all the doc edits in one pass once the price is confirmed.

---

## Summary — what's needed

| # | Question | Owner | Blocks |
|---|---|---|---|
| 1 | Real 20-Class Package price — and are `$250` / `$254.64` two different packages? | Rosa / Mateo | A3 — the last true blocker |
| 2 | Does the Jungle Programme actually run? | Vida Verde | B4 + C6 |
| 3 | Privacy + Terms: template legal copy, or Vida Verde sources it? | Ongshak | B6 — three links currently 404 |
| 4 | Do teacher slots really fill up? Should availability be backend-driven? | Vida Verde | D1 |
| 5 | Do the 5 outcome-focused testimonials exist yet? | To-Supply tracker | D2 |
| 6 | Is 24h response time realistic? | Rosa / Mateo | A4 — currently live as 24h |
| 7 | Where do the email templates live, and who owns them? | Ongshak | A6, D1, D2 |
| 8 | Real prices for Puerto López and Jungle | Rosa / Mateo | B4 |
| 9 | Real programme photography (currently Unsplash stock) | Vida Verde | B4 |
| 10 | Spanish translation: owner, scope, timeline | Ongshak call | B7 |
