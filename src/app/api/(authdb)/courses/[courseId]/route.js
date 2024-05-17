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
            path: 'muxdatas'  // Ensure 'muxdatas' is the correct path based on your schema
        }
    });
    
    if (course && course.chapters) {
        for (const chapter of course.chapters) {
            if (chapter.muxdatas && chapter.muxdatas.assetId) {
                try {
                    await mux.video.assets.delete(chapter.muxdatas.assetId);
                    console.log(`Deleted asset with ID: ${chapter.muxdatas.assetId}`);
                } catch (error) {
                    console.error(`Failed to delete asset with ID: ${chapter.muxdatas.assetId}`, error);
                }
            }else{
                console.log("ni hai kuc b")
            }
        }
    }
    

    const deleted = await Courses.deleteOne({
         _id:userid
      })
      console.log(deleted)
    return NextResponse.json(deleted,{status:200})
}



export async function PUT(req,{params}){
    
    await connectDB()
    const userid = params.courseId;
    const values = await req.json();
    const course = await Courses.findByIdAndUpdate(userid,values, { new: true })
    return NextResponse.json({course},{status:200})
}



