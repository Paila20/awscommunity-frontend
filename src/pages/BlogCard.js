// import React from 'react';
// import {formatTimestamp} from "../utils";
// import { FaEdit, FaTrash} from "react-icons/fa";
// import { FaUserCircle } from "react-icons/fa";
// // import { useNavigate } from 'react-router-dom';

// export const  BlogCard= ({ blog, onEdit, onDelete })=> {
  


  
     

//     return (
//         <div className="blog-card">
//              <div className="d-flex justify-content-between align-items-center ">
//                 <div className='d-flex g-5 px-3 align-items-center justify-content-center'> 
//                 <FaUserCircle size={40} style={{color:"purple"}}/>
//                 {blog.userName===localStorage.getItem('loggedInUser')?(<p className='ms-2 mt-2 text-dark fs-4'>{localStorage.getItem('loggedInUser')}</p>):(<p className='ms-2 mt-2 text-dark fs-4'>{blog.userName}</p>)}

//                </div>
//                {blog.userName===localStorage.getItem('loggedInUser')?( <div className='d-flex g-5 px-3'>

//               <button onClick={onEdit} className=' btn  bg-transparent'  style={{color:"green"}}><FaEdit size={20}/></button>
//               <button  type="button" className=' btn  bg-transparent' style={{color:"red"}} data-toggle="modal" data-target="#exampleModal"><FaTrash size={20}/></button>
//               <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
//                 <div class="modal-dialog">
//                   <div class="modal-content">
//                     <div class="modal-header">
//                       <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
//                       <button type="button" class="close" data-dismiss="modal" aria-label="Close">
//                         <span aria-hidden="true">&times;</span>
//                       </button>
//                     </div>
//                     <div class="modal-body">
//                       ...
//                     </div>
//                     <div class="modal-footer">
//                       <button type="button" class="btn btn-secondary" data-dismiss="modal" onClick={onDelete}>Close</button>
//                       <button type="button" class="btn btn-primary">Save changes</button>
//                     </div>
//                   </div>
//               </div>
//             </div>
   
 
//              </div>):("")}
              
               
//             </div>
//             <p  className='ms-3 text-dark fs-6'>{formatTimestamp(blog.date)}</p>
//              <div className="image-container">
//               {blog.image ? (
//                 <img src={`https://backend-blogs-s8uc.onrender.com${blog.image}`} alt={blog.title} />
//             ) : (
//                 <p>Image not available</p>
//             )}
//             </div>

//             <h3 className='ms-3'>{blog.title}</h3>
//             <p  className='ms-3'>{blog.content}</p>
            
//         </div>
        
//     );
// }

// export default BlogCard;


import React, { useState } from 'react';
import { formatTimestamp } from "../utils";
import { FaEdit, FaTrash } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { Modal, Button } from 'react-bootstrap';

export const BlogCard = ({ blog, onEdit, onDelete }) => {
    const [showModal, setShowModal] = useState(false);

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
                    <div className='d-flex g-5 px-3'>
                        <button onClick={onEdit} className='btn bg-transparent' style={{ color: "green" }}>
                            <FaEdit size={20} />
                        </button>
                        <button onClick={handleShow} type="button" className='btn bg-transparent' style={{ color: "red" }}>
                            <FaTrash size={20} />
                        </button>
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
