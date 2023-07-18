import { connectMongoDB } from "@/libs/connect";
import { Post } from "@/libs/models/post.model";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: Response) {
    try {
        const id = new mongoose.Types.ObjectId(req.url.split('/posts/')[1])
        await connectMongoDB()
        const result = await Post.findOne({_id: id}).populate('service','_id name image','Service').lean()
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

export async function PATCH(req: Request, res: Response) {
    try {
        const id = new mongoose.Types.ObjectId(req.url.split('/posts/')[1])
        const data = await req.json()
        await connectMongoDB()
        const result = await Post.findOneAndUpdate({_id: id}, {$set: data})
        return NextResponse.json({
            status_code: 200,
            status: 'success',
            msg: 'Update Post successfully!',
        })
    } catch (error) {
        return NextResponse.json({
            status_code: 500,
            status: 'error',
            msg: error
        })
    }
}
export async function DELETE(req: Request, res: Response) {
    try {
        const id = new mongoose.Types.ObjectId(req.url.split('/posts/')[1])
        await connectMongoDB()
        const result = await Post.findOneAndUpdate({_id: id}, {$set: {deleteAt: Date.now()}})
        return NextResponse.json({
            status_code: 200,
            status: 'success',
            msg: 'Delete Post successfully!',
        })
    } catch (error) {
        return NextResponse.json({
            status_code: 500,
            status: 'error',
            msg: error
        })
    }
}