import React, { Fragment, useRef } from "react";

import { Spin, Empty, Pagination, Select, Table, Image, Button, Alert } from "antd";
import Header from "../../components/Header/Header";
import ProductGrid from "../../components/productGrid/ProductGrid";
import productService from "../../services/productService";
import Footer from "../../components/Footer/Footer";
import { BsChevronRight } from "react-icons/bs";

import "./style.index.scss";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// const ProductList = [
//   {
//     id: 1,
//     img: "https://thegioiso365.vn/wp-content/uploads/2022/01/Dell-Vostro-3400.jpg",
//     name: "Dell Vostro 3400 14 inch Core i5-1135G7 RAM 8GB SSD 512GB FHD Sliver",
//     price: 14990000,
//     sale: 19,
//     recommend: true,
//     address: ["Hà Nội", "Thành phố HCM "],
//     logo: gearvn_logo,
//     stores: ["thegioididong", "phongvu"],
//     shop: "gearvn",
//   },

//   {
//     id: 2,
//     img: "https://minhancomputercdn.com/media/product/7677_laptop_82k2008wvn.jpg",
//     name: "Laptop Lenovo IdeaPad Gaming 3",
//     price: 23990000,
//     sale: 19,
//     recommend: false,
//     address: ["Hà Nội", "Thành phố HCM ", "Đà Nẵng", "Hải Phòng"],
//     logo: phongvu_logo,
//     stores: ["thegioididong", "phongvu"],
//     shop: "phongvu",
//   },

//   {
//     id: 3,
//     img: "https://thegioiso365.vn/wp-content/uploads/2022/01/Dell-Vostro-3400.jpg",
//     name: "Dell Vostro 3400 14 inch Core i5-1135G7 RAM 8GB SSD 512GB FHD Sliver",
//     price: 14990000,
//     sale: 19,
//     recommend: true,
//     address: ["Hà Nội", "Thành phố HCM ", "Đà Nẵng", "Hải Phòng"],
//     logo: phongvu_logo,
//     stores: ["thegioididong", "phongvu"],
//     shop: "phongvu",
//   },

//   {
//     id: 4,
//     img: "https://thegioiso365.vn/wp-content/uploads/2022/01/Dell-Vostro-3400.jpg",
//     name: "Dell Vostro 3400 14 inch Core i5-1135G7 RAM 8GB SSD 512GB FHD Sliver",
//     price: 14990000,
//     sale: 19,
//     recommend: true,
//     address: ["Hà Nội", "Thành phố HCM ", "Đà Nẵng", "Hải Phòng"],
//     logo: phongvu_logo,
//     stores: ["thegioididong", "phongvu"],
//     shop: "phongvu",
//   },

//   {
//     id: 5,
//     img: "https://thegioiso365.vn/wp-content/uploads/2022/01/Dell-Vostro-3400.jpg",
//     name: "Dell Vostro 3400 14 inch Core i5-1135G7 RAM 8GB SSD 512GB FHD Sliver",
//     price: 14990000,
//     sale: 19,
//     recommend: false,
//     address: ["Hà Nội", "Thành phố HCM ", "Đà Nẵng", "Hải Phòng"],
//     logo: phongvu_logo,
//     stores: ["thegioididong", "phongvu"],
//     shop: "phongvu",
//   },

//   {
//     id: 6,
//     img: "https://thegioiso365.vn/wp-content/uploads/2022/01/Dell-Vostro-3400.jpg",
//     name: "Dell Vostro 3400 14 inch Core i5-1135G7 RAM 8GB SSD 512GB FHD Sliver",
//     price: 14990000,
//     sale: 19,
//     recommend: true,
//     address: ["Hà Nội", "Thành phố HCM ", "Đà Nẵng", "Hải Phòng"],
//     logo: phongvu_logo,
//     stores: ["thegioididong", "phongvu"],
//     shop: "phongvu",
//   },

//   {
//     id: 7,
//     img: "https://thegioiso365.vn/wp-content/uploads/2022/01/Dell-Vostro-3400.jpg",
//     name: "Dell Vostro 3400 14 inch Core i5-1135G7 RAM 8GB SSD 512GB FHD Sliver",
//     price: 14990000,
//     sale: 19,
//     address: ["Hà Nội", "Thành phố HCM ", "Đà Nẵng", "Hải Phòng"],
//     logo: phongvu_logo,
//     stores: ["thegioididong", "phongvu"],
//     shop: "phongvu",
//   },

//   {
//     id: 1,
//     img: "https://thegioiso365.vn/wp-content/uploads/2022/01/Dell-Vostro-3400.jpg",
//     name: "Dell Vostro 3400 14 inch Core i5-1135G7 RAM 8GB SSD 512GB FHD Sliver",
//     price: 14990000,
//     sale: 19,
//     address: ["Hà Nội", "Thành phố HCM ", "Đà Nẵng", "Hải Phòng"],
//     logo: phongvu_logo,
//     stores: ["thegioididong", "phongvu"],
//     shop: "phongvu",
//   },

