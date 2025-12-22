(function () {
  const root = document.documentElement;
  const KEY = "neuro_theme";
  const btn = document.getElementById("themeBtn");
  const icon = document.getElementById("themeIcon");

  function apply(theme) {
    root.classList.remove("theme-light", "theme-dark");
    root.classList.add("theme-" + theme);
    if (icon) icon.textContent = theme === "dark" ? "🌙" : "☀️";
  }

  // Load saved theme (default already set in <head>)
  const saved = localStorage.getItem(KEY) || "light";
  apply(saved);

  if (btn) {
    btn.addEventListener("click", () => {
      const next = root.classList.contains("theme-dark")
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
