import { Link } from "react-router-dom";
import projectsData from "../data/projects.json";
import categoriesData from "../data/categories.json";

function Projects() {
  const categories = categoriesData.categories.map((category) => ({
    ...category,
    thumbnail:
      projectsData.projects.find((p) => p.category === category.id)
        ?.thumbnail || "/images/placeholder.jpg",
  }));

  return (
    <section id="projects" className="projects">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Projects</h2>
          <div className="section-divider"></div>
          <p className="section-description">
            Explore our architectural works by category
          </p>
        </div>

        {/* Category Grid */}
        <div className="categories-grid">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.id}`}
              className="category-card"
            >
              <div className="category-image">
                <img
                  src={category.thumbnail}
                  alt={category.title}
                  loading="lazy"
                />
                <div className="category-overlay">
                  <h3 className="category-title">{category.title}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
