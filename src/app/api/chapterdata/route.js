import connectDB from "@/lib/db"
import { MuxData } from "@/models/muxdata";
import Chapter from "@/models/chapters";
import { NextResponse } from "next/server";

export async function POST(req){
   
    
    const {id,userid} = await req.json()
   
    await connectDB();
    const chapter = await Chapter.findOne({_id:id}).populate("muxdatas");
    // console.log(chapter)
    if (!chapter) {
        return NextResponse.json({ message: 'Chapter not found' });
    }

    return NextResponse.json(chapter)
}