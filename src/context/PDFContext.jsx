import { createContext, useContext, useState, useEffect, useRef } from "react";
import * as pdfjsLib from "pdfjs-dist";

// Set up PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const PDFContext = createContext(null);

export function PDFProvider({ children }) {
  const [pdfDoc, setPdfDoc] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [error, setError] = useState(null);
  const [currentSpread, setCurrentSpread] = useState(0);
  const lastProgressUpdate = useRef(0);
  const lastProgressValue = useRef(0);
  const hasLoadedRef = useRef(false);

  useEffect(() => {
    if (!hasLoadedRef.current) {
      loadPDF();
      hasLoadedRef.current = true;
    }
  }, []);

  const loadPDF = async () => {
    try {
      setIsLoading(true);
      setError(null);
      lastProgressValue.current = 0;
      setLoadingProgress(0);
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
          const now = Date.now();
          // Only update if percentage increased and enough time has passed
          if (
            percent > lastProgressValue.current &&
            now - lastProgressUpdate.current > 100
          ) {
            setLoadingProgress(percent);
            lastProgressValue.current = percent;
            lastProgressUpdate.current = now;
          }
        }
      };

      const doc = await loadingTask.promise;
      setPdfDoc(doc);
      setTotalPages(doc.numPages);
      setLoadingProgress(100);
      setIsLoading(false);
    } catch (error) {
      console.error("Error loading PDF:", error);
      setError(error.message || "Failed to load PDF");
      setIsLoading(false);
    }
  };

  const value = {
    pdfDoc,
    totalPages,
    isLoading,
    loadingProgress,
    error,
    currentSpread,
    setCurrentSpread,
    reloadPDF: loadPDF,
  };

  return <PDFContext.Provider value={value}>{children}</PDFContext.Provider>;
}

export function usePDF() {
  const context = useContext(PDFContext);
  if (!context) {
    throw new Error("usePDF must be used within a PDFProvider");
  }
  return context;
}
