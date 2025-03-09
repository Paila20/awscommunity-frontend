


   
// import React, { useState } from "react";
// import { FaUserCircle } from "react-icons/fa";
// import { FiMenu, FiX } from "react-icons/fi";
// import { useNavigate,Link } from "react-router-dom";
// import { handleSuccess } from "../utils";
// import logo from "../assets/awscommunitylogo.png";

// const Navbar = () => {
//   const [isToggled, setIsToggled] = useState(false);
//   const userRole = localStorage.getItem("role");
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
//     const toggleSidebar = () => {
//       setIsSidebarOpen(!isSidebarOpen);
//     };
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("loggedInUser");
//     localStorage.removeItem("role");
//     handleSuccess("User Logged out");
//     navigate("/home");
//   };

//   const toggleNavbar = () => {
//     setIsToggled(!isToggled);
//   };

//   return (
//     <div>
//       {/* Sidebar for Admins */}
//       {userRole === "admin" ? (
        
     
//         <></>
        
//       ) : (
//         // Navbar for Regular Users
//         <nav className={`navbar navbar-expand-lg ${isToggled ? "mobile-navbar1" : "header-top"}`}>
//           <div className="container-fluid mx-sm-4 mx-2 text-white">
//             <p className="fs-4 cursor-pointer hover:text-purple-500 transition-colors duration-300" onClick={() => navigate("/adminblogs")}>
//               <img src={logo} alt="logo" className="w-50" />
//             </p>

//             <button className="d-lg-none mb-2" type="button" onClick={toggleNavbar}>
//               {isToggled ? <FiX size={24} /> : <FiMenu size={24} />}
//             </button>

//             <div className={`collapse navbar-collapse ${isToggled ? "show" : ""}`} id="navbarNav">
//               <ul className="navbar-nav ms-lg-auto align-items-center">
//                 <li className="nav-item cursor-pointer me-lg-3">
//                   <span className="nav-link text-white fs-6 px-0 me-2" onClick={() => navigate("/home")}>Home</span>
//                 </li>
//                 <li className="nav-item cursor-pointer">
//                   <span className="nav-link text-white fs-6 px-0 me-2" onClick={() => navigate(`/sections/details/${section?._id}`)}>About</span>
//                 </li>
//                 <li className="nav-item cursor-pointer">
//                   <span className="nav-link text-white fs-6 px-0 me-2" onClick={() => navigate(`/sections/details/${section?._id}`)}>Learning</span>
//                 </li>
//                 <li className="nav-item cursor-pointer">
//                   <span className="nav-link text-white fs-6 px-0 me-2" onClick={() => navigate("/team")}>Team</span>
//                 </li>
//                 <li className="nav-item cursor-pointer">
//                   <span className="nav-link text-white fs-6 px-0 me-2" onClick={() => navigate("/events")}>Events</span>
//                 </li>
//                 <li className="nav-item cursor-pointer">
//                   <span className="nav-link text-white fs-6 px-0 me-2" onClick={() => navigate(`/sections/details/${section?._id}`)}>Join us</span>
//                 </li>
             
//               </ul>
//             </div>
//           </div>
//         </nav>
//       )}
//     </div>
//   );
// };

// export default Navbar;

import React, { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useSection } from "../context/SectionContext"; // Import the section context
import { handleSuccess } from "../utils";
import logo from "../assets/awscommunitylogo.png";

const Navbar = () => {
  const [isToggled, setIsToggled] = useState(false);
  const navigate = useNavigate();
  const userRole = localStorage.getItem("role");
  const { sections, fetchSections } = useSection(); // Fetch sections from context

  useEffect(() => {
    fetchSections();
        // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("role");
    handleSuccess("User Logged out");
    navigate("/home");
  };

  const toggleNavbar = () => {
    setIsToggled(!isToggled);
  };

  return (
    <nav className={`navbar navbar-expand-lg ${isToggled ? "mobile-navbar1" : "header-top"}`}>
      <div className="container-fluid mx-sm-4 mx-2 text-white">
        <p className="fs-4 cursor-pointer hover:text-purple-500 transition-colors duration-300" onClick={() => navigate("/adminblogs")}>
          <img src={logo} alt="logo" className="w-50" />
        </p>

        <button className="d-lg-none mb-2" type="button" onClick={toggleNavbar}>
          {isToggled ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

        <div className={`collapse navbar-collapse ${isToggled ? "show" : ""}`} id="navbarNav">
          <ul className="navbar-nav ms-lg-auto align-items-center">
            <li className="nav-item cursor-pointer me-lg-3">
              <span className="nav-link text-white fs-6 px-0 me-2" onClick={() => navigate("/home")}>Home</span>
            </li>

            {/* Dynamically Render Sections from API */}
            {sections?.length > 0 ? (
              sections.map((section) => (
                <li key={section._id} className="nav-item cursor-pointer">
                  <span className="nav-link text-white fs-6 px-0 me-2" onClick={() => navigate(`/sections/details/${section._id}`)}>
                    {section.name}
                  </span>
                </li>
              ))
            ) : (
              <li className="nav-item cursor-pointer">
                <span className="nav-link text-white fs-6 px-0 me-2">Loading Sections...</span>
              </li>
            )}

            {/* Static Links - Team, Events, Join Us */}
            <li className="nav-item cursor-pointer">
              <span className="nav-link text-white fs-6 px-0 me-2" onClick={() => navigate("/team")}>Team</span>
            </li>
            <li className="nav-item cursor-pointer">
              <span className="nav-link text-white fs-6 px-0 me-2" onClick={() => navigate("/events")}>Events</span>
            </li>
            <li className="nav-item cursor-pointer">
              <span className="nav-link text-white fs-6 px-0 me-2" onClick={() => navigate("/joinus")}>Join Us</span>
            </li>

            {/* Logout Button */}
           
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

