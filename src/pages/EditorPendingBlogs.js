

import React,{useEffect,useState} from 'react';
import { ToastContainer } from 'react-toastify';
import Navbar from './Navbar';
import { useBlog } from '../context/BlogContext';
import { formatTimestamp } from "../utils";
import { FaUserCircle } from "react-icons/fa";
import { Modal, Button } from 'react-bootstrap';
import { FiMoreHorizontal } from 'react-icons/fi';
import DOMPurify from 'dompurify';

function EditorPendingBlogs() {
    const { editorpendingblogs,  fetchEditorPendingBlogs,loading,updateEditorBlogStatus,setLoading} = useBlog();
    const [showModal, setShowModal] = useState(false);
  
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);
    useEffect(() => {
        fetchEditorPendingBlogs();
        setLoading(false)
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editorpendingblogs]);

    return (
        <>
            <Navbar />
            <div className="container mt-5 pt-5">
            <h1 className='text-center' style={{color:"purple"}}>Editor Pending Blogs</h1>
          

            {
            loading ? (
                <div className="text-center mt-5 pt-5">
                    <div className="spinner-border " role="status" style={{color:"purple"}}>
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) :editorpendingblogs.length === 0 ? (
                   <p className='text-center mt-5 pt-5'>No blogs Created Yet</p>
             ) : (
                <div className="row justify-content-center">
                    {editorpendingblogs.map((blog) => (
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
                 <div class="dropdown">
                 <button class=" dropdown-toggle custom-dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                <FiMoreHorizontal size={24} />
                                                </button>
                                                <ul class="dropdown-menu w-full h-full ">
                                                    <li >
                                                        <button className='mx-1 w-full  ' onClick={handleShow}>
                                                        Approve/Reject
                                                        </button>
                                                    
                                                    </li>
                                                    
                                                
                                                
                                                </ul>
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
            {/* <p className='ms-3'>{blog.content}</p> */}
            <p className='ms-3' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blog.content) }} />


           
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Action</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to approve or reject this blog?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={()=>{updateEditorBlogStatus(blog._id,'rejected'); fetchEditorPendingBlogs()}}>
                        Reject
                    </Button>
                    <Button variant="danger" onClick={()=>{updateEditorBlogStatus(blog._id,'published'); fetchEditorPendingBlogs()}}>
                        Approve
                    </Button>
                </Modal.Footer>
            </Modal>
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

export default EditorPendingBlogs;
