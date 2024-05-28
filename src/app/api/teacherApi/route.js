import connectDB from "@/lib/db";
import Courses from "@/models/course"
import Users from "@/models/user";
import { NextResponse } from "next/server";
import { auth } from "@/auth";

export async function GET(req){
    await connectDB();
    console.log("phuchgyaa")
    const session = await auth()
    const email = session.user.email
    console.log(email)
    const res = await Users.findOne({email}).populate("courses").populate("role")
    return NextResponse.json(res)
}