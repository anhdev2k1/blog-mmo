import { Post } from "./post.type";
import { Service } from "./service.type";

export interface UserLogin{
    email: string;
    password: string
}
export interface UserProfile extends UserLogin{
    username: string;
    avatarUrl: string;
    services: Service[];
    posts: Post[]
}