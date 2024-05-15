import connectDB from "@/lib/db";
import Chapter from "@/models/chapters";
import { NextResponse } from "next/server";
export async function PUT(req,{params}) {
  try {
    console.log("hello");
    await connectDB();
   
    const  userid  = params.courseId;
    const { list } = await req.json();
   
    for (let item of list) {
        await Chapter.updateOne(
          { _id: item.id, courseId: userid },  // Filter by both _id and courseId
          { $set: { position: item.position } }  // Update position
        );
      }

    return NextResponse.json({ message: "sucess" });
  } catch (error) {
    console.log("error ")
    return NextResponse.json({ message: "reject" });
  }
}

// const chapter =await db.chapter.findUnique({
//     where:{
//         id:params.chapterId,
//         courseId:params.courseId},
//    include:{
//     muxData:true
//    }
//    })

