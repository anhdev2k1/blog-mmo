"use client";
import { images } from "@/assets/images";
import { svgs } from "@/assets/svgs";
import Image from "next/image";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import style from "./login.module.css";
const Login = () => {
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    console.log("Finish:", values);
  };
  return (
    <div className={style.wrapper}>
      <div className={style.login__wrapper}>
        <Form
          form={form}
          name="horizontal_login"
          onFinish={onFinish}
          className={style.form__login}
        >
          <h1 className={style.form__heading}>Welcome to back!</h1>
          <Form.Item
            name="email"
            rules={[{ type:"email", required: true, message: "Email không đúng định dạng 🐔!" }]}
          >
            <Input
              style={{ height: "40px" }}
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
              className={style.input__form}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Vui lòng điền mật khẩu 🐔!" }]}
          >
            <Input
              style={{ height: "40px" }}
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Mật khẩu"
              className={style.input__form}
            />
          </Form.Item>
          <Form.Item>
            <Button className={style.button} role="button" type="primary" htmlType="submit">
              Đăng nhập 🚀
            </Button>
          </Form.Item>
        </Form>
        <div className={style.login__img}>
          <Image src={images.imgLogin} alt="image" />
        </div>
      </div>
    </div>
  );
};

export default Login;
