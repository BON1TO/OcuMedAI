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

  // ✅ FORCE LIGHT AS TRUE DEFAULT (even for old users)
  let saved = localStorage.getItem(KEY);

  if (saved !== "light" && saved !== "dark") {
    saved = "light";
    localStorage.setItem(KEY, "light");
  }

  apply(saved);

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
   DELETE CONFIRMATION (USED BY REPORT DELETE BUTTON)
   ===================================================== */

function confirmDelete() {
  return confirm(
    "Are you sure you want to delete this report?\n\n" +
    "Deleted reports cannot be recovered."
  );
}
