import React from "react";

import "./footer.scss";
import logo from "../../assets/img/TopSoSanh_logo_icon_white.png";
import text from "../../assets/img/TopSoSanh_text2.png";

function Footer(props) {
  return (
    <div className="Footer__wrapper">
      <div className="Footer__container">
        <div className="Footer__content">
          <div className="Footer__content-introduction">
            <p>TOPSOSANH</p>
            <p>
              Topsosanh chuyên cung cấp thông tin giá cả, so sánh giá sản phẩm
              Online. Giúp bạn có thể so sánh giá, tìm giá rẻ nhất trước khi
              mua. Chúng tôi không bán hàng.
            </p>
          </div>
          <div className="Footer__content-about">
            <h2>Về chúng tôi</h2>
            <p>
              Bằng khả năng sẵn có cùng sự nỗ lực không ngừng, chúng tôi thu
              thập thông tin giá cả các sản phẩm điện tử, laptop, bàn phím, ram,
              ổ cứng,...tại các nhà bán lẻ lớn, uy tín tại Việt Nam.
            </p>
          </div>
          <div className="Footer__content-function">
            <p>Giới thiệu</p>
            <p>Chính sách bảo mật</p>
            <p>Điều khoản sử dụng</p>
            <p>Liên hệ với chúng tôi</p>
          </div>
          <div className="Footer__content-register">
            <h2>Đăng ký Bản Tin</h2>
            <p>
              Tham gia đăng ký nhận bản tin từ chúng tôi. Bạn sẽ có cơ hội mua
              hàng chính hãng với giá rẻ nhất.
            </p>
          </div>
        </div>
        <div className="Footer__website-name">
          <a href="/#">
            <img className="logo-img" src={logo} alt="logo" />
            <img className="logo-text" src={text} alt="" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
