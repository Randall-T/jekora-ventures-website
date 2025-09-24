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
      targetElement.innerHTML = await response.text();
    } catch (error) {
      console.error(`Error loading component ${componentName}:`, error);
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
    this.onLoadCallback();
  }
}

// ============================================
// TEAM MODAL AND TABS LOGIC
// ============================================
function initializeTeamSection() {
  // --- Tab Switching Logic ---
  const tabs = document.querySelectorAll(".team-tab");
  const panels = document.querySelectorAll(".team-panel");

  // Exit if team section elements aren't on the page
  if (!tabs.length) return;

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const targetPanelId = `${tab.dataset.tab}-panel`;
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      panels.forEach((panel) => {
        panel.style.display = "none";
        panel.classList.remove("active");
      });
      const targetPanel = document.getElementById(targetPanelId);
      if (targetPanel) {
        targetPanel.style.display = "grid";
        targetPanel.classList.add("active");
      }
    });
  });
}

// ============================================
// MAIN INITIALIZATION BLOCK
// ============================================
document.addEventListener("DOMContentLoaded", () => {
  const onComponentsLoaded = () => {
    // Initialize scripts that run on EVERY page
    if (window.ThemeManager) new ThemeManager().init();
    if (window.NavigationManager) new NavigationManager().init();

    // Initialize team section logic (it will only run if it finds the right elements)
    initializeTeamSection();

    console.log(
      "✅ Site-wide components and scripts initialized successfully."
    );
  };

  // Create and load components, which will trigger the callback above when done
  const componentLoader = new ComponentLoader(onComponentsLoaded);
  componentLoader.loadAllComponents();
});
