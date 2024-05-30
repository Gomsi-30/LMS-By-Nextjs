// pages/api/courses/index.js
import connectDB from "@/lib/db";
import Courses from "@/models/course"
import { NextResponse } from 'next/server';

export async function GET() {
    await connectDB();

  try {
    const courses = await Courses.find({});
    return NextResponse.json({ success: true, data: courses });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
