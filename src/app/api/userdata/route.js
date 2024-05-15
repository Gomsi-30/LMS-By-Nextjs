import { NextResponse } from "next/server";
import Attachments from "@/models/attachment";
import  Chapter  from "@/models/chapters";
import Courses from "@/models/course";
import connectDB from "@/lib/db";

export async function POST(req) {
  try {
    await connectDB();

    const { userid } = await req.json(); // Ensure this userid is correctly received
    console.log("UserID:", userid); // Logging the received userid for debugging

    // Ensure the userid is not undefined or null before querying
    if (!userid) {
      throw new Error("No UserID provided");
    }

    const course = await Courses.findById(userid).populate("attachments")
     .populate({
        path: 'chapters',
        options: { sort: { 'position': 1 } }
      });

    // Check the populated course object
    console.log("Course with Attachments:", course);

    if (!course) {
      return NextResponse.json(
        { message: "Course not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(course, { status: 200 });
  } catch (error) {
    console.error("Error:", error); // Log the actual error to the console for debugging
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
