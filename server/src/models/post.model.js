import { Schema, model } from "mongoose";

const PostSchema = new Schema(
  {
    title: { type: String, required: true },
    caption: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    body: { type: Object, required: true },
    photo: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    tags: { type: [String] },
    categories: { type: Schema.Types.ObjectId, ref: "Post Categories" },
  },
  {
    timestamps: true,
  }
);
const Post = model("posts", PostSchema);
export default Post;
