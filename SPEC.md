# Spec — Carmei Lubavitch Synagogue Expansion Campaign Landing Page

**Project:** LinkToMeshulam
**Status:** Draft — round-1 design review done (see §11); pending Meshulam link, contact details, and mobile layout before build
**Author:** Nadav (maintainer/volunteer developer), in collaboration with Claude

---

## 1. Story & Problem Statement

Carmei Lubavitch, a synagogue in the Carmei Gat neighborhood, is running a fundraising campaign — branded **"ורוממתנו!"** — to finance a physical **expansion of the synagogue building**, with a goal of **₪800,000**. The community has grown to 50+ praying families in a space built for roughly half that number; the expansion adds a larger prayer hall, an expanded/more comfortable women's section, a community kitchen, weekday-use infrastructure, and an upgraded mikveh. The ₪800,000 goal breaks down into 6 funded areas (see §5a).

Today, the campaign has no dedicated online presence. Outreach depends on word-of-mouth and in-person asks, which limits reach — particularly to family members and community members who are not physically present (diaspora relatives, extended community) but would want to contribute digitally if given a clear, trustworthy, shareable link.

The synagogue already has a way to *receive* donations: an account on **Meshulam** (an Israeli payment/donation processing platform). What's missing is the layer in between — a page that tells the story, builds trust, and funnels a visitor to the actual donation action on Meshulam.

## 2. Goals

- Clearly communicate: who is asking, why (the expansion), how much is needed (₪800,000), and how to help.
- Drive click-through to the Meshulam donation page.
- Make the campaign easy to **share** (WhatsApp) so it can spread through family and community networks.
- Make **monthly standing-order giving (הוראת קבע)** the primary ask — this is a recurring-pledge campaign, not a one-time-gift campaign (confirmed with the gabbai). A free-amount one-time/standing-order option remains available as a secondary path.
- Measure reach (visits, click-through) via Google Analytics.
- Stay maintainable by a semi-technical volunteer (the maintainer) with minimal effort — e.g., editing one config value, not re-deploying a stack.

## 3. Non-Goals (V1)

- No in-page payment processing. All donation handling, receipts, and donor records live entirely on Meshulam.
- No user accounts / login.
- No database or backend server.
- No automatic/live-synced progress bar against real Meshulam totals — the "raised so far" number is static and manually updated by the maintainer.

## 4. Users / Personas

| Persona | Description |
|---|---|
| Donor (primary visitor) | Arrives via a WhatsApp share or direct link. Wants to quickly understand the cause and donate. Mostly on mobile. |
| Gabbai / synagogue board | The public face of the campaign; provides content, images, and the Meshulam link. |
| Maintainer (you) | Semi-technical volunteer who deploys the page and periodically updates content (amount raised, contact info, tiers). |

## 5. Scope — V1 Features

Single-page site, **Hebrew, RTL, mobile-first**:

