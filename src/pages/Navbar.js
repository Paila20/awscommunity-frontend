import React from 'react';
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { handleSuccess} from '../utils';

const Navbar = ({setShowBlogForm}) => {
     const handleLogout = () => {
            localStorage.removeItem('token');
            localStorage.removeItem('loggedInUser');
            handleSuccess('User Logged out');
            navigate('/login');
        };
     const navigate = useNavigate();
  return (
    <div>
       <nav className="navbar navbar-expand-lg  bg-purple px-md-5 px-0 fixed-top">
        <div className="container-fluid px-md-5 px-0  mx-sm-4 mx-2 text-white">
            <p className='fs-4 cursor-pointer'>  Blog App</p>
          
            <button className="navbar-toggler bg-white me-3 "  type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ms-auto flex-column flex-lg-row">
                <li className="nav-item cursor-pointer"  onClick={() => navigate("/allblogs")}>
                        <span className="nav-link text-white">Blogs</span>
                    </li>
                    
                    <li className="nav-item  mx-lg-3 my-3 my-lg-0 cursor-pointer"  onClick={() => navigate("/home")}>
                        <span className="nav-link text-white ">My Blogs</span>
                    </li>
                    
                    <li className="nav-item  cursor-pointer ">
                        <button className="btn btn-success" onClick={() => setShowBlogForm(true)}>Create Blog</button>
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

    </div>
  )
}

export default Navbar
