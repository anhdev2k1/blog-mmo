import { connectMongoDB } from "@/libs/connect";
import { Service } from "@/libs/models/service.model";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: Response) {
    try {
        await connectMongoDB()
        const result = await Service.find({}).lean()
        if(!result) return NextResponse.json({
            status_code: 404,
            status: 'error',
            msg: 'Not found Services!'
        })
        return NextResponse.json({
            status_code: 200,
            status: 'success',
            msg: 'Get all Services successfully!',
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
        const result = await Service.create(data)
        return NextResponse.json({
            status_code: 200,
            status: 'success',
            msg: 'Create Service successfully!',
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