
import connectDB from "@/lib/db";

import { NextResponse } from "next/server";
import Course from "@/models/course";
export async function PUT(req,{params}){
    await connectDB();
    const ans = await Chapter.findByIdAndUpdate(id,{isPublished:false},{new:true})
    const userid = params.courseId; 
   
ourse
    return NextResponse.json(ans)
}