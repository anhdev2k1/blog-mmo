"use client";
import { Post } from "@/models/post.type";
import "react-quill/dist/quill.snow.css";
import EditToolbar, { formats, modules } from "@/components/EditorToolbar";
import { Service } from "@/models/service.type";
import { Button, Form, Input, Select, notification } from "antd";
import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { convertToSlug } from "@/ultis/convertToSlug";
import { postApi } from "@/api-client";
import { updatePost as updateToRedux } from "@/redux/features/posts";
import dynamic from "next/dynamic";
interface IPostProps {
  post: Post;
}
const UpdatePost = ({ post }: IPostProps) => {
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );

  const [values, setValues] = useState("");
  const [newForm] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (post && Object.keys(post).length > 0) {
      newForm.setFieldsValue(post);
    }
  }, [newForm, post]);
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
      const data = await postApi.updatePost(post._id as string, newPost);
      dispatch(updateToRedux({ _id: post._id, ...newPost }));
      api.success({
        message: data.msg,
      });
      newForm.resetFields();
      setValues("");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="form__container">
        <h3 style={{ textTransform: "uppercase" }}>Cập nhật {post.title}</h3>
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
            <Select defaultValue="">
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
          <ReactQuill
            theme="snow"
            placeholder={"Write something awesome..."}
            modules={modules("toolbar")}
            formats={formats}
            value={values}
            onChange={setValues}
          />
          <Button className="btn" type="primary" htmlType="submit">
            Cập nhật bài đăng
          </Button>
        </Form>
      </div>
    </>
  );
};

export default UpdatePost;
