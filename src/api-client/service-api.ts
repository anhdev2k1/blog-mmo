import { IResponseService, Service } from "@/models/service.type";
import axiosClient from "./axios-client";

export const serviceApi = {
  getAll(): Promise<IResponseService<Service[]>> {
    return axiosClient.get("/services");
  },
  getById(id: string): Promise<IResponseService<Service>> {
    return axiosClient.get(`/services/${id}`);
  },
  createService(id: string): Promise<IResponseService<Service>> {
    return axiosClient.post(`/services/${id}`);
  },
  updateService(id: string, data: Service): Promise<IResponseService<Service>> {
    return axiosClient.patch(`/services/${id}`, data);
  },
  deleteService(id: string): Promise<IResponseService<Service>> {
    return axiosClient.delete(`/services/${id}`);
  },
};
