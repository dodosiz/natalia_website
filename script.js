// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // ========================================
  // Mobile Navigation
  // ========================================
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
    });

    // Close menu when clicking on a link
    document.querySelectorAll(".nav-menu a").forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
      });
    });
  }

  // ========================================
  // Hero Slider
  // ========================================
  class Slider {
    constructor(sliderElement, options = {}) {
      this.slider = sliderElement;
      this.slides = sliderElement.querySelectorAll(".hero-slide");
      this.prevBtn = sliderElement.querySelector(".slider-btn.prev");
      this.nextBtn = sliderElement.querySelector(".slider-btn.next");
      this.dotsContainer = sliderElement.querySelector(".slider-dots");
      this.currentSlide = 0;
      this.autoPlayInterval = options.autoPlay || 5000;
      this.autoPlayTimer = null;

      this.init();
    }

    init() {
      this.createDots();
      if (this.prevBtn && this.nextBtn) {
        this.prevBtn.addEventListener("click", () => this.prevSlide());
        this.nextBtn.addEventListener("click", () => this.nextSlide());
      }
      this.startAutoPlay();

      // Pause on hover
      this.slider.addEventListener("mouseenter", () => this.stopAutoPlay());
      this.slider.addEventListener("mouseleave", () => this.startAutoPlay());
    }

    createDots() {
      if (!this.dotsContainer) return;
      this.slides.forEach((_, index) => {
        const dot = document.createElement("div");
        dot.classList.add("slider-dot");
        if (index === 0) dot.classList.add("active");
        dot.addEventListener("click", () => this.goToSlide(index));
        this.dotsContainer.appendChild(dot);
      });
    }

    goToSlide(index) {
      this.slides[this.currentSlide].classList.remove("active");
      if (
        this.dotsContainer &&
        this.dotsContainer.children[this.currentSlide]
      ) {
        this.dotsContainer.children[this.currentSlide].classList.remove(
          "active",
        );
      }

      this.currentSlide = index;

      this.slides[this.currentSlide].classList.add("active");
      if (
        this.dotsContainer &&
        this.dotsContainer.children[this.currentSlide]
      ) {
        this.dotsContainer.children[this.currentSlide].classList.add("active");
      }
    }

    nextSlide() {
      const next = (this.currentSlide + 1) % this.slides.length;
      this.goToSlide(next);
    }

    prevSlide() {
      const prev =
        (this.currentSlide - 1 + this.slides.length) % this.slides.length;
      this.goToSlide(prev);
    }

    startAutoPlay() {
      this.autoPlayTimer = setInterval(
        () => this.nextSlide(),
        this.autoPlayInterval,
      );
    }

    stopAutoPlay() {
      clearInterval(this.autoPlayTimer);
    }
  }

  // Initialize hero slider
  const heroElement = document.querySelector(".hero");
  if (heroElement) {
    const heroSlider = new Slider(heroElement, {
      autoPlay: 5000,
    });
  }

  // ========================================
  // Lightbox
  // ========================================
  const lightbox = document.getElementById("lightbox");
  const lightboxClose = document.querySelector(".lightbox-close");
  const lightboxImg = lightbox ? lightbox.querySelector("img") : null;
  const lightboxTitle = lightbox ? lightbox.querySelector("h3") : null;
  const lightboxDesc = lightbox ? lightbox.querySelector("p") : null;

  // Close lightbox
  if (lightboxClose && lightbox) {
    lightboxClose.addEventListener("click", () => {
      lightbox.classList.remove("active");
      document.body.style.overflow = "auto";
    });

    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) {
        lightbox.classList.remove("active");
        document.body.style.overflow = "auto";
      }
    });
  }

  // ========================================
  // Smooth Scroll & Active Navigation
  // ========================================
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-menu a");

  function setActiveNav() {
    const scrollY = window.pageYOffset;

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 100;
      const sectionId = section.getAttribute("id");

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  if (sections.length > 0 && navLinks.length > 0) {
    window.addEventListener("scroll", setActiveNav);
  }

  // ========================================
  // Scroll Animations
  // ========================================
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observe skill items for animation
  document.querySelectorAll(".skill-item").forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });

  // ========================================
  // Navbar Scroll Effect
  // ========================================
  let lastScroll = 0;
  const navbar = document.querySelector(".navbar");

  if (navbar) {
    window.addEventListener("scroll", () => {
      const currentScroll = window.pageYOffset;

      if (currentScroll > 100) {
        navbar.style.background = "rgba(255, 255, 255, 0.98)";
        navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
      } else {
        navbar.style.background = "rgba(255, 255, 255, 0.98)";
        navbar.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.1)";
      }

      lastScroll = currentScroll;
    });
  }

  // ========================================
  // Logo Animation
  // ========================================
  const logo = document.querySelector(".logo-text");

  if (logo) {
    logo.addEventListener("mouseenter", () => {
      logo.style.transform = "scale(1.05)";
      logo.style.transition = "transform 0.3s ease";
    });

    logo.addEventListener("mouseleave", () => {
      logo.style.transform = "scale(1)";
    });
  }

  // ========================================
  // Portfolio Booklet Viewer
  // ========================================
  // Set up PDF.js worker
  if (typeof pdfjsLib !== "undefined") {
    pdfjsLib.GlobalWorkerOptions.workerSrc =
      "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

    // State management
    let pdfDoc = null;
    let currentSpread = 0; // 0 means pages 1-2, 1 means pages 3-4, etc.
    let totalPages = 0;
    let isAnimating = false;
    let pageCache = new Map(); // Cache rendered pages
    const devicePixelRatio = window.devicePixelRatio || 1;

    // Canvas elements
    const canvasLeft = document.getElementById("portfolio-canvas-left");
    const canvasRight = document.getElementById("portfolio-canvas-right");
    const ctxLeft = canvasLeft ? canvasLeft.getContext("2d") : null;
    const ctxRight = canvasRight ? canvasRight.getContext("2d") : null;

    // Controls
    const prevBtn = document.getElementById("portfolio-prev-btn");
    const nextBtn = document.getElementById("portfolio-next-btn");
    const pageInfo = document.getElementById("portfolio-page-info");
    const book = document.getElementById("portfolio-book");
    const loadingOverlay = document.getElementById("portfolio-loading-overlay");
    const loadingPercentage = document.getElementById(
      "portfolio-loading-percentage",
    );
    const pageJumpInput = document.getElementById("portfolio-page-jump");
    const jumpBtn = document.getElementById("portfolio-jump-btn");

    // Hide loading overlay
    function hideLoading() {
      if (loadingOverlay) {
        loadingOverlay.style.opacity = "0";
        setTimeout(() => {
          loadingOverlay.style.display = "none";
        }, 300);
      }
    }

    // Show loading overlay
    function showLoading() {
      if (loadingOverlay) {
        loadingOverlay.style.display = "flex";
        loadingOverlay.style.opacity = "1";
      }
    }

    // Load PDF
    async function loadPortfolioPDF() {
      try {
        showLoading();
        // Use S3 hosted PDF file
        const pdfPath =
          "https://natalia-portfolio-files.s3.eu-central-1.amazonaws.com/file.pdf";
        const loadingTask = pdfjsLib.getDocument({
          url: pdfPath,
          cMapUrl: "https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/cmaps/",
          cMapPacked: true,
        });

        // Track loading progress
        loadingTask.onProgress = function (progress) {
          if (progress.total > 0 && loadingPercentage) {
            const percent = Math.round(
              (progress.loaded / progress.total) * 100,
            );
            loadingPercentage.textContent = `${percent}%`;
          }
        };

        pdfDoc = await loadingTask.promise;
        totalPages = pdfDoc.numPages;

        console.log(`PDF loaded successfully. Total pages: ${totalPages}`);

        // Render initial spread
        await renderSpread(currentSpread);
        updateControls();
        updatePageJumpMax();
        hideLoading();
      } catch (error) {
        console.error("Error loading PDF:", error);
        hideLoading();
        if (pageInfo) {
          pageInfo.textContent = "Portfolio PDF not found";
          pageInfo.style.color = "#999";
        }
      }
    }

    // Render a page on a canvas
    async function renderPage(pageNum, canvas, ctx) {
      if (!canvas || !ctx || !book) return;

      if (pageNum < 1 || pageNum > totalPages) {
        // Clear canvas if page doesn't exist
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return;
      }

      // Check cache first
      const cacheKey = `page_${pageNum}`;
      if (pageCache.has(cacheKey)) {
        const cached = pageCache.get(cacheKey);
        canvas.width = cached.width;
        canvas.height = cached.height;
        ctx.drawImage(cached.canvas, 0, 0);
        return;
      }

      try {
        const page = await pdfDoc.getPage(pageNum);

        // Calculate scale to fit the page in the canvas at 100% zoom
        const viewport = page.getViewport({ scale: 1.0 });

        // Calculate the scale to fill the half-book width completely
        const bookHalfWidth = book.offsetWidth / 2;
        const bookHeight = book.offsetHeight;

        const scaleX = bookHalfWidth / viewport.width;
        const scaleY = bookHeight / viewport.height;
        const baseScale = Math.min(scaleX, scaleY); // Fill container completely

        // Multiply by device pixel ratio for high-quality rendering
        const scale = baseScale * devicePixelRatio;

        const scaledViewport = page.getViewport({ scale });

        // Set canvas internal size (high resolution)
        canvas.width = scaledViewport.width;
        canvas.height = scaledViewport.height;

        // Set canvas display size to match container exactly
        canvas.style.width = `${bookHalfWidth}px`;
        canvas.style.height = `${bookHeight}px`;

        // Enable high-quality rendering
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";

        const renderContext = {
          canvasContext: ctx,
          viewport: scaledViewport,
        };

        await page.render(renderContext).promise;

        // Cache the rendered page
        const cacheCanvas = document.createElement("canvas");
        cacheCanvas.width = canvas.width;
        cacheCanvas.height = canvas.height;
        const cacheCtx = cacheCanvas.getContext("2d");
        cacheCtx.drawImage(canvas, 0, 0);

        pageCache.set(cacheKey, {
          canvas: cacheCanvas,
          width: canvas.width,
          height: canvas.height,
        });

        // Limit cache size to prevent memory issues (keep last 8 pages)
        if (pageCache.size > 8) {
          const firstKey = pageCache.keys().next().value;
          pageCache.delete(firstKey);
        }
      } catch (error) {
        console.error(`Error rendering page ${pageNum}:`, error);
      }
    }

    // Render current spread (two pages)
    async function renderSpread(spreadIndex) {
      if (!pdfDoc) return;

      let leftPageNum, rightPageNum;

      if (spreadIndex === 0) {
        // First spread: show cover (page 1) on right side only
        leftPageNum = 0; // No page on left
        rightPageNum = 1;
      } else {
        // Subsequent spreads: pages 2-3, 4-5, 6-7, etc.
        leftPageNum = spreadIndex * 2;
        rightPageNum = spreadIndex * 2 + 1;
      }

      // Render both pages in parallel
      await Promise.all([
        renderPage(leftPageNum, canvasLeft, ctxLeft),
        renderPage(rightPageNum, canvasRight, ctxRight),
      ]);

      // Preload next spread for smoother navigation
      preloadSpread(spreadIndex + 1);
    }

    // Preload pages without rendering to canvas (for caching)
    async function preloadSpread(spreadIndex) {
      let leftPageNum, rightPageNum;

      if (spreadIndex === 0) {
        leftPageNum = 0;
        rightPageNum = 1;
      } else {
        leftPageNum = spreadIndex * 2;
        rightPageNum = spreadIndex * 2 + 1;
      }

      if (rightPageNum > totalPages) return;

      // Create temporary canvases for preloading
      const tempCanvas = document.createElement("canvas");
      const tempCtx = tempCanvas.getContext("2d");

      // Preload pages in background (non-blocking)
      setTimeout(async () => {
        try {
          await renderPage(leftPageNum, tempCanvas, tempCtx);
          if (rightPageNum <= totalPages) {
            await renderPage(rightPageNum, tempCanvas, tempCtx);
          }
        } catch (error) {
          console.log("Preload failed (non-critical):", error);
        }
      }, 100);
    }

    // Update controls state
    function updateControls() {
      if (!pageInfo || !prevBtn || !nextBtn || !pdfDoc) return;

      let leftPageNum, rightPageNum;

      if (currentSpread === 0) {
        // Cover page
        leftPageNum = 0;
        rightPageNum = 1;
      } else {
        leftPageNum = currentSpread * 2;
        rightPageNum = currentSpread * 2 + 1;
      }

      // Update page info
      if (currentSpread === 0) {
        pageInfo.textContent = `Page 1 of ${totalPages}`;
      } else if (rightPageNum <= totalPages) {
        pageInfo.textContent = `Pages ${leftPageNum}-${rightPageNum} of ${totalPages}`;
      } else if (leftPageNum <= totalPages) {
        pageInfo.textContent = `Page ${leftPageNum} of ${totalPages}`;
      }

      // Update button states
      prevBtn.disabled = currentSpread === 0;
      nextBtn.disabled = rightPageNum >= totalPages;
    }

    // Turn to next spread
    async function nextSpread() {
      if (isAnimating || !book || !pdfDoc) return;

      const nextSpreadIndex = currentSpread + 1;
      const nextRightPage = nextSpreadIndex === 0 ? 1 : nextSpreadIndex * 2 + 1;
      if (nextRightPage > totalPages) return;

      isAnimating = true;
      book.classList.add("turning-next");

      setTimeout(async () => {
        currentSpread++;
        await renderSpread(currentSpread);
        book.classList.remove("turning-next");
        updateControls();
        isAnimating = false;
      }, 500); // Mid-animation (matches 1s animation / 2)
    }

    // Turn to previous spread
    async function prevSpread() {
      if (isAnimating || !book || !pdfDoc) return;
      if (currentSpread === 0) return;

      isAnimating = true;
      book.classList.add("turning-prev");

      setTimeout(async () => {
        currentSpread--;
        await renderSpread(currentSpread);
        book.classList.remove("turning-prev");
        updateControls();
        isAnimating = false;
      }, 500); // Mid-animation (matches 1s animation / 2)
    }

    // Jump to page functionality
    function jumpToPage() {
      if (!pdfDoc) return;

      const pageNum = parseInt(pageJumpInput.value);

      if (!pageNum || pageNum < 1 || pageNum > totalPages) {
        alert(`Please enter a valid page number between 1 and ${totalPages}`);
        return;
      }

      // Calculate which spread contains this page
      // Page 1 -> spread 0, Page 2-3 -> spread 1, Page 4-5 -> spread 2, etc.
      const targetSpread = Math.floor((pageNum - 1) / 2);

      if (targetSpread !== currentSpread) {
        currentSpread = targetSpread;
        renderSpread(currentSpread);
        updateControls();
      }

      // Clear input after jump
      pageJumpInput.value = "";
    }

    // Update max attribute when PDF loads
    function updatePageJumpMax() {
      if (pageJumpInput && totalPages > 0) {
        pageJumpInput.setAttribute("max", totalPages);
      }
    }

    // Event listeners
    if (prevBtn) prevBtn.addEventListener("click", prevSpread);
    if (nextBtn) nextBtn.addEventListener("click", nextSpread);

    // Jump button event listeners
    if (jumpBtn) jumpBtn.addEventListener("click", jumpToPage);
    if (pageJumpInput) {
      pageJumpInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          jumpToPage();
        }
      });
    }

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
      // Only handle keys when portfolio section is in view
      const portfolioSection = document.getElementById("portfolio");
      if (!portfolioSection || !pdfDoc) return;

      const rect = portfolioSection.getBoundingClientRect();
      const isInView = rect.top < window.innerHeight && rect.bottom > 0;

      if (isInView) {
        if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
          prevSpread();
        } else if (e.key === "ArrowRight" || e.key === "ArrowDown") {
          nextSpread();
        }
      }
    });

    // Touch gesture support for mobile
    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;

    const minSwipeDistance = 50; // Minimum distance for a swipe to be registered

    if (book) {
      book.addEventListener(
        "touchstart",
        (e) => {
          touchStartX = e.changedTouches[0].screenX;
          touchStartY = e.changedTouches[0].screenY;
        },
        { passive: true },
      );

      book.addEventListener(
        "touchend",
        (e) => {
          touchEndX = e.changedTouches[0].screenX;
          touchEndY = e.changedTouches[0].screenY;
          handleSwipe();
        },
        { passive: true },
      );
    }

    function handleSwipe() {
      const deltaX = touchEndX - touchStartX;
      const deltaY = touchEndY - touchStartY;

      // Check if horizontal swipe is more significant than vertical
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (Math.abs(deltaX) > minSwipeDistance) {
          if (deltaX > 0) {
            // Swipe right - go to previous page
            prevSpread();
          } else {
            // Swipe left - go to next page
            nextSpread();
          }
        }
      }
    }

    // Window resize handler
    let resizeTimeout;
    window.addEventListener("resize", () => {
      if (!pdfDoc) return;
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        renderSpread(currentSpread);
      }, 250);
    });

    // Prevent double-tap zoom on mobile
    let lastTouchEnd = 0;
    document.addEventListener(
      "touchend",
      (e) => {
        const now = Date.now();
        if (now - lastTouchEnd <= 300) {
          e.preventDefault();
        }
        lastTouchEnd = now;
      },
      { passive: false },
    );

    // Lazy load PDF when portfolio section comes into view
    if (canvasLeft && canvasRight && book) {
      const portfolioSection = document.getElementById("portfolio");
      if (portfolioSection) {
        const portfolioObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting && !pdfDoc) {
                loadPortfolioPDF();
                portfolioObserver.disconnect();
              }
            });
          },
          { threshold: 0.1 },
        );
        portfolioObserver.observe(portfolioSection);
      }
    }
  }
}); // End of DOMContentLoaded