//   {
//     id: 2,
//     img: "https://minhancomputercdn.com/media/product/7677_laptop_82k2008wvn.jpg",
//     name: "Laptop Lenovo IdeaPad Gaming 3 15ACH6 82K2008WVN 15inch Ryzen 5 5600H/RTX 3050/RAM 8GB/SSD 512GB/WIN10/BLACK",
//     price: 23990000,
//     sale: 19,
//     recommend: true,
//     address: ["Hà Nội", "Thành phố HCM ", "Đà Nẵng", "Hải Phòng"],
//     logo: phongvu_logo,
//     stores: ["thegioididong", "phongvu"],
//     shop: "phongvu",
//   },

//   {
//     id: 3,
//     img: "https://thegioiso365.vn/wp-content/uploads/2022/01/Dell-Vostro-3400.jpg",
//     name: "Dell Vostro 3400 14 inch Core i5-1135G7 RAM 8GB SSD 512GB FHD Sliver",
//     price: 14990000,
//     sale: 19,
//     address: ["Hà Nội", "Thành phố HCM ", "Đà Nẵng", "Hải Phòng"],
//     logo: phongvu_logo,
//     stores: ["thegioididong", "phongvu"],
//     shop: "phongvu",
//   },

//   {
//     id: 4,
//     img: "https://thegioiso365.vn/wp-content/uploads/2022/01/Dell-Vostro-3400.jpg",
//     name: "Dell Vostro 3400 14 inch Core i5-1135G7 RAM 8GB SSD 512GB FHD Sliver",
//     price: 14990000,
//     sale: 19,
//     address: ["Hà Nội", "Thành phố HCM ", "Đà Nẵng", "Hải Phòng"],
//     logo: phongvu_logo,
//     stores: ["thegioididong", "phongvu"],
//     shop: "phongvu",
//   },

//   {
//     id: 5,
//     img: "https://thegioiso365.vn/wp-content/uploads/2022/01/Dell-Vostro-3400.jpg",
//     name: "Dell Vostro 3400 14 inch Core i5-1135G7 RAM 8GB SSD 512GB FHD Sliver",
//     price: 14990000,
//     sale: 19,
//     recommend: true,
//     address: ["Hà Nội", "Thành phố HCM ", "Đà Nẵng", "Hải Phòng"],
//     logo: phongvu_logo,
//     stores: ["thegioididong", "phongvu"],
//     shop: "phongvu",
//   },

//   {
//     id: 6,
//     img: "https://thegioiso365.vn/wp-content/uploads/2022/01/Dell-Vostro-3400.jpg",
//     name: "Dell Vostro 3400 14 inch Core i5-1135G7 RAM 8GB SSD 512GB FHD Sliver",
//     price: 14990000,
//     sale: 19,
//     address: ["Hà Nội", "Thành phố HCM ", "Đà Nẵng", "Hải Phòng"],
//     logo: phongvu_logo,
//     stores: ["thegioididong", "phongvu"],
//     shop: "phongvu",
//   },

//   {
//     id: 7,
//     img: "https://thegioiso365.vn/wp-content/uploads/2022/01/Dell-Vostro-3400.jpg",
//     name: "Dell Vostro 3400 14 inch Core i5-1135G7 RAM 8GB SSD 512GB FHD Sliver",
//     price: 14990000,
//     sale: 19,
//     address: ["Hà Nội", "Thành phố HCM ", "Đà Nẵng", "Hải Phòng"],
//     logo: phongvu_logo,
//     stores: ["thegioididong", "phongvu"],
//     shop: "phongvu",
//   },
// ];

const Shop = {
  Anphat: 0,
  Gearvn: 1,
  Ankhang: 2,
};
const handleRemoveProduct = (id) => {
    console.log('','éc ô éc')
}
const dataSource = [
    {
      key: '1',
        name: '1',
      img:<Image src="https://nodejs.org/static/images/logo.svg"></Image>,
      age: 32,
        address: '10 Downing Street',
        action: <Button onClick={() => { handleRemoveProduct(1) }}>Xóa mẹ m đi</Button>
    },
    {
      key: '2',
      name: 'John',
      age: 42,
      address: '10 Downing Street',
    },
  ];
  
  const columns = [
    {
      title: 'STT',
      dataIndex: 'name',
          key: 'name',
          filterMode: 'tree',
          filterSearch: true,
    },
    {
      title: 'Hình Ảnh',
      dataIndex: 'img',
      key: 'img',
    },
    {
      title: 'Tên Sản Phẩm',
      dataIndex: 'address',
      key: 'address',
      },
      {
        title: 'Thao Tác',
        dataIndex: 'action',
        key: 'action',
      },
  ];

function FavoritePage(props) {

  return (
    <div className="search">
      {/* HEADER  */}
      <Header></Header>

      {/* KẾT THÚC HEADER */}

      {/* BODY */}
      <div className="search__container">
        {/* LỌC SẢN PHẨM */}

        {/* KẾT THÚC LỌC */}
        {/* BODY CONTAINER */}
        <div className="search__container__list">
          <div className="search__container__tooltip">
            {/* PHẦN ĐỊA CHỈ */}
            <div className="search__container__address">
              <a href="/#" className="search__container__address-home">
                Trang chủ
              </a>
              <BsChevronRight></BsChevronRight>
              <span className="search__container__address-keyword">
           
              </span>
            </div>
           
          </div>

<Table dataSource={dataSource} columns={columns}></Table>
          {/* KẾT THÚC PHẦN BẢNG */}
        </div>
        {/* KẾT THÚC BODY CONTAINER */}
      </div>
      <Footer></Footer>
    </div>
  );
}

export default FavoritePage;
