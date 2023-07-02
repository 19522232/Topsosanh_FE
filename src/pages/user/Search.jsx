import React, { Fragment, useRef } from "react";

import { Spin, Empty, Pagination, Select } from "antd";
import Header from "../../components/Header/Header";
import ProductGrid from "../../components/productGrid/ProductGrid";
import productService from "../../services/productService";
import Footer from "../../components/Footer/Footer";
import { BsChevronRight } from "react-icons/bs";

import "./search.scss";
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

function Search(props) {
  const location = useLocation();
  const navigate = useNavigate();

  const item = location.state;

  const [products, setProducts] = useState({});
  const Sort = useRef("Sắp xếp tăng dần");

  const [pagenumber, setPageNumber] = useState(item.pagenumber);
  const [quantity, setQuantity] = useState(item.quantity);
  const [keyword, setKeyword] = useState(item.keyword);
  const [isAscending, setisAscending] = useState(item.isAscending);

  const [currentCount, setCount] = useState(60);
  const timer = () => setCount(currentCount - 1);

  const sortChange = (value) => {
    setisAscending(value);
    if (value) {
      Sort.current = "Sắp xếp tăng dần";
    } else Sort.current = "Sắp xếp mặc định";
  };

  useEffect(() => {
    if (currentCount <= 0) {
      return;
    }
    const id = setInterval(timer, 1000);
    return () => clearInterval(id);
  }, [currentCount]);

  function switchShop(param) {
    switch (param) {
      case Shop.Anphat:
        return "Anphat";
        break;

      case Shop.Gearvn:
        return "Gearvn";
        break;

      case Shop.Ankhang:
        return "Ankhang";
        break;

      default:
        break;
    }
  }

  useEffect(() => {
    setProducts({});
    setCount(60);
    productService
      .getProduct(pagenumber, quantity, keyword, isAscending)
      .then((res) => {
        setProducts(res.data); //Trả về products là 1 object
      });
  }, [pagenumber, quantity]);

  useEffect(() => {
    setKeyword(item.keyword);
  }, [item.keyword]);

  useEffect(() => {
    setProducts({});
    setCount(60);
    productService
      .getProduct(pagenumber, quantity, keyword, isAscending)
      .then((res) => {
        setProducts(res.data); //Trả về products là 1 object
      });
  }, [keyword]);

  useEffect(() => {
    setProducts({});
    setCount(60);
    productService
      .getProduct(pagenumber, quantity, keyword, isAscending)
      .then((res) => {
        setProducts(res.data); //Trả về products là 1 object
      });
  }, [isAscending]);

  const passData = (item) => {
    navigate(`/detail/${item.name}`, {
      state: {
        name: item.name,
        price: item.newPrice,
        img: item.imageUrl,
        shop: switchShop(item.shop),
        url: item.itemUrl,
      },
    });
  };

  return (
    <div className="search">
      {/* HEADER  */}
      <Header></Header>

      {/* KẾT THÚC HEADER */}

      {/* BODY */}
      <div className="search__container">
        {/* LỌC SẢN PHẨM */}

        {/* <div className="search__container__filter">
          <div className="search__container__filter--title"></div>
          <div className="search__container__filter--wrapper">
            <div className="wrapper__item">
              <div className="wrapper__item-title">Địa chỉ nơi bán</div>
              <div className="wrapper__item-searchbar">
                <input type="text" placeholder="Địa chỉ nơi bán" />
                <span className="search-icon">
                  <img
                    src="https://asset.websosanh.vn/images/assets/search-form.svg"
                    alt=""
                  />
                </span>
              </div>
              <div className="wrapper__item-choose">
                <ol>l</ol>
              </div>
            </div>
          </div>
        </div> */}
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
                Kết quả tìm kiếm cho " {item.keyword} "
              </span>
            </div>
            {/* KẾT THÚC PHẦN ĐỊA CHỈ */}

            {/* PHẦN SẮP XẾP */}
            {Object.keys(products).length != 0 && (
              <div className="search__container__sort">
                <Select
                  style={{
                    width: 180,
                  }}
                  defaultValue={Sort.current}
                  onChange={sortChange}
                  options={[
                    {
                      value: true,
                      label: "Sắp xếp tăng dần",
                    },
                    {
                      value: false,
                      label: "Sắp xếp mặc định",
                    },
                  ]}
                />
              </div>
            )}
            {/* KẾT THÚC PHẦN SẮP XẾP */}
          </div>

          {Object.keys(products).length == 0 && currentCount !== 0 && (
            <div className="Spin">
              <Spin
                spinning={Object.keys(products).length == 0}
                size="large"
                tip="Loading"
              ></Spin>
            </div>
          )}

          {Object.keys(products).length == 0 && currentCount == 0 && (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              imageStyle={{
                height: 60,
                marginTop: 100,
              }}
              description={<span>Không tìm thấy sản phẩm</span>}
            ></Empty>
          )}

          {/* PHẦN HIỂN THỊ BẢNG */}

          {Object.keys(products).length != 0 && (
            <table className="search__container__table">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Hình ảnh</th>
                  <th>Tên sản phẩm</th>
                  <th>Nơi bán</th>
                  <th>Giá tiền</th>
                </tr>
              </thead>

              <tbody>
                {products.data.map((item, index) => {
                  return (
                    <Fragment>
                      <tr className="itemRow">
                        <td className="itemCell item-index">{index + 1}</td>
                        <td className="itemCell item-img">
                          <img src={item.imageUrl} alt="" />
                        </td>
                        <td className="itemCell item-name">
                          <a
                            onClick={() => {
                              passData(item);
                            }}
                          >
                            {item.name}
                          </a>
                        </td>
                        <td className="itemCell item-shop">
                          {switchShop(item.shop)}
                        </td>
                        <td className="itemCell item-price">
                          {new Intl.NumberFormat().format(item.newPrice)}
                          <span>
                            <u>đ</u>
                          </span>
                        </td>
                      </tr>
                    </Fragment>
                  );
                })}
              </tbody>
            </table>
          )}

          {Object.keys(products).length != 0 && (
            <div className="ant-pagination">
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
                total={products.totalCount}
                showQuickJumper
              />
            </div>
          )}

          {/* KẾT THÚC PHẦN BẢNG */}
        </div>
        {/* KẾT THÚC BODY CONTAINER */}
      </div>
      <Footer></Footer>
    </div>
  );
}

export default Search;
