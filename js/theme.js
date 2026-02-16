/* =========================================================
   THEME TOGGLE (Light / Dark)
   ========================================================= */

export function initTheme() {

  const themeBtn = document.getElementById("themeBtn");
  if (!themeBtn) return;

  function applyTheme(theme) {
    const html = document.documentElement;

    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);

    themeBtn.textContent = theme === "dark" ? "☀" : "☾";
  }

  // Apply saved theme on load
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    applyTheme(savedTheme);
  }

  // Toggle theme
  themeBtn.addEventListener("click", () => {
    const current = localStorage.getItem("theme") || "light";
    const next = current === "dark" ? "light" : "dark";
    applyTheme(next);
  });
}
