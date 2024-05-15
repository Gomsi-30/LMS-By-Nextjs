import connectDB from "@/lib/db";
import Courses from "@/models/course";
import { MuxData } from "@/models/muxdata";
import { NextResponse } from "next/server";
import Mux from '@mux/mux-node';

const mux = new Mux({
    tokenId: process.env.MUX_TOKEN_ID,
    tokenSecret: process.env.MUX_TOKEN_SECRET
});
export async function DELETE(req,{params}){
    const userid = params.courseId;
    const course = await Courses.findOne({
        _id: userid,
    }).populate({
        path: 'chapters',
        populate: {
            path: 'muxdatas'
        }
    });
    
    for(const chapter of course.chapters){
        if(chapter.muxData.assetId){
        await mux.video.assets.del(chapter.muxData.assetId)
    }
    }

    const deleted = await Courses.delete({
         _id:userid
      })
    return NextResponse.json(deleted,{status:200})
}



export async function PUT(req,{params}){
    // console.log(params.courseId)
    await connectDB()
    const userid = params.courseId;
    const values = await req.json();
    const course = await Courses.findByIdAndUpdate(userid,values, { new: true })
    return NextResponse.json({course},{status:200})
}



