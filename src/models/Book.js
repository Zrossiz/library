import mongoose from "mongoose";

const BookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    authors: {
      type: String,
      required: true,
    },
    favorite: {
      type: Boolean,
      required: true,
    },
    fileCover: {
      type: String,
      required: true,
    },
    fileName: {
      type: String,
      required: true,
    },
    fileBook: {
      type: String,
      default: null,
    },
    viewCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Book", BookSchema);
