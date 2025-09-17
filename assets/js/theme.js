// ============================================
// THEME MANAGEMENT SYSTEM
// ============================================

class ThemeManager {
  constructor() {
    // Properties are defined here, but not initialized
    this.themeToggle = null;
    this.themeToggleMobile = null;
    this.themeIcon = null;
    this.themeIconMobile = null;
  }

  // Safe localStorage access
  getStoredTheme() {
    try {
      return localStorage.getItem("jekora-theme");
    } catch (error) {
      console.warn("localStorage not available:", error);
      return null;
    }
  }

  setStoredTheme(theme) {
    try {
      localStorage.setItem("jekora-theme", theme);
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
    // CORRECTED: Find elements inside init(), not the constructor
    this.themeToggle = document.getElementById("theme-toggle");
    this.themeToggleMobile = document.getElementById("theme-toggle-mobile");
    this.themeIcon = document.getElementById("theme-icon");
    this.themeIconMobile = document.getElementById("theme-icon-mobile");

    const storedTheme = this.getStoredTheme();
    const systemTheme = this.getSystemTheme();
    const currentTheme = storedTheme || systemTheme;

    this.applyTheme(currentTheme, false);
    this.addEventListeners();
    this.watchSystemTheme();

    console.log(
      `✅ Theme initialized: ${currentTheme} (stored: ${storedTheme}, system: ${systemTheme})`
    );
  }

  // Apply theme to DOM
  applyTheme(theme, animate = true) {
    const isDark = theme === "dark";
    const html = document.documentElement;

    if (!animate) {
      html.classList.add("theme-switching");
      setTimeout(() => html.classList.remove("theme-switching"), 100);
    }

    if (isDark) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }

    this.updateToggleUI(isDark);

    setTimeout(() => {
      document.body.style.display = "none";
      document.body.offsetHeight;
      document.body.style.display = "";
    }, 50);
  }

  // Update toggle UI
  updateToggleUI(isDark) {
    if (this.themeToggle) {
      this.themeToggle.classList.toggle("dark", isDark);
    }
    if (this.themeToggleMobile) {
      this.themeToggleMobile.classList.toggle("dark", isDark);
    }
    const newIcon = isDark ? "☀️" : "🌙";
    if (this.themeIcon) this.themeIcon.textContent = newIcon;
    if (this.themeIconMobile) this.themeIconMobile.textContent = newIcon;
  }

  // Toggle theme
  toggleTheme() {
    const newTheme = document.documentElement.classList.contains("dark")
      ? "light"
      : "dark";
    console.log(`🔄 Toggling theme to ${newTheme}`);
    this.applyTheme(newTheme, true);
    this.setStoredTheme(newTheme);
  }

  // Add event listeners
  addEventListeners() {
    if (this.themeToggle) {
      this.themeToggle.addEventListener("click", () => this.toggleTheme());
    }
    if (this.themeToggleMobile) {
      this.themeToggleMobile.addEventListener("click", () =>
        this.toggleTheme()
      );
    }
  }

  // Watch for system changes
  watchSystemTheme() {
    try {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      mediaQuery.addEventListener("change", (e) => {
        if (!this.getStoredTheme()) {
          const newTheme = e.matches ? "dark" : "light";
          console.log(`🔄 System theme changed to: ${newTheme}`);
          this.applyTheme(newTheme, true);
        }
      });
    } catch (error) {
      console.warn("matchMedia not supported:", error);
    }
  }
}

// Add CSS class to prevent transitions during theme switch
const style = document.createElement("style");
style.textContent = `
    .theme-switching * {
        transition: none !important;
        animation: none !important;
    }
`;
document.head.appendChild(style);