// ========================================
// Projects Section
// ========================================
document.addEventListener("DOMContentLoaded", function () {
  const projectsGrid = document.getElementById("projects-grid");
  const projectsLoading = document.getElementById("projects-loading");
  const noResults = document.getElementById("no-results");
  const filterButtons = document.querySelectorAll(".filter-btn");

  let allProjects = [];
  let currentFilter = "all";

  // Load projects from JSON
  async function loadProjects() {
    try {
      if (projectsLoading) projectsLoading.style.display = "flex";
      if (noResults) noResults.style.display = "none";

      const response = await fetch("data/projects.json");
      const data = await response.json();
      allProjects = data.projects;

      if (projectsLoading) projectsLoading.style.display = "none";
      renderProjects(allProjects);
    } catch (error) {
      console.error("Error loading projects:", error);
      if (projectsLoading) projectsLoading.style.display = "none";
      if (projectsGrid) {
        projectsGrid.innerHTML =
          '<p style="text-align: center; color: #666;">Error loading projects. Please try again later.</p>';
      }
    }
  }

  // Render projects to the grid
  function renderProjects(projects) {
    if (!projectsGrid) return;

    projectsGrid.innerHTML = "";

    if (projects.length === 0) {
      if (noResults) noResults.style.display = "block";
      return;
    }

    if (noResults) noResults.style.display = "none";

    projects.forEach((project, index) => {
      const projectCard = createProjectCard(project, index);
      projectsGrid.appendChild(projectCard);
    });
  }

  // Create project card element
  function createProjectCard(project, index) {
    const card = document.createElement("div");
    card.className = "project-card";
    card.style.animationDelay = `${index * 0.1}s`;
    card.dataset.category = project.category;

    card.innerHTML = `
      <div class="project-card-image">
        <img src="${project.thumbnail}" alt="${project.title}" loading="lazy" />
        <div class="project-card-overlay">
          <span class="project-card-overlay-text">View Project</span>
        </div>
      </div>
      <div class="project-card-content">
        <div class="project-card-category">${getCategoryLabel(project.category)}</div>
        <h3 class="project-card-title">${project.title}</h3>
        <div class="project-card-meta">
          <span>${project.location}</span>
          <span>•</span>
          <span>${project.year}</span>
        </div>
        <p class="project-card-description">${project.description.substring(0, 120)}...</p>
      </div>
    `;

    card.addEventListener("click", () => {
      window.location.href = `project-detail.html?id=${project.id}`;
    });

    return card;
  }

  // Get readable category label
  function getCategoryLabel(category) {
    const labels = {
      residential: "Residential",
      commercial: "Commercial / Offices",
      concept: "Concept / Competition",
      interior: "Interior Design",
      construction: "Construction / Technical",
    };
    return labels[category] || category;
  }

  // Filter projects
  function filterProjects(filter) {
    currentFilter = filter;

    const filteredProjects =
      filter === "all"
        ? allProjects
        : allProjects.filter((project) => project.category === filter);

    // Add loading effect
    if (projectsGrid) {
      projectsGrid.classList.add("loading");
      setTimeout(() => {
        renderProjects(filteredProjects);
        projectsGrid.classList.remove("loading");
      }, 300);
    }
  }

  // Filter button click handlers
  if (filterButtons) {
    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        filterButtons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");
        filterProjects(button.dataset.filter);
      });
    });
  }

  // Load projects on page load if projects section exists
  if (projectsGrid) {
    loadProjects();
  }
});

