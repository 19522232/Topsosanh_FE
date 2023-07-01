import React, { Fragment, useRef } from "react";

import { Spin, Empty, Pagination, Select, Table, Image, Button, Alert, notification, Modal } from "antd";
import Header from "../../components/Header/Header";
import ProductGrid from "../../components/productGrid/ProductGrid";
import productService from "../../services/productService";
import Footer from "../../components/Footer/Footer";
import { BsChevronRight } from "react-icons/bs";

import "./style.index.scss";
import { useEffect,useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { get, post } from "../../ultils/AxiosClient";
import { SmileOutlined, FrownOutlined,DeleteOutlined } from "@ant-design/icons";

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
    title: 'STT',
    dataIndex: 'Key',
        key: 'Key',
        filterMode: 'tree',
        filterSearch: true,
  },
    {
      title: 'Tên Sản Phẩm',
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
        title: 'Thao Tác',
        dataIndex: 'action',
        key: 'action',
      },
  ];

function FavoritePage(props) {

  const [data, setData] = useState([]);
  const [redoadAPI, setRedoadAPI]=useState();
  const handleRemoveProduct = async() => {
    const res = await post('Account/RemoveFavorite', idRemove);
    if (res.status == 200) {
      openSuccessNotification();
      setRedoadAPI(Math.random);
    }
    else if (res.status == 400) {
      openErrorNotification(res.data.errors.toString());
    }
  }
  const openSuccessNotification = () => {
    notification.open({
      message: "Delete Favorite Success",
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
      duration: 2,
      icon: <FrownOutlined style={{ color: "red" }} />,
    });
  };
  const getData = async() => {
    const res = await get('Account/GetFavoriteProductByToken', {PageNumber:99999999999999999999999999});
    if (res.status == 200) {
      const tmp = res.data.data.map((i, idx) => {
        return {
          Key: idx+1,
          name: <a key={idx} href={i.productUrl} target="_blank" >{i.productName}</a>,
        img:<div style={{width:'200px',height:'200px'}}><Image src={i.imageUrl}  ></Image></div>,
          action: <Button onClick={() => { showModal(i.productUrl || 1) }} > Hủy yêu thích</Button>
        }
      })
      setData(tmp);
    }
    
  }
  useEffect(() => {
    getData();
  }, [redoadAPI])
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [idRemove, setIdRemove] = useState('');
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
{/* <div style={{width:'1300px', border:'3px solid black'}}> */}
          <Table dataSource={data} columns={columns} ></Table>
          {/* </div> */}
          <Modal title="Do you really want to delete??" style={{top:'45%'}} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        
      </Modal>
          {/* KẾT THÚC PHẦN BẢNG */}
        </div>
        {/* KẾT THÚC BODY CONTAINER */}
      </div>
      <Footer></Footer>
    </div>
  );
}

export default FavoritePage;
