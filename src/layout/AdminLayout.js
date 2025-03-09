import React, { useState } from "react";
import { Outlet, Link,useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import logo from "../assets/awscommunitylogo.png";
import Navbar from "../pages/Navbar";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  // const toggleSidebar = useCallback(() => {
  //   setIsSidebarOpen((prev) => !prev);
  // }, []);


  console.log("AdminLayout Rendered"); // Debugging log

  return (
    <div className="">
    
       <nav className={`navbar navbar-expand-lg header-top `}>
             <div className="container-fluid mx-sm-4 mx-5 text-white position-fixed " style={{zIndex:"9999"}}>
              <div className="d-flex justify-content-between">
                <div className="d-flex">
               <p className="fs-4 cursor-pointer hover:text-purple-500 transition-colors duration-300" onClick={() => navigate("/adminblogs")}>
                 <img src={logo} alt="logo" className="w-50" />
               </p>
     
               <button className="btn text-white" onClick={toggleSidebar}>
                 {isSidebarOpen ? <FiMenu size={24} /> : <FiMenu size={24} />}
               </button>
               </div>
               
              <div className="d-flex g-0 align-items-center">
              <p className="fs-4 cursor-pointer hover:text-purple-500 transition-colors duration-300" onClick={() => navigate("/adminblogs")}>
                 <img src={logo} alt="logo" className="w-50" />
               </p>
               <h5>Cloud Community</h5>
              </div>
                
             </div>
               </div>
                <div className={`sidebar bg-white  ${isSidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
                       <ul className="list-unstyled px-3 mt-5"> {/* Add margin-top to avoid navbar overlap */}
                         <li className="py-2"><Link to="/admin/admindashboard" className=" text-decoration-none">Home</Link></li>
                         <li className="py-2"><Link to="/admin/admindashboard/sections" className=" text-decoration-none">Sections</Link></li>
                         <li className="py-2"><Link to="/admin/admindashboard/team" className=" text-decoration-none">Team</Link></li>
                         <li className="py-2"><Link to="/admin/admindashboard/events" className=" text-decoration-none">Events</Link></li>
                       </ul>
                     </div>
     
           </nav>

      {/* Page Content */}
      <div className={`content-container ${isSidebarOpen ? "content-expanded" : "content-collapsed"}`}>
        <Outlet /> {/* Dynamic content loads here based on the route */}
        {/* <h2>Welcome to Admin Dashboard</h2> */}
      </div>
    </div>
  );
};

export default AdminLayout;
