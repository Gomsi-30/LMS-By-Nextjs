
import connectDB from "@/lib/db";

import { NextResponse } from "next/server";
import Courses from "@/models/course";
export async function PUT(req,{params}){
    await connectDB();
    const userid = params.courseId; 
   
    const ans = await Courses.findByIdAndUpdate(userid,{isPublished:false},{new:true})
    return NextResponse.json(ans)
}