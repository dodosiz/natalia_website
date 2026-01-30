function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Contact</h2>
          <div className="section-divider"></div>
          <p className="section-description">Let's discuss your next project</p>
        </div>

        <div className="contact-content">
          <div className="contact-info">
            <div className="contact-item">
              <h4>Email</h4>
              <a href="mailto:n.k.papastoitsi@gmail.com">
                n.k.papastoitsi@gmail.com
              </a>
            </div>
            <div className="contact-item">
              <h4>Phone</h4>
              <a href="tel:+306955172427">+30 695 517 2427</a>
            </div>
            <div className="contact-item">
              <h4>Location</h4>
              <p>Athens, Greece</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
