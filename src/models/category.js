import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
      },
      courses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Courses'
      }]
    }, { timestamps: true });

const Category = mongoose.models.Category || mongoose.model('Category', categorySchema);
export default  Category;
