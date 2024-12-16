import React from 'react';
import {formatTimestamp} from "../utils";
import { FaEdit, FaTrash} from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";

export const  BlogCard= ({ blog, onEdit, onDelete })=> {
    return (
        <div className="blog-card">
             <div className="d-flex justify-content-between align-items-center ">
                <div className='d-flex g-5 px-3 align-items-center justify-content-center'> 
                <FaUserCircle size={40} style={{color:"purple"}}/>
                {blog.userName===localStorage.getItem('loggedInUser')?(<p className='ms-2 mt-2 text-dark fs-4'>{localStorage.getItem('loggedInUser')}</p>):(<p className='ms-2 mt-2 text-dark fs-4'>{blog.userName}</p>)}

               </div>
               {blog.userName===localStorage.getItem('loggedInUser')?( <div className='d-flex g-5 px-3'>

              <p onClick={onEdit} style={{color:"green"}}><FaEdit size={20}/></p>
              <p onClick={onDelete} className='ms-3' style={{color:"red"}}><FaTrash size={20}/></p>
   
 
             </div>):("")}
              
               
            </div>
            <p  className='ms-3 text-dark fs-6'>{formatTimestamp(blog.date)}</p>
             <div className="image-container">
              {blog.image ? (
                <img src={`https://backend-blogs-s8uc.onrender.com${blog.image}`} alt={blog.title} />
            ) : (
                <p>Image not available</p>
            )}
            </div>

            <h3 className='ms-3'>{blog.title}</h3>
            <p  className='ms-3'>{blog.content}</p>
           
        </div>
    );
}

export default BlogCard;
