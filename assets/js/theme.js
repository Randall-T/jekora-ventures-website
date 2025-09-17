// ============================================
// THEME MANAGEMENT SYSTEM
// ============================================

class ThemeManager {
  constructor() {
    this.themeToggle = document.getElementById("theme-toggle");
    this.themeToggleMobile = document.getElementById("theme-toggle-mobile");
    this.themeIcon = document.getElementById("theme-icon");
    this.themeIconMobile = document.getElementById("theme-icon-mobile");
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
    // Determine current theme
    const storedTheme = this.getStoredTheme();
    const systemTheme = this.getSystemTheme();
    const currentTheme = storedTheme || systemTheme;

    // Apply theme immediately to prevent flash
    this.applyTheme(currentTheme, false);

    // Add event listeners
    this.addEventListeners();

    // Listen for system theme changes
    this.watchSystemTheme();

    console.log(
      `✅ Theme initialized: ${currentTheme} (stored: ${storedTheme}, system: ${systemTheme})`
    );
  }

  // Apply theme to DOM with animation control

  applyTheme(theme, animate = true) {
    const isDark = theme === "dark";
    const html = document.documentElement;

    // Disable transitions temporarily if requested
    if (!animate) {
      html.classList.add("theme-switching");
      setTimeout(() => html.classList.remove("theme-switching"), 100);
    }

    // Apply or remove dark class
    if (isDark) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }

    // Update toggle switches
    this.updateToggleUI(isDark);

    // Force a repaint to ensure changes apply
    setTimeout(() => {
      document.body.style.display = "none";
      document.body.offsetHeight; // Trigger reflow
      document.body.style.display = "";
    }, 50);
  }

  // Update toggle UI elements
  updateToggleUI(isDark) {
    // Desktop toggle
    if (this.themeToggle) {
      if (isDark) {
        this.themeToggle.classList.add("dark");
      } else {
        this.themeToggle.classList.remove("dark");
      }
    }

    // Mobile toggle
    if (this.themeToggleMobile) {
      if (isDark) {
        this.themeToggleMobile.classList.add("dark");
      } else {
        this.themeToggleMobile.classList.remove("dark");
      }
    }

    // Update icons
    const newIcon = isDark ? "☀️" : "🌙";
    if (this.themeIcon) this.themeIcon.textContent = newIcon;
    if (this.themeIconMobile) this.themeIconMobile.textContent = newIcon;
  }

  // Toggle between themes
  toggleTheme() {
    const html = document.documentElement;
    const isDarkNow = html.classList.contains("dark");
    const newTheme = isDarkNow ? "light" : "dark";

    console.log(
      `🔄 Toggling theme from ${isDarkNow ? "dark" : "light"} to ${newTheme}`
    );

    this.applyTheme(newTheme, true);
    this.setStoredTheme(newTheme);
  }

  // Add event listeners
  addEventListeners() {
    const setupListener = (element) => {
      if (element) {
        // Remove any old listeners to prevent duplication
        element.replaceWith(element.cloneNode(true));
        // Find the new element in the DOM
        const newElement = document.getElementById(element.id);
        // Add the event listener to the new element
        newElement.addEventListener("click", () => this.toggleTheme());
      }
    };

    setupListener(this.themeToggle);
    setupListener(this.themeToggleMobile);
  }
  // Watch for system theme changes
  watchSystemTheme() {
    try {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

      mediaQuery.addEventListener("change", (e) => {
        // Only auto-switch if user hasn't set a manual preference
        const storedTheme = this.getStoredTheme();
        if (!storedTheme) {
          const newTheme = e.matches ? "dark" : "light";
          console.log(`🔄 System theme changed to: ${newTheme}`);
          this.applyTheme(newTheme, true);
        }
      });
    } catch (error) {
      console.warn("matchMedia not supported:", error);
    }
  }

  // Public method to force theme
  setTheme(theme) {
    if (theme === "dark" || theme === "light") {
      this.applyTheme(theme, true);
      this.setStoredTheme(theme);
    }
  }

  // Get current theme
  getCurrentTheme() {
    return document.documentElement.classList.contains("dark")
      ? "dark"
      : "light";
  }
}

// ============================================
// ADDITIONAL THEME UTILITIES
// ============================================

// Add CSS class to prevent transitions during theme switch
const style = document.createElement("style");
style.textContent = `
    .theme-switching * {
        transition: none !important;
        animation: none !important;
    }
`;
document.head.appendChild(style);
