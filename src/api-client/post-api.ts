
import axiosClient from './axios-client'
import { IResponsePost, Post } from '@/models/post.type'

export const postApi = {
	getAll(): Promise<IResponsePost<Post>> {
		return axiosClient.get('/posts')
	},
    getById(id: string): Promise<IResponsePost<Post>> {
		return axiosClient.get(`/posts/${id}`)
	},
}