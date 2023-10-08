"use client";
import { images } from "@/assets/images";
import Image from "next/image";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import style from "./login.module.css";
import { userApi } from "@/api-client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface IPayloadLogin{
  email: string;
  password: string
}
const Login = () => {
  const [form] = Form.useForm();
  const {push} = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const onFinish = async (values: IPayloadLogin) => {
    if(!values.email || !values.password) return
    try {
      setIsLoading(true)
      const {data, status} = await userApi.login(values)
      if(status === 'success'){
        localStorage.setItem('token', data?.token!)
        alert("Đăng nhập thành công")
        push('/dashboard')
      }
    } catch (error) {
      console.log(error);
      
    }
    finally{
      setIsLoading(false)
    }
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
            <Button className={style.button} role="button" type="primary" htmlType="submit">
              {isLoading ? 'Đợi tý nha...' : 'Đăng nhập 🚀'}
            </Button>
          </Form.Item>

          <span>Nếu bạn chưa có tài khoản ? <Link href="/register">Đăng ký</Link></span>
        </Form>
        <div className={style.login__img}>
          <Image src={images.imgLogin} alt="image" />
        </div>
      </div>
    </div>
  );
};

export default Login;
