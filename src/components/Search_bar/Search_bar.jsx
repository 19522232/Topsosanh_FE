import { useState } from "react";
import "./search_bar.scss";
import "../Button/Button";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import productService from "../../services/productService";

function Search_bar(props) {
  const [keyword, setKeyword] = useState();
  const navigate = useNavigate();

  const search = () => {
    navigate(`/search/${keyword}`, {
      state: {
        keyword: keyword,
        pagenumber: 1,
        quantity: 10,
        isAscending: true,
      },
    });
    console.log(keyword);
  };

  const enterHandle = (event) => {
    if (event.key === "Enter") {
      search();
    }
  };

  return (
    <div className="search_bar">
      <input
        type="text"
        placeholder="Tìm kiếm"
        value={keyword}
        onChange={(e) => {
          setKeyword(e.currentTarget.value);
        }}
        onKeyDown={(e) => {
          enterHandle(e);
        }}
      />

      <Button className="btn" onClick={search}>
        Tìm kiếm
      </Button>
    </div>
  );
}

export default Search_bar;
