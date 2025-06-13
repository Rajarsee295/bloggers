import './Header.css'
import { useState } from 'react'
import { useUser } from '../contexts/User'
import Auth from './Auth'
import BlogForm from './BlogForm'

function Header(){ 
   const [CloseForm,setCloseForm]=useState(false)
   const [isOpen,setIsOpen] = useState(false)
   const {user,sign_out} = useUser()
   return(
    <>
      <div className="header_container">
         <div className="header ">
          <div className="left_side_header">
             Bloggers
          </div>
          <div className="right_side_header">
            
            { user ? <div className='flex items-center'>

               <button className=" pr-[10px] pl-[10px] bg-custom-blue text-white border rounded-lg h-[40px] w-[150%] justify:center hover:bg-custom-blue-2 active:opacity-75 transition duration-150" onClick={()=>{setCloseForm(true)}}>✏️ Write</button>
               <div className='pl-[10px] pr-[10px] text-custom-gray-2'> Hello, {user.username}</div>
               <button className='border border-red-500 rounded-lg w-[110%] h-[40px] text-red-500 hover:bg-red-500 hover:text-white active:opacity-75 transition duration-150 ' onClick={sign_out}>Logout</button>
                   
            </div> : <button className="sign_in_button" onClick={() => {setIsOpen(true)}}>Sign In</button> }
          </div>
         </div>
      </div>
      {isOpen &&(
        <Auth isOpen={isOpen} onClose={()=> setIsOpen(false)} />
      )}
      {setCloseForm &&(
         <BlogForm CloseForm={CloseForm} onCloseForm={()=>setCloseForm(false)}/>
      )}

    </>   
   )
}

export default Header