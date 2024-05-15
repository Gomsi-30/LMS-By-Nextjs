import { NextResponse } from "next/server";
import Courses from "@/models/course"
import connectDB from "@/lib/db";
export async function POST(req) {
    try {
        await connectDB();
        const { title } = await req.json();
        const already = await Courses.findOne({title})
        if(already){
            return NextResponse.json(already, { status: 200 });
        }
        const course = await Courses.create({ title });
        
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
