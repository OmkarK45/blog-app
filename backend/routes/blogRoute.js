const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Blog = require("../models/Blog");

router.get("/", async (req, res) => {
  try {
    // Find all blogs in the database
    const blogs = await Blog.find({});
    res.json({ blogs });
  } catch (error) {
    res.json({
      error: "Failed to fetch posts ! Please try again.",
    });
  }
});

router.get('/new', async (req,res)=>{
    try {
        // Render the react page
    } catch (error) {
        res.json({error:'Some Error occured. Please try again.'})
    }
})

router.post('/new', async (req,res)=>{
    const newBlog = new Blog({
        title:req.body.title,
        subtitle:req.body.subtitle,
        authorID:req.body.username,
        content:req.body.content,
        date:req.body.date
    })
    try {
        const savedBlog = await newBlog.save()
        res.redirect('/')
    } catch (error) {
        res.json({error:'Some error occured while saving your blog. Please try again.'})
    }
})
module.exports = router;
