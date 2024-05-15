import connectDB from "@/lib/db";
import Attachments from "@/models/attachment";
import Courses from "@/models/course";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
    try {
        await connectDB();
        const { idd } = await req.json();  // This assumes `idd` is the ID of the attachment to delete.
        console.log("Attachment ID to delete:", idd);
        const userid = params.courseId;  // Assuming this is correctly received from the route parameters.

        // First, delete the attachment.
        const deletionResult = await Attachments.deleteOne({ _id: idd });
        if (deletionResult.deletedCount === 0) {
            return NextResponse.json({ message: "No attachment found to delete." }, { status: 404 });
        }

        // Update the course by pulling the deleted attachment ID from its array.
        const updatedCourse = await Courses.findByIdAndUpdate(
            userid,
            { $pull: { attachments: idd } },  // Correctly using $pull to remove specific attachment ID.
            { new: true }  // This option returns the updated document.
        ).populate("attachments");

        if (!updatedCourse) {
            return NextResponse.json({ message: "Course not found or update failed." }, { status: 404 });
        }

        // Return the updated course information.
        console.log("Updated Course:", updatedCourse);
        return NextResponse.json(updatedCourse, { status: 200 });

    } catch (error) {
        console.error("Error in POST request:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
