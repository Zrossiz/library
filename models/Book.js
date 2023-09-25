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
      type: String,
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
  },
  { timestamps: true }
);

export default mongoose.model("Book", BookSchema);
