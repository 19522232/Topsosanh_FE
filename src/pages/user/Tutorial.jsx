import React from "react";
import Header from "../../components/Header/Header";
import step1 from "../../assets/Tutorial/step1.png";
import step2 from "../../assets/Tutorial/step2.png";
import step2_1 from "../../assets/Tutorial/step2.1.png";
import step2_2 from "../../assets/Tutorial/step2.2.png";
import step2_3 from "../../assets/Tutorial/step2.3.png";
import step2_4 from "../../assets/Tutorial/step2.4.png";
import step3 from "../../assets/Tutorial/step3.png";
import step4 from "../../assets/Tutorial/step4.png";

import "./tutorial.scss";
import Footer from "../../components/Footer/Footer";
function Tutorial(props) {
  return (
    <div className="Tutorial">
      <Header></Header>

      <div className="Tutorial__body">
        {/* Title */}
        <h1 className="Tutorial__title">
          Hướng dẫn tự thêm sản phẩm muốn nhận thông báo
        </h1>
        <p>
          Trang này là hướng dẫn cơ bản về cách TopSoSanh hoạt động và cách thêm
          sản phẩm nhận thông báo từ các trang thương mại bất kì.
        </p>
        <h3>
          Bước 1: <span>Nhấn vào biểu tượng chuông trên thanh Header</span>{" "}
        </h3>
        <img id="img-step1" src={step1} alt="" style={{ width: "100%" }} />
        <h3>
          Bước 2: <span>Form cho phép điền thông tin xuất hiện </span>{" "}
        </h3>
        <img id="img-step2" src={step2} alt="" />
        <ul>
          <li>
            <b>Tên:</b> Nhập tên của bạn
          </li>
          <li>
            <b>Email:</b> Nhập email nhận thông báo
          </li>
          <li>
            <b>Tên sản phẩm:</b> Tên sản phẩm bạn muốn nhận thông báo
            <p>
              Lấy bằng cách: Tìm sản phẩm trên trang thương mại điện tử (TMĐT)
              bất kì {"->"} Chọn sản phẩm {"->"} chuột phải vào tên sản phẩm{" "}
              {"->"} chọn copy/sao chép.
            </p>
            <img src={step2_1} alt="" />
          </li>
          <li>
            <b>URL sản phẩm:</b> Đường dẫn tới trang sản phẩm
            <p>
              Lấy bằng cách: Tìm sản phẩm trên trang TMĐT bất kì {"->"} Chọn sản
              phẩm {"->"} chuột phải vào ô địa chỉ {"->"} chọn copy/sao chép.
            </p>
            <img src={step2_2} alt="" />
          </li>
          <li>
            <b>URL ảnh sản phẩm:</b> Đường dẫn tới ảnh sản phẩm
            <p>
              Lấy bằng cách: Tìm sản phẩm trên trang TMĐT bất kì {"->"} Chọn sản
              phẩm {"->"} chuột phải vào ảnh sản phẩm{"->"} chọn copy/sao chép.
            </p>
            <img src={step2_3} alt="" />
          </li>
          <li>
            <b>Selector giá sản phẩm:</b> Selector giá sản phẩm
            <p>
              Lấy bằng cách: Tìm sản phẩm trên trang TMĐT bất kì {"->"} Chọn sản
              phẩm {"->"} chuột phải vào vị trí của giá{"->"} chọn Inspect/Kiểm
              tra {"->"} Chọn sao chép {"->"} Chọn sao chép Selector .
            </p>
            <img src={step2_4} alt="" />
          </li>
          <li>
            <b>Giá sản phẩm:</b> Giá sản phẩm mong muốn nhận thông báo.
          </li>
        </ul>
        <h3>
          Bước 3: <span>Kiểm tra selector giá sản phẩm</span>{" "}
        </h3>
        <img src={step3} alt="" />
        <ul>
          <li>Nếu không hoạt động, hãy thử tìm lại Selector giá sản phẩm</li>
          <li>Nếu hoạt động bình thường, tiếp tục tới bước 4</li>
        </ul>
        <h3>
          Bước 4: <span>Đăng ký nhận thông báo</span>{" "}
        </h3>
        <img src={step4} alt="" />
      </div>

      <Footer></Footer>
    </div>
  );
}

export default Tutorial;
