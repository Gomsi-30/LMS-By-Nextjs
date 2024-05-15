import mongoose from 'mongoose';
const { Schema } = mongoose;

const muxDataSchema = new Schema({
  assetId: {
    type: String,
    required: true
  },
  playbackID: {
    type: String
  },
  chapterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chapter',
    unique: true,
    required: true
  }
});

export const MuxData = mongoose.models.MuxData || mongoose.model('MuxData', muxDataSchema);
