import connectDB from "@/lib/db";
import Chapter from "@/models/chapters";
import { NextResponse } from "next/server";
import { MuxData } from "@/models/muxdata";


export async function PUT(req,{params}){
    await connectDB();
    const id = params.chapterId;
    const userid = params.courseId; 
    
    const find = await Chapter.findOne({_id:id})
    const exist = await MuxData.findOne({ chapterId: id });
   if(!find || !exist || !find.title || !find.description || !find.videoUrl){
    return NextResponse.json("Missing require fields",{status:400})
   }
    const ans = await Chapter.findByIdAndUpdate(id,{isPublished:true},{new:true})
    console.log(ans)
    return NextResponse.json(ans)
}