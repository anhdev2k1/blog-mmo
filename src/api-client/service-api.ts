
import { IResponseService, Service } from '@/models/service.type'
import axiosClient from './axios-client'

export const serviceApi = {
	getAll(): Promise<IResponseService<Service>> {
		return axiosClient.get('/services')
	},
    getById(id: string): Promise<Service> {
		return axiosClient.get(`/services/${id}`)
	},
}