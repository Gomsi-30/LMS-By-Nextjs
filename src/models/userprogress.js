import mongoose from 'mongoose';
const { Schema } = mongoose;

const userProgressSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  chapterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chapter',
    required: true
  },
  isCompleted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

userProgressSchema.index({ userId: 1, chapterId: 1 }, { unique: true });

export const UserProgress = mongoose.models.UserProgress || mongoose.model('UserProgress', userProgressSchema);
