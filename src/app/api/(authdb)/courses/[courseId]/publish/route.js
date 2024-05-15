

import connectDB from "@/lib/db";
import Course from "@/models/course";
import { NextResponse } from "next/server";

export async function PUT(req,{params}){
    await connectDB();

    const userid = params.courseId; 
    const find = await Course.findOne({_id:id})
  
   if(!find || !exist || !find.title || !find.description || !find.videoUrl){
    return NextResponse.json("Missing require fields",{status:400})
   }
    const ans = await Course.findByIdAndUpdate(userid,{isPublished:true},{new:true})
    console.log(ans)
    return NextResponse.json(ans)
}