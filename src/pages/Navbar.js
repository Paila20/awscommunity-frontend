import React,{useState} from 'react';
import { FaUserCircle } from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { handleSuccess} from '../utils';

const Navbar = () => {
    const [isToggled, setIsToggled] = useState(false);
    const userrole = localStorage.getItem("role") ;
     const handleLogout = () => {
            localStorage.removeItem('token');
            localStorage.removeItem('loggedInUser');
            localStorage.removeItem('role');
            handleSuccess('User Logged out');
            navigate('/login');
        };
     const navigate = useNavigate();
     const toggleNavbar = () => {
        setIsToggled(!isToggled);
    };
  return (
    <div>
        {userrole === 'Admin' ?(
             <nav className="navbar navbar-expand-lg  bg-purple px-lg-5 px-0 fixed-top pt-3">
             <div className="container-fluid mx-sm-4 mx-2 text-white">
                 <p className='fs-4 cursor-pointer hover:text-purple-500 transition-colors duration-300' onClick={() => navigate("/adminblogs")}>  Blog App</p>
               
                 <button className=" d-lg-none mb-2"  type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded={isToggled} aria-label="Toggle navigation"   onClick={toggleNavbar}>
                 {isToggled ? <FiX size={24} /> : <FiMenu size={24} />}
                 </button>
                 <div  className={`collapse navbar-collapse ${isToggled ? "show" : ""}`}  id="navbarNav">
                     <ul className="navbar-nav ms-lg-auto flex-column flex-lg-row align-items-center">
                     <li className="nav-item cursor-pointer me-3" >
                          <span className="nav-link text-white " onClick={() => navigate("/home")}>Home</span>
                     </li>
                     <li className="nav-item cursor-pointer hover:text-orange-500 transition-colors duration-300" >
                             
                             <div class="dropdown">
                                 <button class=" dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                     Admin
                                    </button>
                                 <ul class="dropdown-menu">
                                     <li onClick={() => navigate("/adminblogs")}> My Blogs</li>
                                     <li onClick={() => navigate("/editorpendingblogs")}>Editor Pending Blogs</li>
                                     <li onClick={() => navigate("/users")}>Editors</li>
                                 </ul>
                                 </div>
                         </li>
                         
                         <li className="nav-item  mx-lg-3 my-3 my-lg-0 cursor-pointer hover:text-orange-500 transition-colors duration-300"    >
                            
                             <div class="dropdown">
                                 <button class=" dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                     Editor
                                    </button>
                                 <ul class="dropdown-menu">
                                     <li onClick={() => navigate("/editorblogs")}>Blogs</li>
                                    
                                 </ul>
                                 </div>
                         </li>
                         
                        
                         <li className="nav-item mx-lg-3 my-3 my-lg-0 g-3 cursor-pointer">
                             <span className="nav-link text-white"> <FaUserCircle size={30} className='pe-1'/>{localStorage.getItem("loggedInUser")}</span>
                         </li>
                        
                        
                         <li className="nav-item cursor-pointer ">
                             <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                         </li>
                     </ul>
                 </div>
             </div>
         </nav>
        ):(
            <nav className="navbar navbar-expand-lg  bg-purple px-lg-5 px-0 fixed-top pt-3">
            <div className="container-fluid mx-sm-4 mx-2 text-white">
                <p className='fs-4 cursor-pointer hover:text-purple-500 transition-colors duration-300' onClick={() => navigate("/home")}>  Blog App</p>
              
                <button className=" d-lg-none mb-2"  type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded={isToggled} aria-label="Toggle navigation"   onClick={toggleNavbar}>
                {isToggled ? <FiX size={24} /> : <FiMenu size={24} />}
                </button>
                <div  className={`collapse navbar-collapse ${isToggled ? "show" : ""}`}  id="navbarNav">
                    <ul className="navbar-nav ms-auto flex-column flex-lg-row">
                   
                          <li className="nav-item cursor-pointer me-3" >
                          <span className="nav-link text-white " onClick={() => navigate("/home")}>Home</span>
                          </li>
                      
                        <li className="nav-item  mx-lg-3 my-3 my-lg-0 cursor-pointer hover:text-orange-500 transition-colors duration-300"    >
                      
                            <div class="dropdown">
                                <button class=" dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    My Blogs
                                   </button>
                                <ul class="dropdown-menu">
                                    <li onClick={() => navigate("/myblogs")}>My Blogs</li>
                                    <li onClick={() => navigate("/mypendingblogs")}>Pending</li>
                                    <li onClick={() => navigate("/myrejectedblogs")}>Rejected</li>
                                    <li>Published</li>
                                   
                                   
                                </ul>
                                </div>
                        </li>
                        
                       
                        <li className="nav-item mx-lg-3 my-3 my-lg-0 g-3 cursor-pointer">
                            <span className="nav-link text-white"> <FaUserCircle size={30} className='pe-1'/>{localStorage.getItem("loggedInUser")}</span>
                        </li>
                       
                       
                        <li className="nav-item cursor-pointer ">
                            <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        )}



    </div>
  )
}

export default Navbar



   