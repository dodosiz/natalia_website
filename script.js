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
  // Portfolio Filter (optional - only if filter buttons exist)
  // ========================================
  const filterButtons = document.querySelectorAll(".filter-btn");
  const portfolioItems = document.querySelectorAll(".portfolio-item");

  if (filterButtons.length > 0 && portfolioItems.length > 0) {
    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        // Update active button
        filterButtons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");

        const filterValue = button.getAttribute("data-filter");

        portfolioItems.forEach((item) => {
          if (
            filterValue === "all" ||
            item.getAttribute("data-category") === filterValue
          ) {
            item.classList.remove("hide");
          } else {
            item.classList.add("hide");
          }
        });
      });
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

  const projectData = {
    1: {
      img: "https://via.placeholder.com/1200x800/3498db/ffffff?text=Modern+Villa+Detail",
      title: "Modern Villa",
      description:
        "A contemporary residential project featuring clean lines, open spaces, and sustainable materials. The design emphasizes natural light and indoor-outdoor connectivity.",
    },
    2: {
      img: "https://via.placeholder.com/1200x800/e74c3c/ffffff?text=Luxury+Apartment+Detail",
      title: "Luxury Apartment",
      description:
        "High-end interior design for a penthouse apartment. Custom furniture, premium finishes, and a sophisticated color palette create an elegant living space.",
    },
    3: {
      img: "https://via.placeholder.com/1200x800/2ecc71/ffffff?text=Sustainable+Complex+Detail",
      title: "Sustainable Complex",
      description:
        "Eco-friendly mixed-use development incorporating green technologies, rainwater harvesting, and passive cooling strategies for minimal environmental impact.",
    },
    4: {
      img: "https://via.placeholder.com/1200x800/f39c12/ffffff?text=Commercial+Tower+Detail",
      title: "Commercial Tower",
      description:
        "Collaboration on a 30-story commercial building. Involved in facade design, lobby interior concept, and sustainable building certification coordination.",
    },
    5: {
      img: "https://via.placeholder.com/1200x800/9b59b6/ffffff?text=Restaurant+Detail",
      title: "Restaurant Interior",
      description:
        "Contemporary restaurant design blending industrial aesthetics with warm, inviting elements. Custom lighting and furniture create a unique dining atmosphere.",
    },
    6: {
      img: "https://via.placeholder.com/1200x800/1abc9c/ffffff?text=Residential+Complex+Detail",
      title: "Residential Complex",
      description:
        "Multi-family housing project with shared amenities and private gardens. Focus on community spaces while maintaining individual privacy.",
    },
  };

  // Open lightbox when clicking "View Details"
  document.querySelectorAll(".btn-view").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const projectId = btn.getAttribute("data-project");
      const project = projectData[projectId];

      if (project && lightbox && lightboxImg && lightboxTitle && lightboxDesc) {
        lightboxImg.src = project.img;
        lightboxTitle.textContent = project.title;
        lightboxDesc.textContent = project.description;
        lightbox.classList.add("active");
        document.body.style.overflow = "hidden";
      }
    });
  });

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
  // Contact Form
  // ========================================
  const contactForm = document.getElementById("contactForm");
  const formMessage = document.querySelector(".form-message");

  if (contactForm && formMessage) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // Simulate form submission
      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData);

      // Show loading state
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = "Sending...";
      submitBtn.disabled = true;

      // Simulate API call
      setTimeout(() => {
        formMessage.className = "form-message success";
        formMessage.textContent =
          "Thank you for your message! We will get back to you soon.";
        contactForm.reset();

        submitBtn.textContent = originalText;
        submitBtn.disabled = false;

        // Hide message after 5 seconds
        setTimeout(() => {
          formMessage.className = "form-message";
        }, 5000);
      }, 1500);
    });
  }

  // ========================================
  // Newsletter Form
  // ========================================
  const newsletterForm = document.querySelector(".newsletter-form");

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const emailInput = newsletterForm.querySelector('input[type="email"]');
      if (emailInput) {
        alert(`Thank you for subscribing with: ${emailInput.value}`);
        newsletterForm.reset();
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

  // Observe elements for animation
  document
    .querySelectorAll(
      ".portfolio-item, .blog-card, .skill-item, .collaboration-item",
    )
    .forEach((el) => {
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
  // Console Welcome Message
  // ========================================
  console.log(
    "%c Welcome to Architecture Portfolio ",
    "background: #2c3e50; color: white; font-size: 20px; padding: 10px;",
  );
  console.log(
    "%c Designed with ❤️ ",
    "background: #3498db; color: white; font-size: 14px; padding: 5px;",
  );

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
    let isLoading = false;

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

    // Load PDF
    async function loadPortfolioPDF() {
      if (isLoading) return;
      isLoading = true;

      try {
        // Use relative path
        const pdfPath = "./data/file.pdf";
        if (pageInfo) {
          pageInfo.textContent = "Loading portfolio...";
        }

        const loadingTask = pdfjsLib.getDocument({
          url: pdfPath,
          cMapUrl: "https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/cmaps/",
          cMapPacked: true,
        });
        pdfDoc = await loadingTask.promise;
        totalPages = pdfDoc.numPages;

        console.log(
          `Portfolio PDF loaded successfully. Total pages: ${totalPages}`,
        );

        // Render initial spread
        await renderSpread(currentSpread);
        updateControls();
      } catch (error) {
        console.error("Error loading portfolio PDF:", error);
        if (pageInfo) {
          pageInfo.textContent = "Portfolio PDF not found";
          pageInfo.style.color = "#999";
        }
      } finally {
        isLoading = false;
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

      try {
        const page = await pdfDoc.getPage(pageNum);

        // Calculate scale to fit the page in the canvas
        const viewport = page.getViewport({ scale: 1.0 });

        // Calculate the scale to fit the half-book width
        const bookHalfWidth = book.offsetWidth / 2;
        const bookHeight = book.offsetHeight;

        const scaleX = bookHalfWidth / viewport.width;
        const scaleY = bookHeight / viewport.height;
        const scale = Math.min(scaleX, scaleY) * 0.9; // 90% to add some padding

        const scaledViewport = page.getViewport({ scale });

        canvas.width = scaledViewport.width;
        canvas.height = scaledViewport.height;

        const renderContext = {
          canvasContext: ctx,
          viewport: scaledViewport,
        };

        await page.render(renderContext).promise;
      } catch (error) {
        console.error(`Error rendering page ${pageNum}:`, error);
      }
    }

    // Render current spread (two pages)
    async function renderSpread(spreadIndex) {
      if (!pdfDoc) return;

      const leftPageNum = spreadIndex * 2 + 1;
      const rightPageNum = spreadIndex * 2 + 2;

      // Render both pages in parallel
      await Promise.all([
        renderPage(leftPageNum, canvasLeft, ctxLeft),
        renderPage(rightPageNum, canvasRight, ctxRight),
      ]);
    }

    // Update controls state
    function updateControls() {
      if (!pageInfo || !prevBtn || !nextBtn || !pdfDoc) return;

      const leftPageNum = currentSpread * 2 + 1;
      const rightPageNum = currentSpread * 2 + 2;

      // Update page info
      if (rightPageNum <= totalPages) {
        pageInfo.textContent = `Pages ${leftPageNum}-${rightPageNum} of ${totalPages}`;
      } else if (leftPageNum <= totalPages) {
        pageInfo.textContent = `Page ${leftPageNum} of ${totalPages}`;
      }

      // Update button states
      prevBtn.disabled = currentSpread === 0;
      nextBtn.disabled = leftPageNum >= totalPages;
    }

    // Turn to next spread
    async function nextSpread() {
      if (isAnimating || !book || !pdfDoc) return;

      const nextPageNum = (currentSpread + 1) * 2 + 1;
      if (nextPageNum > totalPages) return;

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

    // Event listeners
    if (prevBtn) prevBtn.addEventListener("click", prevSpread);
    if (nextBtn) nextBtn.addEventListener("click", nextSpread);

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

    // Window resize handler
    let resizeTimeout;
    window.addEventListener("resize", () => {
      if (!pdfDoc) return;
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        renderSpread(currentSpread);
      }, 250);
    });

    // Lazy load PDF when portfolio section comes into view
    if (canvasLeft && canvasRight && book) {
      const portfolioSection = document.getElementById("portfolio");
      if (portfolioSection) {
        const portfolioObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting && !pdfDoc && !isLoading) {
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
