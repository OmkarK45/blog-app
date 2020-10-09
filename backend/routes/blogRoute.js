const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Blog = require("../models/Blog");
const authentication = require("../middleware/authentication");

router.get("/", async (req, res) => {
  try {
    // Find all blogs in the database
    const blogs = await Blog.find({});
    res.json({ blogs });
  } catch (error) {
    res.json({
      error: "Failed to fetch blogs ! Please try again.",
    });
  }
});

router.get("/new", authentication, async (req, res) => {
  try {
    // Render the react page
    console.log(req.user);
  } catch (error) {
    res.json({ error: "Some Error occured. Please try again." }).status(500);
  }
});

router.post("/new", authentication, async (req, res) => {
  const newBlog = new Blog({
    title: req.body.title,
    subtitle: req.body.subtitle,
    authorID: req.body.username,
    content: req.body.content,
    date: req.body.date,
  });
  try {
    const savedBlog = await newBlog.save();
    res.redirect("/blogs");
    console.log(savedBlog);
  } catch (error) {
    res.json({
      error: "Some error occured while saving your blog. Please try again.",
    });
  }
});

router.delete("/:username/:blogID", authentication, async (req, res) => {
  console.log("Found a delete request from react.");
  try {
    const removedBlog = await Blog.deleteOne({
      _id: req.params.blogID,
      authorID: req.params.username,
    });
    res.redirect("/blogs");
  } catch (error) {
    res.json({ error: "Something went wrong. Please try again or refresh." });
  }
});

router.patch("/:username/:blogID", authentication, async (req, res) => {
  try {
    const updatedBlog = await Blog.updateOne(
      {
        _id: req.params.blogID,
        authorID: req.params.username,
      },
      {
        $set: {
          title: req.body.title,
          subtitle: req.body.subtitle,
          authorID: req.body.username,
          content: req.body.content,
          date: req.body.date,
        },
      }
    );
    res.redirect("/blogs");
  } catch (error) {
    res.json({
      error:
        "Some error occured while editing the blog. Please make sure you are authenticated.",
    });
  }
});
module.exports = router;
