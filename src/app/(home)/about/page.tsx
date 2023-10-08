"use client";
import { Button, Checkbox, Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import "./about.scss";
import { images } from "@/assets/images";
import Image from "next/image";
const About = () => {
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };
  return (
    <div className="about">
      <div className="about__container">
        <div className="about__container-img">
          <Image src={images.bank} alt="" width={500} height={500} />
        </div>
        <div className="about__container-form">
          <Form
            name="basic"
            onFinish={onFinish}
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item
              //   label="Họ tên"
              name="username"
              rules={[
                { required: true, message: "Vui lòng họ và tên!" },
              ]}
              style={{ color: "white" }}
            >
              <span>Họ tên:</span>
              <Input placeholder="Tên của bạn" style={{ height: "40px" , marginTop: "10px"}} />
            </Form.Item>
            <Form.Item
              //   label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập Email",
                  type: "email",
                },
              ]}
              style={{ color: "white" }}
            >
              <span>Email:</span>
              <Input placeholder="Email của bạn" style={{ height: "40px" , marginTop: "10px"}} />
            </Form.Item>
            <Form.Item
              //   label="Số điện thoại"
              name="phone"
              rules={[
                { required: true, message: "Vui lòng nhập số điện thoại" },
              ]}
              style={{ color: "white" }}
            >
              <span>Số điện thoại:</span>
              <Input
                placeholder="Số điện thoại của bạn"
                style={{ height: "40px" , marginTop: "10px"}}
              />
            </Form.Item>
            <Form.Item
              //   label="Nội dung"
              name="phone"
              rules={[
                { required: true, message: "Vui lòng nhập nội dung!" },
              ]}
              style={{ color: "white" }}
            >
              <span>Nội dung:</span>
              <TextArea
                placeholder="Nội dung của bạn"
                style={{ minHeight: "100px" , marginTop: "10px"}}
              />
            </Form.Item>
            <button className="button-home">Nhận tư vấn</button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default About;
