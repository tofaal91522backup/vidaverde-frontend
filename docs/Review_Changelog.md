# Copy Deck Review — Changelog

What was changed while working through `VidaVerde_CopyDeck_Review_Findings.docx`.
Verified against `git diff` on 2026-07-19. Branch: `main`, uncommitted.

---

## Code changes — 5 edits across 5 files

| # | Ref | File | Change |
|---|---|---|---|
| 1 | A2 | `features/marketing/pages/our-school/index.tsx:472` | AECEE expansion → "The Asociación Ecuatoriana de Centros de Enseñanza de Español, Ecuador's association of Spanish language centers" |
| 2 | A2 | `features/marketing/pages/our-school/index.tsx:484` | Link → `https://ecuadorspanishschools-aecee.com` (was `https://www.aecee.es`) |
| 3 | A2 | `providers/language-provider.tsx:48` | EN footer → "Ecuadorian Association of Spanish Language Centers (AECEE)" |
| 3 | A2 | `providers/language-provider.tsx:84` | ES footer → "Asociación Ecuatoriana de Centros de Enseñanza de Español (AECEE)" |
| 4 | A4 | `app/(marketing)/contact/page.tsx:6` | Metadata "48 hours" → "24 hours" |
| 5 | A5 | `features/marketing/pages/home/data/marketing.data.ts:13` | `"4,781"` / `target: 4781` → `"4,700+"` / `target: 4700` |
| 6 | B3+B5 | `features/marketing/pages/blog/PostDetail.tsx:2,95` | Added `<LeadCaptureSection />` between article body and Related Posts |
| 7 | C5 | `features/marketing/pages/home/components/LeadCaptureSection.tsx:41` | Removed "Get Your Free Spanish Guide." from the H2 |
| 8 | B2 | `components/layout/footer/Footer.tsx:17-45,139` | Added Quito Immersion / Travelling Classroom / Puerto López as sub-links under Study in Quito; moved Homestay under it too; indented sub-items with `pl-3` |

### Notes on individual changes

| Ref | Note |
|---|---|
| A4 | **Provisional.** 24h was chosen without school confirmation. The review warns a 24h promise the school can't keep is worse than an honest 48h. 7 places in code now say 24h. |
| A5 | `heroStats` is not imported anywhere — dead export, so `4,781` was never rendering. Fixed anyway to stop the wrong number spreading. |
| B3+B5 | Reused the home component rather than writing new copy, so the GDPR checkbox came with it and the copy can't drift between the two placements. One change closed two findings. |
| C5 | Placement only. The subheadline wording still differs from the deck — see `SectionC_Open_Items.md`. |
| B2 | No new copy written — the `nav.*` translation keys already existed for the navbar, so labels work in EN and ES. Jungle Programme deliberately omitted: the spec's sub-list excludes it and its status is unconfirmed. |

---

## Docs created — 5 files

| File | Contents |
|---|---|
| `Review_Summary.md` | All four sections on one page, table-heavy |
| `SectionA_Open_Items.md` | A1–A6 |
| `SectionB_Open_Items.md` | B1–B7 |
| `SectionC_Open_Items.md` | C1–C6 |
| `SectionD_and_Verdict.md` | Emails + verdict reconciled against the code |

No existing docs were edited. `4_VV_CopyDeck_v2.md` and `website-spec-v2.md` are untouched and still hold stale values — held deliberately so the A3 price fix can land in one pass.

---

## Not mine — needs confirming

`eslint.config.mjs` shows as modified, adding two disabled rules:

```
"import/no-anonymous-default-export": "off",
"react/display-name": "off",
```

**This was not made as part of this work.** The working tree was clean at the start of the session. Confirm whether it was intentional before committing — it loosens lint rules repo-wide.

---

## Verification

| Check | Result |
|---|---|
| `npx tsc --noEmit` | Clean |
| `npx eslint` on changed files | Clean |
| Rendered in browser | **Not done** — no visual check was run |

---

## Flagged but deliberately not changed

| Item | Why |
|---|---|
| `/privacy` + `/terms` pages | Routes don't exist; footer and GDPR checkbox link to them, so all 404. Legal copy is not the dev side's to draft. |
| Jungle Programme `active: true` | Contradicts the deck's caution, but whether it runs is a business fact. Blocked. |
| Our School stat grid | `25+ Years teaching` sits beside `AECEE Certified`. AECEE was founded 2009, so the pairing can read as 25 years of certification — the review warns against this. Judgement call, left alone. |
| Puerto López + Jungle `$[X]` prices | Real prices not supplied. |
| A3 price conflict | `$250` and `$254.64` both still live. Unresolved — the last true blocker. |
| Section C subheadline wording | Only placement was in scope for C5. |
| Jungle Programme footer link | Left out of the new footer sub-links until its status is confirmed. |
