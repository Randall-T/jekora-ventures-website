// ============================================
// FAVICON INJECTOR
// ============================================

function addFavicon() {
  const faviconLink = document.createElement("link");
  faviconLink.rel = "icon";
  faviconLink.type = "image/logos/png";
  // Assuming your favicon is at assets/images/logos/logo_JVL_FAVICON.png
  // The path starts with "/" to make sure it works from any page (e.g., /about/ or /contact/)
  faviconLink.href = "/assets/images/logos/logo_JVL_FAVICON.png";
  document.head.appendChild(faviconLink);
  console.log("✅ Favicon added to the page.");
}

// Run the function to add the favicon
addFavicon();

// ============================================
// COMPONENT LOADER SYSTEM
// ============================================

class ComponentLoader {
  constructor() {
    this.componentsPath = this.getComponentsPath();
    this.loadedComponents = new Set();
  }

  // Determine correct path to components based on current page location
  getComponentsPath() {
    const currentPath = window.location.pathname;

    // If we're in a subdirectory (like /about/), go up one level
    if (
      currentPath.includes("/about/") ||
      currentPath.includes("/services/") ||
      currentPath.includes("/media/") ||
      currentPath.includes("/blog/") ||
      currentPath.includes("/contact/") ||
      currentPath.includes("/register/")
    ) {
      return "../components/";
    }

    // If we're at root level
    return "components/";
  }

  // Load a component and insert it into target element
  async loadComponent(componentName, targetSelector) {
    try {
      const response = await fetch(
        `${this.componentsPath}${componentName}.html`
      );

      if (!response.ok) {
        throw new Error(
          `Failed to load ${componentName}: ${response.statusText}`
        );
      }

      const html = await response.text();
      const targetElement = document.querySelector(targetSelector);

      if (!targetElement) {
        throw new Error(`Target element ${targetSelector} not found`);
      }

      targetElement.innerHTML = html;
      this.loadedComponents.add(componentName);

      console.log(`✅ Loaded component: ${componentName}`);
      return true;
    } catch (error) {
      console.error(`❌ Error loading component ${componentName}:`, error);
      return false;
    }
  }

  // Load all standard components
  async loadAllComponents() {
    const components = [
      { name: "header", target: "#header-placeholder" },
      { name: "footer", target: "#footer-placeholder" },
    ];

    const promises = components.map((component) =>
      this.loadComponent(component.name, component.target)
    );

    const results = await Promise.all(promises);
    const successCount = results.filter((result) => result).length;

    console.log(`✅ Loaded ${successCount}/${components.length} components`);

    // Initialize components after loading
    this.initializeLoadedComponents();

    return successCount === components.length;
  }

  // Initialize functionality for loaded components
  initializeLoadedComponents() {
    // Set active navigation states
    this.setActiveNavigation();

    // Reinitialize theme system for new elements
    this.reinitializeThemeSystem();

    // Reinitialize navigation system for new elements
    this.reinitializeNavigationSystem();
  }

  // Reinitialize theme system after components load
  reinitializeThemeSystem() {
    if (window.themeManager) {
      // Update theme manager references to new DOM elements
      window.themeManager.themeToggle = document.getElementById("theme-toggle");
      window.themeManager.themeToggleMobile = document.getElementById(
        "theme-toggle-mobile"
      );
      window.themeManager.themeIcon = document.getElementById("theme-icon");
      window.themeManager.themeIconMobile =
        document.getElementById("theme-icon-mobile");

      // Get current theme and update new UI elements
      const currentTheme = window.themeManager.getCurrentTheme();
      const isDark = currentTheme === "dark";

      // Update toggle UI
      if (window.themeManager.themeToggle) {
        if (isDark) {
          window.themeManager.themeToggle.classList.add("dark");
        } else {
          window.themeManager.themeToggle.classList.remove("dark");
        }
      }

      if (window.themeManager.themeToggleMobile) {
        if (isDark) {
          window.themeManager.themeToggleMobile.classList.add("dark");
        } else {
          window.themeManager.themeToggleMobile.classList.remove("dark");
        }
      }

      // Update icons
      const newIcon = isDark ? "☀️" : "🌙";
      if (window.themeManager.themeIcon)
        window.themeManager.themeIcon.textContent = newIcon;
      if (window.themeManager.themeIconMobile)
        window.themeManager.themeIconMobile.textContent = newIcon;

      // Re-add event listeners
      if (window.themeManager.themeToggle) {
        window.themeManager.themeToggle.addEventListener("click", () =>
          window.themeManager.toggleTheme()
        );
      }
      if (window.themeManager.themeToggleMobile) {
        window.themeManager.themeToggleMobile.addEventListener("click", () =>
          window.themeManager.toggleTheme()
        );
      }

      console.log("🔄 Theme system reinitialized for loaded components");
    }
  }

