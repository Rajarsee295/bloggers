import { useState } from "react";
import { useUser } from "../contexts/User";
import {io} from "socket.io-client";
const socket = io("http://localhost:5000");

const BlogForm = ({ CloseForm, onCloseForm }) => {


   const [title, setTitle] = useState('')
   const [blogContent, setblogContent] = useState('')
   const { user } = useUser()

   const handleSubmit = async () => {
      onCloseForm();
      const blogData = {
         id: Date.now().toString(), // Unique ID based on timestamp
         blog_title: title,
         blog_content: blogContent.trim(),
         blog_comments: [],
         blog_upvotes: 0,
         blog_downvotes: 0,
         username: user.username
      };
      setTitle('')
      setblogContent('')
      socket.emit("newBlogPost", blogData); // Emit the new blog post to the server
      try {
         await fetch('http://localhost:5000/api/createBlog', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify(blogData),
         });
      } catch (err) {
         console.log(err);
         alert(err);
      }
   }

   if (!CloseForm) return null;

   return (
      <>
         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-xl w-[60%]">
               <div className="text-right">
                  <button
                     onClick={() => { onCloseForm(); }}
                     className="px-3 py-0.5  text-black rounded active:bg-custom-gray"
                  >
                     ✖
                  </button>
               </div>
               <div className="flex justify-center items-center font-semibold text-[225%]">
                  Create a Blog
               </div>

               <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} >
                  <div className="pl-[0.5%] pt-[2%] font-normal text-[150%]">
                     Title:<span className="text-red-500">*</span>
                  </div>
                  <div className="py-[1%]">
                     <input type="text" placeholder="Title" className="w-[100%] border border-custom-gray-1 rounded-lg py-[1.5%] px-[1%] outline-none text-gray-700 focus:outline-none focus:border-custom-blue" value={title} onChange={(e) => { setTitle(e.target.value) }} required></input>
                  </div>
                  <div className="pl-[0.5%] pt-[2%] font-normal text-[150%]">
                     Write your blog:<span className="text-red-500">*</span>
                  </div>
                  <div className="py-[1%]">
                     <textarea type="text" placeholder="Content" className="w-[100%] h-[40vh] border border-custom-gray-1 rounded-lg py-[1.5%] px-[1%] outline-none text-gray-700 focus:outline-none focus:border-custom-blue" value={blogContent} onChange={(e) => { setblogContent(e.target.value) }} required></textarea>
                  </div>
                  <div className="flex justify-end items-center pt-[2%]">
                     <button className="bg-custom-blue px-[3%] py-[1%] text-[150%] text-white rounded-lg hover:bg-custom-blue-2 active:opacity-75">Post</button>
                  </div>
               </form>

            </div>
         </div>
      </>
   )
}

export default BlogForm