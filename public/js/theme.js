(function () {
  const body = document.body;
  const KEY = "neuro_theme";
  const btn = document.getElementById("themeBtn");
  const icon = document.getElementById("themeIcon");

  function apply(theme) {
    body.classList.remove("theme-light", "theme-dark");
    body.classList.add(`theme-${theme}`);
    if (icon) icon.textContent = theme === "dark" ? "🌙" : "☀️";
  }

  // Read saved theme ONLY (no forcing here)
  const saved = localStorage.getItem(KEY);
  if (saved === "dark" || saved === "light") {
    apply(saved);
  }

  // Toggle theme
  if (btn) {
    btn.addEventListener("click", () => {
      const next = body.classList.contains("theme-dark")
        ? "light"
        : "dark";

      localStorage.setItem(KEY, next);
      apply(next);
    });
  }
})();

/* =====================================================
   DELETE CONFIRMATION
   ===================================================== */
function confirmDelete() {
  return confirm(
    "Are you sure you want to delete this report?\n\n" +
    "Deleted reports cannot be recovered."
  );
}
