

import connectDB from "@/lib/db";
import Courses from "@/models/course";
import { NextResponse } from "next/server";

export async function PUT(req,{params}){
    await connectDB();

    const userid = params.courseId; 
    

    const course = await Courses.findOne({
        _id: userid
    }).populate({
        path: 'chapters',
        populate: {
            path: 'muxdatas'  // Ensure 'muxdatas' is the correct path based on your schema
        }
    });

    const isAnyChapterPublished = course.chapters.some(chapter => chapter.isPublished === true);

    if (isAnyChapterPublished) {
        console.log('At least one chapter is published.');
    } else {
        console.log('No chapters are published.');
    }

//    if(!course.title || !course.categoryId || !course.imageUrl || !course.description || !isAnyChapterPublished){
//     return NextResponse.json("Missing require fields",{status:400})
//    }
    const ans = await Courses.findByIdAndUpdate(userid,{isPublished:true},{new:true})  
    console.log(ans)
    return NextResponse.json(ans)
}