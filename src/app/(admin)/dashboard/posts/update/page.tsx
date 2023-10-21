"use client";
// const ReactQuill =
//   typeof window === "object" ? require("react-quill") : () => false;
const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});
import { postApi } from "@/api-client";
import { Service } from "@/models/service.type";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { convertToSlug } from "@/ultis/convertToSlug";
import { Button, Form, Input, Select, notification } from "antd";
import { useEffect, useState } from "react";
import { formats, modules } from "@/components/EditorToolbar";
import EditToolbar from "@/components/EditorToolbar";
import "react-quill/dist/quill.snow.css";
import { useSearchParams } from "next/navigation";
import { Post } from "@/models/post.type";
import { updatePost as updateToRedux } from "@/redux/features/posts";
import dynamic from "next/dynamic";
const UpdatePost = () => {
  const getIDPost = useSearchParams()?.get("id");
  const [postDetail, setPostDetail] = useState<Post>();
  const [newForm] = Form.useForm();
  const [values, setValues] = useState("");
  const [api, contextHolder] = notification.useNotification();
  const dispatch = useAppDispatch();
  useEffect(() => {
    const getDetailPost = async () => {
      const { data } = await postApi.getById(getIDPost as string);
      setPostDetail(data!);
      setValues(data?.content!);
      newForm.setFieldsValue(data);
    };
    getDetailPost();
  }, []);
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
      const data = await postApi.updatePost(postDetail?._id as string, newPost);
      dispatch(updateToRedux({ _id: postDetail?._id, ...newPost }));
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
    <div className="update__wrapper">
      {contextHolder}
      <div className="container">
        <div className="form__container">
          <h3
            style={{ textTransform: "uppercase" }}
          >{`Cập nhật ${postDetail?.title}`}</h3>
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
            <QuillNoSSRWrapper
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
      </div>
    </div>
  );
};

export default UpdatePost;
