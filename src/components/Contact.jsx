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
              <a href="mailto:info@architect.com">info@architect.com</a>
            </div>
            <div className="contact-item">
              <h4>Phone</h4>
              <a href="tel:+302101234567">+30 210 123 4567</a>
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
