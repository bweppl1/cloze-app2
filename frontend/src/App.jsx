import { useEffect, useState } from "react";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import OptionsBar from "./components/OptionsBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [showTranslations, setShowTranslations] = useState(true);

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <OptionsBar
          onToggle={setShowTranslations}
          showTranslations={showTranslations}
        />
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={<Home showTranslations={showTranslations} />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
