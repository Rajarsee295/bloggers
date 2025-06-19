import { useEffect, useState } from "react"
import BlogCard from "./BlogCard";
import { io } from "socket.io-client";
const socket = io("http://localhost:5000");


const BlogLists = () => {
    const [blogs, setBlogs] = useState([])

    useEffect(() => {
        fetch("http://localhost:5000/api/getBlogs")
            .then(res => res.json())
            .then(data => setBlogs(data))
            .catch(err => console.error("Failed to fetch blogs:", err));
    }, []);

    // Add blog via socket only once
    useEffect(() => {
        socket.on("blogPost", onAddBlog);
        return () => {
            socket.off("blogPost", onAddBlog); // cleanup to prevent duplicates
        };
    }, []);

    useEffect(() => {
        socket.on("CommentPost");
        return () => {
           fetch("http://localhost:5000/api/getBlogs")
            .then(res => res.json())
            .then(data => setBlogs(data))
            .catch(err => console.error("Failed to fetch blogs:", err));
        }
    })

    

    const onAddBlog = (newBlog) => {
        setBlogs(prevBlogs => [newBlog, ...prevBlogs]);
    }

    const handleDeleteBlog = (id) => {
        setBlogs(prevBlogs => prevBlogs.filter(blog => blog._id !== id));
    };

    return (
        <div className="blog-list-container">

            {blogs.map(blog => (
                <BlogCard key={blog._id} blog={blog} onDelete={handleDeleteBlog} />
            ))}
        </div>
    );
}

export default BlogLists;