import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import projectsData from "../data/projects.json";

function CategoryPage() {
  const { category } = useParams();
  const [projects, setProjects] = useState([]);
  const [categoryTitle, setCategoryTitle] = useState("");

  useEffect(() => {
    // Filter projects by category
    const filtered = projectsData.projects.filter(
      (project) => project.category === category,
    );
    setProjects(filtered);

    // Set category title
    const titles = {
      residential: "Residential",
      commercial: "Commercial / Offices",
      concept: "Concept / Competition",
      interior: "Interior Design",
      construction: "Construction / Technical",
    };
    setCategoryTitle(titles[category] || category);

    // Scroll to top
    window.scrollTo(0, 0);
  }, [category]);

  return (
    <div className="App">
      <Navbar />
      <main>
        <section className="category-page">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">{categoryTitle}</h2>
              <div className="section-divider"></div>
              <p className="section-description">
                {projects.length}{" "}
                {projects.length === 1 ? "project" : "projects"}
              </p>
            </div>

            {projects.length === 0 ? (
              <div className="no-results">
                <p>No projects found in this category.</p>
              </div>
            ) : (
              <div className="projects-grid">
                {projects.map((project) => (
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
                          <span className="project-category">
                            {project.type}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default CategoryPage;
