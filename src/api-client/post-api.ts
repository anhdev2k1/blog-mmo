
import axiosClient from './axios-client'
import { IResponsePost, Post } from '@/models/post.type'

export const postApi = {
	getAll(): Promise<IResponsePost<Post[]>>  {
		return axiosClient.get('/posts')
	},
    getById(id: string): Promise<IResponsePost<Post>> {
		return axiosClient.get(`/posts/${id}`)
	},
	getPostByService(id: string):Promise<IResponsePost<Post>> {
		return axiosClient.get(`/posts/${id}`)
	},
	createPost(data:any): Promise<IResponsePost<Post>>{
		return axiosClient.post(`/posts/`,data)
	},
	updatePost(id:string, data:Post): Promise<IResponsePost<Post>>{
		return axiosClient.patch(`/posts/${id}`,data)
	},
	deletePost(id:string): Promise<IResponsePost<Post>>{
		return axiosClient.delete(`/posts/${id}`)
	}
}