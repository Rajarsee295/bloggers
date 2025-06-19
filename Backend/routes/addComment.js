import express, { Router } from "express";
import Blog from "../models/Blogs.js";
import { log } from "console";

//Route to create new comment
const router = express.Router();


router.put('/addComment/:id', async (req, res) => {
    //gets the comment object from request body
    const  comment  = req.body;
    
    try {
        const updatedBlog = await Blog.findByIdAndUpdate(
            req.params.id,
            { $push: { blog_comments: comment } },
            { new: true } // return the updated document
        );

        if (!updatedBlog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        res.json(updatedBlog);
    } catch (err) {
        console.error("Error adding comment:", err);
        res.status(500).json({ message: "Internal server error" });
    }
});

export default router