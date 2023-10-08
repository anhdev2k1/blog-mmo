import { Post } from "./post.type";
import { Service } from "./service.type";

export interface UserLogin{
    email: string;
    password: string
}
export interface UserProfile extends UserLogin{
    username: string;
    services?: Service[];
    posts: Post[];
    token?:string
}
export interface UserToken{
    id: string;
    username: string;
    email: string
}
export interface IResponsUser<T>{
    status_code: number | string
    status: string;
    msg: string;
    data?: T
}