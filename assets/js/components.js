// ============================================
// FAVICON INJECTOR
// ============================================
function addFavicon() {
  const faviconLink = document.createElement("link");
  faviconLink.rel = "icon";
  faviconLink.type = "image/png";
  faviconLink.href = "/assets/images/logos/logo_JVL_FAVICON.png";
  document.head.appendChild(faviconLink);
}
addFavicon();

// ============================================
// COMPONENT LOADER SYSTEM
// ============================================
class ComponentLoader {
  constructor() {
    this.componentsPath = this.getComponentsPath();
    this.onLoadCallback = onLoadCallback || function () {};
  }

  getComponentsPath() {
    const path = window.location.pathname;
    // Split the path into segments, filtering out empty strings (from '/')
    let segments = path.split("/").filter(Boolean);

    // If the last segment is an .html file, it's not a directory, so remove it
    if (
      segments.length > 0 &&
      segments[segments.length - 1].endsWith(".html")
    ) {
      segments.pop();
    }

    const depth = segments.length;

    // Root directory (depth 0)
    if (depth === 0) {
      return "components/";
    }

    // Create the correct prefix (e.g., ../ for depth 1, ../../ for depth 2)
    const prefix = "../".repeat(depth);
    return `${prefix}components/`;
  }

  async loadComponent(componentName, targetSelector) {
    const targetElement = document.querySelector(targetSelector);
    if (!targetElement) {
      return; // Silently exit if placeholder is not on the page
    }
    try {
      const response = await fetch(
        `${this.componentsPath}${componentName}.html`
      );
      if (!response.ok) throw new Error(`Failed to load ${componentName}`);
      const html = await response.text();
      targetElement.innerHTML = html;
      console.log(
        `✅ Loaded component: ${componentName} into ${targetSelector}`
      );
    } catch (error) {
      console.error(`❌ Error loading component ${componentName}:`, error);
    }
  }

  async loadAllComponents() {
    const componentPromises = [
      this.loadComponent("header", "#header-placeholder"),
      this.loadComponent("footer", "#footer-placeholder"),
      this.loadComponent("stats", "#stats-placeholder"),
      this.loadComponent("stats", "#stats-placeholder-about"),
    ];

    await Promise.all(componentPromises);
    this.postLoad();
  }

  postLoad() {
    // Re-initialize scripts that depend on the newly loaded header and footer
    if (window.navigationManager) window.navigationManager.init();
    if (window.themeManager) window.themeManager.reinitializeForComponents();

    // Specifically find the stats container on the about page and adjust its styles
    const aboutStatsContainer = document.getElementById(
      "stats-placeholder-about"
    );
    if (aboutStatsContainer && aboutStatsContainer.innerHTML.trim() !== "") {
      aboutStatsContainer.querySelectorAll(".text-4xl").forEach((el) => {
        el.classList.replace("text-4xl", "text-3xl");
      });
      aboutStatsContainer
        .querySelectorAll(".dark\\:text-gray-400")
        .forEach((el) => {
          el.classList.add("text-sm");
        });
    }
    this.onLoadCallback();
  }
}

// Ensure theme manager has the reinitialize function if it's defined
// if (window.ThemeManager) {
//   ThemeManager.prototype.reinitializeForComponents = function () {
//     this.themeToggle = document.getElementById("theme-toggle");
//     this.themeToggleMobile = document.getElementById("theme-toggle-mobile");
//     this.themeIcon = document.getElementById("theme-icon");
//     this.themeIconMobile = document.getElementById("theme-icon-mobile");
//     if (this.addEventListeners) this.addEventListeners();
//     if (this.updateToggleUI)
//       this.updateToggleUI(this.getCurrentTheme() === "dark");
//     console.log("🔄 Theme system reinitialized for loaded components");
//   };
// }

// Initialize everything when the document is ready
document.addEventListener("DOMContentLoaded", () => {
  // A small delay can help ensure all scripts have loaded before we run ours
  setTimeout(() => {
    // This function will be called AFTER components are loaded
    const onComponentsLoaded = () => {
      // 1. Initialize ThemeManager
      window.themeManager = new ThemeManager();
      window.themeManager.init(); // Manually call init() now

      // 2. Initialize NavigationManager
      window.navigationManager = new NavigationManager();
      window.navigationManager.init(); // Manually call init() now

      console.log("✅ All components and scripts initialized successfully.");
    };

    // Create and load components
    window.componentLoader = new ComponentLoader(onComponentsLoaded);
    window.componentLoader.loadAllComponents();
  }, 100);
});
