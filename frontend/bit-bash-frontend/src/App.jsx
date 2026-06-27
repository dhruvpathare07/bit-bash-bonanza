import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import PlayerEntry from "./pages/PlayerEntry";
import RequirePlayer from "./components/RequirePlayer";

// PYTHON IMPORTS
import Question_1 from "./pages/Question_1";
import Question_2 from "./pages/Question_2";
import Question_3 from "./pages/Question_3";

// C IMPORTS
import Question_1_C from "./pages/c/Question_1";
import Question_2_C from "./pages/c/Question_2";
import Question_3_C from "./pages/c/Question_3";

import Results from "./pages/Results";
import Round2 from "./pages/Round2";
import BlindCoding from "./pages/blindcoding";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main Entry */}
        <Route path="/" element={<Welcome />} />
        <Route path="/player-entry" element={<PlayerEntry />} />

        {/* Python routes */}
        <Route
          path="/python/question-1"
          element={<RequirePlayer><Question_1 /></RequirePlayer>}
        />
        <Route
          path="/python/question-2"
          element={<RequirePlayer><Question_2 /></RequirePlayer>}
        />
        <Route
          path="/python/question-3"
          element={<RequirePlayer><Question_3 /></RequirePlayer>}
        />

        {/* C routes */}
        <Route
          path="/c/question-1"
          element={<RequirePlayer><Question_1_C /></RequirePlayer>}
        />
        <Route
          path="/c/question-2"
          element={<RequirePlayer><Question_2_C /></RequirePlayer>}
        />
        <Route
          path="/c/question-3"
          element={<RequirePlayer><Question_3_C /></RequirePlayer>}
        />

        {/* Results and round flow */}
        <Route
          path="/results"
          element={<RequirePlayer><Results /></RequirePlayer>}
        />
        <Route
          path="/round-2"
          element={<RequirePlayer><Round2 /></RequirePlayer>}
        />
        <Route
          path="/blind-coding"
          element={<RequirePlayer><BlindCoding /></RequirePlayer>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
