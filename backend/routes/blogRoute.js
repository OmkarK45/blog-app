const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Blog = require("../models/Blog");
const authentication = require("../middleware/authentication");

router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find({ isApproved: true });
    res.json({ blogs });
  } catch (error) {
    res.json({
      error: "Failed to fetch blogs ! Please try again.",
    });
  }
});

router.get("/unapproved", async (req, res) => {
  try {
    const blogs = await Blog.find({});
    res.json(blogs);
  } catch (error) {
    res.json({ msg: error });
  }
});

router.get("/new", authentication, async (req, res) => {
  try {
  } catch (error) {
    res.json({ error: "Some Error occured. Please try again." }).status(500);
  }
});

router.post("/new", authentication, async (req, res) => {
  const newBlog = new Blog({
    title: req.body.title,
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
  } catch (error) {
    res.json({
      error: "Some error occured while saving your blog. Please try again.",
    });
  }
});

router.get("/:username/:slug", async (req, res) => {
  try {
    const foundBlog = await Blog.findOne({ slug: req.params.slug });
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
  try {
    const removedBlog = await Blog.deleteOne({
      _id: req.params.blogID,
    });
    res.redirect("/blogs");
  } catch (error) {
    res.json(error);
  }
});

router.patch("/:author/:blogID", authentication, async (req, res) => {
  try {
    const blogToBeEdited = await Blog.updateOne(
      {
        _id: req.params.blogID,
        author: req.params.author,
      },
      {
        $set: {
          bannerURL: req.body.bannerURL,
          title: req.body.title,
          content: req.body.content,
        },
      }
    );
  } catch (error) {
    res.json({ msg: error });
  }
});

router.patch("/:blogID", authentication, async (req, res) => {
  try {
    const blogTobeApproved = await Blog.updateOne(
      {
        _id: req.params.blogID,
      },
      {
        $set: {
          isApproved: req.body.isApproved,
        },
      }
    );

    res.json(blogTobeApproved).status(200);
  } catch (error) {
    res.json({
      error:
        "Some error occured while editing the blog. Please make sure you are authenticated.",
    });
  }
});
module.exports = router;
