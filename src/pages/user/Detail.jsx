import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

import { BsChevronRight } from "react-icons/bs";
import { AiFillBell } from "react-icons/ai";
import {
  SmileOutlined,
  FrownOutlined,
  DeleteOutlined,
  HeartOutlined,HeartFilled
} from "@ant-design/icons";
import {
  Button,
  Modal,
  Input,
  Col,
  InputNumber,
  Row,
  Slider,
  Switch,
  Select,
  notification,
} from "antd";

import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import BuyButton from "../../components/Button/Button";

import "./detail.scss";
import trackingService from "../../services/trackingService";
import { get, post } from "../../ultils/AxiosClient";
import anphat from"../../assets/img/AnPhat_logo.png"
import ankhang from"../../assets/img/ankhang_logo.png"
import gear from"../../assets/img/gearvn_logo.png"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Detail(props) {
  function information(
    productName,
    productUrl,
    imageUrl,
    email,
    userName,
    price,
    locationID,
    autoOrder
  ) {
    this.productName = productName;
    this.productUrl = productUrl;
    this.imageUrl = imageUrl;
    this.email = email;
    this.userName = userName;
    this.price = price;
    this.locationId = locationID;
    this.isAutoOrder=autoOrder
  }

  const location = useLocation();
  const item = location.state;

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [inputValue, setInputValue] = useState(item.price);
  const [locationID, setLocationID] = useState();

  const [max, setMax] = useState(0);
  const [min, setMin] = useState(0);

  Array.prototype.max = function () {
    return Math.max.apply(null, this);
  };

  Array.prototype.min = function () {
    return Math.min.apply(null, this);
  };

  const [User_email, setUser_Email] = useState("");
  const [User_name, setUser_Name] = useState("");
  const [autoOrder, setAutoOrder] = useState(true);
  const [locationData, setLocationData] = useState([]);
  const [isFavorite, setFavorite] = useState(false);
  const [price, setPrice] = useState();
  const [productURL, setProductURL] = useState([]);

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

  const getFavorite = async () => {
    const res = await get("Account/GetFavoriteProductByToken");
    if (res.status == 200) { 
      res.data.data.filter((i) => {
        if (i.productUrl === item.url) {
          setFavorite(true);
        }
      })
    }
  }
  
  const getPrice = async () => {
    let temp = {}
    const res = await get(`CrawlData/GetPriceOtherShop`, {
      productName : item.name,
      shop: item.shopNum
    });
    console.log("1111",res);
    if (res.status == 200) { 
      res.data.forEach(i => {
        temp = {
          ...temp,
          [i.shop] : {
            price: i.price,
            url: i.url
          }
        }
      })
    }
    temp = {
      ...temp,
      [item.shopNum]: {
        price: item.price,
        url: item.url
      }
    }
    console.log("TMP",temp);
    setPrice(temp)
  }

  useEffect(() => {
    console.log("price" ,price);
  }, [price])

  useEffect(() => {
    getFavorite();
    getPrice();
  }, [])

  const openErrorNotification = (title) => {
    notification.open({
      message: title,
      duration: 5,
      icon: <FrownOutlined style={{ color: "red" }} />,
    });
  };

  const handleOk = async () => {
    setLoading(true);
    const userInfor = new information(
      item.name,
      item.url,
      item.img,
      User_email,
      User_name,
      inputValue,
      locationID,
      autoOrder
    );

    console.log(userInfor);
    const res = await post("ProductTracking/Subscribe", userInfor);
    if (res.status == 400) {
      res.data.errors.forEach((error) => {
        openErrorNotification(error.toString());
      });
    } else if (res.status == 200) {
      openSuccessNotification();
    }

    //trackingService.sendInfo(userInfor);

    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  const onChange = (newValue) => {
    setInputValue(newValue);
  };

  const emailChange = (newEmail) => {
    setUser_Email(newEmail.target.value);
  };

  const userNameChange = (newName) => {
    setUser_Name(newName.target.value);
  };

  const switchChange = (checked) => {
    setAutoOrder(checked);
    console.log(`switch to ${checked}`);
  };

  const locationSelected = (locationID) => {
    setLocationID(locationID);
  };

  const getLocations = async () => {
    const res = await get("location/getall", {});
    if (res.status === 200) {
      const data = res.data.data.map((item, index) => {
        return {
          value: item.id,
          label:
            item.name +
            "," +
            item.phoneNumber +
            "," +
            item.address +
            "," +
            item.commune +
            "," +
            item.district +
            "," +
            item.province,
        };
      });
      setLocationData(data);
    }
  };

  const getProductURL = async () => {
    const res = await get(
      `ProductTracking/TrackingResult?productUrl=${item.url}`,
      { productUrl: item.url }
    );

    if (res.status == 200) {
      console.log(res.data);
      setProductURL(res.data);
      setMax(res.data.prices.max());
      setMin(res.data.prices.min());
    }
  };

  useEffect(() => {
    // trackingService.getProductURL(item.url).then((res) => {
    //   setProductURL(res.data);
    //   setMax(res.data.prices.max());
    //   setMin(res.data.prices.min());
    // });
    getProductURL();
    getLocations();
  }, []);

  useEffect(() => {
    if (User_email && User_name && validateEmail(User_email)) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [User_email, User_name]);

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const data1 = {
    labels: productURL.hours,
    datasets: [
      {
        label: "Giá",
        data: productURL.prices,
        fill: true,
        backgroundColor: "rgba(75,192,192)",
        borderColor: "rgba(75,192,192)",
      },
      // {
      //   label: "Second dataset",
      //   data: [33, 25, 35, 51, 54, 76],
      //   fill: false,
      //   borderColor: "#742774",
      // },
    ],
  };

  const data2 = {
    labels: [
      "Tháng 1",
      "Tháng 2",
      "Tháng 3",
      "Tháng 4",
      "Tháng 5",
      "Tháng 6",
      "Tháng 7",
      "Tháng 8",
      "Tháng 9",
      "Tháng 10",
      "Tháng 11",
      "Tháng 12",
    ],
    datasets: [
      {
        label: "Giá AnPhat",
        data: [
          10000000, 10500000, 11000000, 12000000, 10000000, 9000000, 8000000,
          10000000, 10000000, 10500000, 10200000, 11000000,
        ],
        fill: true,

        backgroundColor: "#ffc801",
        borderColor: "#ffc801",
      },
      {
        label: "Giá gearvn",
        data: [
          11000000, 12000000, 13000000, 17000000, 15000000, 9000000, 8000000,
          11500000, 10000000, 14000000, 12000000, 8000000,
        ],
        fill: false,
        backgroundColor: "#e72425",
        borderColor: "#e72425",
      },
      {
        label: "Giá AnKhang",
        data: [
          9000000, 10000000, 7000000, 5000000, 10000000, 6000000, 11000000,
          13000000, 9500000, 10000000, 11000000, 1000000,
        ],
        fill: false,
        backgroundColor: "#0984c5",
        borderColor: "#0984c5",
      },
    ],
  };

  const options1 = {
    responsive: true,
    // maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right",
      },
      title: {
        display: false,
        text: "Thời gian biến động giá của " + item.name,
      },
    },
  };

  const options2 = {
    responsive: true,
    // maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right",
      },
      title: {
        display: false,
        text: "",
      },
    },
  };

  const handleFavorite = async () => { 
    if (isFavorite)
    {
      const res = await post('Account/RemoveFavorite/', item.url);
      if (res.status == 200) {
        setFavorite(false);
      }
    }
    else
    {
      const res = await post('Account/AddFavorite', {
        "productName": item.name,
        "productUrl": item.url,
        "imageUrl":  item.img,
        "shop": item.shopNum
      });
      console.log("--->",res);
      if (res.status == 200) {
        setFavorite(true);
      }
    }
  }

  return (
    <div className="detail">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"
          integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w=="
          crossorigin="anonymous"
          referrerpolicy="no-referrer"
        />
      </head>
      <Header></Header>
      <div className="detail__info">
        <div className="detail__info__address">
          <a href="/#" className="detail__info__address-home">
            Trang chủ
          </a>
          <BsChevronRight></BsChevronRight>
          <span className="detail__info__address-keyword">{item.name}</span>
        </div>
        <div className="detail__info__wrapper">
          <div className="detail__info__wrapper-content">
            <div className="detail__info__image">
              <img src={item.img} alt="" />
              <span className="detail__info__image-sale"></span>  
            </div>
            <div className="detail__info__content">
              <div className="detail__info__content-title">
                <h1 className="detail__info__content-name">{item.name}</h1>
                {!isFavorite ?
                  <HeartOutlined style={{ marginTop: '-20px'}} onClick={handleFavorite}/> :
                  <HeartFilled style={{ marginTop: '-20px', color: 'red' }} onClick={handleFavorite}/>}
              </div>

              <div className="detail__info__content-summary">
                <ul className="detail__info__content-summary-ul">
                  <li>Tất cả sản phẩm đều tính theo giá vietnam dong.</li>
                  <li>
                    <span>
                      Sản phẩm này hiện đang được bán tại {item.shop}{" "}
                    </span>
                  </li>
                  <li>
                    Tại {item.shop} bạn có thể mua {item.name} với giá{" "}
                    {new Intl.NumberFormat().format(item.price)}đ
                  </li>
                </ul>

                {/* Bảng so sánh */}
                {price &&
                  <div className="detail__info__content-summary-table">
                    Bảng so sánh
                    <table>
                      <tr>
                        <td className="col-store">
                          <img src={anphat} alt="" />
                          <span> AnPhat</span>
                        </td>
                        <td className="col-price">
                          {/* {price[`0`].price ? new Intl.NumberFormat().format(price[`0`].price) : 'error'} */}
                          {new Intl.NumberFormat().format(price[`0`].price)}
                          
                          <u>đ</u>{" "}
                        </td>
                        <td>
                          <a href={price[`0`].url}>
                            <BuyButton className="button button-anphat">
                              Tới nơi bán
                            </BuyButton>
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td className="col-store">
                          <img src={gear} alt="" />
                          <span> Gearvn</span>
                        </td>
                        <td className="col-price">
                          {new Intl.NumberFormat().format(price[`1`].price)}
                          <u>đ</u>
                        </td>
                        <td>
                          <a href={price[`1`].url}>
                            <BuyButton className="button button-gearvn">
                              Tới nơi bán
                            </BuyButton>
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td className="col-store">
                          <img src={ankhang} alt="" />
                          <span> An Khang</span>
                        </td>
                        <td className="col-price">
                          {new Intl.NumberFormat().format(price[`2`].price)}
                          <u>đ</u>
                        </td>
                        <td>
                          <a href={price[`2`].url}>
                            <BuyButton className="button button-ankhang">
                              Tới nơi bán
                            </BuyButton>
                          </a>
                        </td>
                      </tr>
                    </table>
                  </div>
                }
              </div>

              <p className="detail__info__content-price">
                <div
                  className="detail__info__content-notification"
                  onClick={() => {
                    setOpen(true);
                  }}
                >
                  <AiFillBell></AiFillBell>
                  Nhận thông báo giảm giá
                  {/*Dialog */}
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
                      disabled={isDisabled}
                      key="submit"
                      type="primary"
                      loading={loading}
                      onClick={handleOk}
                    >
                      Đăng ký
                    </Button>,
                  ]}
                >
                  <p>Đặt thông báo cho sản phẩm: {item.name}</p>
                  <p className="span-dialog" style={{ margin: "15px 0" }}>
                    <b>Tên của bạn:</b>
                  </p>
                  <Input
                    size="large"
                    placeholder="Username"
                    onChange={(value) => userNameChange(value)}
                  />
                  <p className="span-dialog" style={{ margin: "15px 0" }}>
                    <b>Email của bạn:</b>
                  </p>
                  <Input
                    size="large"
                    placeholder="Email"
                    onChange={(value) => emailChange(value)}
                    value={User_email}
                  />

                  <p className="span-dialog" style={{ margin: "15px 0" }}>
                    <b>Giá giảm xuống còn:</b>
                  </p>
                  <Row>
                    <Col span={11}>
                      <Slider
                        min={1}
                        max={item.price}
                        onChange={onChange}
                        value={typeof inputValue === "number" ? inputValue : 0}
                      />
                    </Col>
                    <Col span={5}>
                      <InputNumber
                        min={1}
                        max={item.price}
                        style={{
                          margin: "0 16px",
                          width: "200px",
                        }}
                        value={new Intl.NumberFormat().format(inputValue)}
                        onChange={onChange}
                        disabled
                        addonAfter="Dong"
                      />
                    </Col>
                  </Row>

                  <p className="span-dialog" style={{ margin: "15px 0" }}>
                    <b>Tự động đặt hàng:</b>
                  </p>
                  <Row>
                    <Col>
                      <Switch defaultChecked onChange={switchChange} />
                    </Col>
                  </Row>
                  {autoOrder && (
                    <>
                      <p className="span-dialog" style={{ margin: "15px 0" }}>
                        <b>Chọn địa chỉ đặt hàng:</b>
                      </p>
                      <Row>
                        <Select
                          style={{ width: "470px" }}
                          options={locationData}
                          placeholder="Chọn địa chỉ"
                          dropdownMatchSelectWidth={true}
                          placement="bottomLeft"
                          onChange={locationSelected}
                        />
                      </Row>
                    </>
                  )}
                </Modal>
              </p>

              <p className="detail__info__content-store">
                Nơi bán: {item.shop}
              </p>

              <BuyButton className="btn-buy" url={item.url}>
                Tới nơi bán
              </BuyButton>
            </div>
          </div>
          <div className="detail__info__price-range container">
            <div className="detail__info__price-range heading">
              Biến động giá
            </div>

            <div className="detail__info__price-range body">
              <div className="detail__info__price-range title">
                Thời gian biến động giá của {item.name}
              </div>
              <div className="detail__info__price-range-wrapper">
                <div className="detail__info__price-range-history">
                  Lịch sử cập nhật giá
                </div>
                <div className="detail__info__price-range-chart">
                  <div style={{ height: "420px", width: "714px" }}>
                    <Line data={data1} options={options1}></Line>
                  </div>
                  <p>Giá cao nhất: {new Intl.NumberFormat().format(max)}đ </p>
                  <p>Giá thấp nhất: {new Intl.NumberFormat().format(min)}đ</p>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="detail__info__comparison container">
            <div className="detail__info__comparison heading">So sánh giá</div>
            <div className="detail__info__comparison body">
              <div className="deatil__info__comparison title">
                So sánh giá của {item.name} trên các sàn thương mại
              </div>
              <div className="detail__info__comparison-chart">
                <Line data={data2} options={options2}></Line>
              </div>
            </div>
          </div> */}
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default Detail;
