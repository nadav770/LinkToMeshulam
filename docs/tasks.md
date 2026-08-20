# Tasks — Carmei Lubavitch Expansion Campaign Landing Page ("ורוממתנו!")

**Derived from:** plan.md
**Rule:** Every task below ends with a commit + push to GitHub. Task 10 additionally deploys to Vercel — the deliverable that gives the gabbaim a public URL to share in WhatsApp groups.

**Repo state:** no git repo exists yet in this folder — Task 1 initializes it and creates the GitHub remote.

---

## Task 1 — Project scaffold + repo setup
- [x] `git init` in the project folder
- [x] Create the GitHub repo (`LinkToMeshulam`) and add it as `origin`
- [x] Scaffold base files: `index.html`, `style.css`, `script.js` (or `config.js`), plain HTML/CSS/vanilla JS, no framework, no build step (SPEC §7)
- [x] Set `<html dir="rtl" lang="he">`, base mobile-first viewport meta
- [x] Add `.gitignore` (OS/editor cruft only — no build artifacts, there's no build step)
- [x] Add a minimal `README.md` (what this project is, link to SPEC.md/plan.md)
- [x] **Commit + push to GitHub**

## Task 2 — Config object
- [x] Implement the `CONFIG` object per plan.md §1: campaign name/goal/raised, `meshulamUrl`, `contact`, `breakdown` (6 areas), `monthlyPlans`, `cta.label`, `ga4MeasurementId`
- [x] Populate with placeholder values (mark Meshulam link + contact clearly as `TODO_PLACEHOLDER`)
- [x] Comment the config to distinguish launch-blocking fields from cosmetic ones
- [x] **Commit + push to GitHub**

## Task 3 — Hero + Story sections
- [x] Hero: synagogue name/logo (placeholder logo ok), campaign title "ורוממתנו!", goal amount, one primary CTA slot
- [x] Story: growth narrative (50+ families in a space built for ~half that), captioned stats ("6 / 1:5 / 50+" — each with a label, per plan.md §2), placeholder images
- [x] Mobile-first RTL layout, no color-only meaning anywhere in these sections
- [x] **Commit + push to GitHub**

## Task 4 — Goal breakdown section
- [x] Render the 6 funded areas from `CONFIG.breakdown` (structure, furnishing, mikveh, kitchen, facade, A/C)
- [x] Each item shows amount + % of ₪800,000, with a text label — no color-only distinction (round-1 finding, plan.md §2)
- [ ] **Commit + push to GitHub**

## Task 5 — Progress indicator + Monthly giving plans
- [ ] Static progress indicator driven entirely by `CONFIG.campaign.raisedAmount` / `goalAmount` — **no** visitor-facing edit control of any kind (explicitly excluded per SPEC §11)
- [ ] Monthly plan cards from `CONFIG.monthlyPlans`, rendered in ascending order (₪180 → ₪360 → ₪500 → ₪770), single "recommended" highlight on the ₪500 tier
- [ ] Free-amount option included as the last card
- [ ] **Commit + push to GitHub**

## Task 6 — Primary CTA + WhatsApp share
- [ ] "Donate Now" button using the single unified `CONFIG.cta.label` (pick one, drop the 4 draft variants) → outbound `<a href="{{meshulamUrl}}" target="_blank">`
- [ ] WhatsApp share button/link, pre-filled share text, with UTM parameters so GA4 can attribute traffic (SPEC §10)
- [ ] **Commit + push to GitHub**

## Task 7 — Dedication pointer + Contact + Footer
- [ ] Dedication/designated-giving section: text-only "contact us to coordinate" pointer (no on-page tier/recognition structure, per SPEC §5/§11)
- [ ] Contact section reading from `CONFIG.contact` (placeholder phone/email until gabbai provides real ones)
- [ ] Footer
- [ ] **Commit + push to GitHub**

## Task 8 — GA4 analytics
- [ ] Load `gtag.js` from Google's CDN using `CONFIG.ga4MeasurementId`
- [ ] Track page views automatically
- [ ] Fire a custom `donate_click` event on every "Donate Now" click
- [ ] **Commit + push to GitHub**

## Task 9 — Mobile QA + design cleanup pass
- [ ] Test full page on real mobile widths (primary traffic channel is WhatsApp, per SPEC §4/§12/M4)
- [ ] Re-verify every round-1 finding from plan.md §2 is actually resolved in the built page: no fake update-amount control, one CTA label, ascending plan order, no color-only meaning, captioned stats
- [ ] Verify GA4 page-view and `donate_click` events actually fire (browser network tab / GA4 debug view)
- [ ] Verify WhatsApp share produces a correct, trackable link
- [ ] **Commit + push to GitHub**

## Task 10 — Deploy to Vercel (public launch URL)
- [ ] Connect the GitHub repo to Vercel (or `vercel` CLI deploy)
- [ ] Deploy to production, confirm the temporary Vercel URL loads correctly end-to-end
- [ ] Sanity-check on a real phone: page loads, CTA opens Meshulam, WhatsApp share works
- [ ] Hand the public URL to the gabbaim to publish in WhatsApp groups
- [ ] **Commit + push to GitHub** (final state)

---

## Note — placeholders still open (plan.md §0)
Tasks 1–10 build and ship the page with **placeholder** Meshulam link and contact info if those haven't arrived from the gabbai yet. That's acceptable to reach a shareable Vercel URL for internal review, but both placeholders **must** be swapped for real values (plan.md M3) before the link is actually sent out to the community.
