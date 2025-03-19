// import React, { useState } from "react";
// import { Outlet, Link,useNavigate } from "react-router-dom";
// import { FiMenu} from "react-icons/fi";
// import logo from "../assets/awscommunitylogo.png";


// const AdminLayout = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const navigate = useNavigate();

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };
//   // const toggleSidebar = useCallback(() => {
//   //   setIsSidebarOpen((prev) => !prev);
//   // }, []);


//   console.log("AdminLayout Rendered"); // Debugging log

//   return (
//     <div className="">
    
//        <nav className={`navbar navbar-expand-lg header-top position-fixed w-100`}  style={{ zIndex: "9999", top: 0, left: 0 }}>
//              <div className="container-fluid mx-sm-4 mx-5 text-white " >
//               <div className="d-flex justify-content-between">
//                 <div className="d-flex">
//                <p className="fs-4 cursor-pointer hover:text-purple-500 transition-colors duration-300" onClick={() => navigate("/adminblogs")}>
//                  <img src={logo} alt="logo" className="w-50" />
//                </p>
     
//                <button className="btn text-white" onClick={toggleSidebar}>
//                  {isSidebarOpen ? <FiMenu size={24} /> : <FiMenu size={24} />}
//                </button>
//                </div>
               
//               <div className="d-flex g-0 align-items-center">
//               <p className="fs-4 cursor-pointer hover:text-purple-500 transition-colors duration-300" onClick={() => navigate("/adminblogs")}>
//                  <img src={logo} alt="logo" className="w-50" />
//                </p>
//                <h5>Cloud Community</h5>
//               </div>
                
//              </div>
//                </div>
//                 <div className={`sidebar bg-white  ${isSidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
//                        <ul className="list-unstyled px-3 mt-5"> {/* Add margin-top to avoid navbar overlap */}
//                          <li className="py-2"><Link to="/admin/admindashboard" className=" text-decoration-none">Home</Link></li>
//                          <li className="py-2"><Link to="/admin/admindashboard/sections" className=" text-decoration-none">Sections</Link></li>
//                          <li className="py-2"><Link to="/admin/admindashboard/team" className=" text-decoration-none">Team</Link></li>
//                          <li className="py-2"><Link to="/admin/admindashboard/events" className=" text-decoration-none">Events</Link></li>
//                        </ul>
//                      </div>
     
//            </nav>

//       {/* Page Content */}
//       <div className={`content-container ${isSidebarOpen ? "content-expanded" : "content-collapsed"}`}>
//         <Outlet /> {/* Dynamic content loads here based on the route */}
//         {/* <h2>Welcome to Admin Dashboard</h2> */}
//       </div>
//     </div>
//   );
// };

// export default AdminLayout;


import React, { useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import logo from "../assets/awscommunitylogo.png";
import { handleSuccess } from "../utils";
const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const handleSignOut = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("loggedInUser");
      localStorage.removeItem("role");
      handleSuccess("User Logged out");
      navigate("/home");
    };

  return (
    <div>
      {/* Top Navbar */}
      <nav
        className="navbar navbar-expand-lg header-top position-fixed w-100  text-white"
        style={{ zIndex: 9999, top: 0, left: 0 }}
      >
        <div className="container-fluid mx-sm-4 mx-3 d-flex justify-content-between align-items-center">
          {/* Left Section: Logo & Hamburger Icon */}
          <div className="d-flex align-items-center">
            <p
              className="fs-4 cursor-pointer hover:text-purple-500 transition-colors duration-300 m-0"
             
            >
              <img src={logo} alt="logo" className="w-50" />
            </p>
            <button className="btn text-white " onClick={toggleSidebar}>
              <FiMenu size={24} />
            </button>
          </div>

          {/* Right Section: Cloud Community & Another Logo */}
          <div className="d-flex align-items-center ms-auto">
           
            <p
              className="fs-4 cursor-pointer hover:text-purple-500 transition-colors duration-300 m-0"
         
            >
              <img src={logo} alt="logo" className="w-50" />
            </p>
            <h5 className="ms-0  " style={{cursor:"pointer"}}  onClick={toggleDropdown}>Cloud Community</h5>
            {isDropdownOpen && (
                <div className="dropdown-menu show position-absolute end-0 bg-white shadow rounded"  style={{ transform: "translateY(75px)", zIndex: 1050 }}>
                  <Link className="dropdown-item" to="/admin/profile">
                    My Profile
                  </Link>
                  <Link className="dropdown-item" to="/admin/settings">
                    Account Settings
                  </Link>
                  <button className="dropdown-item text-danger" onClick={handleSignOut}>
                    Sign Out
                  </button>
                </div>
              )}
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <div className={`sidebar bg-white ${isSidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
        <ul className="list-unstyled px-3 mt-5">
          <li className="py-2">
            <Link to="/admin/admindashboard" className="text-decoration-none">
              Home
            </Link>
          </li>
          <li className="py-2">
            <Link to="/admin/admindashboard/sections" className="text-decoration-none">
              Sections
            </Link>
          </li>
          <li className="py-2">
            <Link to="/admin/admindashboard/team" className="text-decoration-none">
              Team
            </Link>
          </li>
          <li className="py-2">
            <Link to="/admin/admindashboard/events" className="text-decoration-none">
              Events
            </Link>
          </li>
        </ul>
      </div>
 
           {/* Page Content */}
      <div className={`content-container ${isSidebarOpen ? "content-expanded" : "content-collapsed"}`}>
        <Outlet /> {/* Dynamic content loads here based on the route */}
         {/* <h2>Welcome to Admin Dashboard</h2> */}
       </div> 
    </div>
  );
};

export default AdminLayout;
