export interface Service{
    id: string | number;
    name: string;
    slug?: string;
    image: string
}
export interface IResponseService<T>{
    status_code: number | string
    status: string;
    msg: string;
    data?: T
}