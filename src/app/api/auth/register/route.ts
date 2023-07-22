import { User } from "@/libs/models/user.model";
import { NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { connectMongoDB } from "@/libs/connect";
export async function POST(req: Request , res: Response) {
    try {
        const {email, username, password} = await req.json()
        await connectMongoDB();
        const foundUser = await User.findOne({email}).lean()
        
        if(foundUser){
            return NextResponse.json({
                status_code: 500,
                stauts: 'error',
                msg: "Email đã tồn tại"
            })
        }
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)
        const newUser = await User.create({username, email, password: hashedPassword})

        const tokenData = {
            id: newUser._id,
            username: newUser.username,
            email: newUser.email
        }
        const token = await jwt.sign(tokenData,process.env.TOKEN_SECRET!)
        return NextResponse.json({
            status_code: 200,
            status: 'success',
            msg: 'Register is successfully!',
            data: {...newUser, token}
        })
        
    } catch (error) {
        return NextResponse.json({
            status_code: 500,
            status: 'error',
            msg: error
        })
    }
}