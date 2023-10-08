import { connectMongoDB } from "@/libs/connect";
import { User } from "@/libs/models/user.model";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
export async function POST(req: Request, res: Response) {
  await connectMongoDB();
  try {
    const { email, password } = await req.json();
    const foundUser = await User.findOne({ email }).lean();
    if (!foundUser) {
      return NextResponse.json({
        status_code: 500,
        status: "error",
        msg: "Email không đúng",
      });
    }
    const validPassword = await bcryptjs.compare(password, foundUser.password!);
    if (!validPassword) {
      return NextResponse.json({
        status_code: 500,
        status: "error",
        msg: "Mật khẩu không đúng",
      });
    }

    const tokenData = {
      id: foundUser._id,
      username: foundUser.username,
      email: foundUser.email,
    };
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!);

    return NextResponse.json({
      status_code: 200,
      status: "success",
      msg: "Login is successfully!",
      data: { ...foundUser, token },
    });
  } catch (error) {
    return NextResponse.json({
      status_code: 500,
      status: "error",
      msg: error,
    });
  }
}
