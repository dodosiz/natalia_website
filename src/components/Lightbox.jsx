import { useEffect } from "react";

function Lightbox({
  isOpen,
  onClose,
  image,
  images,
  currentIndex,
  onNavigate,
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && currentIndex > 0)
        onNavigate(currentIndex - 1);
      if (e.key === "ArrowRight" && currentIndex < images.length - 1)
        onNavigate(currentIndex + 1);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentIndex, images.length, onClose, onNavigate]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen || !image) return null;

  return (
    <div className={`lightbox ${isOpen ? "active" : ""}`} onClick={onClose}>
      <span className="lightbox-close" onClick={onClose}>
        &times;
      </span>
      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        <div className="lightbox-inner">
          <img src={image.url} alt={image.caption || "Project Image"} />
          <div className="lightbox-info">
            <h3>{image.caption}</h3>
            <p>{image.type}</p>
          </div>
        </div>
      </div>
      {images && images.length > 1 && (
        <>
          <button
            className="lightbox-nav lightbox-prev"
            aria-label="Previous image"
            onClick={(e) => {
              e.stopPropagation();
              if (currentIndex > 0) onNavigate(currentIndex - 1);
            }}
            disabled={currentIndex === 0}
          >
            ‹
          </button>
          <button
            className="lightbox-nav lightbox-next"
            aria-label="Next image"
            onClick={(e) => {
              e.stopPropagation();
              if (currentIndex < images.length - 1)
                onNavigate(currentIndex + 1);
            }}
            disabled={currentIndex === images.length - 1}
          >
            ›
          </button>
        </>
      )}
    </div>
  );
}

export default Lightbox;
