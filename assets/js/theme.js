// ============================================
// THEME MANAGEMENT SYSTEM
// ============================================

class ThemeManager {
  constructor() {
    this.themeToggle = document.getElementById("theme-toggle");
    this.themeToggleMobile = document.getElementById("theme-toggle-mobile");
    this.themeIcon = document.getElementById("theme-icon");
    this.themeIconMobile = document.getElementById("theme-icon-mobile");

    this.init();
  }

  // Safe localStorage access
  getStoredTheme() {
    try {
      return localStorage.getItem("theme");
    } catch (error) {
      console.warn("localStorage not available:", error);
      return null;
    }
  }

  setStoredTheme(theme) {
    try {
      localStorage.setItem("theme", theme);
    } catch (error) {
      console.warn("localStorage not available:", error);
    }
  }

  // Get system preference
  getSystemTheme() {
    try {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    } catch (error) {
      return "light"; // fallback
    }
  }

  // Initialize theme system
  init() {
    // Determine current theme
    const storedTheme = this.getStoredTheme();
    const systemTheme = this.getSystemTheme();
    const currentTheme = storedTheme || systemTheme;

    // Apply theme on page load
    this.applyTheme(currentTheme);

    // Add event listeners
    this.addEventListeners();

    // Listen for system theme changes
    this.watchSystemTheme();
  }

  // Apply theme to DOM
  applyTheme(theme) {
    const isDark = theme === "dark";

    if (isDark) {
      document.documentElement.classList.add("dark");
      this.themeToggle?.classList.add("dark");
      this.themeToggleMobile?.classList.add("dark");
      if (this.themeIcon) this.themeIcon.textContent = "☀️";
      if (this.themeIconMobile) this.themeIconMobile.textContent = "☀️";
    } else {
      document.documentElement.classList.remove("dark");
      this.themeToggle?.classList.remove("dark");
      this.themeToggleMobile?.classList.remove("dark");
      if (this.themeIcon) this.themeIcon.textContent = "🌙";
      if (this.themeIconMobile) this.themeIconMobile.textContent = "🌙";
    }
  }

  // Toggle between themes
  toggleTheme() {
    const isDark = document.documentElement.classList.contains("dark");
    const newTheme = isDark ? "light" : "dark";

    this.applyTheme(newTheme);
    this.setStoredTheme(newTheme);
  }

  // Add event listeners
  addEventListeners() {
    this.themeToggle?.addEventListener("click", () => this.toggleTheme());
    this.themeToggleMobile?.addEventListener("click", () => this.toggleTheme());
  }

  // Watch for system theme changes
  watchSystemTheme() {
    try {
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .addEventListener("change", (e) => {
          // Only auto-switch if user hasn't set a preference
          if (!this.getStoredTheme()) {
            this.applyTheme(e.matches ? "dark" : "light");
          }
        });
    } catch (error) {
      console.warn("matchMedia not supported:", error);
    }
  }
}

// ============================================
// INITIALIZE ON DOM LOAD
// ============================================
document.addEventListener("DOMContentLoaded", function () {
  // Initialize theme system
  window.themeManager = new ThemeManager();

  console.log("✅ Theme system initialized");
});
