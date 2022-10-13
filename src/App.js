import "./App.css";
import { Route, Routes } from "react-router-dom";

import Home from "./pages/user/Home";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<h1>Khong tim thay</h1>} />
      </Routes>
    </div>
  );
}

export default App;
