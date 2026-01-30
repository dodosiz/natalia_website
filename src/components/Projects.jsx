import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import projectsData from "../data/projects.json";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load projects
    setProjects(projectsData.projects);
    setFilteredProjects(projectsData.projects);
    setIsLoading(false);
  }, []);

  const handleFilter = (category) => {
    setActiveFilter(category);
    if (category === "all") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(
        projects.filter((project) => project.category === category),
      );
    }
  };

  return (
    <section id="projects" className="projects">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Projects</h2>
          <div className="section-divider"></div>
          <p className="section-description">Explore our architectural works</p>
        </div>

        {/* Project Filters */}
        <div className="project-filters">
          <button
            className={`filter-btn ${activeFilter === "all" ? "active" : ""}`}
            onClick={() => handleFilter("all")}
          >
            All
          </button>
          <button
            className={`filter-btn ${activeFilter === "residential" ? "active" : ""}`}
            onClick={() => handleFilter("residential")}
          >
            Residential
          </button>
          <button
            className={`filter-btn ${activeFilter === "commercial" ? "active" : ""}`}
            onClick={() => handleFilter("commercial")}
          >
            Commercial / Offices
          </button>
          <button
            className={`filter-btn ${activeFilter === "concept" ? "active" : ""}`}
            onClick={() => handleFilter("concept")}
          >
            Concept / Competition
          </button>
          <button
            className={`filter-btn ${activeFilter === "interior" ? "active" : ""}`}
            onClick={() => handleFilter("interior")}
          >
            Interior Design
          </button>
          <button
            className={`filter-btn ${activeFilter === "construction" ? "active" : ""}`}
            onClick={() => handleFilter("construction")}
          >
            Construction / Technical
          </button>
        </div>

        {/* Projects Grid */}
        {isLoading ? (
          <div className="projects-loading">
            <div className="loading-spinner"></div>
            <p>Loading projects...</p>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="no-results">
            <p>No projects found in this category.</p>
          </div>
        ) : (
          <div className="projects-grid" id="projects-grid">
            {filteredProjects.map((project) => (
              <Link
                key={project.id}
                to={`/project/${project.id}`}
                className={`project-card ${project.featured ? "featured" : ""}`}
                data-category={project.category}
              >
                <div className="project-image">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    loading="lazy"
                  />
                  <div className="project-overlay">
                    <div className="project-info">
                      <h3>{project.title}</h3>
                      <p>
                        {project.location} | {project.year}
                      </p>
                      <span className="project-category">{project.type}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Projects;
