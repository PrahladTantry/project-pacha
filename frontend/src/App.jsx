import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./components/Landing";
import DictionarySearch from "./components/DictionarySearch";

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/search" element={<DictionarySearch />} />
        </Routes>
    </Router>
  );
}

export default App;
