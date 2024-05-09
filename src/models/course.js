import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    // userId: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String },
    price: { type: Number },
    imageUrl: {
      type: String
    },
    isPublished: { type: Boolean, default: false },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      index: true,
    },
    attachments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Attachment",
      },
    ],
  },
  { timestamps: true }
);

const Courses = mongoose.models.Courses || mongoose.model('Courses', courseSchema);
export default Courses

