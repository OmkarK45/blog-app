const mongoose = require("mongoose");
const Blog = require("../models/Blog").schema;
const Joi = require("@hapi/joi");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 3,
    max: 256,
  },
  name: {
    type: String,
    require: true,
    min: 3,
    max: 256,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 1024,
  },
  email: {
    type: String,
    required: true,
    min: 5,
    max: 256,
  },
  avatar: {
    type: String,
    required: false,
  },
  socialMedia: [],
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
    },
  ],
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

function validateUser(user) {
  const schema = {
    email: Joi.string().min(3).max(255).required().email(),
  };
  return schema.validate(user);

}

exports.validate = validateUser;
module.exports = mongoose.model("User", userSchema);
