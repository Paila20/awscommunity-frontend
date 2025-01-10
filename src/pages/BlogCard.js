


import React, { useState } from 'react';
import { formatTimestamp } from "../utils";
import { FaEdit, FaTrash } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { Modal, Button } from 'react-bootstrap';
import { FiMoreHorizontal } from 'react-icons/fi';
import { useBlog } from '../context/BlogContext';


export const BlogCard = ({ blog, onEdit, onDelete }) => {
    const { sendBlogForApproval,fetchMyBlogs,updateAdminBlogStatus,fetchAdminBlogs } = useBlog();
    const [showModal, setShowModal] = useState(false);
    const role = localStorage.getItem("role")

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    return (
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
                {blog.userName === localStorage.getItem('loggedInUser') ? (
                    <div className='d-flex g-5 px-3 align-items-center'>
                        <button onClick={onEdit} className='btn bg-transparent' style={{ color: "green" }}>
                            <FaEdit size={20} />
                        </button>
                        <button onClick={handleShow} type="button" className='btn bg-transparent' style={{ color: "red" }}>
                            <FaTrash size={20} />
                        </button>
                        {role === 'Editor' ? (
                            <div class="dropdown">
                            <button class=" dropdown-toggle custom-dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <FiMoreHorizontal size={24} />
                               </button>
                            <ul class="dropdown-menu w-full h-full ">
                                <li onClick={() =>{sendBlogForApproval(blog._id);fetchMyBlogs()}}>
                                    <button className='mx-1 w-full  '>
                                    Send Me For Approval
                                    </button>
                                  
                                </li>
                                
                               
                               
                            </ul>
                            </div>
                        ):(
                            <div class="dropdown">
                                <button class=" dropdown-toggle custom-dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <FiMoreHorizontal size={24} />
                                   </button>
                                <ul class="dropdown-menu w-full h-full ">
                                  
                                    <li >
                                        <button className='mx-1 ' onClick={()=>{updateAdminBlogStatus(blog._id,'published');fetchAdminBlogs()}}>
                                         Make as Live
                                        </button>
                                      
                                    </li>
                                    
                                   
                                   
                                </ul>
                                </div>
                        )}
                     
                    </div>
                ) : ("")}
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

            {/* Modal */}
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this blog?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={onDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default BlogCard;
