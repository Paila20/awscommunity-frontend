

import React,{useEffect} from 'react';
import { ToastContainer } from 'react-toastify';

import Navbar from './Navbar';
import { formatTimestamp } from "../utils";
import { FaUserCircle } from "react-icons/fa";
import { useBlog } from '../context/BlogContext';

function MyBlogs() {
    const { mypendingblogs, fetchMyPendingBlogs, loading,setLoading} = useBlog();
  

    useEffect(() => {
        fetchMyPendingBlogs();
        setLoading()
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mypendingblogs]);

    return (
        <>
            <Navbar />
            <div className="container mt-5 pt-5">
                <div className='d-flex justify-content-around '>
            <h1 className='' style={{color:"green"}}>My Blogs</h1>
          
            </div>
            {
            loading ? (
                <div className="text-center mt-5 pt-5">
                    <div className="spinner-border " role="status" style={{color:"purple"}}>
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) :mypendingblogs.length === 0 ? (
                   <p className='text-center mt-5 pt-5'>No blogs Created Yet</p>
             ) : (
                <div className="row justify-content-center">
                    {mypendingblogs.map((blog) => (
                        <div key={blog._id} className=" col-12 mb-4 d-flex justify-content-center">
                           
                              <div key={blog._id} className=" col-12 mb-4 d-flex justify-content-center">
                                                      
                            
                                           <div className="blog-card">
                                                <div className="d-flex justify-content-between align-items-center ">
                                                  <div className='d-flex g-5 px-3 align-items-center justify-content-center'>
                                                     <FaUserCircle size={40} style={{ color: "purple" }} />
                                                     {blog.userName === localStorage.getItem('loggedInUser') ? (
                                                    <p className='ms-2 mt-2 text-dark fs-4'>{localStorage.getItem('loggedInUser')}</p>
                                                ) : (
                                                    <p className='ms-2 mt-2 text-dark fs-4'>{blog.userName}</p>
                                                )}
                                            </div>
                                           
                                                                          
                                        </div>
                                        <p className='ms-3 text-dark fs-6'>{formatTimestamp(blog.date)}</p>
                                        <div className="image-container">
                                            {blog.image ? (
                                                <img src={blog.image} alt={blog.title} />
                                            ) : (
                                                <p>Image not available</p>
                                            )}
                                        </div>
                            
                                        <h3 className='ms-3 mt-2'>{blog.title}</h3>
                                        <p className='ms-3'>{blog.content}</p>
                                        </div>
                                        </div>
                        </div>
                    ))}
                </div>
             )}
            </div>

            <ToastContainer />
        </>
    );
}

export default MyBlogs;
