import { NextResponse } from "next/server";
import Courses from "@/models/course";
import Users from "@/models/user";
import { auth } from "@/auth";
import connectDB from "@/lib/db";

export async function POST(req) {
    try {
        // Connect to the database
        await connectDB();
        
        // Parse the request body
        const { title } = await req.json();

        // Authenticate the user
        const session = await auth();
        const email = session.user.email;

        // Check if the course with the same title already exists
        const existingCourse = await Courses.findOne({ title });
        if (existingCourse) {
            return NextResponse.json(existingCourse, { status: 200 });
        }

        // Create a new course
        const newCourse = await Courses.create({ title });

        // Update the user document to include the new course
        const updatedUser = await Users.findOneAndUpdate(
            { email: email }, // Find the user by email
            { $push: { courses: newCourse._id } }, // Push the new course ID into the courses array
            { new: true } // Return the updated document
        ).populate('courses'); // Ensure the courses are populated

        // Return the new course
        return NextResponse.json(newCourse, { status: 201 });
    } catch (error) {
        // Handle any errors
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
