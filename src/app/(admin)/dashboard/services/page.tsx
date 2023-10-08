"use client";
import { serviceApi } from "@/api-client";
import UpdateService from "@/components/UpdateService";
import { IResponseService, Service } from "@/models/service.type";
import { deleteService, getServices } from "@/redux/features/services";
import { useAppSelector } from "@/redux/hooks";
import {
  Button,
  Modal,
  Popconfirm,
  Space,
  Table,
  Tag,
  message,
  notification,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const Services = () => {
  const { push } = useRouter();
  const dispatch = useDispatch();
  const services = useAppSelector((state) => state.serviceReducer.services);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [serviceDetail, setServiceDetail] = useState<Service>();
  const [api, contextHolder] = notification.useNotification();
  const updateService = (service: Service) => {
    setIsModalOpen(true);
    setServiceDetail(service);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  //Xoá services
  const handleDeleteService = async (serviceID: string) => {
    try {
      dispatch(deleteService({ serviceID }));
      const { data } = await serviceApi.deleteService(serviceID);
      
    } catch (error) {
      api.error({
        message: `${error}`,
      });
    }finally{
      api.success({
        message: "Xoá dịch vụ thành công!",
      });
    }
  };
  const columns: ColumnsType<Service> = [
    {
      title: "Hình ảnh",
      dataIndex: "image",
      key: "image",
      render: (text) => (
        <Image
          src={text}
          width={100}
          height={100}
          alt="Picture of the author"
        />
      ),
    },
    {
      title: "Tên dịch vụ",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => updateService(record)}>
            Cập nhật
          </Button>
          <Button
            danger
            onClick={() => handleDeleteService(record._id as string)}
          >
            Xoá
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <>
      {contextHolder}
      <h2>Thông tin dịch vụ</h2>
      <Button
        type="primary"
        onClick={() => push("/dashboard/services/create")}
        className="btn"
      >
        Thêm dịch vụ
      </Button>
      <Table
        columns={columns}
        dataSource={services.filter((service) => !service.deleteAt)}
      />

      <Modal
        title="Cập nhật dịch vụ"
        open={isModalOpen}
        footer={null}
        onCancel={handleCancel}
      >
        <UpdateService data={serviceDetail} />
      </Modal>
    </>
  );
};
export default Services;
