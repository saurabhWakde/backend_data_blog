const mongoose = require("mongoose");
const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    author_name: { type: String , required: true },
    content: { type: String, required: true },
    author_email: { type: String },
  },
  {
    timestamps: true,
  }
);
const BlogModel = mongoose.model("blog", blogSchema);
module.exports = { BlogModel };
