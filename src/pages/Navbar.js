import React,{useState} from 'react';
import { FaUserCircle } from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { handleSuccess} from '../utils';

const Navbar = ({setShowBlogForm}) => {
    const [isToggled, setIsToggled] = useState(false);
     const handleLogout = () => {
            localStorage.removeItem('token');
            localStorage.removeItem('loggedInUser');
            handleSuccess('User Logged out');
            navigate('/login');
        };
     const navigate = useNavigate();
     const toggleNavbar = () => {
        setIsToggled(!isToggled);
    };
  return (
    <div>
       <nav className="navbar navbar-expand-lg  bg-purple px-lg-5 px-0 fixed-top pt-3">
        <div className="container-fluid mx-sm-4 mx-2 text-white">
            <p className='fs-4 cursor-pointer hover:text-purple-500 transition-colors duration-300' onClick={() => navigate("/allblogs")}>  Blog App</p>
          
            <button className=" d-lg-none mb-2"  type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded={isToggled} aria-label="Toggle navigation"   onClick={toggleNavbar}>
            {isToggled ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
            <div  className={`collapse navbar-collapse ${isToggled ? "show" : ""}`}  id="navbarNav">
                <ul className="navbar-nav ms-auto flex-column flex-lg-row">
                <li className="nav-item cursor-pointer hover:text-orange-500 transition-colors duration-300"  onClick={() => navigate("/allblogs")}>
                        <span className="nav-link text-white">Blogs</span>
                    </li>
                    
                    <li className="nav-item  mx-lg-3 my-3 my-lg-0 cursor-pointer hover:text-orange-500 transition-colors duration-300"  onClick={() => navigate("/home")}>
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
