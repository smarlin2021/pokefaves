import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Home from "./pages/Home.jsx";
import Header from "./components/Header.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import Logout from "./pages/Logout.jsx";
import { HashRouter, Routes, Route } from "react-router-dom";
import SavedCards from "./pages/SavedCards.jsx";
import { FavoritesProvider } from "./contexts/FavoritesContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <FavoritesProvider>
      <HashRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/saved-cards" element={<SavedCards />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </HashRouter>
    </FavoritesProvider>
  </StrictMode>,
);
