import { Service } from "./service.type";

export interface Post{
    _id: string | number;
    title: string;
    content: string;
    slug?: string;
    service: Service;
    deleteAt: Date;
    createdAt?: Date;
    user: string;
}
export interface IResponsePost<T>{
    status_code: number | string
    status: string;
    msg: string;
    data?: T
}