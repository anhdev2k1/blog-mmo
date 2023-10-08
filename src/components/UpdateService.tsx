import { uploadToCloudinary } from "@/cloudinary/helper";
import { Service } from "@/models/service.type";
import { Button, Form, Input, Upload, message, notification } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useCallback, useEffect } from "react";
import { serviceApi } from "@/api-client";
import { useAppDispatch } from "@/redux/hooks";
import { updateService } from "@/redux/features/services";
interface IServiceDetailProps {
  data: Service | undefined;
}
const UpdateService = ({ data }: IServiceDetailProps) => {
  const [newForm] = Form.useForm();
  const dispatch = useAppDispatch();
  const [messageApi, contextHolder] = notification.useNotification();
  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      newForm.setFieldsValue(data);
    }
  }, [newForm, data]);
  const handleUploadImage = (options: any) => {
    const { onSuccess, onError, file } = options;
    uploadToCloudinary({
      file,
      fileType: "image",
      successCallback: onSuccess,
      failureCallback: onError,
    });
  };
  // Update service
  const onFinish = async (values: Service) => {
    try {
      const dataUpdate = { ...values, _id: data?._id! };
      dispatch(updateService(dataUpdate));
      await serviceApi.updateService(data?._id as string, values);
      messageApi.error({
        message: "Cập nhật dịch vụ thành công",
      });
    } catch (error) {
      messageApi.error({
        message: `${error}`,
      });
    }
  };
  return (
    <div className="form__container" style={{ textAlign: "center" }}>
      {contextHolder}
      <h3 style={{ textTransform: "uppercase" }}>
        Cập nhật dịch vụ {data?.name}
      </h3>

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
          Cập nhật
        </Button>
      </Form>
    </div>
  );
};

export default UpdateService;
