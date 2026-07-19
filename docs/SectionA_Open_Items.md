# Section A — Open Items

Source: `VidaVerde_CopyDeck_Review_Findings.docx` (Connor, July 2026)
Scope: Section A only. Last updated: 2026-07-19

---

## Done (code fixed)

| Ref | Issue | What was done |
|---|---|---|
| A1 | Contact dropdown listed 'Travel Spanish' twice, missing 'Homestay' | No change needed — code was already correct (`contact/index.tsx:10-12`). Bug exists only in the copy deck document. |
| A2 | AECEE wrongly expanded + wrong URL | Fixed in `our-school/index.tsx:472,484` and `language-provider.tsx:48,84` (EN + ES). Now: *Asociación Ecuatoriana de Centros de Enseñanza de Español*, `ecuadorspanishschools-aecee.com` |
| A5 | `4,781` vs `4,700+` mismatch | Set to `4,700+` in `home/data/marketing.data.ts:13`. Codebase now uses one number everywhere. |

---

## Unconfirmed — needs an answer before launch

### A4 — Response time: 24h or 48h?

**Current state:** set to **24 hours** everywhere in code (7 places), on a provisional call — not confirmed with the school.

`app/(marketing)/contact/page.tsx:6` was the odd one out (said 48h); now aligned to 24h.

**Open question:** can Vida Verde actually reply within 24 hours?
The review warns: *"A 24h promise the school can't keep is worse than an honest 48h."*
Ask Rosa/Mateo. If the answer is 48h, all 7 occurrences need flipping.

---

### A3 — 20-Class Package price: $250 or $254.64?

**Not resolved.** Spec says `$250.00`, copy deck says `$254.64`. Both are marked "confirm".

Both numbers currently live in the code side by side:

| File | Price |
|---|---|
| `courses/data/marketing.data.ts:16` | `$250` |
| `home/data/marketing.data.ts:80` | `$250` |
| `courses/data/marketing.data.ts:95` | `$254.64` |
| `home/data/marketing.data.ts:100` | `$254.64` |
| `book/index.tsx:60` | `$254.64` |
| `courses/data/online-classes.data.ts:96` | `$254.64` |

**Open questions:**
1. What is the real price? (Rosa/Mateo)
2. Are `$250` and `$254.64` actually **two different packages**? They sit as separate entries in the same files (lines 80 and 100), so this may not be a straight duplicate. Confirm before overwriting either one.
3. Once settled, update the spec and the copy deck too — not just the code.

---

### A6 — Lead-capture Email 1: attachment vs download link

**Not actionable in this repo.** The review says Email 1 claims the guide "is attached", but the CTA says "Download Your Guide →" and spec 4.3 requires a download **link**. Links avoid spam filters and let GA4 count downloads.

This repo has the capture **form** (`home/components/LeadCaptureSection.tsx`) but no email template — that lives in the backend or the email service provider.

**Open questions:**
1. Where does the email template live? Separate backend repo, or an ESP (Mailchimp / SendGrid / etc.)?
2. Who owns changing it?
3. Where is the guide PDF hosted, so a link can point at it?

---

## Next up (not Section A)

Section B still open: B1 homestay preview copy, B2 footer quick-links, B3 GDPR checkbox, B5 blog index, B7 Spanish translation.
