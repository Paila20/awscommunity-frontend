

import React,{useEffect,useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Navbar from './Navbar';
import { useBlog } from '../context/BlogContext';
import { formatTimestamp } from "../utils";
import { FiMenu, FiX } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import DOMPurify from 'dompurify';


function PublicBlogs() {
    const [isToggled, setIsToggled] = useState(false);
    
    const { fetchPublicBlogs,loading,publicblogs,setLoading} = useBlog();

   const navigate = useNavigate();
    const toggleNavbar = () => {
    setIsToggled(!isToggled);
};
    useEffect(() => {
        fetchPublicBlogs();
          setLoading()
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [publicblogs]);

    return (
        <>
        { localStorage.getItem('token')?(
            <Navbar/>
        ):(
            <nav className="navbar navbar-expand-lg bg-purple px-lg-5 px-0 fixed-top pt-3 z-1">
            <div className="container-fluid mx-sm-4 mx-2 text-white">
                <p className='fs-4 cursor-pointer hover:text-purple-500 transition-colors duration-300' onClick={() => navigate("/home")}>Blog App</p>
                <button className="d-lg-none mb-2" type="button" onClick={toggleNavbar}>
                    {isToggled ? <FiX size={24} /> : <FiMenu size={24} />}
                </button>
                <div className={`collapse navbar-collapse ${isToggled ? "show" : ""}`} id="navbarNav">
                    <ul className="navbar-nav ms-lg-auto flex-column flex-lg-row align-items-center">
                        <li className="nav-item cursor-pointer me-3">
                            <span className="nav-link text-white" onClick={() => navigate("/home")}>Home</span>
                        </li>
                        <li className="nav-item cursor-pointer">
                            <button className="btn btn-primary"  onClick={() => navigate("/signup")}>Signup</button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        )}
   
            <div className="container mt-5 pt-5">
            <h1 className='text-center' style={{color:"green"}}>public Blogs</h1>


            {
            loading ? (
                <div className="text-center mt-5 pt-5">
                    <div className="spinner-border " role="status" style={{color:"purple"}}>
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) :publicblogs.length === 0 ? (
                   <p className='text-center mt-5 pt-5'>No blogs Created Yet</p>
             ) : (
                <div className="row justify-content-center">
                    {publicblogs.map((blog) => (
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
                                    {/* <p className='ms-3'>{blog.content}</p> */}
                                    <p className='ms-3' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blog.content) }} />

           
           
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

export default PublicBlogs;
