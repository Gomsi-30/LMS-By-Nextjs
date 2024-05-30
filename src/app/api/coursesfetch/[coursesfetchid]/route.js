

// pages/api/courses/[id].js
import connectDB from "@/lib/db";
import Courses from "@/models/course"
import Chapter from "@/models/chapters"
import { NextResponse } from 'next/server';

export async function GET(req,{ params }) {
  await connectDB();

  const  id = params.coursesfetchid;

  try {
    console.log("done....")
    const course = await Courses.findById(id).populate('chapters');
    console.log("done")
    return NextResponse.json({ success: true, data: course });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
