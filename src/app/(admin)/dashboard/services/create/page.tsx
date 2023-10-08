"use client";
import { Button, Form, Input, Upload, message, notification } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { uploadToCloudinary } from "@/cloudinary/helper";
import { serviceApi } from "@/api-client";
import { Service } from "@/models/service.type";
import { convertToSlug } from "@/ultis/convertToSlug";
import style from "./style.module.css";
import { useAppDispatch } from "@/redux/hooks";
import { addService } from "@/redux/features/services";
const CreateServices = () => {
  const [newForm] = Form.useForm();
  const [messageApi, contextHolder] = notification.useNotification();
  const dispatch = useAppDispatch()
  const handleUploadImage = (options: any) => {
    const { onSuccess, onError, file } = options;
    uploadToCloudinary({
      file,
      fileType: "image",
      successCallback: onSuccess,
      failureCallback: onError,
    });
  };
  const onFinish = async (values: Service) => {
    try {
      const newService = {
        ...values,
        slug: values.slug ? values.slug : convertToSlug(values.name),
      };
      dispatch(addService(newService))
      await serviceApi.createService(newService);
      newForm.resetFields();
    } catch (error) {
      messageApi.error({
        message: `${error}`
      })
    } finally {
      messageApi.success({
        message: "Đã thêm dịch vụ thành công"
      });
    }
  };
  return (
    <>
      {contextHolder}
      <div className={style.form__container}>
        <h3 className={style.heading}>Thêm dịch vụ</h3>
        <Form
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
          form={newForm}
        >
          <Form.Item label="Tên dịch vụ:" name="name">
            <Input placeholder="Ví dụ: Facebook,.." />
          </Form.Item>
          <Form.Item label="Slug:" name="slug">
            <Input placeholder="Ví dụ: mua-ban-acc" />
          </Form.Item>
          <Form.Item
            label="Upload ảnh:"
            name="image"
            getValueFromEvent={(value) => value?.file?.response?.url}
          >
            <Upload
              accept="image/*"
              name="image"
              listType="picture-card"
              customRequest={handleUploadImage}
            >
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Tải ảnh lên</div>
              </div>
            </Upload>
          </Form.Item>
          <Button type="primary" htmlType="submit" className="btn">
            Thêm dịch vụ
          </Button>
        </Form>
      </div>
    </>
  );
};

export default CreateServices;
