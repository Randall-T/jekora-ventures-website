// ============================================
// NAVIGATION SYSTEM
// ============================================

class NavigationManager {
  constructor() {
    // Properties are defined here, but not initialized
    this.mobileMenuButton = null;
    this.mobileMenu = null;
  }

  init() {
    // CORRECTED: Find elements inside init(), not the constructor
    this.mobileMenuButton = document.getElementById("mobile-menu-button");
    this.mobileMenu = document.getElementById("mobile-menu");

    this.setupMobileMenu();
    this.setActiveNavigation();
    this.setupClickOutside();
    initSmoothScroll(); // Initialize smooth scroll here
    console.log("✅ Navigation system initialized");
  }

  // Mobile menu toggle
  setupMobileMenu() {
    if (this.mobileMenuButton && this.mobileMenu) {
      this.mobileMenuButton.addEventListener("click", () => {
        this.toggleMobileMenu();
      });

      const mobileLinks = this.mobileMenu.querySelectorAll("a");
      mobileLinks.forEach((link) => {
        link.addEventListener("click", () => {
          this.closeMobileMenu();
        });
      });
    }
  }

  toggleMobileMenu() {
    const isOpen = this.mobileMenu.classList.toggle("hidden");
    this.updateMobileMenuIcon(!isOpen);
  }

  closeMobileMenu() {
    this.mobileMenu.classList.add("hidden");
    this.updateMobileMenuIcon(false);
  }

  updateMobileMenuIcon(isOpen) {
    if (!this.mobileMenuButton) return;
    const buttonSvg = this.mobileMenuButton.querySelector("svg path");
    if (buttonSvg) {
      buttonSvg.setAttribute(
        "d",
        isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
      );
    }
  }

  // Set active navigation
  setActiveNavigation() {
    const currentPath = window.location.pathname;
    let currentPage = "home";

    if (currentPath.includes("/about")) currentPage = "about";
    else if (currentPath.includes("/services")) currentPage = "services";
    else if (currentPath.includes("/media")) currentPage = "media";
    else if (currentPath.includes("/blog")) currentPage = "blog";
    else if (currentPath.includes("/contact")) currentPage = "contact";
    else if (currentPath.includes("/register")) currentPage = "register";

    const allNavLinks = document.querySelectorAll("[data-page]");
    allNavLinks.forEach((link) => {
      link.classList.remove("active", "font-semibold");
      if (link.dataset.page === currentPage) {
        link.classList.add("active", "font-semibold");
      }
    });
  }

  // Close menu on outside click
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
