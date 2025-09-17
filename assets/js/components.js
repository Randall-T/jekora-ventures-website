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

// ============================================
// TEAM MODAL AND TABS LOGIC
// ============================================
function initializeTeamSection() {
  const tabs = document.querySelectorAll(".team-tab");
  const panels = document.querySelectorAll(".team-panel");
  const modal = document.getElementById("bio-modal");
  const modalContent = document.getElementById("bio-modal-content");

  if (!tabs.length || !modal) return; // Don't run if the elements aren't on the page

  // --- Tab Switching Logic ---
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      // Deactivate all tabs and panels
      tabs.forEach((t) => t.classList.remove("active"));
      panels.forEach((p) => p.classList.remove("active"));

      // Activate the clicked tab and corresponding panel
      const panelId = `${tab.dataset.tab}-panel`;
      const panel = document.getElementById(panelId);

      tab.classList.add("active");
      if (panel) {
        panel.classList.add("active");
      }
    });
  });

  // --- Modal Logic ---
  function openModal(name, title, image, bio) {
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
                    <div class="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
                        ${bio
                          .split("\n")
                          .map((p) => `<p>${p}</p>`)
                          .join("")}
                    </div>
                </div>
            </div>
        `;
    modal.classList.remove("hidden");
    setTimeout(() => {
      // For smooth transition
      modalContent.classList.remove("scale-95", "opacity-0");
    }, 50);

    document
      .getElementById("close-bio-modal")
      .addEventListener("click", closeModal);
  }

  function closeModal() {
    modalContent.classList.add("scale-95", "opacity-0");
    setTimeout(() => {
      // For smooth transition
      modal.classList.add("hidden");
      modalContent.innerHTML = "";
    }, 300);
  }

  // Event listeners for all "Read More" buttons
  document.body.addEventListener("click", function (e) {
    if (e.target.matches(".open-bio-modal")) {
      const button = e.target;
      openModal(
        button.dataset.name,
        button.dataset.title,
        button.dataset.image,
        button.dataset.bio
      );
    }
  });

  // Close modal on overlay click
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });
}

// Modify the existing onComponentsLoaded function to call our new function
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    const onComponentsLoaded = () => {
      window.themeManager = new ThemeManager();
      window.themeManager.init();

      window.navigationManager = new NavigationManager();
      window.navigationManager.init();

      // ADD THIS LINE
      initializeTeamSection();

      console.log("✅ All components and scripts initialized successfully.");
    };

    window.componentLoader = new ComponentLoader(onComponentsLoaded);
    window.componentLoader.loadAllComponents();
  }, 100);
});
