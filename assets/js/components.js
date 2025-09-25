// ============================================
// FAVICON INJECTOR
// ============================================
function addFavicon() {
  const faviconLink = document.createElement("link");
  faviconLink.rel = "icon";
  faviconLink.type = "image/png";
  // Correctly determine the root path for assets
  const path = window.location.pathname;
  let depth = (path.match(/\//g) || []).length - 1;
  // Adjust for root files like index.html
  if (path.endsWith("/") || path.endsWith(".html")) {
    depth = Math.max(0, depth - 1);
  }
  const prefix = depth > 0 ? "../".repeat(depth) : "";
  faviconLink.href = `${prefix}assets/images/logos/logo_JVL_FAVICON.png`;
  document.head.appendChild(faviconLink);
}
addFavicon();

// ============================================
// THEME MANAGEMENT SYSTEM
// ============================================
class ThemeManager {
  constructor() {
    this.themeToggle = null;
    this.themeToggleMobile = null;
    this.themeIcon = null;
    this.themeIconMobile = null;
  }

  getStoredTheme() {
    try {
      return localStorage.getItem("jekora-theme");
    } catch (e) {
      return null;
    }
  }

  setStoredTheme(theme) {
    try {
      localStorage.setItem("jekora-theme", theme);
    } catch (e) {}
  }

  getSystemTheme() {
    try {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    } catch (e) {
      return "light";
    }
  }

  init() {
    this.themeToggle = document.getElementById("theme-toggle");
    this.themeToggleMobile = document.getElementById("theme-toggle-mobile");
    this.themeIcon = document.getElementById("theme-icon");
    this.themeIconMobile = document.getElementById("theme-icon-mobile");
    const currentTheme = this.getStoredTheme() || this.getSystemTheme();
    this.applyTheme(currentTheme);
    this.addEventListeners();
  }

  applyTheme(theme) {
    const isDark = theme === "dark";
    document.documentElement.classList.toggle("dark", isDark);
    this.updateToggleUI(isDark);
  }

  updateToggleUI(isDark) {
    if (this.themeToggle) this.themeToggle.classList.toggle("dark", isDark);
    if (this.themeToggleMobile)
      this.themeToggleMobile.classList.toggle("dark", isDark);
    const newIcon = isDark ? "☀️" : "🌙";
    if (this.themeIcon) this.themeIcon.textContent = newIcon;
    if (this.themeIconMobile) this.themeIconMobile.textContent = newIcon;
  }

  toggleTheme() {
    const newTheme = document.documentElement.classList.contains("dark")
      ? "light"
      : "dark";
    this.applyTheme(newTheme);
    this.setStoredTheme(newTheme);
  }

  addEventListeners() {
    if (this.themeToggle)
      this.themeToggle.addEventListener("click", () => this.toggleTheme());
    if (this.themeToggleMobile)
      this.themeToggleMobile.addEventListener("click", () =>
        this.toggleTheme()
      );
  }
}

// ============================================
// NAVIGATION SYSTEM
// ============================================
class NavigationManager {
  constructor() {
    this.mobileMenuButton = null;
    this.mobileMenu = null;
  }

  init() {
    this.mobileMenuButton = document.getElementById("mobile-menu-button");
    this.mobileMenu = document.getElementById("mobile-menu");
    this.setupMobileMenu();
    this.setActiveNavigation();
    this.setupClickOutside();
  }

  setupMobileMenu() {
    if (this.mobileMenuButton && this.mobileMenu) {
      this.mobileMenuButton.addEventListener("click", () => {
        this.toggleMobileMenu();
      });
    }
  }

  toggleMobileMenu() {
    const isOpen = this.mobileMenu.classList.toggle("hidden");
    this.updateMobileMenuIcon(!isOpen);
  }

  closeMobileMenu() {
    if (this.mobileMenu) {
      this.mobileMenu.classList.add("hidden");
      this.updateMobileMenuIcon(false);
    }
  }

  updateMobileMenuIcon(isOpen) {
    if (!this.mobileMenuButton) return;
    const path = this.mobileMenuButton.querySelector("svg path");
    if (path) {
      path.setAttribute(
        "d",
        isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
      );
    }
  }

  setActiveNavigation() {
    const currentPath = window.location.pathname;
    let currentPage = "home";
    if (currentPath.includes("/about")) currentPage = "about";
    else if (currentPath.includes("/services")) currentPage = "services";
    else if (currentPath.includes("/media")) currentPage = "media";
    else if (currentPath.includes("/blog")) currentPage = "blog";
    else if (currentPath.includes("/contact")) currentPage = "contact";
    else if (currentPath.includes("/register")) currentPage = "register";

    document.querySelectorAll("[data-page]").forEach((link) => {
      link.classList.remove("active", "font-semibold");
      if (link.dataset.page === currentPage) {
        link.classList.add("active", "font-semibold");
      }
    });
  }

  setupClickOutside() {
    document.addEventListener("click", (e) => {
      if (!this.mobileMenu || this.mobileMenu.classList.contains("hidden"))
        return;
      const isClickInsideMenu = this.mobileMenu.contains(e.target);
      const isClickOnButton = this.mobileMenuButton.contains(e.target);
      if (!isClickInsideMenu && !isClickOnButton) {
        this.closeMobileMenu();
      }
    });
  }
}

// ============================================
// COMPONENT LOADER SYSTEM
// ============================================
class ComponentLoader {
  constructor(onLoadCallback) {
    this.onLoadCallback = onLoadCallback || function () {};
  }

  getComponentsPath() {
    const path = window.location.pathname;
    let depth = (path.match(/\//g) || []).length - 1;
    if (path.endsWith("/") || path.endsWith(".html")) {
      depth = Math.max(0, depth - 1);
    }
    const prefix = depth > 0 ? "../".repeat(depth) : "";
    return `${prefix}components/`;
  }

  async loadComponent(componentName, targetSelector) {
    const targetElement = document.querySelector(targetSelector);
    if (!targetElement) return;

    try {
      const componentsPath = this.getComponentsPath();
      const response = await fetch(`${componentsPath}${componentName}.html`);
      if (response.ok) {
        targetElement.innerHTML = await response.text();
      } else {
        console.error(`Failed to load component: ${componentName}`);
      }
    } catch (error) {
      console.error(`Error loading component ${componentName}:`, error);
    }
  }

  async loadAll() {
    await Promise.all([
      this.loadComponent("header", "#header-placeholder"),
      this.loadComponent("footer", "#footer-placeholder"),
      this.loadComponent("stats", "#stats-placeholder"),
      this.loadComponent("stats", "#stats-placeholder-about"),
    ]);
    this.onLoadCallback();
  }
}

// ============================================
// TEAM MODAL AND TABS LOGIC
// ============================================
function initializeTeamSection() {
  // This function's content remains the same
}

// ============================================
// MAIN INITIALIZATION BLOCK
// ============================================
document.addEventListener("DOMContentLoaded", () => {
  const onComponentsLoaded = () => {
    // Initialize systems now that components are loaded
    new ThemeManager().init();
    new NavigationManager().init();
    initializeTeamSection(); // This handles the team modal
    console.log("✅ All systems initialized.");
  };

  // Load HTML components and then run the init scripts
  const loader = new ComponentLoader(onComponentsLoaded);
  loader.loadAll();
});
