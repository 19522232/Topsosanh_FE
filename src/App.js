import "./App.css";
import { Route, Routes } from "react-router-dom";

import Home from "./pages/user/Home";
import Login from "./pages/user/Login";
import SignUp from "./pages/user/SignUp";
import Search from "./pages/user/Search";
import Detail from "./pages/user/Detail";
import Tutorial from "./pages/user/Tutorial";
import Tracking from "./pages/user/Tracking";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/search/:keyword" element={<Search />}></Route>
        <Route path="/detail/" element={<Detail />}>
          <Route path=":name" element={<Detail />}></Route>
        </Route>
        <Route path="/tutorial" element={<Tutorial />} />
        <Route path="/tracking" element={<Tracking />} />
      </Routes>
    </div>
  );
}

export default App;
