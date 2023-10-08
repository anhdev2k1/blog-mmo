export interface Service{
    _id: string | number;
    name: string;
    slug?: string;
    image: string;
    deleteAt?: Date
}
export interface IResponseService<T>{
    status_code: number | string
    status: string;
    msg: string;
    data?: T
}