// Page logic — sections are wired up to CONFIG in later tasks.

function formatIls(amount) {
  return new Intl.NumberFormat("he-IL", {
    style: "currency",
    currency: "ILS",
    maximumFractionDigits: 0,
  }).format(amount);
}

function renderHero() {
  document.getElementById("hero-synagogue-name").textContent = CONFIG.campaign.synagogueName;
  document.getElementById("hero-campaign-name").textContent = CONFIG.campaign.name;
  document.getElementById("hero-goal-amount").textContent = formatIls(CONFIG.campaign.goalAmount);
}

renderHero();
