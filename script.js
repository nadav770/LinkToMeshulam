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

function renderProgress() {
  const raised = CONFIG.campaign.raisedAmount;
  const goal = CONFIG.campaign.goalAmount;
  const pct = Math.min(100, Math.round((raised / goal) * 1000) / 10);
  document.getElementById("progress-bar-fill").style.width = `${pct}%`;
  document.getElementById("progress-text").textContent =
    `${formatIls(raised)} מתוך ${formatIls(goal)} גויסו עד כה (${pct}%)`;
}

function renderPlans() {
  const list = document.getElementById("plans-list");

  CONFIG.monthlyPlans.forEach((plan) => {
    const duration = plan.durationYears
      ? `למשך ${plan.durationYears} שנים`
      : "ללא התחייבות לתקופה קבועה";
    const card = document.createElement("div");
    card.className = "plan-card" + (plan.recommended ? " plan-card--recommended" : "");
    card.innerHTML = `
      ${plan.recommended ? '<span class="plan-badge">המסלול המומלץ</span>' : ""}
      <span class="plan-amount">${formatIls(plan.amountPerMonth)} לחודש</span>
      <span class="plan-label">${plan.label}</span>
      <span class="plan-duration">${duration}</span>
    `;
    list.appendChild(card);
  });

  const free = CONFIG.freeAmountOption;
  const freeCard = document.createElement("div");
  freeCard.className = "plan-card plan-card--free";
  freeCard.innerHTML = `
    <span class="plan-amount">${free.label}</span>
    <span class="plan-duration">${free.description}</span>
  `;
  list.appendChild(freeCard);
}

function buildShareUrl() {
  const url = new URL(window.location.href);
  url.searchParams.set("utm_source", "whatsapp");
  url.searchParams.set("utm_medium", "share");
  url.searchParams.set("utm_campaign", "vromemtanu");
  return url.toString();
}

function renderCta() {
  const html = `<a class="cta-button" href="${CONFIG.meshulamUrl}" target="_blank" rel="noopener">${CONFIG.cta.label}</a>`;
  document.getElementById("cta-slot").innerHTML = html;
  document.getElementById("cta-slot-bottom").innerHTML = html;

  document.querySelectorAll(".cta-button").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (typeof gtag === "function") gtag("event", "donate_click");
    });
  });
}

function renderWhatsappShare() {
  const shareUrl = buildShareUrl();
  const text = `בואו נרים ביחד את קמפיין ${CONFIG.campaign.name} — הרחבת ${CONFIG.campaign.synagogueName}. ${shareUrl}`;
  const waHref = `https://wa.me/?text=${encodeURIComponent(text)}`;
  document.getElementById("whatsapp-share-slot").innerHTML =
    `<a class="whatsapp-share-button" href="${waHref}" target="_blank" rel="noopener">שיתוף בוואטסאפ</a>`;
}

function loadGa4() {
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${CONFIG.ga4MeasurementId}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    dataLayer.push(arguments);
  };
  gtag("js", new Date());
  gtag("config", CONFIG.ga4MeasurementId);
}

function renderContact() {
  document.getElementById("contact-phone").textContent = CONFIG.contact.phone;
  document.getElementById("contact-email").textContent = CONFIG.contact.email;
}

function renderFooter() {
  document.getElementById("footer-synagogue-name").textContent = CONFIG.campaign.synagogueName;
}

loadGa4();
renderHero();
renderBreakdown();
renderProgress();
renderPlans();
renderCta();
renderWhatsappShare();
renderContact();
renderFooter();
