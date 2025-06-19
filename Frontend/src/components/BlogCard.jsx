import { useState } from "react";
import { useUser } from "../contexts/User"


const BlogCard = ({ blog, onDelete }) => {
  const [dislike, setDislike] = useState(false)
  const [like, setLike] = useState(false)
  const [commentSection, setCommentSection] = useState(false)

  const { user } = useUser();

  const [commentContent, setCommentContent] = useState('')


  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    const response = await fetch(`http://localhost:5000/api/deleteBlog/${blog._id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      if (typeof onDelete === "function") onDelete(blog._id);
    } else {
      alert("Failed to delete blog.");
    }
  };

  const handleComment = async () => {

    const commentData = {
      Author: user.username,
      Date: new Date(),
      Content: commentContent
    }
      
    console.log(commentData);
    setCommentContent('')

    try {
      await fetch(`http://localhost:5000/api/addComment/${blog._id}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(commentData),
      });
    }
    catch(err){
      alert(err)
    }

  }


  if (!blog) return null;

  return (
    <>
      <div className=" flex justify-center pt-[2%] ">
        <div className="bg-white shadow w-[50%] border rounded-lg pt-[1%] hover:shadow-lg transition duration-150ms">

          <div className=" font-semibold text-[20px] pl-[23px] pr-0 pb-4 pt-[5px]">
            {blog.blog_title}
          </div>

          <div className="author_date pl-[23px] pb-[5px] text-gray-500">
            by {blog.username} &nbsp;&nbsp;&nbsp; {new Date(blog.date).toLocaleDateString("en-IN")}
          </div>

          <div className="content pl-[23px] text-gray-500 pt-[10px] pb-[5px] pr-[23px]">
            <div className="main_content">{blog.blog_content}</div>
            <div className="pt-[15px] pb-[15px]"><hr /></div>
          </div>

          <div className="">

            <div className="flex interactive pl-[23px] h-[50px] items-center pb-[12.5px]">
              <button className={`flex justify-center items-center border rounded-lg h-[80%] text-[80%] w-[8%] mr-[10px] transition duration-150 ${!like ? "bg-gray-200 text-gray-500  hover:bg-gray-300" : "bg-green-500 text-white hover:opacity-75"}`} onClick={() => { setLike(!like); if (dislike == true) setDislike(!dislike); }}> ↑ {blog.blog_upvotes}</button>
              <button className={`flex justify-center items-center border rounded-lg h-[80%] text-[80%] w-[8%] mr-[10px] transition duration-150 ${!dislike ? "bg-gray-200 text-gray-500  hover:bg-gray-300" : "bg-red-500 text-white hover:opacity-75"} `} onClick={() => { setDislike(!dislike); if (like == true) setLike(!like); }}> ↓ {blog.blog_downvotes}</button>
              <button className="text-custom-gray-3" onClick={() => { setCommentSection(!commentSection) }}>💬 {blog.blog_comments.length} Comments</button>

              {user && user.username == blog.username ? <div className="ml-auto pr-[23px] flex items-center">
                <button className="bg-green-600 w-[50px] h-[40px] text-white border rounded-lg hover:bg-green-700 active:opacity-75 transition duration-150">Edit</button>
                <button className="bg-red-600 w-[60px] h-[40px] text-white border rounded-lg ml-[2px] hover:bg-red-700 active:opacity-75 transition duration-150" onClick={handleDelete}>Delete</button>
              </div> : <div></div>
              }

            </div>

          </div>
          {commentSection && (
            <div className="comment_container px-[23px] py-[10px]" >
              {blog.blog_comments.map(comment => (
                 <div className="comment_1 bg-gray-100 border rounded-lg px-[15px] py-[15px] my-[10px]">
                  <div className="flex justify-between ">
                   <div className="username font-bold">
                     {comment.Author}
                   </div>
                  <div className="date text-gray-600">{new Date(comment.Date).toLocaleDateString("en-IN")}</div>
                </div>
                <div className="content text-gray-600 py-[5px]">
                  {comment.Content}
                </div>
              </div> 
              )) }
              
              {user && <form className="comment-form pt-[20px]" onSubmit={(e) => { e.preventDefault(); handleComment(); } }>
                <textarea
                  placeholder="Write a comment..."
                  rows={3}
                  className="outline-none w-[100%] border rounded-lg pt-[10px] px-[10px] focus:outline-none focus:border-color-custom-blue"
                  value={commentContent}
                  onChange={(e)=>{setCommentContent(e.target.value)}}
                />
                <button type="submit" className="bg-custom-blue text-white text-[110%] border rounded-lg py-[10px] px-[10px] my-[5px] hover:bg-custom-blue-2">
                  Post Comment
                </button>
              </form>}  
            </div>
          )}

        </div>
      </div>
    </>
  );
}

export default BlogCard
