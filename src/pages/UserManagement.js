import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify"; 
import { useBlog } from "../context/BlogContext";
import { handleSuccess} from '../utils';
import { FaUserCircle } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";

const UserManagement = () => {
  const {
   
    adminusers,
    fetchAdminUsers,
    setLoading,
    createAdminUser,
    deleteAdminUser,
  } = useBlog();
    const [isToggled, setIsToggled] = useState(false);
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
    role: "Editor",
  });

  const [errors, setErrors] = useState({});
  const [showblogform, setShowBlogForm] = useState(false);
  useEffect(() => {
    fetchAdminUsers();
    setLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
   

   const navigate = useNavigate();
       const toggleNavbar = () => {
          setIsToggled(!isToggled);
      };
       const handleLogout = () => {
                  localStorage.removeItem('token');
                  localStorage.removeItem('loggedInUser');
                  localStorage.removeItem('role')
                  handleSuccess('User Logged out');
                  navigate('/login');
              };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupInfo((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};

    if (!signupInfo.name.trim() || signupInfo.name.length < 3) {
      newErrors.name = "Name must have at least 3 characters.";
    }

    if (
      !signupInfo.email.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signupInfo.email)
    ) {
      newErrors.email = "A valid email is required.";
    }

    if (
      !signupInfo.password.trim() ||
      !/^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(
        signupInfo.password
      )
    ) {
      newErrors.password =
        "Password must be at least 8 characters long, include a number, and a special character.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    const newUser = {
      name: signupInfo.name,
      email: signupInfo.email,
      password: signupInfo.password,
      role: signupInfo.role,
    };

    try {
      await createAdminUser(newUser);
      setSignupInfo({
        name: "",
        email: "",
        password: "",
        role: "Editor",
      });
      setShowBlogForm(false);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    
    <div className="container pb-5">
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
      {/* Header */}
      <h1 className="text-center mt-5 text-white">Admin Dashboard</h1>
      <div className="d-flex justify-content-between mb-4">
        <h2 style={{ color: "green" }}>Users List</h2>
        <button
          className="btn btn-success"
          onClick={() => setShowBlogForm(true)}
        >
          Create User
        </button>
      </div>

      {/* User Table */}
      <div className="card ">
        <div className="card-header">
          <h5>User List</h5>
        </div>
        <div className="card-body p-md-2 p-0">
          <table className="table table-striped table-bordered">
            <thead className="table-light text-center">
              <tr >
             
                <th className="px-sm-3 px-0">Name</th>
                <th className="px-sm-3 px-0">Email</th>
                <th className="px-sm-3 px-0">Role</th>
                <th className="px-sm-3 px-0">Actions</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {adminusers.length > 0 ? (
                adminusers.map((user) => (
                  <tr key={user._id}>
                  
                    <td className="pt-sm-3 px-0">{user.name}</td>
                    <td className="word-wrap word-break pt-sm-3 px-0">{user.email}</td>
                    <td className="pt-sm-3 px-0">{user.role}</td>
                    <td className="pt-sm-2 px-0">
                     
                      <button
                        className="btn btn-danger p-0 p-sm-2"
                        onClick={() => deleteAdminUser(user._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create User Form */}
      {showblogform && (
        <div className="blog-form px-5  py-3 z-5" style={{zIndex:"2000"}}>
          <div className="d-flex justify-content-between align-items-center">
          <h1>Create User</h1>
          <FaTimes size={20} onClick={() => setShowBlogForm(false)}/>
          </div>
          <form onSubmit={handleSignup}>
            <div>
              <label htmlFor="name">Name</label>
              <input
                onChange={handleChange}
                type="text"
                name="name"
                autoFocus
                placeholder="Enter your name..."
                value={signupInfo.name}
              />
              {errors.name && <p className="text-danger">{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                onChange={handleChange}
                type="email"
                name="email"
                placeholder="Enter your email..."
                value={signupInfo.email}
              />
              {errors.email && <p className="text-danger">{errors.email}</p>}
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                onChange={handleChange}
                type="password"
                name="password"
                placeholder="Enter your password..."
                value={signupInfo.password}
              />
              {errors.password && (
                <p className="text-danger">{errors.password}</p>
              )}
            </div>
            <div>
              <label htmlFor="role">Role</label>
              <select name="role" value={signupInfo.role} onChange={handleChange}>
                <option value="Editor">Editor</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
            <button type="submit" className="mt-3 btn btn-primary">
              Signup
            </button>
          </form>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default UserManagement;
