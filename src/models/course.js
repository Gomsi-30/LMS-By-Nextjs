import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    
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
        ref: "Attachments",
      },
    ],
    chapters: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chapter",
      },
    ],
    purchases: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Purchase",
      },
    ],
  },
  { timestamps: true }
);

const Courses = mongoose.models.Courses || mongoose.model('Courses', courseSchema);
export default Courses

