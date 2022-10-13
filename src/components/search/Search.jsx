import { useState } from "react";
import "./search.scss";
import "../Button/Button";
import Button from "../Button/Button";

function Search(props) {
  const [keyword, setKeyword] = useState();

  return (
    <div className="home_search">
      <input
        type="text"
        placeholder="Tìm kiếm"
        value={keyword}
        onChange={(e) => {
          setKeyword(e.currentTarget.value);
        }}
      />

      <Button className="btn">Tìm kiếm</Button>
    </div>
  );
}

export default Search;