  // Reinitialize navigation system after components load
  reinitializeNavigationSystem() {
    if (window.navigationManager) {
      // Update navigation manager references
      window.navigationManager.mobileMenuButton =
        document.getElementById("mobile-menu-button");
      window.navigationManager.mobileMenu =
        document.getElementById("mobile-menu");
      window.navigationManager.navLinks =
        document.querySelectorAll(".nav-link");

      // Re-setup mobile menu functionality
      if (
        window.navigationManager.mobileMenuButton &&
        window.navigationManager.mobileMenu
      ) {
        window.navigationManager.mobileMenuButton.addEventListener(
          "click",
          () => {
            window.navigationManager.mobileMenu.classList.toggle("hidden");
          }
        );

        // Close mobile menu when clicking on links
        const mobileLinks =
          window.navigationManager.mobileMenu.querySelectorAll("a");
        mobileLinks.forEach((link) => {
          link.addEventListener("click", () => {
            window.navigationManager.mobileMenu.classList.add("hidden");
          });
        });
      }

      console.log("🔄 Navigation system reinitialized for loaded components");
    }
  }

  // Set active navigation state based on current page
  setActiveNavigation() {
    const currentPath = window.location.pathname;
    let currentPage = "home";

    // Determine current page
    if (currentPath.includes("/about")) currentPage = "about";
    else if (currentPath.includes("/services")) currentPage = "services";
    else if (currentPath.includes("/media")) currentPage = "media";
    else if (currentPath.includes("/blog")) currentPage = "blog";
    else if (currentPath.includes("/contact")) currentPage = "contact";
    else if (currentPath.includes("/register")) currentPage = "register";

    // Update navigation links
    const navLinks = document.querySelectorAll(".nav-link, .mobile-nav-link");
    navLinks.forEach((link) => {
      const page = link.dataset.page;

      // Remove all active classes
      link.classList.remove("active", "font-semibold", "text-gray-900");
      link.classList.add("font-medium");

      // Add active class if this is the current page
      if (page === currentPage) {
        link.classList.add("active", "font-semibold", "text-gray-900");
        link.classList.remove("font-medium", "text-gray-700");
      }
    });

    console.log(`📍 Set active navigation: ${currentPage}`);
  }
}

// ============================================
// ENHANCED THEME MANAGER (for components)
// ============================================

// Extend the existing ThemeManager to handle component reloading
if (window.ThemeManager) {
  window.ThemeManager.prototype.reinitialize = function () {
    // Reinitialize theme toggle elements after component loading
    this.themeToggle = document.getElementById("theme-toggle");
    this.themeToggleMobile = document.getElementById("theme-toggle-mobile");
    this.themeIcon = document.getElementById("theme-icon");
    this.themeIconMobile = document.getElementById("theme-icon-mobile");

    // Reapply current theme to new elements
    const currentTheme = this.getCurrentTheme();
    this.updateToggleUI(currentTheme === "dark");

    // Re-add event listeners
    this.addEventListeners();

    console.log("🔄 Theme manager reinitialized for components");
  };
}

// ============================================
// ENHANCED NAVIGATION MANAGER (for components)
// ============================================

// Extend NavigationManager to handle component reloading
if (window.NavigationManager) {
  window.NavigationManager.prototype.reinitialize = function () {
    // Reinitialize mobile menu elements
    this.mobileMenuButton = document.getElementById("mobile-menu-button");
    this.mobileMenu = document.getElementById("mobile-menu");
    this.navLinks = document.querySelectorAll(".nav-link");

    // Re-setup all functionality
    this.setupMobileMenu();
    this.setupClickOutside();

    console.log("🔄 Navigation manager reinitialized for components");
  };
}

// ============================================
// AUTO-LOAD COMPONENTS ON PAGE LOAD
// ============================================

document.addEventListener("DOMContentLoaded", async function () {
  // Wait a bit for other scripts to initialize
  setTimeout(async () => {
    // Create component loader
    window.componentLoader = new ComponentLoader();

    // Load all components
    const success = await window.componentLoader.loadAllComponents();

    if (success) {
      console.log("✅ All components loaded and initialized successfully");

      // Initialize other systems after components are loaded
      // (Theme and navigation managers will be reinitialized automatically)
    } else {
      console.warn("⚠️ Some components failed to load");
    }
  }, 100); // Small delay to ensure other scripts are ready
});
