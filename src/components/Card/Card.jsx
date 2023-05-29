import React from "react";
import { Link, useNavigate } from "react-router-dom";

import "./card.scss";

function Card(props) {
  const item = props.item;
  const index = props.key;

  const navigate = useNavigate();

  const passData = () => {
    navigate(`/detail/${item.name}`, {
      state: {
        id: index,
        name: item.name,
        price: item.price,
        img: item.imageUrl,
      },
    });
  };

  // const address = item.address.map((itemAddress) => {
  //   return itemAddress + ", ";
  // });

  return (
    <div className="product__item">
      <a
        onClick={() => {
          passData();
        }}
      >
        <span className={item.recommend ? "offer__icon active" : "offer__icon"}>
          Đề xuất
        </span>
        <div className="product__item__content">
          <span className="product__item__content__img">
            <img src={item.imageUrl} alt="" />
          </span>
          <h3>{item.name}</h3>
        </div>
        <span className="product__item__bottom">
          <span className="product__item__bottom__price">{item.price}</span>
          <span className="product__item__bottom__sale"></span>
        </span>
      </a>
    </div>
  );
}

export default Card;
