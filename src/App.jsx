import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import CategoryPage from "./pages/CategoryPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/category/:category" element={<CategoryPage />} />
      <Route path="/project/:id" element={<ProjectDetailPage />} />
    </Routes>
  );
}

export default App;