- **Hero** — synagogue name/logo, campaign title ("ורוממתנו!"), goal amount, one consistent primary CTA.
- **Story** — why the expansion is needed (community growth, 50+ families in a space built for half that), with images of the current building and the planned expansion.
- **Goal breakdown** — ₪800,000 goal split across 6 funded areas (§5a), each with amount + % of total.
- **Progress indicator** — static number ("raised so far" / ₪800,000 goal), manually updated by the maintainer by editing the config value. No visitor-facing "update amount" control of any kind (see §11 — an editable-looking button appeared in the gabbai's draft mockup and is explicitly excluded, most likely a leftover control from the AI tool used to produce that draft).
- **Monthly giving plans (מסלולים)** — a small set of standing-order tiers (₪/month), plus a free-amount option (one-time or standing order). See §5b for the specific tiers under review.
- **Primary CTA** — "Donate Now" button → external link to the Meshulam donation page (opens in a new tab). One consistent label sitewide (see §11 design findings).
- **WhatsApp share button.**
- **Dedication / designated giving** — text-only pointer ("contact us to coordinate") for donors who want to dedicate a gift to a specific area or arrange recognition; no on-page tiered "name on wall" structure in V1 (confirmed with the gabbai — kept as a personal-touch conversation, not a page feature).
- **Contact section** — placeholder until the gabbai provides phone/email. Note: the draft mockup references "contact us" in three separate places (dedication, standing-order setup, general) with no actual phone/email anywhere — this is a real launch blocker, not just a nice-to-have.
- **Footer.**

All campaign-specific values (Meshulam link, contact info, raised-so-far number, tier amounts) live in **one small config block** at the top of the page source, so updates never require touching markup.

Google Analytics 4 tracks page views and a custom event on "Donate Now" clicks (our only visibility into intent, since we can't see actual completed donations).

### 5a. Goal Breakdown (from gabbai's draft — pending final confirmation)

| Area | Amount | % of goal |
|---|---|---|
| שלד ובנייה (structure & construction) | ₪300,000 | 37.5% |
| ריהוט והיכל תפילה (furnishing & prayer hall) | ₪300,000 | 37.5% |
| שדרוג המקווה (mikveh upgrade) | ₪80,000 | 10% |
| ציוד מטבחי (kitchen equipment) | ₪50,000 | 6.25% |
| שיפוץ חזית הבניין (building facade renovation) | ₪50,000 | 6.25% |
| מיזוג אוויר (air conditioning) | ₪20,000 | 2.5% |
| **Total** | **₪800,000** | **100%** |

### 5b. Monthly Giving Plans (from gabbai's draft — order/framing under review, see §11)

| Plan | Amount | Duration |
|---|---|---|
| מסלול פתוח | ₪180/month | Open-ended, no fixed term |
| מסלול בסיס | ₪360/month | 3 years |
| מסלול תומך (highlighted as recommended in draft) | ₪500/month | 3 years |
| מסלול מוביל | ₪770/month | 3 years |
| Free-amount option | Donor's choice | One-time or standing order |

## 6. Out of Scope / Future Considerations

- **Live progress bar** synced to real Meshulam totals — would require Meshulam API access plus a small serverless function to poll and cache it (can't call it directly from the browser: key exposure + CORS). Not pursued in V1; revisit once a Meshulam link/API access exists and if it's worth the added moving part.
- **Multi-language** (e.g., English for diaspora family) — possible V2 if there's meaningful overseas audience.
- **Custom domain** — none exists today; can be pointed at the same static host later without any architecture change.
- **CMS/admin panel** — not needed; the maintainer is comfortable editing a config value directly.

## 7. Technical Architecture

- **Fully static site**: HTML + CSS + vanilla JS. No framework, no build step. Chosen for minimal maintenance overhead and free, instant hosting.
- **Hosting**: Netlify or Vercel free tier — static hosting, automatic SSL, deploy via drag-and-drop or git push. Uses a temporary platform subdomain until/if a custom domain is purchased.
- **Content editing model**: a single JS/JSON config object holds everything that changes over time (donation link, contact info, raised-so-far figure, tier amounts/wording) — the rest of the page reads from it.
- **Analytics**: GA4 tag (`gtag.js`, loaded from Google's CDN — the page's only external script dependency), tracking page views + a custom "donate_click" event.
- **No backend server, no database** — see §9.
- **Assets**: logo + expansion sketch/renderings supplied by the gabbai, compressed and served statically.

## 8. API Calls

- **V1: none.** The page makes no calls to Meshulam or any other backend. "Donate Now" is a plain outbound `<a href>` to the Meshulam-hosted donation page.
- **Google Analytics**: standard GA4 client-side tag — the one external call the page makes.
- **Future (optional, not V1)**: if a live progress bar is wanted later, Meshulam may expose an API for total-raised-per-campaign. That would need a small serverless function as a proxy (to avoid exposing keys client-side and to sidestep CORS/rate limits) — deferred pending Meshulam link/access and actual demand.

## 9. Do We Need a Database?

**No.** The landing page is purely informational/marketing and holds no data of its own. Once a visitor clicks through, donation processing, donor identity, receipts, and running totals all live inside Meshulam's platform — that's precisely what being linked to your Meshulam account already gives you. The one piece of "state" on our side (amount raised so far) is a single number the maintainer updates by hand in the config — that doesn't justify a database.

A database would only become relevant if the page needed to do something Meshulam doesn't already do for it — e.g., a public donor wall generated dynamically from real donation records, or custom pledge collection outside Meshulam. Neither is in scope for V1.

## 10. Success Metrics

- **Primary**: total funds raised toward the ₪800,000 goal — tracked in the Meshulam dashboard itself, not on our page (no DB, by design).
- **Secondary** (measurable via GA4 on our side):
  - Landing page sessions / unique visitors
  - Click-through rate: % of visitors who click "Donate Now"
  - Traffic source split (WhatsApp share vs. direct vs. other) via UTM parameters on shared links
  - WhatsApp share button engagement

## 11. Open Items / Risks

- Meshulam donation link — not yet provided by the gabbai. Placeholder in place, tracked as TODO.
- Contact details (phone/email) — not yet provided. Referenced in three places in the draft copy ("contact us to coordinate") with nothing to actually contact — real blocker before launch.
- No domain purchased yet — decide later whether to stay on the platform subdomain or acquire a custom one.

**Design review findings (round 1, from gabbai's AI-generated draft mockup):**

- ✅ Visual identity is strong and consistent (dark/gold palette, warm photography) — keep as the direction.
- ✅ Goal amount confirmed at ₪800,000; breakdown into 6 areas confirmed (§5a).
- ✅ Primary giving model confirmed as monthly standing order (§5b), not one-time-gift-with-recognition.
- ✅ On-page donor recognition ("name on wall") confirmed out of scope — stays a personal/offline conversation ("contact us").
- ⚠️ An "עדכון סכום שגויס" (update raised amount) control appeared directly under the progress bar in the draft, visible to any visitor. The gabbai did not recognize or intend it — most likely a leftover interactive element from the AI tool used to generate the mockup. **Explicitly excluded from the build**; reconfirms the static/config-file update model in §7.
- ⚠️ CTA button copy is inconsistent across the draft ("לתרומה" / "אני רוצה לתרום" / "תרומה בסכום לבחירתכם" / "לתרומה מאובטחת עכשיו") — to unify into one label before build.
- ⚠️ Monthly plan cards are ordered non-monotonically (180 / 770 / 500 / 770 ₪) with the "recommended" highlight on a middle value — to reorder ascending/descending for scannability before build.
- ⚠️ Colored dots on the breakdown cards and the segmented bar under the progress indicator have no legend — meaning unclear, also an accessibility gap (color-only distinction). To add labels or drop the color coding.
- ⚠️ The "6 / 1:5 / 50+" stats in the story section have no captions — needs labels so the numbers are legible at a glance.
- ⚠️ The "how it will look" image is a phone photo of a physical scale model on a workbench (desk clutter visible in frame) — needs a cleaner crop or a proper render before launch.
- ⚠️ Draft was only reviewed at desktop width — mobile layout (the expected primary traffic channel, via WhatsApp) still needs to be designed/verified.

## 12. Proposed Milestones

1. **M1** — Review gabbai's design references, align on visual direction. *(Done — round 1 complete, see §11 findings.)*
2. **M2** — Build static page with placeholder data, deployed to a temporary Netlify/Vercel URL for review.
3. **M3** — Swap in real assets: logo, expansion images, tier amounts, contact info, Meshulam link.
4. **M4** — QA on mobile devices (primary expected traffic channel is WhatsApp) + verify GA tracking fires correctly.
5. **M5** — Public launch, share to community channels.
