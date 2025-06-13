import { useState } from "react";


const BlogCard = () => {
  const [dislike, setDislike] = useState(false)
  const [like, setLike] = useState(false)
  const [commentSection,setCommentSection]=useState(false)
  return (
    <>
      <div className=" flex justify-center pt-[2%] ">
        <div className="bg-white shadow w-[50%] border rounded-lg pt-[1%] hover:shadow-lg transition duration-150ms">

          <div className=" font-semibold text-[20px] pl-[23px] pr-0 pb-4 pt-[5px]">
            Starting with React Hooks.
          </div>

          <div className="author_date pl-[23px] pb-[5px] text-gray-500">
            by Author &nbsp;&nbsp;&nbsp; 1/5/2024
          </div>

          <div className="content pl-[23px] text-gray-500 pt-[10px] pb-[5px] pr-[23px]">
            <div className="main_content">Random ahh paragraph goes brrrrrrrr. React Hooks have revolutionized how we write React components. In this comprehensive guide, we'll explore the most commonly used hooks and learn how to build better components with cleaner, more readable code.  </div>
            <div className="pt-[15px] pb-[15px]"><hr /></div>
          </div>

          <div className="">

            <div className="flex interactive pl-[23px] h-[50px] items-center pb-[12.5px]">
              <button className={`flex justify-center items-center border rounded-lg h-[80%] text-[80%] w-[8%] mr-[10px] transition duration-150 ${!like ? "bg-gray-200 text-gray-500  hover:bg-gray-300" : "bg-green-500 text-white hover:opacity-75"}`} onClick={() => { setLike(!like); if (dislike == true) setDislike(!dislike); }}> ↑ 204</button>
              <button className={`flex justify-center items-center border rounded-lg h-[80%] text-[80%] w-[8%] mr-[10px] transition duration-150 ${!dislike ? "bg-gray-200 text-gray-500  hover:bg-gray-300" : "bg-red-500 text-white hover:opacity-75"} `} onClick={() => { setDislike(!dislike); if (like == true) setLike(!like); }}> ↓ 104</button>
              <button className="text-custom-gray-3" onClick={()=>{setCommentSection(!commentSection)}}>💬 1 Comments</button>
              
              <div className="ml-auto pr-[23px] flex items-center">
                <button className="bg-green-600 w-[50px] h-[40px] text-white border rounded-lg hover:bg-green-700 active:opacity-75 transition duration-150">Edit</button>
                <button className="bg-red-600 w-[60px] h-[40px] text-white border rounded-lg ml-[2px] hover:bg-red-700 active:opacity-75 transition duration-150">Delete</button>
              </div>
            </div>
            
            
          </div>
          { commentSection && (
            <div className="comment_container px-[23px] py-[10px]" >
            <div className="comment_1 bg-gray-100 border rounded-lg px-[15px] py-[15px]">
              <div className="flex justify-between ">
                <div className="username font-bold">
                  Author
                </div>
                <div className="date text-gray-600">2/9/2024</div>
              </div>
              <div className="content text-gray-600">
                Great explanation! This really helped me understand useState better.React Hooks have revolutionized how we write React components. In this comprehensive guide, we'll explore the most commonly used hooks and learn how to build better components with cleaner, more readable code.
              </div>
            </div>
            <form  className="comment-form pt-[20px]">
                <textarea
                  placeholder="Write a comment..."
                  rows={3}
                  className="outline-none w-[100%] border rounded-lg pt-[10px] px-[10px] focus:outline-none focus:border-color-custom-blue"
                />
                <button type="submit" className="bg-custom-blue text-white text-[110%] border rounded-lg py-[10px] px-[10px] my-[5px] hover:bg-custom-blue-2">
                  Post Comment
                </button>
              </form>
          </div>
          )}
          
        </div>
      </div>
    </>
  );
}

export default BlogCard