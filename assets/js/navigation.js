// ============================================
// NAVIGATION SYSTEM
// ============================================

class NavigationManager {
  constructor() {
    this.mobileMenuButton = document.getElementById("mobile-menu-button");
    this.mobileMenu = document.getElementById("mobile-menu");
    this.navLinks = document.querySelectorAll(".nav-link");

    this.init();
  }

  init() {
    this.setupMobileMenu();
    this.setActiveNavigation();
    this.setupClickOutside();
  }

  // Mobile menu toggle
  setupMobileMenu() {
    if (this.mobileMenuButton && this.mobileMenu) {
      this.mobileMenuButton.addEventListener("click", () => {
        this.toggleMobileMenu();
      });

      // Close mobile menu when clicking on links
      const mobileLinks = this.mobileMenu.querySelectorAll("a");
      mobileLinks.forEach((link) => {
        link.addEventListener("click", () => {
          this.closeMobileMenu();
        });
      });
    }
  }

  toggleMobileMenu() {
    this.mobileMenu.classList.toggle("hidden");

    // Update button icon
    const isOpen = !this.mobileMenu.classList.contains("hidden");
    this.updateMobileMenuIcon(isOpen);
  }

  closeMobileMenu() {
    this.mobileMenu.classList.add("hidden");
    this.updateMobileMenuIcon(false);
  }

  updateMobileMenuIcon(isOpen) {
    const buttonSvg = this.mobileMenuButton.querySelector("svg path");
    if (buttonSvg) {
      if (isOpen) {
        // X icon
        buttonSvg.setAttribute("d", "M6 18L18 6M6 6l12 12");
      } else {
        // Hamburger icon
        buttonSvg.setAttribute("d", "M4 6h16M4 12h16M4 18h16");
      }
    }
  }

  // Set active navigation based on current page
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

    // Update all navigation links, including the new button
    const allNavLinks = document.querySelectorAll("[data-page]");
    allNavLinks.forEach((link) => {
      link.classList.remove("active", "font-semibold");
      if (!link.classList.contains("btn-primary")) {
        link.classList.add("font-medium");
      }

      // Set active state
      if (link.dataset.page === currentPage) {
        if (!link.classList.contains("btn-primary")) {
          link.classList.add("active", "font-semibold");
          link.classList.remove("font-medium");
        }
      }
    });
  }

  // Close mobile menu when clicking outside
  setupClickOutside() {
    document.addEventListener("click", (e) => {
      if (this.mobileMenu && !this.mobileMenu.classList.contains("hidden")) {
        const isClickInsideMenu = this.mobileMenu.contains(e.target);
        const isClickOnButton = this.mobileMenuButton.contains(e.target);

        if (!isClickInsideMenu && !isClickOnButton) {
          this.closeMobileMenu();
        }
      }
    });
  }
}

// ============================================
// SMOOTH SCROLL FUNCTIONALITY
// ============================================
function initSmoothScroll() {
  // Add smooth scrolling to internal links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
}

// ============================================
// INITIALIZE ON DOM LOAD
// ============================================
document.addEventListener("DOMContentLoaded", function () {
  // Initialize navigation
  window.navigationManager = new NavigationManager();

  // Initialize smooth scroll
  initSmoothScroll();

  console.log("✅ Navigation system initialized");
});
