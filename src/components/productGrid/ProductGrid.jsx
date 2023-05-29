import React from "react";
import Card from "../Card/Card";
import "./productGrid.scss";

function ProductGrid(props) {
  const productItems = props.item;
  return (
    <ul className="ProductGrid">
      {productItems.map((item, index) => (
        <li>
          <Card item={item} key={index}></Card>
        </li>
      ))}
    </ul>
  );
}

export default ProductGrid;
