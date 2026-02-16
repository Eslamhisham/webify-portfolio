/* =========================================================
   GLOBAL STATE
   ========================================================= */

// Store loaded translations globally
let translations = {};

/* =========================================================
   INTERNATIONALIZATION (i18n)
   ========================================================= */

// Translation helper function
export function t(key) {
  return translations[key] || key;
}

// Load language file dynamically
export async function loadLanguage(lang) {
  const response = await fetch(`../i18n/${lang}.json`);
  translations = await response.json();

  // Translate text nodes
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    el.textContent = t(key);
  });

  // Translate placeholders
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    el.setAttribute("placeholder", t(key));
  });

  // Update page direction
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";

  localStorage.setItem("lang", lang);
}

// Load saved language on startup
export function initLanguageToggle() {
  const langBtn = document.getElementById("langBtn");
  if (!langBtn) return;

  // Language toggle button
  const savedLang = localStorage.getItem("lang") || "en";
  loadLanguage(savedLang);
  langBtn.addEventListener("click", () => {
    const current = localStorage.getItem("lang") || "en";
    const next = current === "en" ? "ar" : "en";
    loadLanguage(next);
  });
}
