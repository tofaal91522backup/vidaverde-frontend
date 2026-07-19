# Section B — Open Items

Source: `VidaVerde_CopyDeck_Review_Findings.docx` (Connor, July 2026)
Scope: Section B only. Last updated: 2026-07-19

Companion file: `SectionA_Open_Items.md`

---

## Done

| Ref | Gap in the review | Actual state in code |
|---|---|---|
| B1 | Study in Quito homestay preview missing | Already built — `study-in-quito/index.tsx:341-450`. Spec's suggested copy is in verbatim, host-family photo present, CTA links to `/homestay`, section order is B → C → D. **No code change needed** — the gap is in the copy deck document, not the site. |
| B3 | GDPR consent checkbox missing | Lead capture already had it (`home/components/LeadCaptureSection.tsx:131-148`, spec copy exact). Blog widget now covered too — see B5. |
| B5 | Blog index copy + post-footer widget | Index headline and all five categories already existed (`blog/data/posts.data.ts:12-17`). Added `<LeadCaptureSection />` to `blog/PostDetail.tsx` between the article body and Related Posts — reuses the home component, so the GDPR checkbox came with it. |

---

### B2 — Footer quick-links

Spec 2.2 requires: Online Classes, **Study in Quito (sub: Quito Immersion, Travelling Classroom, Puerto López, Homestay)**, Our School, Blog, Contact, Privacy Policy, Terms.

Fixed in `components/layout/footer/Footer.tsx`. The Study column now reads:

```
Online Classes
Study in Quito
   Quito Immersion Program
   Travelling Classroom
   Puerto López
   Homestay
Travel Spanish
```

Sub-items are indented with `pl-3`. No new copy was needed — the `nav.*` translation keys already existed for the navbar, so EN and ES both work.

Jungle Programme was left out on purpose: the spec's sub-list excludes it, and its status is unconfirmed (see below).

---

## Incomplete — code exists but doesn't meet spec

### B4 — Programme detail pages are placeholder-filled

All four programmes have data (`study-in-quito/data/programs.data.ts`), so the review's "only Quito Immersion is drafted" is out of date. But two are not launch-ready:

| Programme | Problem |
|---|---|
| Puerto López | All prices are `$[X]` (lines 126, 146-147) |
| Jungle Programme | All prices are `$[X]` (line 167) |
| All four | Hero images are Unsplash stock photos, not real school photos |

**Needed:**
1. Real prices for Puerto López and Jungle Programme — Rosa/Mateo
2. Real programme photography — Vida Verde
3. The review's original point still stands: who owns finishing these, and by when?

---

## Blocked — needs a decision before any code

### ⚠️ Jungle Programme: active or not? (B4 + C6 conflict)

This is the main open contradiction.

- Review C6 treats the Jungle Programme as **unconfirmed**. The deck deliberately replaced the spec's Amazon mention with "along the Pacific coast".
- The site follows the deck in the hero — `study-in-quito/index.tsx:255` says "a journey along the Pacific coast". ✅
- **But the full Jungle Programme page is live**: `active: true`, GAIA / Yarina Lodge named, day-by-day Amazon itinerary (`programs.data.ts:157-180`).

So the hero avoids mentioning the Amazon while a complete Amazon programme sells one click away. One of the two is wrong:

- **If Jungle is confirmed active** → revert the hero to the Amazon wording (C6 says to do exactly this)
- **If Jungle is unconfirmed** → set `active: false` and pull the page until it's confirmed

**Ask Vida Verde whether the Jungle Programme actually runs.** Nothing else here should be touched until that is answered.

---

### B6 — Privacy Policy and Terms pages do not exist

**This is a live bug, not just missing copy.** The routes `/privacy` and `/terms` have no folder under `app/(marketing)/`, but three places already link to them:

| Linking from | File |
|---|---|
| Footer quick-links | `components/layout/footer/Footer.tsx:36-37` |
| GDPR consent checkbox | `home/components/LeadCaptureSection.tsx:144` |
| Same checkbox, now on blog posts | via `blog/PostDetail.tsx` |

All three currently 404. A broken Privacy Policy link inside a GDPR consent checkbox is a compliance problem as well as a UX one.

**Open questions:**
1. Does Ongshak supply template legal copy, or does Vida Verde source it? (The review asks exactly this.)
2. Until copy arrives — build placeholder pages so the links resolve, or leave them 404?

Legal copy should not be drafted by the dev side.

---

### B7 — Spanish translation

`providers/language-provider.tsx` covers navigation and footer strings only. Every page's body copy is English-only and hardcoded in components.

Spec 4.4 requires full ES versions of every page. The review flags this as a big, unowned work item.

**Open questions:**
1. Who writes the Spanish copy — Vida Verde, Ongshak, or a translator?
2. Which pages are in scope for launch vs later?
3. Body copy needs extracting out of components into the translation layer first — that is a refactor of its own and should be scoped separately.

---

## Summary — what to ask, and who

| # | Question | Owner |
|---|---|---|
| 1 | Does the Jungle Programme actually run? | Vida Verde |
| 2 | Real prices for Puerto López and Jungle | Rosa / Mateo |
| 3 | Privacy + Terms: template legal copy, or Vida Verde sources it? | Ongshak |
| 4 | Real programme photography | Vida Verde |
| 5 | Spanish translation: owner, scope, timeline | Ongshak call |
| 6 | ~~Add the three Study in Quito footer sub-links?~~ | Done |
