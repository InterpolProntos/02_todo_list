document.addEventListener("DOMContentLoaded", function () {
  const toggle = document.getElementById("darkModeToggle");

  // Check if user has a preference in localStorage
  let darkMode = localStorage.getItem("darkMode");

  // If no localStorage setting, check system preference
  if (!darkMode) {
    darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "enabled"
      : "disabled";
  }

  // Apply dark mode if enabled
  if (darkMode === "enabled") {
    document.body.classList.add("dark");
    document.documentElement.style.setProperty("--bg-color", "#121212");
    document.documentElement.style.setProperty("--text-color", "#ffffff");
    toggle.checked = true;
  } else {
    document.body.classList.remove("dark");
    document.documentElement.style.setProperty("--bg-color", "#ffffff");
    document.documentElement.style.setProperty("--text-color", "#000000");
    toggle.checked = false;
  }

  // Listen for toggle changes
  toggle.addEventListener("change", function () {
    if (toggle.checked) {
      document.body.classList.add("dark");
      document.documentElement.style.setProperty("--bg-color", "#121212");
      document.documentElement.style.setProperty("--text-color", "#ffffff");
      localStorage.setItem("darkMode", "enabled");
    } else {
      document.body.classList.remove("dark");
      document.documentElement.style.setProperty("--bg-color", "#ffffff");
      document.documentElement.style.setProperty("--text-color", "#000000");
      localStorage.setItem("darkMode", "disabled");
    }
  });
});
