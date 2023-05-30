import "./App.css";
import { Route, Routes } from "react-router-dom";

// import Home from "./pages/user/Home";
// import Login from "./pages/user/Login";
// import SignUp from "./pages/user/SignUp";
// import Search from "./pages/user/Search";
// import Detail from "./pages/user/Detail";
// import Tutorial from "./pages/user/Tutorial";
// import Tracking from "./pages/user/Tracking";

import {
  HomePage,
  LoginPage,
  SignUpPage,
  SearchPage,
  DetailPage,
  TutorialPage,
  TrackingPage,
} from "./pages/lazyLoad";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />}></Route>
        <Route path="/search/:keyword" element={<SearchPage />}></Route>
        <Route path="/detail/" element={<DetailPage />}>
          <Route path=":name" element={<DetailPage />}></Route>
        </Route>
        <Route path="/tutorial" element={<TutorialPage />} />
        <Route path="/tracking" element={<TrackingPage />} />
      </Routes>
    </div>
  );
}

export default App;
