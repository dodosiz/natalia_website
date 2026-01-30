import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Lightbox from "../components/Lightbox";
import projectsData from "../data/projects.json";

function ProjectDetailPage() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [filteredGallery, setFilteredGallery] = useState([]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    // Find the project
    const foundProject = projectsData.projects.find((p) => p.id === id);
    if (foundProject) {
      setProject(foundProject);
      setFilteredGallery(foundProject.gallery || []);
      setIsLoading(false);
    } else {
      setError(true);
      setIsLoading(false);
    }
  }, [id]);

  const handleFilterGallery = (type) => {
    setActiveFilter(type);
    if (type === "all") {
      setFilteredGallery(project.gallery || []);
    } else {
      setFilteredGallery(
        (project.gallery || []).filter((item) => item.type === type),
      );
    }
  };

  const openLightbox = (image, index) => {
    setLightboxImage(image);
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setLightboxImage(null);
  };

  const navigateLightbox = (newIndex) => {
    setLightboxIndex(newIndex);
    setLightboxImage(filteredGallery[newIndex]);
  };

  const getNextProject = () => {
    const currentIndex = projectsData.projects.findIndex((p) => p.id === id);
    if (currentIndex < projectsData.projects.length - 1) {
      return projectsData.projects[currentIndex + 1];
    }
    return null;
  };

  const getPrevProject = () => {
    const currentIndex = projectsData.projects.findIndex((p) => p.id === id);
    if (currentIndex > 0) {
      return projectsData.projects[currentIndex - 1];
    }
    return null;
  };

  const nextProject = getNextProject();
  const prevProject = getPrevProject();

  if (isLoading) {
    return (
      <>
        <Navbar />
        <section className="project-detail">
          <div className="project-loading">
            <div className="loading-spinner"></div>
            <p>Loading project...</p>
          </div>
        </section>
      </>
    );
  }

  if (error || !project) {
    return (
      <>
        <Navbar />
        <section className="project-detail">
          <div className="project-error">
            <div className="container">
              <h2>Project Not Found</h2>
              <p>Sorry, the requested project could not be found.</p>
              <Link to="/#projects" className="btn btn-primary">
                Back to Projects
              </Link>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <section className="project-detail">
        <div className="project-content">
          {/* Hero Image */}
          <div className="project-hero">
            <img src={project.thumbnail} alt={project.title} />
            <div className="project-hero-overlay"></div>
            <div className="project-hero-content">
              <div className="container">
                <h1 className="project-hero-title">{project.title}</h1>
                <Link to="/#projects" className="btn btn-back">
                  ← Back to Projects
                </Link>
              </div>
            </div>
          </div>

          {/* Project Info */}
          <div className="container">
            <div className="project-info-section">
              <div className="project-main-info">
                <div className="project-info-box">
                  <div className="info-item">
                    <span className="info-label">Location</span>
                    <span className="info-value">{project.location}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Year</span>
                    <span className="info-value">{project.year}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Type</span>
                    <span className="info-value">{project.type}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Role</span>
                    <span className="info-value">{project.role}</span>
                  </div>
                </div>

                <div className="project-description">
                  <h2>About the Project</h2>
                  <p>{project.description}</p>

                  <h3>Concept & Solution</h3>
                  <p>{project.concept}</p>
                </div>
              </div>
            </div>

            {/* Project Gallery */}
            {project.gallery && project.gallery.length > 0 && (
              <div className="project-gallery-section">
                <h2>Project Gallery</h2>

                {/* Gallery Filters */}
                <div className="gallery-filters">
                  <button
                    className={`gallery-filter-btn ${activeFilter === "all" ? "active" : ""}`}
                    onClick={() => handleFilterGallery("all")}
                  >
                    All
                  </button>
                  <button
                    className={`gallery-filter-btn ${activeFilter === "render" ? "active" : ""}`}
                    onClick={() => handleFilterGallery("render")}
                  >
                    Renders
                  </button>
                  <button
                    className={`gallery-filter-btn ${activeFilter === "plan" ? "active" : ""}`}
                    onClick={() => handleFilterGallery("plan")}
                  >
                    Plans
                  </button>
                  <button
                    className={`gallery-filter-btn ${activeFilter === "section" ? "active" : ""}`}
                    onClick={() => handleFilterGallery("section")}
                  >
                    Sections
                  </button>
                  <button
                    className={`gallery-filter-btn ${activeFilter === "detail" ? "active" : ""}`}
                    onClick={() => handleFilterGallery("detail")}
                  >
                    Details
                  </button>
                </div>

                {/* Gallery Grid */}
                <div className="project-gallery-grid">
                  {filteredGallery.map((item, index) => (
                    <div
                      key={index}
                      className="gallery-item"
                      onClick={() => openLightbox(item, index)}
                    >
                      <img src={item.url} alt={item.caption} loading="lazy" />
                      <div className="gallery-item-overlay">
                        <span className="gallery-item-type">{item.type}</span>
                        <p>{item.caption}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation to Next/Previous Projects */}
            <div className="project-navigation">
              {prevProject ? (
                <Link
                  to={`/project/${prevProject.id}`}
                  className="project-nav-btn"
                >
                  <span className="nav-arrow">←</span>
                  <span className="nav-text">Previous Project</span>
                </Link>
              ) : (
                <div></div>
              )}
              <Link to="/#projects" className="project-nav-btn center">
                <span className="nav-text">All Projects</span>
              </Link>
              {nextProject ? (
                <Link
                  to={`/project/${nextProject.id}`}
                  className="project-nav-btn"
                >
                  <span className="nav-text">Next Project</span>
                  <span className="nav-arrow">→</span>
                </Link>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <Lightbox
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        image={lightboxImage}
        images={filteredGallery}
        currentIndex={lightboxIndex}
        onNavigate={navigateLightbox}
      />
    </>
  );
}

export default ProjectDetailPage;
