const mongoose = require("mongoose");
const User = require("../models/User").schema;

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    max: 256,
    min: 5,
  },
  subtitle: {
    type: String,
    min: 3,
    max: 1024,
  },
  authorID: {
    type: String,
  },
  description: {
    type: String,
    min: 10,
    max: 3048,
  },
  date: {
    type: String,
    default: Date.now,
  },
});

module.exports = mongoose.model("Blog", blogSchema);
