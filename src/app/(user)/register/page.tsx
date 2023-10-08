"use client";
import Image from "next/image";
import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Form, Input, notification } from "antd";
import style from "./register.module.css";
import { images } from "@/assets/images";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { userApi } from "@/api-client";
interface IPayloadRegister{
    email: string;
    username: string;
    password: string;
}
const Register = () => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = notification.useNotification()
  const {push} = useRouter()
  const onFinish = async (values:IPayloadRegister) => {
    try {
      const {data, status} = await userApi.register(values)
      if(status === 'success'){
        localStorage.setItem('token', data?.token!)
        messageApi.success({
          message: "Đăng ký thành công!"
        })
        push('/dashboard')
      }
    } catch (error) {
      messageApi.error({
        message: "Đăng ký thất bại!"
      })
      
    }
    
  };
  return (
    <div className={style.wrapper}>
      {contextHolder}
      <div className={style.login__wrapper}>
        <Form
          form={form}
          name="horizontal_login"
          onFinish={onFinish}
          className={style.form__login}
        >
          <h1 className={style.form__heading}>Đăng ký</h1>
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Vui lòng điền tên đăng nhập 🐔!",
              },
            ]}
          >
            <Input
              style={{ height: "40px" }}
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Tên đăng nhập"
              className={style.input__form}
            />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              {
                type: "email",
                required: true,
                message: "Email không đúng định dạng 🐔!",
              },
            ]}
          >
            <Input
              style={{ height: "40px" }}
              prefix={<MailOutlined className="site-form-item-icon" />}
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
            <Button
              className={style.button}
              role="button"
              type="primary"
              htmlType="submit"
            >
              Đăng ký 🚀
            </Button>
          </Form.Item>
          <span>Nếu bạn đã có tài khoản ? <Link href="/login">Đăng nhập</Link></span>
        </Form>
        <div className={style.login__img}>
          <Image src={images.imgLogin} alt="image" />
        </div>
      </div>
    </div>
  );
};

export default Register;
