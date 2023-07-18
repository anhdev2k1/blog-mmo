
export interface Post{
    id: string | number;
    title: string;
    content: string;
    slug?: string;
    image: string;
    service: string;
}
export interface IResponsePost<T>{
    status_code: number | string
    status: string;
    msg: string;
    data?: T
}