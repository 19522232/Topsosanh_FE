import React, { useState } from "react";
import "./signupform.scss";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

import { SmileOutlined, FrownOutlined } from "@ant-design/icons";
import { Alert, notification } from "antd";
import { useForm, Controller } from "react-hook-form";
import { SignUpDTO } from "../../dtos/signup.dto";
import { IconButton, TextField } from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { post } from "../../ultils/AxiosClient";

function SignUpForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const resolver = classValidatorResolver(SignUpDTO);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      username: "",
      
    },
    resolver,
  });

  const handleRequest = handleSubmit(async(value) => {
    //console.log(value);
    const res = await post('Auth/Register', { firstname: value.username, lastname: '', email: value.email, password: value.password })
    if (res.status == 200) {
      openSuccessNotification();
      
      passUser(value);
    }
    else if (res.status == 400) {
      openErrorNotification(res.data.errors.toString());
    }
    else {
      openErrorNotification('Please try again!!!');
    }
  });

  //register success
  const openSuccessNotification = () => {
    notification.open({
      message: "Please check your email to verify account.",
      duration: 10,
      icon: (
        <SmileOutlined
          style={{
            color: "orange",
          }}
        />
      ),
    });
  };

  //register error
  const openErrorNotification = (title) => {
    notification.open({
      message: title,
      duration: 2,
      icon: <FrownOutlined style={{ color: "red" }} />,
    });
  };

  const passUser = (user) => {
    navigate(`/login`, {
      state: {
        username: user.username,
        password: user.password,
      },
    });
  };

  //Enter submit button

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              label={"Email"}
              autoFocus
              fullWidth
              error={!!errors.email}
              helperText={errors.email?.message}
              {...field}
            />
          )}
        />
      </div>
      <div style={{ marginBottom: "20px" }}>
        <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <TextField
              label={"Your Name"}
              fullWidth
              error={!!errors.username}
              helperText={errors.username?.message}
              {...field}
            />
          )}
        ></Controller>
      </div>
      <div style={{ marginBottom: "20px" }}>
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              fullWidth
              error={!!errors.password}
              helperText={errors.password?.message}
              InputProps={{
                endAdornment: (
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
              {...field}
            />
          )}
        ></Controller>
      </div>

      <p className="font-face-qsm">
        Already a member?
        <a className="font-face-qsb" href="/login">
          Login
        </a>
      </p>
      <Button
        className="signup-form-button font-face-qsb"
        onClick={handleRequest}
        variant="contained"
      >
        Sign Up
      </Button>
    </div>
  );
}

export default SignUpForm;
