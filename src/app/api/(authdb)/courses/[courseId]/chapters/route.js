import connectDB from "@/lib/db";
import  Chapter from "@/models/chapters";
import Courses from "@/models/course";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  await connectDB();
  const { title } = await req.json();
  const userid = params.courseId;

  const lastChapter = await Chapter.findOne({ courseId: userid }).sort({ position: -1 }).limit(1);
  const newPosition = lastChapter ? lastChapter.position + 1 : 1;
  const chapters = await Chapter.create({ title, courseId: userid, position: newPosition });

  const updatedCourse = await Courses.findByIdAndUpdate(
    userid,
    { $push: { chapters: chapters._id } }, // Corrected: push the chapter ID directly
    { new: true } )// Make sure the document is populated after update
  .populate('chapters')
  
//   console.log(updatedCourse);
  return NextResponse.json(updatedCourse);
}
