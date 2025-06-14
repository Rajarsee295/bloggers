import { useEffect, useState } from "react"
import BlogCard from "./BlogCard";
import {io} from "socket.io-client";
const socket = io("http://localhost:5000");


const BlogLists = () => {
    const [blogs, setBlogs] = useState([])

    useEffect(() => {
        fetch("http://localhost:5000/api/getBlogs")
            .then(res => res.json())
            .then(data => setBlogs(data))
            .catch(err => console.error("Failed to fetch blogs:", err));
    }, []);
 
    socket.on("blogPost", (newBlog) => {
        onAddBlog(newBlog);
    });

    const onAddBlog = (newBlog) => {
      console.log("nigga");
      setBlogs(prevBlogs => [newBlog, ...prevBlogs]);
    }

    return (
        <div className="blog-list-container">
            
            {blogs.map(blog => (
                <BlogCard key={blog._id} blog={blog} />
            ))}
        </div>
    );
}

export default BlogLists;