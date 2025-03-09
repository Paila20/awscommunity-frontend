

import React, { useState } from "react";
import logo from "../assets/awscommunitylogo.png";
import { FaUserCircle } from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { handleSuccess } from "../utils";

const Home = () => {
  const [isToggled, setIsToggled] = useState(false);
  const navigate = useNavigate();
  const role = localStorage.getItem("role")

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("role");
    handleSuccess("User Logged out");
    navigate("/login");
  };

  const toggleNavbar = () => {
    setIsToggled(!isToggled);
  };

  return (
    <div className="position-relative"  style={{
      backgroundImage: `url(${require('../assets/awsbackgroundimage.jpg')})`,
backgroundSize: "cover",
backgroundPosition: "center",
backgroundRepeat: "no-repeat",
    }}>
      {/* Header Section */}
      <header className="header">
        <div className="container">
          <h1>
            <img src={logo} alt="logo" />
          </h1>
         

          {/* Toggle Button (Visible Only on Small Screens) */}
          <button
            className="d-lg-none position-absolute"
            style={{ top: "10px", right: "10px", zIndex: 2000 }}
            onClick={toggleNavbar}
          >
            {isToggled ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>

          {/* Overlay with Black Background on Small Screens */}
          {isToggled && <div className="mobile-menu-overlay" onClick={toggleNavbar}></div>}

          {/* Navbar */}
          
          <h2>
            <span style={{ color: "rgb(236, 240, 241)" }}>
              Cloud Community Bharat: Soaring Together with{" "}
              <strong
                style={{
                  borderBottom: "2px solid #ffa31f",
                  paddingBottom: "6px",
                }}
              >
                AWS Excellence
              </strong>
            </span>
          </h2>
          {/* {
            role === "admin" ?(<></>):( */}

              <nav className={`navbar navbar-expand-lg   ${isToggled ? "mobile-navbar" : ""}`}>
            <div className="container-fluid text-white">
              <div className={`collapse navbar-collapse ${isToggled ? "show" : ""}`} id="navbarNav">
                <ul className="navbar-nav me-lg-auto align-items-center">
                  <li className="nav-item cursor-pointer me-lg-3 ">
                    <span className="nav-link text-white fs-6 px-0 me-2" onClick={() => navigate("/home")}>
                      Home
                    </span>
                  </li>

                  {/* Admin Dropdown */}
                  <li className="nav-item cursor-pointer">
                  <span className="nav-link text-white fs-6 px-0 me-2" onClick={() => navigate("/about")}>
                      About
                    </span>
                  </li>

                  {/* Editor Dropdown */}
                  <li className="nav-item mx-lg-3 cursor-pointer">
                  <span className="nav-link text-white fs-6 px-0 me-2" onClick={() => navigate("/learning")}>
                      Learning
                    </span>
                  </li>

                  {/* User Profile */}
                  <li className="nav-item mx-lg-3 cursor-pointer">
                  <span className="nav-link text-white fs-6 px-0 me-2" onClick={() => navigate("/team")}>
                      Team
                    </span>
                  </li>
                  <li className="nav-item mx-lg-3 cursor-pointer">
                  <span className="nav-link text-white fs-6 px-0 me-2" onClick={() => navigate("/events")}>
                      Events
                    </span>
                  </li>

                  {/* Logout Button */}
                  <li className="nav-item cursor-pointer">
                  <span className="nav-link text-white fs-6 px-0 me-2" onClick={() => navigate("/joinus")}>
                      Join Us
                    </span>
                   </li>
                  
                </ul>
              </div>
            </div>
          </nav>
            {/* )
          }  */}
          
         
        </div>
      </header>

      {/* CSS for Overlay and Navbar Mobile View */}
      <style>
        {`
          /* Black Overlay when Navbar is Open */
          .mobile-menu-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            z-index: 999;
            visibility: visible;
            opacity: 1;
            transition: opacity 0.3s ease-in-out;
          }

          /* Navbar in Mobile Mode */
          .mobile-navbar {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: auto;
            background: black;
            z-index: 1000;
            padding-top: 60px;
          }
          
          /* Ensure navbar items are centered */
          .mobile-navbar .navbar-nav {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
        `}
      </style>
    </div>
  );
};

