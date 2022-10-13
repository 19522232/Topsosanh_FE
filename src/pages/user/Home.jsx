import React from "react";
import Search from "../../components/search/Search";
import text from "../../assets/img/TopSoSanh_text2.png";
import logo from "../../assets/img/TopSoSanh_logo_title_removebg2.png";

import "./home.scss";

function Home(props) {
  return (
    <div className="home">
      <div className="logo_banner">
        <img src={logo} alt="logo" className="logo" />
        <img className="text" src={text} alt="text" />
      </div>
      <div className="search_bar">
        <Search></Search>
      </div>
    </div>
  );
}

export default Home;
