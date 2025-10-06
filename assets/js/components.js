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
// TEAM MODAL AND TABS LOGIC - IMPROVED
// ============================================
function initializeTeamSection() {
  const tabs = document.querySelectorAll(".team-tab");
  const panels = document.querySelectorAll(".team-panel");
  const modal = document.getElementById("bio-modal");
  const modalContent = document.getElementById("bio-modal-content");

  // Exit if team section elements aren't on the page
  if (!tabs.length || !modal) {
    console.log(
      "ℹ️ Team section not found on this page, skipping initialization"
    );
    return;
  }

  console.log("🔧 Initializing team tabs and modals...");

  // FIXED: Tab switching with proper state management
  tabs.forEach((tab) => {
    tab.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      const targetPanelId = `${tab.dataset.tab}-panel`;

      console.log(`Switching to panel: ${targetPanelId}`);

      // Remove active from all tabs
      tabs.forEach((t) => t.classList.remove("active"));

      // Add active to clicked tab
      tab.classList.add("active");

      // Hide all panels completely
      panels.forEach((panel) => {
        panel.style.display = "none";
        panel.classList.remove("active");
      });

      // Show target panel
      const targetPanel = document.getElementById(targetPanelId);
      if (targetPanel) {
        targetPanel.style.display = "grid";
        targetPanel.classList.add("active");
        console.log(`✅ Panel ${targetPanelId} is now visible`);
      } else {
        console.error(`❌ Panel ${targetPanelId} not found!`);
      }
    });
  });

  // Set first panel as active on load
  if (panels.length > 0) {
    panels[0].style.display = "grid";
    panels[0].classList.add("active");
    console.log("✅ First panel set as default");
  }

  // Modal functionality
  const openModal = (name, title, image, bio) => {
    // Handle both \n\n and actual line breaks
    const formattedBio = bio
      .replace(/\\n\\n/g, "</p><p>")
      .replace(/\n\n/g, "</p><p>")
      .replace(/\\n/g, "<br>")
      .replace(/\n/g, "<br>");

    modalContent.innerHTML = `
      <div class="flex justify-between items-center border-b pb-3 dark:border-gray-600 mb-6">
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white">${name}</h3>
          <button id="close-bio-modal" class="text-gray-400 hover:text-gray-600 dark:hover:text-white transition">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
      </div>
      <div class="flex flex-col md:flex-row gap-8">
          <div class="md:w-1/3 flex-shrink-0">
              <img src="${image}" alt="${name}" class="w-full rounded-lg shadow-md">
              <p class="text-lg font-semibold theme-organic mt-4 text-center">${title}</p>
          </div>
          <div class="md:w-2/3">
              <div class="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 text-justify">
                  <p>${formattedBio}</p>
              </div>
          </div>
      </div>`;

    modal.classList.remove("hidden");
    setTimeout(() => {
      modalContent.classList.remove("scale-95", "opacity-0");
      modalContent.classList.add("scale-100", "opacity-100");
    }, 10);

    document
      .getElementById("close-bio-modal")
      .addEventListener("click", closeModal);
  };

  const closeModal = () => {
    modalContent.classList.remove("scale-100", "opacity-100");
    modalContent.classList.add("scale-95", "opacity-0");
    setTimeout(() => {
      modal.classList.add("hidden");
      modalContent.innerHTML = "";
    }, 300);
  };

  // Event delegation for modal buttons
  document.body.addEventListener("click", (e) => {
    if (
      e.target.matches(".open-bio-modal") ||
      e.target.closest(".open-bio-modal")
    ) {
      e.preventDefault();
      e.stopPropagation();

      const btn = e.target.matches(".open-bio-modal")
        ? e.target
        : e.target.closest(".open-bio-modal");
      openModal(
        btn.dataset.name,
        btn.dataset.title,
        btn.dataset.image,
        btn.dataset.bio
      );
    }
  });

  // Close modal when clicking overlay
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  // Close modal with Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
      closeModal();
    }
  });

  console.log("✅ Team section initialized successfully");
}

// ============================================
// MAIN INITIALIZATION BLOCK
// ============================================
document.addEventListener("DOMContentLoaded", () => {
  console.log("🚀 Starting component initialization...");

  const onComponentsLoaded = () => {
    console.log("📦 Components loaded, initializing managers...");

    // Initialize ThemeManager
    if (window.ThemeManager) {
      new ThemeManager().init();
      console.log("✅ ThemeManager initialized");
    } else {
      console.warn("⚠️ ThemeManager not found");
    }

    // Initialize NavigationManager
    if (window.NavigationManager) {
      new NavigationManager().init();
      console.log("✅ NavigationManager initialized");
    } else {
      console.warn("⚠️ NavigationManager not found");
    }

    // Initialize team section logic (will only run if elements exist)
    initializeTeamSection();

    console.log("✅ All components and scripts initialized successfully");
  };

  // Create and load components
  const componentLoader = new ComponentLoader(onComponentsLoaded);
  componentLoader.loadAllComponents();
});
