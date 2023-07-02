import React, { Fragment, useRef } from "react";
import { SmileOutlined, FrownOutlined,DeleteOutlined } from "@ant-design/icons";

import {
  Spin,
  Empty,
  Pagination,
  Table,
  Image,
  Button,
  Input,
  Alert,
  InputNumber,
  notification,
  Modal,
} from "antd";
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
import Select from "react-select";
import locations from "./locations.json";
import { _delete, get, post } from "../../ultils/AxiosClient";
import { isDocument } from "@testing-library/user-event/dist/utils";

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

const columns = [
  {
    title: "STT",
    dataIndex: "index",
    key: "index",
    filterMode: "tree",
    filterSearch: true,
  },
  {
    title: "Địa chỉ",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Thao Tác",
    dataIndex: "action",
    key: "action",
  },
];

function AddressPage(props) {
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null);
  const [reloadAPI, setReloadAPI]=useState();
  const [dataSource, setDataSource]=useState();

  const provinces = locations.provinces;
  const districts = locations.provinces[selectedProvince]?.districts || [];
  const wards =
    locations.provinces[selectedProvince]?.districts[selectedDistrict]?.wards ||
    [];
  
  const getData = async () => { 
    const res = await get("location/getall", { PageNumber: 99999999999999999999999999 });
    if (res.status === 200) { 
      const data = res.data.data.map((item, index) => {
        return {
          index: index + 1,
          address: item.address + "," + item.commune + "," + item.district + "," + item.province,
          action: <Button onClick={() => { showModal(item.id || 1) }} > Xóa</Button>
        }
      })
      console.log("data ", data);
      setDataSource(data)
    }
  }
  
  useEffect(() => {
    getData()
  }, [reloadAPI])
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [idRemove, setIdRemove] = useState('');

  const handleRemoveProduct = async () => {
    const res = await _delete("location/delete/" + idRemove);
    if (res.status == 400) {
      res.data.errors.forEach(error => {
        openErrorNotification(error.toString())
      });
    }
    else if (res.status == 200) { 
      openSuccessNotification();
      setReloadAPI(Math.random)
    }
  };
  
  const columns = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      filterMode: "tree",
      filterSearch: true,
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Thao Tác",
      dataIndex: "action",
      key: "action",
    },
  ];

  const showModal = (id) => {
    setIsModalOpen(true);
    setIdRemove(id);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    handleRemoveProduct();
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleProvinceChange = (selectedOption) => {
    console.log("choice", selectedOption);
    setSelectedProvince(selectedOption.value);

    setSelectedDistrict(null);
    setSelectedWard(null);
  };

  const handleDistrictChange = (selectedOption) => {
    console.log("choice district", selectedOption);
    setSelectedDistrict(selectedOption.value);
    setSelectedWard(null);
  };

  const handleWardChange = (selectedOption) => {
    setSelectedWard(selectedOption);
  };

  const openSuccessNotification = () => {
    notification.open({
      message: "Thao tác thực hiện thành công",
      duration: 10,
      icon: (
        <SmileOutlined
          style={{
            color: "green",
          }}
        />
      ),
    });
  };
  const openErrorNotification = (title) => {
    notification.open({
      message: title,
      duration: 5,
      icon: <FrownOutlined style={{ color: "red" }} />,
    });
  };

  const handleSubmit = async () => {
    const value={
      province: provinces[selectedProvince]?.name || "",
      district: districts[selectedDistrict]?.name || "",
      commune: selectedWard.label,
      address: document.getElementById("address")?.value || "",
      phoneNumber: document.getElementById("address_tel")?.value || "",
      email: document.getElementById("address_email")?.value || "",
      name: document.getElementById("address_name")?.value || "",
    }
    
    const res = await post("location/create", value);
    if (res.status == 400) {
      res.data.errors.forEach(error => {
        openErrorNotification(error.toString())
      });
    }
    else if (res.status == 200) { 
      openSuccessNotification();
      setReloadAPI(Math.random)
    }

  };

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
              <span className="search__container__address-keyword"></span>
            </div>
          </div>
          <div style={{width: '80%', margin: 'auto'}}>
            <h3>Chọn địa chỉ</h3>
            <div>
              <label>Tỉnh/Thành phố:</label>
              <Select
                value={locations[selectedProvince]}
                onChange={handleProvinceChange}
                options={provinces.map((province, idx) => ({
                  value: idx,
                  label: province.name,
                }))}
              />
            </div>
            <div>
              <label>Quận/Huyện:</label>
              <Select
                value={
                  locations.provinces[selectedProvince]?.districts[
                    setSelectedDistrict
                  ]
                }
                onChange={handleDistrictChange}
                options={districts.map((district, idx) => ({
                  value: idx,
                  label: district.name,
                }))}
                isDisabled={!selectedProvince === null}
                
              />
            </div>
            <div>
              <label>Phường/Xã:</label>
              <Select
                value={selectedWard}
                onChange={handleWardChange}
                options={wards.map((ward, idx) => ({
                  value: idx,
                  label: ward.name,
                }))}
                isDisabled={selectedDistrict === null}
              />
            </div>
            <div>
              <label>Địa chỉ:</label>
              <br />
              <input
                className="input-aaaa"
                id="address"
                //value={selectedWard}
                //onChange={handleWardChange}
              />
            </div>
            <div>
              <label>Email:</label>
              <br />
              <input
                className="input-aaaa"
                type="email"
                id="address_email"
                //value={selectedWard}
                //onChange={handleWardChange}
              />
            </div>
            <div>
              <label>Số điện thoại:</label>
              <br />
              <input
                className="input-aaaa"
                type="tel"
                id="address_tel"
                //value={selectedWard}
                //onChange={handleWardChange}
              />
            </div>
            <div>
              <label>Tên người nhận:</label>
              <br />
              <input
                className="input-aaaa"
                type="text"
                id="address_name"
                //value={selectedWard}
                //onChange={handleWardChange}
              />
            </div>
            <Button onClick={handleSubmit}>LƯU</Button>
          </div>

          <Table dataSource={dataSource} columns={columns}></Table>
          {/* KẾT THÚC PHẦN BẢNG */}
        </div>
        {/* KẾT THÚC BODY CONTAINER */}
      </div>
      <Modal title="Do you really want to delete??" style={{top:'45%'}} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      </Modal>
      <Footer></Footer>
    </div>
  );
}

export default AddressPage;
