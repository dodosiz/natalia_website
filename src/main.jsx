import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { PDFProvider } from "./context/PDFContext";
import App from "./App";
import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <PDFProvider>
        <App />
      </PDFProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
