import mongoose from "mongoose";

const attachmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Courses',
    required: true
  }
}, { timestamps: true });

export const Attachments = mongoose.models.Attachments || mongoose.model('Attachments', attachmentSchema);
export default Attachments