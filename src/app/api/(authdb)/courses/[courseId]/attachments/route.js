import connectDB from "@/lib/db";
import Attachments from "@/models/attachment";
import Courses from "@/models/course";
import { NextResponse } from "next/server";

export async function POST(req,{params}) {
    await connectDB()
  const {url} = await req.json();
  console.log(url)
  const userid = params.courseId;
  const attachments = await Attachments.create({
      url,
      name: url.split("/").pop(),
      courseId: userid
  });
 
const updatedCourse = await Courses.findByIdAndUpdate(
    userid,
    { $push: { attachments: { 
      $each: [attachments._id], 
      $position: 0 }}}, // Use $push to add to the array
    { new: true } // Returns the updated document
  ).populate("attachments");
  // console.log(updatedCourse)
  return NextResponse.json(updatedCourse);
}
