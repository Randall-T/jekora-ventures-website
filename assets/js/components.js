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
  }

  getComponentsPath() {
    const path = window.location.pathname;
    // A more robust check for any subdirectory
    const isSubdirectory = path.split('/').filter(Boolean).length > 1;
    return isSubdirectory ? "../components/" : "components/";
  }

  async loadComponent(componentName, targetSelector) {
    const targetElement = document.querySelector(targetSelector);
    if (!targetElement) {
      return; // Silently exit if placeholder is not on the page
    }
    try {
      const response = await fetch(`${this.componentsPath}${componentName}.html`);
      if (!response.ok) throw new Error(`Failed to load ${componentName}`);
      const html = await response.text();
      targetElement.innerHTML = html;
      console.log(`✅ Loaded component: ${componentName} into ${targetSelector}`);
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
    const aboutStatsContainer = document.getElementById('stats-placeholder-about');
    if (aboutStatsContainer && aboutStatsContainer.innerHTML.trim() !== '') {
        aboutStatsContainer.querySelectorAll('.text-4xl').forEach(el => {
            el.classList.replace('text-4xl', 'text-3xl');
        });
         aboutStatsContainer.querySelectorAll('.dark\\:text-gray-400').forEach(el => {
            el.classList.add('text-sm');
        });
    }
  }
}

// Ensure theme manager has the reinitialize function if it's defined
if (window.ThemeManager) {
    ThemeManager.prototype.reinitializeForComponents = function() {
        this.themeToggle = document.getElementById("theme-toggle");
        this.themeToggleMobile = document.getElementById("theme-toggle-mobile");
        this.themeIcon = document.getElementById("theme-icon");
        this.themeIconMobile = document.getElementById("theme-icon-mobile");
        if(this.addEventListeners) this.addEventListeners();
        if(this.updateToggleUI) this.updateToggleUI(this.getCurrentTheme() === 'dark');
        console.log("🔄 Theme system reinitialized for loaded components");
    };
}


// Initialize everything when the document is ready
document.addEventListener("DOMContentLoaded", () => {
    // A small delay can help ensure all scripts have loaded before we run ours
    setTimeout(() => {
        window.componentLoader = new ComponentLoader();
        window.componentLoader.loadAllComponents();
    }, 100);
});