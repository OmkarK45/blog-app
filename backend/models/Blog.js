const mongoose = require("mongoose");
const User = require("../models/User").schema;
const slugify = require("slugify");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    max: 256,
    min: 5,
  },
  bannerURL: {
    type: String,
    required: false,
  },
  subtitle: {
    type: String,
    min: 3,
    max: 1024,
  },
  author: {
    type: String,
  },
  content: {
    type: String,
    min: 10,
    max: 3048,
  },
  date: {
    type: String,
  },
  avatar: {
    type: String,
  },
  authorID: {
    type: String,
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
  slug: {
    type: String,
    unique: true,
    required: true,
  },
});
blogSchema.pre("validate", function (next) {
  if (this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next()
});
module.exports = mongoose.model("Blog", blogSchema);
