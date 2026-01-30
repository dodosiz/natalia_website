import { useState, useEffect, useRef } from "react";
import * as pdfjsLib from "pdfjs-dist";

// Set up PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

function Portfolio() {
  const [pdfDoc, setPdfDoc] = useState(null);
  const [currentSpread, setCurrentSpread] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [pageCache] = useState(new Map());

  const canvasLeftRef = useRef(null);
  const canvasRightRef = useRef(null);
  const bookRef = useRef(null);

  useEffect(() => {
    loadPDF();
  }, []);

  useEffect(() => {
    if (pdfDoc) {
      renderSpread(currentSpread);
    }
  }, [currentSpread, pdfDoc]);

  const loadPDF = async () => {
    try {
      setIsLoading(true);
      const pdfPath =
        "https://natalia-portfolio-files.s3.eu-central-1.amazonaws.com/file.pdf";

      const loadingTask = pdfjsLib.getDocument({
        url: pdfPath,
        cMapUrl: `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsLib.version}/cmaps/`,
        cMapPacked: true,
      });

      loadingTask.onProgress = (progress) => {
        if (progress.total > 0) {
          const percent = Math.round((progress.loaded / progress.total) * 100);
          setLoadingProgress(percent);
        }
      };

      const doc = await loadingTask.promise;
      setPdfDoc(doc);
      setTotalPages(doc.numPages);
      setIsLoading(false);
    } catch (error) {
      console.error("Error loading PDF:", error);
      setIsLoading(false);
    }
  };

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
    const nextSpreadIndex = currentSpread + 1;
    const rightPageNum = nextSpreadIndex === 0 ? 1 : nextSpreadIndex * 2 + 1;
    if (rightPageNum <= totalPages) {
      setCurrentSpread(nextSpreadIndex);
    }
  };

  const prevSpread = () => {
    if (currentSpread > 0) {
      setCurrentSpread(currentSpread - 1);
    }
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
