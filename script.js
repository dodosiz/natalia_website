// ========================================
// Mobile Navigation
// ========================================
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

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
    this.prevBtn.addEventListener("click", () => this.prevSlide());
    this.nextBtn.addEventListener("click", () => this.nextSlide());
    this.startAutoPlay();

    // Pause on hover
    this.slider.addEventListener("mouseenter", () => this.stopAutoPlay());
    this.slider.addEventListener("mouseleave", () => this.startAutoPlay());
  }

  createDots() {
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
    this.dotsContainer.children[this.currentSlide].classList.remove("active");

    this.currentSlide = index;

    this.slides[this.currentSlide].classList.add("active");
    this.dotsContainer.children[this.currentSlide].classList.add("active");
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
const heroSlider = new Slider(document.querySelector(".hero"), {
  autoPlay: 5000,
});

// ========================================
// Portfolio Filter
// ========================================
const filterButtons = document.querySelectorAll(".filter-btn");
const portfolioItems = document.querySelectorAll(".portfolio-item");

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

// ========================================
// Lightbox
// ========================================
const lightbox = document.getElementById("lightbox");
const lightboxClose = document.querySelector(".lightbox-close");
const lightboxImg = lightbox.querySelector("img");
const lightboxTitle = lightbox.querySelector("h3");
const lightboxDesc = lightbox.querySelector("p");

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

    if (project) {
      lightboxImg.src = project.img;
      lightboxTitle.textContent = project.title;
      lightboxDesc.textContent = project.description;
      lightbox.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  });
});

// Close lightbox
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

// ========================================
// Contact Form
// ========================================
const contactForm = document.getElementById("contactForm");
const formMessage = document.querySelector(".form-message");

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

// ========================================
// Newsletter Form
// ========================================
const newsletterForm = document.querySelector(".newsletter-form");

newsletterForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = newsletterForm.querySelector('input[type="email"]').value;

  alert(`Thank you for subscribing with: ${email}`);
  newsletterForm.reset();
});

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

window.addEventListener("scroll", setActiveNav);

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

// ========================================
// Logo Animation
// ========================================
const logo = document.querySelector(".logo-text");

logo.addEventListener("mouseenter", () => {
  logo.style.transform = "scale(1.05)";
  logo.style.transition = "transform 0.3s ease";
});

logo.addEventListener("mouseleave", () => {
  logo.style.transform = "scale(1)";
});

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
