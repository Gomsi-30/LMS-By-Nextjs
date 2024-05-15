import connectDB from "@/lib/db";
import Chapter from "@/models/chapters";
import { NextResponse } from "next/server";
import { MuxData } from "@/models/muxdata";
export async function PUT(req,{params}){
    await connectDB();
    const id = params.chapterId;
    const userid = params.courseId; 
   
    const ans = await Chapter.findByIdAndUpdate(id,{isPublished:false},{new:true})

    const publish = await Chapter.find({
        courseId:userid,
        isPublished:true
    })
    if(!publish){
        await Course.findByIdAndUpdate(userid,{isPublished:false},{new:true})
    }
    return NextResponse.json(ans)
}