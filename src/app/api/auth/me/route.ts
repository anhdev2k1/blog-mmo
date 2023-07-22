import { connectMongoDB } from "@/libs/connect";
import { User } from "@/libs/models/user.model";
import { cookies } from "next/dist/client/components/headers";
import { NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
interface IDataToken{
    id: string;
    email: string;
    username: string
}
export async function GET(req: Request, res: Response) {
  try {
    const token = req.headers.get('x-access-token');
    if (!token) {
      return NextResponse.json({
        status_code: 500,
        status: "error",
        msg: "Invalid Token!",
      });
    }
    const user = await jwt.verify(token, process.env.TOKEN_SECRET!);
      
    return NextResponse.json({
      status_code: 200,
      status: "success",
      msg: `Get user is successfully!`,
      data: user,
    });
  } catch (error) {
    return NextResponse.json({
      status_code: 500,
      status: "error",
      msg: error,
    });
  }
}
