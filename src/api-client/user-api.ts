import { IResponsUser, UserProfile, UserToken } from "@/models/user.type";
import axiosClient from "./axios-client";
interface IloginUser{
    email: string,
    password: string
}
interface IRegisterUser extends IloginUser{
    username: string
}
export const userApi = {
    login({email, password}:IloginUser): Promise<IResponsUser<UserProfile>> {
        return axiosClient.post('/auth/login',{email,password})
    },
    getMe(): Promise<IResponsUser<UserToken>>{
        return axiosClient.get('/auth/me')
    },
    register({email, password, username}: IRegisterUser) : Promise<IResponsUser<UserProfile>>{
        return axiosClient.post('/auth/register',{email,password,username})
    },
}