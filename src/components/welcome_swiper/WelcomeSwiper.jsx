import React from "react";
import "./welcomeswiper.scss";

import { Carousel } from "antd";

const contentStyle = {
  margin: 0,
  height: "470px",
  width: "100%",
  color: "#fff",
  textAlign: "center",
  background: "#364d79",
  fontSize: "40px",
};

function WelcomeSwiper() {
  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };
  return (
    <div className="WelcomeSwiper">
      <Carousel afterChange={onChange}>
        <div>
          <h3
            style={{
              ...contentStyle,
              backgroundImage: `url("https://wallpaperaccess.com/full/268549.jpg")`,
              backgroundSize: "cover",
            }}
          ></h3>
        </div>
        <div>
          <h3
            style={{
              ...contentStyle,
              backgroundImage: `url("https://wallpapercave.com/wp/ygA4ALZ.jpg")`,
              backgroundSize: "cover",
            }}
          ></h3>
        </div>
        <div>
          <h3
            style={{
              ...contentStyle,
              backgroundImage: `url("https://knowinsiders.com/stores/news_dataimages/lyht/102021/09/16/in_article/5423_CAPRICORN-Horoscope_2022-Predictions-for-career-and-job-2.jpg?rt=20220425162344")`,
              backgroundSize: "cover",
            }}
          ></h3>
        </div>
        <div>
          <h3
            style={{
              ...contentStyle,
              backgroundImage: `url("https://d2rd7etdn93tqb.cloudfront.net/wp-content/uploads/2018/08/rawpixel-559744-unsplash.jpg")`,
              backgroundSize: "cover",
            }}
          ></h3>
        </div>
      </Carousel>
    </div>
  );
}

export default WelcomeSwiper;