// ========================================
// Project Detail Page
// ========================================
document.addEventListener("DOMContentLoaded", function () {
  // Check if we're on the project detail page
  const isProjectDetailPage =
    window.location.pathname.includes("project-detail");

  if (!isProjectDetailPage) return;

  console.log("Project detail page loaded");

  const projectContent = document.getElementById("project-content");
  const projectLoading = document.getElementById("project-loading");
  const projectError = document.getElementById("project-error");
  const galleryFilters = document.querySelectorAll(".gallery-filter-btn");

  console.log("Elements found:", {
    projectContent: !!projectContent,
    projectLoading: !!projectLoading,
    projectError: !!projectError,
  });

  let currentProject = null;
  let allProjects = [];
  let currentGalleryFilter = "all";

  // Get project ID from URL
  function getProjectIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("id");
  }

  // Load project data
  async function loadProjectDetail() {
    const projectId = getProjectIdFromUrl();

    console.log("Project ID from URL:", projectId);

    if (!projectId) {
      console.error("No project ID found in URL");
      showError();
      return;
    }

    try {
      const response = await fetch("data/projects.json");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      allProjects = data.projects;

      console.log("Loaded projects:", allProjects.length);
      console.log("Looking for project with ID:", projectId);

      currentProject = allProjects.find((p) => p.id === projectId);

      if (!currentProject) {
        console.error("Project not found with ID:", projectId);
        showError();
        return;
      }

      console.log("Found project:", currentProject.title);
      renderProjectDetail(currentProject);
      setupNavigation();
      if (projectLoading) projectLoading.style.display = "none";
      if (projectContent) projectContent.style.display = "block";
    } catch (error) {
      console.error("Error loading project:", error);
      showError();
    }
  }

  // Show error state
  function showError() {
    if (projectLoading) projectLoading.style.display = "none";
    if (projectError) projectError.style.display = "block";
  }

  // Render project details
  function renderProjectDetail(project) {
    // Hero section
    const heroImage = document.getElementById("project-hero-image");
    const title = document.getElementById("project-title");

    if (heroImage) {
      heroImage.src = project.gallery[0]?.url || project.thumbnail;
      heroImage.alt = project.title;
    }
    if (title) title.textContent = project.title;

    // Info box
    const location = document.getElementById("project-location");
    const year = document.getElementById("project-year");
    const type = document.getElementById("project-type");
    const role = document.getElementById("project-role");

    if (location) location.textContent = project.location;
    if (year) year.textContent = project.year;
    if (type) type.textContent = project.type;
    if (role) role.textContent = project.role;

    // Description
    const description = document.getElementById("project-description-text");
    const concept = document.getElementById("project-concept-text");

    if (description) description.textContent = project.description;
    if (concept) concept.textContent = project.concept;

    // Gallery
    renderGallery(project.gallery);

    // Update page title
    document.title = `${project.title} | Architecture Portfolio`;
  }

  // Render gallery
  function renderGallery(gallery) {
    const galleryGrid = document.getElementById("project-gallery");
    if (!galleryGrid) return;

    galleryGrid.innerHTML = "";

    gallery.forEach((item, index) => {
      const galleryItem = document.createElement("div");
      galleryItem.className = "gallery-item";
      galleryItem.dataset.type = item.type;

      galleryItem.innerHTML = `
        <img src="${item.url}" alt="${item.caption}" loading="lazy" />
        <div class="gallery-item-type">${item.type}</div>
        <div class="gallery-item-caption">${item.caption}</div>
      `;

      galleryItem.addEventListener("click", () => {
        openLightbox(index, gallery);
      });

      galleryGrid.appendChild(galleryItem);
    });
  }

  // Filter gallery
  function filterGallery(type) {
    currentGalleryFilter = type;
    const galleryItems = document.querySelectorAll(".gallery-item");

    galleryItems.forEach((item) => {
      if (type === "all" || item.dataset.type === type) {
        item.classList.remove("hidden");
      } else {
        item.classList.add("hidden");
      }
    });
  }

  // Gallery filter button handlers
  if (galleryFilters) {
    galleryFilters.forEach((button) => {
      button.addEventListener("click", () => {
        galleryFilters.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");
        filterGallery(button.dataset.type);
      });
    });
  }

  // Setup project navigation
  function setupNavigation() {
    if (!currentProject || allProjects.length === 0) return;

    const currentIndex = allProjects.findIndex(
      (p) => p.id === currentProject.id,
    );
    const prevIndex =
      (currentIndex - 1 + allProjects.length) % allProjects.length;
    const nextIndex = (currentIndex + 1) % allProjects.length;

    const prevBtn = document.getElementById("prev-project");
    const nextBtn = document.getElementById("next-project");

    if (prevBtn) {
      prevBtn.href = `project-detail.html?id=${allProjects[prevIndex].id}`;
    }

    if (nextBtn) {
      nextBtn.href = `project-detail.html?id=${allProjects[nextIndex].id}`;
    }
  }

  // Lightbox functionality for gallery
  let currentLightboxIndex = 0;
  let currentGalleryImages = [];

  function openLightbox(index, gallery) {
    currentLightboxIndex = index;
    currentGalleryImages = gallery;

    const lightbox = document.getElementById("lightbox");
    if (!lightbox) return;

    updateLightboxContent();
    lightbox.style.display = "flex";
    document.body.style.overflow = "hidden";
  }

  function updateLightboxContent() {
    const lightbox = document.getElementById("lightbox");
    if (!lightbox || currentGalleryImages.length === 0) return;

    const img = lightbox.querySelector("img");
    const title = lightbox.querySelector(".lightbox-info h3");
    const caption = lightbox.querySelector(".lightbox-info p");

    const currentImage = currentGalleryImages[currentLightboxIndex];

    img.src = currentImage.url;
    img.alt = currentImage.caption;
    title.textContent = currentImage.type.toUpperCase();
    caption.textContent = currentImage.caption;
  }

  function closeLightbox() {
    const lightbox = document.getElementById("lightbox");
    if (lightbox) {
      lightbox.style.display = "none";
      document.body.style.overflow = "";
    }
  }

  function nextLightboxImage() {
    currentLightboxIndex =
      (currentLightboxIndex + 1) % currentGalleryImages.length;
    updateLightboxContent();
  }

  function prevLightboxImage() {
    currentLightboxIndex =
      (currentLightboxIndex - 1 + currentGalleryImages.length) %
      currentGalleryImages.length;
    updateLightboxContent();
  }

  // Lightbox event listeners
  const lightbox = document.getElementById("lightbox");
  if (lightbox) {
    const closeBtn = lightbox.querySelector(".lightbox-close");
    const prevBtn = lightbox.querySelector(".lightbox-prev");
    const nextBtn = lightbox.querySelector(".lightbox-next");

    if (closeBtn) {
      closeBtn.addEventListener("click", closeLightbox);
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        prevLightboxImage();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        nextLightboxImage();
      });
    }

    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (lightbox.style.display === "flex") {
        if (e.key === "Escape") closeLightbox();
        if (e.key === "ArrowLeft") prevLightboxImage();
        if (e.key === "ArrowRight") nextLightboxImage();
      }
    });
  }

  // Load project on page load
  loadProjectDetail();
});
