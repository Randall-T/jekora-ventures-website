// ============================================
// FAVICON INJECTOR
// ============================================
function addFavicon() {
  const faviconLink = document.createElement("link");
  faviconLink.rel = "icon";
  faviconLink.type = "image/png";
  const rootPath = window.location.pathname.split("/").slice(0, -2).join("/");
  faviconLink.href = `${rootPath}/assets/images/logos/logo_JVL_FAVICON.png`;
  document.head.appendChild(faviconLink);
}
addFavicon();

// ============================================
// COMPONENT LOADER SYSTEM
// ============================================
class ComponentLoader {
  constructor(onLoadCallback) {
    this.componentsPath = this.getComponentsPath();
    this.onLoadCallback = onLoadCallback || function () {};
  }

  getComponentsPath() {
    const path = window.location.pathname;
    let segments = path.split("/").filter(Boolean);
    if (
      segments.length > 0 &&
      segments[segments.length - 1].endsWith(".html")
    ) {
      segments.pop();
    }
    const depth = segments.length;
    if (depth === 0) {
      return "components/";
    }
    const prefix = "../".repeat(depth);
    return `${prefix}components/`;
  }

  async loadComponent(componentName, targetSelector) {
    const targetElement = document.querySelector(targetSelector);
    if (!targetElement) return;
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
    // Style the stats component on the 'about' page specifically
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

// CORRECTED: This is the definitive initialization block.
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    const onComponentsLoaded = () => {
      // 1. Initialize ThemeManager
      window.themeManager = new ThemeManager();
      window.themeManager.init(); // Manually call init() now

      // 2. Initialize NavigationManager
      window.navigationManager = new NavigationManager();
      window.navigationManager.init(); // Manually call init() now

      console.log("✅ All components and scripts initialized successfully.");
    };

    // Create and load components, passing in the function to run after.
    window.componentLoader = new ComponentLoader(onComponentsLoaded);
    window.componentLoader.loadAllComponents();
  }, 100);
});
