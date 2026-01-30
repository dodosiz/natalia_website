function About() {
  return (
    <section id="about" className="about">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">About</h2>
          <div className="section-divider"></div>
        </div>
        <div className="about-content">
          <div className="about-image">
            <img
              src="/data/profile.jpg"
              alt="Architect Portrait"
              loading="lazy"
            />
          </div>
          <div className="about-text">
            <h3>Transforming Visions into Reality</h3>
            <p>
              With over a decade of experience in architectural design and
              interior spaces, I specialize in creating innovative solutions
              that blend functionality with aesthetic excellence. My approach
              combines traditional architectural principles with cutting-edge
              technology and sustainable practices.
            </p>
            <p>
              Every project is an opportunity to challenge conventional thinking
              and deliver spaces that not only meet but exceed expectations. I
              believe architecture should tell a story, evoke emotions, and
              enhance the human experience.
            </p>

            <div className="skills-grid">
              <div className="skill-item">
                <div className="skill-icon">■</div>
                <h4>Architectural Design</h4>
                <p>
                  Comprehensive planning and design for residential and
                  commercial projects
                </p>
              </div>
              <div className="skill-item">
                <div className="skill-icon">■</div>
                <h4>Interior Design</h4>
                <p>
                  Crafting beautiful, functional interior spaces that reflect
                  your vision
                </p>
              </div>
              <div className="skill-item">
                <div className="skill-icon">■</div>
                <h4>3D Visualization</h4>
                <p>
                  Photorealistic renders and virtual walkthroughs of your
                  projects
                </p>
              </div>
              <div className="skill-item">
                <div className="skill-icon">■</div>
                <h4>Project Management</h4>
                <p>
                  End-to-end coordination ensuring timely and budget-conscious
                  delivery
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
