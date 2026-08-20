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

function renderBreakdown() {
  const list = document.getElementById("breakdown-list");
  const goal = CONFIG.campaign.goalAmount;
  CONFIG.breakdown.forEach((item) => {
    const pct = Math.round((item.amount / goal) * 1000) / 10; // one decimal
    const li = document.createElement("li");
    li.className = "breakdown-item";
    li.innerHTML = `
      <span class="breakdown-label">${item.label}</span>
      <span class="breakdown-amount">${formatIls(item.amount)}</span>
      <span class="breakdown-pct">${pct}%</span>
    `;
    list.appendChild(li);
  });
}

renderHero();
renderBreakdown();
