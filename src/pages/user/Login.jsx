import "./login.scss";

import React from "react";

import LoginForm from "../../components/loginform/LoginForm";
import WelcomeSwiper from "../../components/welcome_swiper/WelcomeSwiper";

function Login() {
  return (
    <div className="Login">
      <div className="Login__container">
        <div className="Login__container-loginform">
          <div className="Login__container-loginform-welcometxt">
            <h2 className="font-face-qsb">Welcome Back!</h2>
            <span className="font-face-qsm">Login to continue</span>
          </div>
          <LoginForm />
        </div>
        <div className="Login__container-welcomeswiper">
          <WelcomeSwiper />
        </div>
      </div>
    </div>
  );
}

export default Login;
