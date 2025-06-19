import express, { Router } from "express";
import Blog from "../models/Blogs.js";

//Route to create new Blog
const router = express.Router();

//creating new blogs 
router.post('/createBlog', async (req, res) => {
    try {
        //takes input from the frontend
        const { id, blog_title, blog_content, blog_comments , blog_upvotes , blog_downvotes , username } = req.body;
        const blog = new Blog({id, blog_title, blog_content, blog_comments , blog_upvotes , blog_downvotes , username});//posting the blog to db
        await blog.save();//saveing the blog to the database
        res.json(blog)
    } catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
});

//getting all blogs
router.get('/getBlogs', async (req, res) => {
    try {
        const blogs = await Blog.find({}).sort({createdAt:-1 }); // Fetch all blogs from the database
        res.json(blogs); // Send the blogs as a JSON response
    } catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
});

//getting blog for a specific username
router.get('/getBlogs/username', async (req, res) => {
    try {
        const { username } = req.query; // Get the username from the query parameters
        const blogs_user = await Blog.find({ username }); // Fetch blogs for the specific username
        res.json(blogs_user); // Send the blogs as a JSON response
    } catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
});

//route to delete blogs
router.delete('/deleteBlog/:id', async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: "Blog deleted" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router

