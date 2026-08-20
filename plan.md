# Plan — Carmei Lubavitch Expansion Campaign Landing Page ("ורוממתנו!")

**Derived from:** SPEC.md
**Status:** Pre-build — blocked on 2 hard blockers (Meshulam link, contact details) before M2 can ship to real users; design cleanup items can be resolved in parallel with build.

---

## 0. Blockers (must resolve before public launch)

These are called out in SPEC §11 as real launch blockers, not nice-to-haves.

- [ ] **Meshulam donation link** — request from gabbai. Until received, use a placeholder URL in config and flag it visibly during QA so it can't ship by accident.
- [ ] **Contact details (phone/email)** — request from gabbai. Referenced in 3 places in the draft copy (dedication/designated giving, standing-order setup help, general contact) with nothing to actually contact. Same placeholder-and-flag approach until received.

Neither blocker prevents starting the build (M2) with placeholder data — they only block M3/launch.

---

## 1. Config Schema (build this first)

Per SPEC §7, everything that changes over time lives in one config object at the top of the page source. Draft the shape before writing markup so the rest of the page can just read from it.

```js
const CONFIG = {
  campaign: {
    name: "ורוממתנו!",
    goalAmount: 800000,
    raisedAmount: 0,        // manually updated by maintainer
  },
  meshulamUrl: "TODO_PLACEHOLDER",
  contact: {
    phone: "TODO_PLACEHOLDER",
    email: "TODO_PLACEHOLDER",
  },
  breakdown: [
    // §5a — 6 funded areas, amount + label (no color-only legend, see §4 below)
  ],
  monthlyPlans: [
    // §5b — ordered ascending, single recommended tier, see §4 below
  ],
  cta: {
    label: "TODO — pick ONE label, see §4 below",
  },
  ga4MeasurementId: "TODO_PLACEHOLDER",
}
```

- [ ] Finalize field names/shape
- [ ] Populate with placeholder values for M2
- [ ] Document in a short comment block which fields are launch blockers vs. cosmetic

---

## 2. Design Cleanup Items (from SPEC §11 round-1 review)

Resolve these while building M2, since they change markup/structure, not just config values:

- [ ] **Drop the "עדכון סכום שגויס" control entirely.** It appeared in the gabbai's draft mockup but was unintentional (likely an AI-tool artifact) and is explicitly excluded. No visitor-facing way to edit the raised amount — config-file-only, per SPEC §7.
- [ ] **Unify the CTA label.** Draft has 4 variants ("לתרומה" / "אני רוצה לתרום" / "תרומה בסכום לבחירתכם" / "לתרומה מאובטחת עכשיו"). Pick one and use it sitewide via `CONFIG.cta.label`.
- [ ] **Reorder the monthly plan cards ascending** (₪180 → ₪360 → ₪500 → ₪770), draft has them out of order (180/770/500/770). Keep the "recommended" highlight on מסלול תומך (₪500) but make the ordering monotonic for scannability.
- [ ] **Fix color-only distinction.** Breakdown-card dots and the segmented progress bar currently rely on color alone (accessibility gap + unclear meaning). Add text labels, or drop the color coding if labels make it redundant.
- [ ] **Caption the story-section stats** ("6 / 1:5 / 50+") — currently bare numbers with no explanation of what they mean.
- [ ] **Replace the scale-model photo** — draft image is a phone photo of a physical model with desk clutter in frame. Needs a cleaner crop or a proper render before launch (not a blocker for M2 placeholder build).
- [ ] **Design and verify the mobile layout.** Draft was only reviewed at desktop width, but mobile/WhatsApp is the expected primary traffic channel (SPEC §4, §12/M4). Mobile-first build, not a desktop-then-adapt approach.

---

## 3. Content to Confirm with Gabbai

- [ ] Final wording/order for the 6 goal-breakdown areas (SPEC §5a is "pending final confirmation")
- [ ] Final framing for monthly plan tiers (SPEC §5b — "order/framing under review")
- [ ] Story section copy: confirm the growth narrative (50+ families, space built for ~half that) reads correctly once finalized
- [ ] Logo + real expansion images/renderings (to replace the scale-model photo)

---

## 4. Build Phases (maps to SPEC §12 milestones)

### M1 — Design alignment
**Status: Done.** Round-1 review complete; findings captured in §11/§2 of this plan.

### M2 — Static page, placeholder data
- [ ] Scaffold single-page HTML/CSS/vanilla JS, Hebrew + RTL, mobile-first (no framework, no build step, per SPEC §7)
- [ ] Implement config object (§1 above) with placeholder values
- [ ] Build sections in order: Hero → Story (with captioned stats) → Goal breakdown (6 areas, labeled not color-only) → Progress indicator (static, config-driven, no edit control) → Monthly giving plans (ascending order, single recommended tier) → Primary CTA (unified label) → WhatsApp share → Dedication/designated-giving text pointer → Contact section (placeholder) → Footer
- [ ] Wire up GA4 (`gtag.js`) — page view tracking + `donate_click` custom event on CTA
- [ ] Deploy to temporary Netlify/Vercel URL for review

### M3 — Real assets swap-in
- [ ] Replace placeholder Meshulam link (once received — Blocker)
- [ ] Replace placeholder contact info (once received — Blocker)
- [ ] Insert real logo + expansion images/renderings
- [ ] Confirm final breakdown and monthly-plan amounts/wording (§3 above)
- [ ] Update `raisedAmount` to the real current figure

### M4 — QA
- [ ] Mobile-device testing (primary traffic channel is WhatsApp shares, per SPEC §4/§10)
- [ ] Verify GA4 page-view and `donate_click` event fire correctly
- [ ] Verify WhatsApp share produces a correct, trackable link (UTM parameters per SPEC §10)
- [ ] Re-check all §2 design cleanup items are actually resolved in the built page, not just planned

### M5 — Public launch
- [ ] Confirm both blockers (§0) are resolved — no placeholder values live
- [ ] Share to community channels

---

## 5. Explicitly Not Building (V1 non-goals, SPEC §3/§6)

- No in-page payment processing — Meshulam handles all of it
- No login/accounts, no database, no backend server
- No live-synced progress bar against real Meshulam totals — static, manual config update only
- No on-page donor-recognition/"name on wall" tier structure — stays an offline "contact us" conversation
- No multi-language, no CMS/admin panel, no custom domain (all deferred, not ruled out)
