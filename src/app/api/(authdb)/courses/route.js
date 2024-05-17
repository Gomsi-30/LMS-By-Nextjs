import { NextResponse } from "next/server";
import Courses from "@/models/course"
import Users from "@/models/user";
import { auth } from "@/auth";
import connectDB from "@/lib/db";
export async function POST(req) {
    try {
        await connectDB();
        const { title } = await req.json();
        const session = await auth()
        const email = session.user.email
        // console.log(session.user)
        const already = await Courses.findOne({title})
        if(already){
            return NextResponse.json(already, { status: 200 });
        }
        const course = await Courses.create({ title });
        // console.log(course._id)
        const updatedUser = await Users.findOneAndUpdate(
            { email: email }, // Find the user by email
            { $push: { courses: course._id } }, // Push the new course ID into the courses array
            { new: true } // Return the updated document
        ).populate('courses'); // Ensure the courses are populated
          
        console.log(updatedUser)
        console.log("hnjii")
        return NextResponse.json(course, { status: 500 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
