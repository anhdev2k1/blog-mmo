import { IResponsUser, UserProfile } from "@/models/user.type";
import axiosClient from "./axios-client";
interface IloginUser{
    email: string,
    password: string
}
export const userApi = {
    login({email, password}:IloginUser): Promise<IResponsUser<UserProfile>> {
        return axiosClient.post('/auth/user',{email,password})
    },
    getMe(): Promise<IResponsUser<UserProfile>>{
        return axiosClient.get('/auth/me')
    }
}