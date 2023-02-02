import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import RouteTest from "./components/RouteTest";

import Home from "./pages/Home.js";
import New from "./pages/New.js";
import Diary from "./pages/Diary";
import Edit from "./pages/Edit.js";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <h2>App.js</h2>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<New />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="/diary/:id" element={<Diary />} />
        </Routes>
        <RouteTest />
      </div>
    </BrowserRouter>
  );
}

export default App;
