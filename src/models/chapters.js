import mongoose from 'mongoose';
const { Schema } = mongoose;

const chapterSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  videoUrl: {
    type: String
  },
  position: {
    type: Number,
    required: true
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  isFree: {
    type: Boolean,
    default: false
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Courses',
    required: true
  },
  muxdatas: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MuxData'
  }
});
const Chapter = mongoose.models.Chapter || mongoose.model('Chapter', chapterSchema);
export default Chapter
