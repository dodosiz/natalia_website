import { useState, useEffect } from "react";

const slides = [
  {
    url: "https://via.placeholder.com/1920x1080/000000/ffffff?text=Modern+Architecture",
    alt: "Modern Architecture",
  },
  {
    url: "https://via.placeholder.com/1920x1080/1a1a1a/ffffff?text=Interior+Design",
    alt: "Interior Design",
  },
  {
    url: "https://via.placeholder.com/1920x1080/000000/ffffff?text=3D+Visualization",
    alt: "3D Visualization",
  },
];

function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const handleViewProjects = (e) => {
    e.preventDefault();
    const projectsSection = document.getElementById("projects");
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="hero">
      <div className="hero-slider">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`hero-slide ${index === currentSlide ? "active" : ""}`}
          >
            <img
              src={slide.url}
              alt={slide.alt}
              loading={index === 0 ? "eager" : "lazy"}
            />
            <div className="hero-overlay"></div>
          </div>
        ))}
      </div>
      <div className="hero-content">
        <h1 className="hero-title animate-fade-in">
          Architecture. Innovation. Transparency.
        </h1>
        <p className="hero-subtitle animate-fade-in-delay">
          Creating spaces that inspire and transform
        </p>
        <a
          href="#projects"
          className="btn btn-primary animate-fade-in-delay-2"
          onClick={handleViewProjects}
        >
          View Projects
        </a>
      </div>
      <div className="slider-controls">
        <button
          className="slider-btn prev"
          aria-label="Previous slide"
          onClick={prevSlide}
        >
          ‹
        </button>
        <button
          className="slider-btn next"
          aria-label="Next slide"
          onClick={nextSlide}
        >
          ›
        </button>
      </div>
      <div className="slider-dots">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`slider-dot ${index === currentSlide ? "active" : ""}`}
            onClick={() => goToSlide(index)}
          ></div>
        ))}
      </div>
    </section>
  );
}

export default Hero;
