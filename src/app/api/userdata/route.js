import { NextResponse } from "next/server";
import Courses from "@/models/course"
import connectDB from "@/lib/db";

export async function POST(req) {
    try {
        await connectDB();
        const { userid } = await req.json();
        const course = await Courses.findById(userid);
        console.log(course)
        return NextResponse.json(course, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}