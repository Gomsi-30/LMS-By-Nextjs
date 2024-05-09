import connectDB from "@/lib/db";
import Courses from "@/models/course";
import { NextResponse } from "next/server";

export async function PUT(req,{params}){
    // console.log(params.courseId)
    await connectDB()
    const userid = params.courseId;
    const values = await req.json();
    const course = await Courses.findByIdAndUpdate(userid,values, { new: true })
    return NextResponse.json({course},{status:200})
}