export default Home;

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import logo from "../assets/awscommunitylogo.png";
// import { FiMenu, FiX } from "react-icons/fi";
// import { handleSuccess } from "../utils";

// const Home = () => {
//   const [isToggled, setIsToggled] = useState(false);
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");
//   const loggedInUser = localStorage.getItem("loggedInUser");

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("loggedInUser");
//     localStorage.removeItem("role");
//     handleSuccess("User Logged out");
//     navigate("/login");
//   };

//   return (
//     <div className="position-relative">
//       {/* Header Section */}
//       <header className="header">
//         <div className="container d-flex justify-content-between align-items-center">
//           {/* Logo */}
//           <h1>
//             <img src={logo} alt="logo" />
//           </h1>

//           {/* Navbar Toggle Button */}
//           <button
//             className="d-lg-none position-absolute"
//             style={{ top: "10px", right: "10px", zIndex: 2000 }}
//             onClick={() => setIsToggled(!isToggled)}
//           >
//             {isToggled ? <FiX size={24} /> : <FiMenu size={24} />}
//           </button>

//           {/* Mobile Overlay */}
//           {isToggled && <div className="mobile-menu-overlay" onClick={() => setIsToggled(false)}></div>}

//           {/* Navbar */}
//           <nav className={`navbar navbar-expand-lg ${isToggled ? "mobile-navbar" : ""}`}>
//             <div className="container-fluid">
//               <div className={`collapse navbar-collapse ${isToggled ? "show" : ""}`} id="navbarNav">
//                 <ul className="navbar-nav me-lg-auto align-items-center">
//                   {["Home", "About", "Learning", "Team", "Events", "Join Us"].map((item, index) => (
//                     <li key={index} className="nav-item cursor-pointer mx-lg-3">
//                       <span className="nav-link text-white fs-6 px-0 me-2" onClick={() => navigate(`/${item.toLowerCase()}`)}>
//                         {item}
//                       </span>
//                     </li>
//                   ))}

//                   {/* Dashboard & Logout */}
//                   {token ? (
//                     <li className="nav-item mx-lg-3 cursor-pointer position-relative">
//                       <div className="dropdown">
//                         <button className="dropdown-toggle" type="button" data-bs-toggle="dropdown">
//                           Dashboard
//                         </button>
//                         <ul className="dropdown-menu custom-dropdown">
//                           <li>
//                             <span className="dropdown-item">{loggedInUser}</span>
//                           </li>
//                           <li>
//                             <button className="dropdown-item text-danger" onClick={handleLogout}>
//                               Logout
//                             </button>
//                           </li>
//                         </ul>
//                       </div>
//                     </li>
//                   ) : (
//                     <li className="nav-item cursor-pointer ms-lg-4">
//                       <span className="nav-link text-white fs-6 px-0 me-2" onClick={() => navigate("/login")}>
//                         Login
//                       </span>
//                     </li>
//                   )}
//                 </ul>
//               </div>
//             </div>
//           </nav>
//         </div>
//       </header>

//       {/* External CSS for Overlay and Navbar Mobile View */}
//       <style>
//         {`
//           .mobile-menu-overlay {
//             position: fixed;
//             top: 0;
//             left: 0;
//             width: 100%;
//             height: 100%;
//             background: rgba(0, 0, 0, 0.9);
//             z-index: 999;
//             transition: opacity 0.3s ease-in-out;
//           }

//           .mobile-navbar {
//             position: fixed;
//             top: 0;
//             left: 0;
//             width: 100%;
//             height: auto;
//             background: black;
//             z-index: 1000;
//             padding-top: 60px;
//           }

//           .mobile-navbar .navbar-nav {
//             display: flex;
//             flex-direction: column;
//             align-items: center;
//           }
//         `}
//       </style>
//     </div>
//   );
// };

// export default Home;
