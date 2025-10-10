// ============================================
// BLOG IMAGE HANDLER SYSTEM
// ============================================

class BlogImageHandler {
  constructor() {
    this.lightboxOpen = false;
    this.currentImageIndex = 0;
    this.galleryImages = [];
  }

  init() {
    console.log("🖼️  Initializing blog image handler...");

    // Process all images in blog post content
    this.processContentImages();

    // Set up lightbox functionality
    this.setupLightbox();

    // Set up keyboard navigation
    this.setupKeyboardNavigation();

    console.log("✅ Blog image handler initialized");
  }

  processContentImages() {
    // Find all images in the prose content
    const proseContent = document.querySelector(".prose");
    if (!proseContent) return;

    const images = proseContent.querySelectorAll("img");

    images.forEach((img, index) => {
      // Skip if already processed
      if (img.dataset.processed) return;

      // Add click handler for lightbox
      img.style.cursor = "pointer";
      img.classList.add("hover:opacity-90", "transition-opacity");

      // Add visual indicator that image is clickable
      this.addClickIndicator(img);

      img.addEventListener("click", () => {
        this.openLightbox(index);
      });

      // Store image info
      this.galleryImages.push({
        src: img.src,
        alt: img.alt || "Blog image",
        caption: this.getImageCaption(img),
      });

      img.dataset.processed = "true";
      img.dataset.imageIndex = index;
    });

    // Group consecutive images into galleries if 3+
    this.createImageGalleries(proseContent);

    // Add hint if multiple images exist
    if (this.galleryImages.length > 1) {
      this.addImageNavigationHint();
    }
  }

  addClickIndicator(img) {
    // Wrap image in a container if not already in figure
    let container = img.closest("figure");
    if (!container) {
      container = img.parentElement;
    }

    // Add a zoom icon overlay that appears on hover
    const overlay = document.createElement("div");
    overlay.className = "image-click-indicator";
    overlay.innerHTML = `
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path>
            </svg>
            <span class="text-white text-sm font-medium mt-2">Click to enlarge</span>
        `;

    // Make container position relative if it's a figure
    if (container.tagName === "FIGURE") {
      container.style.position = "relative";
      container.appendChild(overlay);
    }
  }

  addImageNavigationHint() {
    const proseContent = document.querySelector(".prose");
    if (!proseContent) return;

    // Check if hint already exists
    if (document.querySelector(".image-navigation-hint")) return;

    // Add a subtle hint at the start of the article
    const hint = document.createElement("div");
    hint.className = "image-navigation-hint";
    hint.innerHTML = `
            <svg class="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            <span>This article contains ${this.galleryImages.length} images. Click any image to view in fullscreen.</span>
        `;

    // Insert at the beginning of prose content
    proseContent.insertBefore(hint, proseContent.firstChild);
  }

  createImageGalleries(container) {
    const figures = container.querySelectorAll("figure");
    let consecutiveFigures = [];

    figures.forEach((figure, index) => {
      const img = figure.querySelector("img");
      if (!img) return;

      consecutiveFigures.push(figure);

      // Check if next element is also a figure
      const nextElement = figure.nextElementSibling;
      const isNextFigure = nextElement && nextElement.tagName === "FIGURE";

      if (!isNextFigure || index === figures.length - 1) {
        // End of consecutive figures
        if (consecutiveFigures.length >= 3) {
          this.convertToGallery(consecutiveFigures);
        }
        consecutiveFigures = [];
      }
    });
  }

  convertToGallery(figures) {
    // Create gallery container
    const gallery = document.createElement("div");
    gallery.className =
      "image-gallery grid grid-cols-2 md:grid-cols-3 gap-4 my-8 rounded-lg";

    // Move figures into gallery
    const parent = figures[0].parentNode;
    figures.forEach((figure) => {
      // Simplify figure for gallery view
      const img = figure.querySelector("img");
      const caption = figure.querySelector("figcaption");

      const galleryItem = document.createElement("div");
      galleryItem.className =
        "gallery-item relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow";

      const clonedImg = img.cloneNode(true);
      clonedImg.className =
        "w-full h-48 object-cover cursor-pointer hover:scale-105 transition-transform duration-300";

      galleryItem.appendChild(clonedImg);

      if (caption) {
        const miniCaption = document.createElement("div");
        miniCaption.className =
          "absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white text-xs p-2";
        miniCaption.textContent = caption.textContent;
        galleryItem.appendChild(miniCaption);
      }

      gallery.appendChild(galleryItem);
    });

    // Replace first figure with gallery, remove others
    parent.insertBefore(gallery, figures[0]);
    figures.forEach((fig) => fig.remove());
  }

