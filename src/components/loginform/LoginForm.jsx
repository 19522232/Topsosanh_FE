import "./loginform.scss";

import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, notification } from "antd";
import { SmileOutlined, FrownOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { post } from "../../ultils/AxiosClient";

function LoginForm() {
  const location = useLocation();
  const item = location.state;
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();

  const [form] = Form.useForm();
  const openNotificationWithIcon = (title) => {
    notification.open({
      message: title,
      duration: 10,
      icon: <FrownOutlined style={{ color: "red" }} />,
    });
  };

  useEffect(() => {
    if (item) {
      form.setFieldsValue({
        username: item.username,
        password: item.password,
      });
    }
  }, []);

  const onFinish = async (values) => {
    console.log(values);
    const res = await post('Auth/Login', values)

    console.log('--->', res);
    if (res.status == 400) { 
      openNotificationWithIcon(res.data.errors.toString())
      return;
    }
    const token = res.data.token.access_token;
    localStorage.setItem("token", token);
    
    navigate("/");
    // try {
    //   const res = await loginAccount(values);
    //   console.log("Datares", res, typeof res);
    //   if (typeof res != "string") {
    //     dispatch(
    //       loginSuccess({
    //         accessToken: res.accessToken,
    //         userId: res._id,
    //         username: res.username,
    //         isAdmin: res.isAdmin,
    //       })
    //     );
    //     navigate("/home/overview");
    //   } else {
    //     openNotificationWithIcon(res);
    //   }
    // } catch (e) {
    //   console.log(e);
    // }
  };

  return (
    <div className="LoginForm">
      <Form
        form={form}
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your Email!",
            },
          ]}
        >
          <Input
            className="font-face-qsb"
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox className="font-face-qsm">Remember me</Checkbox>
          </Form.Item>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button font-face-qsb"
            
          >
            Log in
          </Button>
          <span className="font-face-qsm">
            Or{" "}
            <a href="/signup" className="font-face-qsb">
              register now!
            </a>
          </span>
        </Form.Item>
      </Form>
    </div>
  );
}
export default LoginForm;
