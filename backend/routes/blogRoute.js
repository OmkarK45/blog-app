const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Blog = require("../models/Blog");
const authentication = require("../middleware/authentication");

router.get("/", async (req, res) => {
  try {
    // Find all blogs in the database
    const blogs = await Blog.find({isApproved:true});
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
    author: req.body.author,
    content: req.body.content,
    date: req.body.date,
    bannerURL: req.body.bannerURL,
    avatar: req.body.avatar,
    authorID: req.body.authorID,
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

router.get("/:username/:blogID", async (req, res) => {
  try {
    const foundBlog = await Blog.findById(req.params.blogID);
    if (foundBlog) {
      res.json(foundBlog);
    } else {
      throw error;
    }
  } catch (error) {
    res
      .status(404)
      .json({ msg: "Requested blog was not found on the server." });
  }
});

router.delete("/:username/:blogID", authentication, async (req, res) => {
  console.log("Found a delete request from react.");
  try {
    const removedBlog = await Blog.deleteOne({
      _id: req.params.blogID,
    });
    res.redirect("/blogs");
  } catch (error) {
    res.json(error);
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