  getImageCaption(img) {
    const figure = img.closest("figure");
    if (figure) {
      const caption = figure.querySelector("figcaption");
      return caption ? caption.textContent : "";
    }
    return "";
  }

  setupLightbox() {
    // Create lightbox HTML
    const lightboxHTML = `
            <div id="image-lightbox" class="fixed inset-0 bg-black bg-opacity-95 z-[9999] hidden items-center justify-center p-4">
                <button id="lightbox-close" class="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 z-10">
                    &times;
                </button>
                
                <button id="lightbox-prev" class="absolute left-4 top-1/2 -translate-y-1/2 text-white text-5xl hover:text-gray-300 z-10">
                    ‹
                </button>
                
                <button id="lightbox-next" class="absolute right-4 top-1/2 -translate-y-1/2 text-white text-5xl hover:text-gray-300 z-10">
                    ›
                </button>
                
                <div class="max-w-6xl max-h-[90vh] flex flex-col items-center">
                    <img id="lightbox-image" src="" alt="" class="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl">
                    <div id="lightbox-caption" class="text-white text-center mt-4 text-lg"></div>
                    <div id="lightbox-counter" class="text-white text-sm mt-2 opacity-75"></div>
                </div>
            </div>
        `;

    document.body.insertAdjacentHTML("beforeend", lightboxHTML);

    // Add event listeners
    document
      .getElementById("lightbox-close")
      .addEventListener("click", () => this.closeLightbox());
    document
      .getElementById("lightbox-prev")
      .addEventListener("click", () => this.previousImage());
    document
      .getElementById("lightbox-next")
      .addEventListener("click", () => this.nextImage());

    // Close on backdrop click
    document.getElementById("image-lightbox").addEventListener("click", (e) => {
      if (e.target.id === "image-lightbox") {
        this.closeLightbox();
      }
    });
  }

  openLightbox(index) {
    this.currentImageIndex = index;
    this.lightboxOpen = true;

    const lightbox = document.getElementById("image-lightbox");
    const img = document.getElementById("lightbox-image");
    const caption = document.getElementById("lightbox-caption");
    const counter = document.getElementById("lightbox-counter");

    const imageData = this.galleryImages[index];

    img.src = imageData.src;
    img.alt = imageData.alt;
    caption.textContent = imageData.caption || imageData.alt;
    counter.textContent = `${index + 1} / ${this.galleryImages.length}`;

    lightbox.classList.remove("hidden");
    lightbox.classList.add("flex");

    // Prevent body scroll
    document.body.style.overflow = "hidden";
  }

  closeLightbox() {
    this.lightboxOpen = false;

    const lightbox = document.getElementById("image-lightbox");
    lightbox.classList.add("hidden");
    lightbox.classList.remove("flex");

    // Restore body scroll
    document.body.style.overflow = "";
  }

  nextImage() {
    this.currentImageIndex =
      (this.currentImageIndex + 1) % this.galleryImages.length;
    this.updateLightboxImage();
  }

  previousImage() {
    this.currentImageIndex =
      (this.currentImageIndex - 1 + this.galleryImages.length) %
      this.galleryImages.length;
    this.updateLightboxImage();
  }

  updateLightboxImage() {
    const img = document.getElementById("lightbox-image");
    const caption = document.getElementById("lightbox-caption");
    const counter = document.getElementById("lightbox-counter");

    const imageData = this.galleryImages[this.currentImageIndex];

    // Fade effect
    img.style.opacity = "0";
    setTimeout(() => {
      img.src = imageData.src;
      img.alt = imageData.alt;
      caption.textContent = imageData.caption || imageData.alt;
      counter.textContent = `${this.currentImageIndex + 1} / ${
        this.galleryImages.length
      }`;
      img.style.opacity = "1";
    }, 150);
  }

  setupKeyboardNavigation() {
    document.addEventListener("keydown", (e) => {
      if (!this.lightboxOpen) return;

      switch (e.key) {
        case "Escape":
          this.closeLightbox();
          break;
        case "ArrowLeft":
          this.previousImage();
          break;
        case "ArrowRight":
          this.nextImage();
          break;
      }
    });
  }
}

// Initialize on blog post pages
document.addEventListener("DOMContentLoaded", () => {
  // Only run on blog post pages (not on blog listing page)
  if (document.querySelector(".prose")) {
    setTimeout(() => {
      const imageHandler = new BlogImageHandler();
      imageHandler.init();
    }, 500);
  }
});
