import React, { useState } from "react";

import "./tracking.scss";
import { Spin, Empty, Pagination, Select } from "antd";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { BsChevronRight } from "react-icons/bs";
export default function Tracking(props) {
  const [pagenumber, setPageNumber] = useState();
  const [quantity, setQuantity] = useState();

  const products = [
    {
      name: "abc",
      shopName: "Phong Vũ",
      newPrice: 20000000,
    },
    {
      name: "bcd",
      shopName: "Phong Vũ",
      newPrice: 20000000,
    },
    {
      name: "efgh",
      shopName: "Phong Vũ",
      newPrice: 20000000,
    },
    {
      name: "abc",
      shopName: "Phong Vũ",
      newPrice: 20000000,
    },
    {
      name: "abc",
      shopName: "Phong Vũ",
      newPrice: 20000000,
    },
  ];

  return (
    <div className="Tracking">
      <Header></Header>

      <div className="Tracking__container">
        <div className="Tracking__container__address">
          <a href="/#" className="Tracking__container__address-home">
            Trang chủ
          </a>
          <BsChevronRight></BsChevronRight>
          <span className="Tracking__container__address-keyword">
            Danh sách theo dõi
          </span>
        </div>

        {/* PHẦN HIỂN THỊ BẢNG */}
        <table className="Tracking__container__table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên sản phẩm</th>
              <th>Nơi bán</th>
              <th>Giá tiền</th>
              <th>Hành động</th>
            </tr>
          </thead>

          <tbody>
            {products.map((item, index) => {
              return (
                <>
                  <tr className="itemRow">
                    <td className="itemCell item-index">{index + 1}</td>
                    {/* <td className="itemCell item-img">
                      <img src={item.imageUrl} alt="" />
                    </td> */}
                    <td className="itemCell item-name">{item.name}</td>
                    <td className="itemCell item-shop">{item.shopName}</td>
                    <td className="itemCell item-price">
                      {new Intl.NumberFormat().format(item.newPrice)}
                      <span>
                        <u>đ</u>
                      </span>
                    </td>
                    <td className="itemCell item-action">
                      <span>delete</span>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>

        {/* <div className="ant-pagination">
          <Pagination
            size="small"
            current={pagenumber}
            pageSize={quantity}
            onChange={(pageNum, size) => {
              if (pageNum !== pagenumber) {
                setPageNumber(pageNum);
              } else if (size !== quantity) {
                setQuantity(size);
              }
            }}
            total="10"
            showQuickJumper
          />
        </div> */}
      </div>

      <Footer></Footer>
    </div>
  );
}
