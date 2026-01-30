import { useState, useEffect, useRef } from "react";
import { usePDF } from "../context/PDFContext";

function Portfolio() {
  const {
    pdfDoc,
    totalPages,
    isLoading,
    loadingProgress,
    error,
    currentSpread,
    setCurrentSpread,
  } = usePDF();
  const [pageCache] = useState(new Map());
  const [isAnimating, setIsAnimating] = useState(false);

  const canvasLeftRef = useRef(null);
  const canvasRightRef = useRef(null);
  const bookRef = useRef(null);

  useEffect(() => {
    if (pdfDoc) {
      renderSpread(currentSpread);
    }
  }, [currentSpread, pdfDoc]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        prevSpread();
      } else if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        nextSpread();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [currentSpread, isAnimating]);

  // Touch gesture support for mobile
  useEffect(() => {
    const book = bookRef.current;
    if (!book) return;

    let touchStartX = 0;
    let touchStartY = 0;
    const minSwipeDistance = 50;

    const handleTouchStart = (e) => {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    };

    const handleTouchEnd = (e) => {
      const touchEndX = e.changedTouches[0].screenX;
      const touchEndY = e.changedTouches[0].screenY;
      const deltaX = touchEndX - touchStartX;
      const deltaY = touchEndY - touchStartY;

      // Check if horizontal swipe is more significant than vertical
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (Math.abs(deltaX) > minSwipeDistance) {
          if (deltaX > 0) {
            // Swipe right - go to previous page
            prevSpread();
          } else {
            // Swipe left - go to next page
            nextSpread();
          }
        }
      }
    };

    book.addEventListener("touchstart", handleTouchStart, { passive: true });
    book.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      book.removeEventListener("touchstart", handleTouchStart);
      book.removeEventListener("touchend", handleTouchEnd);
    };
  }, [currentSpread, isAnimating]);

  const renderPage = async (pageNum, canvas, ctx) => {
    if (!canvas || !ctx || !bookRef.current) return;

    if (pageNum < 1 || pageNum > totalPages) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }

    const cacheKey = `page_${pageNum}`;
    if (pageCache.has(cacheKey)) {
      const cached = pageCache.get(cacheKey);
      canvas.width = cached.width;
      canvas.height = cached.height;
      ctx.drawImage(cached.canvas, 0, 0);
      return;
    }

    try {
      const page = await pdfDoc.getPage(pageNum);
      const viewport = page.getViewport({ scale: 1.0 });

      const bookHalfWidth = bookRef.current.offsetWidth / 2;
      const bookHeight = bookRef.current.offsetHeight;

      const scaleX = bookHalfWidth / viewport.width;
      const scaleY = bookHeight / viewport.height;
      const baseScale = Math.min(scaleX, scaleY);

      const devicePixelRatio = window.devicePixelRatio || 1;
      const scale = baseScale * devicePixelRatio;

      const scaledViewport = page.getViewport({ scale });

      canvas.width = scaledViewport.width;
      canvas.height = scaledViewport.height;

      canvas.style.width = `${bookHalfWidth}px`;
      canvas.style.height = `${bookHeight}px`;

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      const renderContext = {
        canvasContext: ctx,
        viewport: scaledViewport,
      };

      await page.render(renderContext).promise;

      const cacheCanvas = document.createElement("canvas");
      cacheCanvas.width = canvas.width;
      cacheCanvas.height = canvas.height;
      const cacheCtx = cacheCanvas.getContext("2d");
      cacheCtx.drawImage(canvas, 0, 0);

      pageCache.set(cacheKey, {
        canvas: cacheCanvas,
        width: canvas.width,
        height: canvas.height,
      });

      if (pageCache.size > 8) {
        const firstKey = pageCache.keys().next().value;
        pageCache.delete(firstKey);
      }
    } catch (error) {
      console.error(`Error rendering page ${pageNum}:`, error);
    }
  };

  const renderSpread = async (spreadIndex) => {
    if (!pdfDoc || !canvasLeftRef.current || !canvasRightRef.current) return;

    const ctxLeft = canvasLeftRef.current.getContext("2d");
    const ctxRight = canvasRightRef.current.getContext("2d");

    let leftPageNum, rightPageNum;

    if (spreadIndex === 0) {
      leftPageNum = 0;
      rightPageNum = 1;
    } else {
      leftPageNum = spreadIndex * 2;
      rightPageNum = spreadIndex * 2 + 1;
    }

    await Promise.all([
      renderPage(leftPageNum, canvasLeftRef.current, ctxLeft),
      renderPage(rightPageNum, canvasRightRef.current, ctxRight),
    ]);
  };

  const nextSpread = () => {
    if (isAnimating) return;

    const nextSpreadIndex = currentSpread + 1;
    const rightPageNum = nextSpreadIndex === 0 ? 1 : nextSpreadIndex * 2 + 1;
    if (rightPageNum > totalPages) return;

    setIsAnimating(true);
    if (bookRef.current) {
      bookRef.current.classList.add("turning-next");
    }

    // Update content at mid-animation (500ms for 1s animation)
    setTimeout(() => {
      setCurrentSpread(nextSpreadIndex);
      if (bookRef.current) {
        bookRef.current.classList.remove("turning-next");
      }
      setIsAnimating(false);
    }, 500);
  };

  const prevSpread = () => {
    if (isAnimating) return;
    if (currentSpread === 0) return;

    setIsAnimating(true);
    if (bookRef.current) {
      bookRef.current.classList.add("turning-prev");
    }

    // Update content at mid-animation (500ms for 1s animation)
    setTimeout(() => {
      setCurrentSpread(currentSpread - 1);
      if (bookRef.current) {
        bookRef.current.classList.remove("turning-prev");
      }
      setIsAnimating(false);
    }, 500);
  };

  const jumpToPage = () => {
    const pageInput = document.getElementById("portfolio-page-jump");
    if (pageInput) {
      const pageNum = parseInt(pageInput.value);
      if (pageNum >= 1 && pageNum <= totalPages) {
        const spreadIndex = pageNum === 1 ? 0 : Math.floor((pageNum - 1) / 2);
        setCurrentSpread(spreadIndex);
      }
    }
  };

  const getPageInfo = () => {
    if (currentSpread === 0) {
      return `Page 1 of ${totalPages}`;
    }
    const leftPageNum = currentSpread * 2;
    const rightPageNum = currentSpread * 2 + 1;
    if (rightPageNum <= totalPages) {
      return `Pages ${leftPageNum}-${rightPageNum} of ${totalPages}`;
    }
    return `Page ${leftPageNum} of ${totalPages}`;
  };

  return (
    <section id="portfolio" className="portfolio">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Portfolio</h2>
          <div className="section-divider"></div>
          <p className="section-description">
            Browse through my portfolio booklet
          </p>
        </div>

        {isLoading && (
          <div className="loading-overlay">
            <div className="loading-spinner"></div>
            <p>Loading PDF...</p>
            <p className="loading-percentage">{loadingProgress}%</p>
          </div>
        )}

        <div className="booklet-wrapper">
          <div className="book" ref={bookRef}>
            <div className="page page-left">
              <canvas ref={canvasLeftRef}></canvas>
            </div>
            <div className="page page-right">
              <canvas ref={canvasRightRef}></canvas>
            </div>
          </div>
        </div>

        <div className="portfolio-controls">
          <button
            className="btn portfolio-btn"
            onClick={prevSpread}
            disabled={currentSpread === 0}
          >
            ← Previous
          </button>
          <span className="portfolio-page-info">{getPageInfo()}</span>
          <button
            className="btn portfolio-btn"
            onClick={nextSpread}
            disabled={
              currentSpread === 0
                ? totalPages <= 1
                : currentSpread * 2 + 1 >= totalPages
            }
          >
            Next →
          </button>
        </div>

        <div className="portfolio-search-controls">
          <label htmlFor="portfolio-page-jump">Jump to page:</label>
          <input
            type="number"
            id="portfolio-page-jump"
            className="page-jump-input"
            min="1"
            max={totalPages}
            placeholder="Enter page number"
          />
          <button className="btn btn-jump" onClick={jumpToPage}>
            Go
          </button>
        </div>
      </div>
    </section>
  );
}

export default Portfolio;
