const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Blog = require("../models/Blog");

router.get("/", (req, res) => {
  res.json({ msg: "I'm a blog route" });
});

module.exports = router;
