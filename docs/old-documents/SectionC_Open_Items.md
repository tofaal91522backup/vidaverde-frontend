# Section C — Open Items

Source: `VidaVerde_CopyDeck_Review_Findings.docx` (Connor, July 2026)
Scope: Section C only. Last updated: 2026-07-19

Companion files: `SectionA_Open_Items.md`, `SectionB_Open_Items.md`

---

## Context

Section C is wording drift between the spec and the copy deck. The spec permits it, but the review asks Jeremy to sign off consciously rather than let it drift by accident.

**Key finding: the code already follows the copy deck almost everywhere.** Five of six items needed no change. This matters for the sign-off — Jeremy is not choosing in the abstract, he is confirming what is already built.

---

## Already matching the deck — no change made

| Ref | Deck version (what the site uses) | Spec version (not used) | File |
|---|---|---|---|
| C1 | "A Family School. 25 Years of Spanish." | "25 Years. 4,700 Students. Lasting Connections." | `our-school/index.tsx:107-109` |
| C2 | "Let's Talk." | "Start the Conversation." | `contact/index.tsx:46` |
| C3 | "Get Started →" / "Plan My Trip →" / "Download Free →" | "Book Your First Lesson" / "Contact Us for a Custom Plan" / "Download Free — No Commitment" | `home/components/CourseSelectorSection.tsx:303,326,337` |
| C4 | 5 options, includes "Upper intermediate" | 4 options | `book/index.tsx:67-73` |

On C4 the review is explicit: the deck version wins on UX grounds, and Ongshak should be told. Already built that way — nothing to do beyond confirming it.

---

## Changed

### C5 — Lead capture headline

The one item where the code followed the **spec** instead of the deck.

- **Was:** H2 read "Not Sure Where to Start?" + "Get Your Free Spanish Guide." on two lines
- **Now:** H2 reads "Not Sure Where to Start?" only; the guide lives in the subheadline
- **File:** `home/components/LeadCaptureSection.tsx:41`

This matches the deck's structure (deck section G, `4_VV_CopyDeck_v2.md:193-195`).

**Open question — subheadline wording.** Only the placement was changed, since that is what C5 is about. The wording still differs:

| | Text |
|---|---|
| Deck | "Get our free guide — 50 essential Spanish phrases for travellers and learners. No commitment, no spam. Just useful Spanish." |
| Code | "Download *Survival Spanish for Ecuador: 50 Essential Phrases for Travellers and Learners*. Free, instant, no commitment." |

Same meaning, different words. The code version names the guide by title, which the deck version does not. Decide whether to match the deck verbatim or keep the current line.

Note this component now renders in two places — the homepage and the foot of every blog post (see `SectionB_Open_Items.md`, B5). Any wording change applies to both.

---

## Blocked

### C6 — Amazon vs Pacific coast

Cannot be settled as a wording question, because it depends on an unanswered business fact.

- The deck replaced the spec's Amazon mention with "along the Pacific coast" — deliberate caution while the Jungle Programme is unconfirmed
- The site follows the deck: `study-in-quito/index.tsx:255` says "a journey along the Pacific coast" ✅
- **But the full Jungle Programme page is live and sells an Amazon itinerary** — `active: true`, GAIA / Yarina Lodge, day-by-day schedule (`study-in-quito/data/programs.data.ts:157-180`)

The hero avoids the Amazon while a complete Amazon programme sells one click away. The review says to revert the hero wording only if the Jungle Programme is confirmed active.

**Blocked on: does the Jungle Programme actually run?** Same question as B4 — tracked in `SectionB_Open_Items.md`. Answer it once and both items resolve:

- **Confirmed active** → restore the Amazon wording in the hero
- **Not confirmed** → keep "Pacific coast" and set the Jungle page `active: false`

---

## Summary — for Jeremy

| Ref | Needs |
|---|---|
| C1–C4 | Confirm the deck wording already in the build. No work unless he wants the spec version back. |
| C5 | Placement fixed. One decision left: match the deck's subheadline verbatim, or keep the current line that names the guide? |
| C6 | Not Jeremy's call — blocked on Vida Verde confirming the Jungle Programme. |
