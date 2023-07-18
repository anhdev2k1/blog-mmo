import { connectMongoDB } from "@/libs/connect";
import { Post } from "@/libs/models/post.model";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: Response) {
    try {
        await connectMongoDB()
        const result = await Post.find({}).populate('service','_id name image','Service').lean()
        if(!result) return NextResponse.json({
            status_code: 404,
            status: 'error',
            msg: 'Not found Posts!'
        })
        return NextResponse.json({
            status_code: 200,
            status: 'success',
            msg: 'Get all Post successfully!',
            data: result
        })
    } catch (error) {
        return NextResponse.json({
            status_code: 500,
            status: 'error',
            msg: error
        })
    }
}

export async function POST(req: Request, res: Response) {
    try {
        const data = await req.json()
        await connectMongoDB()
        const result = await Post.create(data)
        return NextResponse.json({
            status_code: 200,
            status: 'success',
            msg: 'Create Post successfully!',
            data: result
        })
    } catch (error) {
        return NextResponse.json({
            status_code: 500,
            status: 'error',
            msg: error
        })
    }
}