"use client";
// const ReactQuill =
//   typeof window === "object" ? require("react-quill") : () => false;
const QuillNoSSRWrapper = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
})
import "react-quill/dist/quill.snow.css";
import EditToolbar, { formats, modules } from "@/components/EditorToolbar";
import { useState } from "react";
import { Button, Form, Input, Select, notification } from "antd";
import { postApi } from "@/api-client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Service } from "@/models/service.type";
import { convertToSlug } from "@/ultis/convertToSlug";
import { addPost } from "@/redux/features/posts";
import dynamic from "next/dynamic";
const CreatePost = () => {
  const [values, setValues] = useState("");
  const [newForm] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  const dispatch = useAppDispatch();
  const getAllService = useAppSelector(
    (state) => state.serviceReducer.services
  );

  const onFinish = async (data: any) => {
    const newPost = {
      ...data,
      content: values,
      slug: convertToSlug(data.title),
    };
    try {
      const data = await postApi.createPost(newPost);
      dispatch(addPost(data.data!));
      api.success({
        message: data.msg,
      });
      newForm.resetFields();
      setValues("");
    } catch (error) {
      // console.log(error);
    }
  };

  return (
    <>
      {contextHolder}
      <h3>Thêm bài đăng</h3>
      <Form
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
        form={newForm}
      >
        <Form.Item label="Tiêu đề:" name="title">
          <Input placeholder="Nhập tiêu đề..." style={{ height: "40px" }} />
        </Form.Item>
        <Form.Item label="Select" name="service">
          <Select>
            {getAllService.map((service: Service) => {
              return (
                <Select.Option value={service._id}>
                  {service.name}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
        <EditToolbar toolbarId="toolbar" />
        <QuillNoSSRWrapper
          theme="snow"
          placeholder={"Write something awesome..."}
          modules={modules("toolbar")}
          formats={formats}
          value={values}
          onChange={setValues}
        />
        <Button className="btn" type="primary" htmlType="submit">
          Thêm bài đăng
        </Button>
      </Form>
    </>
  );
};

export default CreatePost;
