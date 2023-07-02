import React, { useEffect, useState } from "react";

import "./header.scss";
import logo from "../../assets/img/TopSoSanh_logo_icon.png";
import text from "../../assets/img/TopSoSanh_text2.png";
import Searchbar from "../Search_bar/Search_bar";

import { AiFillBell } from "react-icons/ai";
import { Button, Modal, Input, Avatar, Dropdown, Space } from "antd";
import { UserOutlined, CaretDownOutlined } from "@ant-design/icons";

import { Link, useNavigate } from "react-router-dom";

import notificationService from "../../services/notificationService";
import trackingService from "../../services/trackingService";

function Header(props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isTest, setIsTest] = useState(true);

  const navigate = useNavigate();
  const handleCancel = () => {
    setOpen(false);
  };

  const handleOk = () => {
    setLoading(true);
    const userInfor = new userInformation(
      email,
      productName,
      productURL,
      userName,
      imgURL,
      selector,
      price
    );

    trackingService.sendNotif(userInfor);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };

  const [isTestSuccess, setTestSuccess] = useState(false);
  const [price, setPrice] = useState(0);
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [productName, setProductName] = useState("");
  const [productURL, setProductURL] = useState("");
  const [imgURL, setImgURL] = useState("");
  const [selector, setSelector] = useState("");

  const handleTest = () => {
    const newSelector = selector.split(" ").join("");
    console.log(newSelector);

    notificationService
      .getProductSelector(productURL, selector)
      .then((res) => {
        setTestSuccess(true);

        alert(
          `Lấy giá thành công: ${new Intl.NumberFormat().format(res.data)} đ`
        );
      })
      .catch((err) => {
        alert("Selector chưa đúng");
        setTestSuccess(false);
      });
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  function userInformation(
    email,
    productName,
    productURL,
    userName,
    imgURL,
    selector,
    price
  ) {
    this.email = email;
    this.productName = productName;
    this.productUrl = productURL;
    this.userName = userName;
    this.imageUrl = imgURL;
    this.productPriceSelector = selector;
    this.price = price;
  }

  function emailChange(value) {
    setEmail(value.target.value);
  }

  function UserNameChange(value) {
    setUserName(value.target.value);
  }

  function ProductNameChange(value) {
    setProductName(value.target.value);
  }

  function ImgURLChange(value) {
    setImgURL(value.target.value);
  }

  function ProductURLChange(value) {
    setProductURL(value.target.value);
  }

  function SelectorChange(value) {
    setSelector(value.target.value);
    setTestSuccess(false);
  }

  function PriceChange(value) {
    setPrice(value.target.value);
  }

  const items = [
    {
      label: <Link to="/tracking">Sản phẩm theo dõi</Link>,
      key: "0",
    },
    {
      label: <Link to="/favorite">Sản phẩm yêu thích</Link>,
      key: "1",
    },
    {
      label: <Link to="/address">Địa điểm đặt hàng</Link>,
      key: "2",
    },
    {
      type: "divider",
    },
    {
      label: <span style={{ color: "red" }}>Đăng xuất</span>,
      key: "4",
      onClick: () => {
        navigate("/login");
      },
    },
  ];

  useEffect(() => {
    if (
      email &&
      userName &&
      productName &&
      productURL &&
      imgURL &&
      selector &&
      validateEmail(email) &&
      isTestSuccess
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
    if (selector) {
      setIsTest(false);
    } else setIsTest(true);
  }, [
    email,
    productName,
    productURL,
    userName,
    imgURL,
    selector,
    price,
    isTestSuccess,
  ]);

  return (
    <div className="header__wrapper">
      <div className="header__container">
        <div className="header__logo">
          <a href="/#">
            <img className="header__logo__img" src={logo} alt="logo" />
            <img className="header__logo__text" src={text} alt="" />
          </a>
        </div>

        <div className="header__search-wrap">
          <div className="header__search-wrap__search-bar">
            <Searchbar setkeyword={props.setkeyword}></Searchbar>
          </div>
        </div>

        <div className="header__avatar">
          <Avatar
            style={{
              backgroundColor: "#87d068",
              marginRight: "5px",
            }}
            icon={<UserOutlined />}
          />

          <Dropdown
            menu={{
              items,
            }}
            trigger={["click"]}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <CaretDownOutlined style={{ fontSize: "12px" }} />
              </Space>
            </a>
          </Dropdown>
        </div>

        <div
          className="header__notification"
          onClick={() => {
            setOpen(!open);
          }}
        >
          <AiFillBell></AiFillBell>
        </div>

        <Modal
          open={open}
          title="Nhận ưu đãi giảm giá"
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel}>
              Quay về
            </Button>,
            <Button
              disabled={isTest}
              onClick={handleTest}
              style={{ backgroundColor: "orange", color: "#fff" }}
            >
              Kiểm tra
            </Button>,
            <Button
              key="submit"
              type="primary"
              loading={loading}
              onClick={handleOk}
              disabled={isDisabled}
            >
              Đăng ký
            </Button>,
          ]}
        >
          <div>
            <p className="span-dialog" style={{ margin: "15px 0" }}>
              <b>Tên:</b>
            </p>
            <Input
              size="large"
              placeholder="Username"
              onChange={(value) => UserNameChange(value)}
            />
            <p className="span-dialog" style={{ margin: "15px 0" }}>
              <b>Email:</b>
            </p>
            <Input
              size="large"
              placeholder="Email"
              onChange={(value) => emailChange(value)}
            />
            <p className="span-dialog" style={{ margin: "15px 0" }}>
              <b>Tên sản phẩm:</b>
            </p>
            <Input
              size="large"
              placeholder="Tên sản phẩm"
              onChange={(value) => ProductNameChange(value)}
            />
            <p className="span-dialog" style={{ margin: "15px 0" }}>
              <b>URL sản phẩm:</b>
            </p>
            <Input
              size="large"
              placeholder="URL sản phẩm"
              onChange={(value) => ProductURLChange(value)}
            />
            <p className="span-dialog" style={{ margin: "15px 0" }}>
              <b>URL ảnh sản phẩm:</b>
            </p>
            <Input
              size="large"
              placeholder="URL ảnh sản phẩm"
              onChange={(value) => ImgURLChange(value)}
            />
            <p className="span-dialog" style={{ margin: "15px 0" }}>
              <b>Selector giá sản phẩm:</b>
            </p>
            <Input
              size="large"
              placeholder="Selector giá sản phẩm muốn nhận thông báo"
              onChange={(value) => SelectorChange(value)}
            />
            <p className="span-dialog" style={{ margin: "15px 0" }}>
              <b>Giá sản phẩm:</b>
            </p>
            <div style={{ display: "flex" }}>
              <Input
                type="number"
                max={900000000}
                min={1}
                defaultValue={0}
                addonAfter="Dong"
                onChange={(value) => PriceChange(value)}
                style={{ width: "200px" }}
              />
              <p style={{ margin: "auto 0 auto auto" }}>
                <a href="/tutorial">Hướng dẫn sử dụng</a>
              </p>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default Header;
