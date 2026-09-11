import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Home from "./pages/Home.jsx";
import Header from "./components/Header.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import Logout from "./pages/Logout.jsx";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import SavedCards from "./pages/SavedCards.jsx";
import { FavoritesProvider } from "./contexts/FavoritesContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <FavoritesProvider>
      <Header />
      <Router>
        <Routes>
          <Route path="/pokefaves" element={<Home />} />
          <Route path="/pokefaves/search" element={<SearchPage />} />
          <Route path="/pokefaves/saved-cards" element={<SavedCards />} />
          <Route path="/pokefaves/logout" element={<Logout />} />
        </Routes>
      </Router>
    </FavoritesProvider>
  </StrictMode>,
);
