// Campaign config — every value that changes over time (Meshulam link,
// contact info, raised amount, tier amounts) lives here. The rest of the
// page reads from this object; routine updates never require touching markup.
//
// Fields marked TODO_PLACEHOLDER are launch blockers — see plan.md §0.
const CONFIG = {
  campaign: {
    name: "ורוממתנו!",
    synagogueName: "בית הכנסת כרמי לובאוויטש",
    goalAmount: 800000,
    raisedAmount: 0, // manually updated by the maintainer
  },

  // Launch blocker — Meshulam donation link not yet provided by the gabbai.
  meshulamUrl: "TODO_PLACEHOLDER",

  // Launch blocker — contact details not yet provided by the gabbai.
  contact: {
    phone: "TODO_PLACEHOLDER",
    email: "TODO_PLACEHOLDER",
  },

  // Goal breakdown (SPEC §5a) — pending final confirmation from the gabbai.
  breakdown: [
    { label: "שלד ובנייה", amount: 300000 },
    { label: "ריהוט והיכל תפילה", amount: 300000 },
    { label: "שדרוג המקווה", amount: 80000 },
    { label: "ציוד מטבחי", amount: 50000 },
    { label: "שיפוץ חזית הבניין", amount: 50000 },
    { label: "מיזוג אוויר", amount: 20000 },
  ],

  // Monthly giving plans (SPEC §5b), ordered ascending — the round-1 draft
  // had these out of order (180/770/500/770); keep ascending here so the
  // page can render them in scannable order without extra sorting logic.
  monthlyPlans: [
    { label: "מסלול פתוח", amountPerMonth: 180, durationYears: null, recommended: false },
    { label: "מסלול בסיס", amountPerMonth: 360, durationYears: 3, recommended: false },
    { label: "מסלול תומך", amountPerMonth: 500, durationYears: 3, recommended: true },
    { label: "מסלול מוביל", amountPerMonth: 770, durationYears: 3, recommended: false },
  ],
  freeAmountOption: {
    label: "סכום לבחירתכם",
    description: "תרומה חד-פעמית או בהוראת קבע, בסכום שתבחרו",
  },

  // Single unified CTA label — the draft mockup used 4 different labels
  // across the page; this is the one we standardize on (plan.md §2).
  cta: {
    label: "לתרומה מאובטחת עכשיו",
  },

  ga4MeasurementId: "TODO_PLACEHOLDER",
};
