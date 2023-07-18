import { connectMongoDB } from "@/libs/connect";
import { Service } from "@/libs/models/service.model";
import mongoose, { set } from "mongoose";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: Response) {
    try {
        const id = new mongoose.Types.ObjectId(req.url.split('/services/')[1])
        await connectMongoDB()
        const result = await Service.findOne({_id: id}).lean()
        if(!result) return NextResponse.json({
            status_code: 404,
            status: 'error',
            msg: 'Not found Service!'
        })
        return NextResponse.json({
            status_code: 200,
            status: 'success',
            msg: 'Get Service successfully!',
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
        const id = new mongoose.Types.ObjectId(req.url.split('/services/')[1])
        const data = await req.json()
        await connectMongoDB()
        const result = await Service.findOneAndUpdate({_id: id}, {$set: data})
        return NextResponse.json({
            status_code: 200,
            status: 'success',
            msg: 'Update Service successfully!',
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
        const id = new mongoose.Types.ObjectId(req.url.split('/services/')[1])
        await connectMongoDB()
        const result = await Service.findOneAndUpdate({_id: id}, {$set: {deleteAt: Date.now()}})
        return NextResponse.json({
            status_code: 200,
            status: 'success',
            msg: 'Delete Service successfully!',
        })
    } catch (error) {
        return NextResponse.json({
            status_code: 500,
            status: 'error',
            msg: error
        })
    }
}