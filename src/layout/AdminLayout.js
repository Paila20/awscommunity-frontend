



import React, { useState, useEffect } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { FiMenu } from "react-icons/fi";
import logo from "../assets/awscommunitylogo.png";
import { handleSuccess } from "../utils";


const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 991);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 991);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
 
  setIsDropdownOpen(false);
}, [location.pathname]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 991);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

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
      <nav className="navbar navbar-expand-lg header-top position-fixed w-100 text-white " style={{ zIndex: 9999, top: 0 }}>
        <div className="container-fluid d-flex align-items-center justify-content-between">
          {/* Logo */}
          <img src={logo} alt="logo" style={{ width: "100px", height: "auto" }} />

          {/* Right content */}
          <div className="d-flex align-items-center gap-3">
            {/* Cloud Community - hidden on small screens */}
            <div className="d-none d-lg-flex align-items-center gap-2 position-relative">
              <img src={logo} alt="logo" style={{ width: "100px", height: "auto" }} />
              <h5 className="m-0" style={{ cursor: "pointer" }} onClick={toggleDropdown}>Cloud Community</h5>
              {isDropdownOpen && (
                <div className="dropdown-menu show position-absolute end-0 bg-white shadow rounded" style={{ transform: "translateY(75px)", zIndex: 1050 }}>
                  <Link className="dropdown-item" to="/admin/profile">My Profile</Link>
                  <Link className="dropdown-item" to="/admin/settings">Account Settings</Link>
                  <button className="dropdown-item text-danger" onClick={handleSignOut}>Sign Out</button>
                </div>
              )}
            </div>

          

           {/* Hamburger Icon – position depends on screen size */}
{isMobile ? (
  // Right aligned for mobile
  <button className="btn text-white" onClick={toggleSidebar} aria-label="Toggle sidebar">
    <FiMenu size={24} />
  </button>
) : (
  // Left aligned for large screens
  <div className="position-absolute" style={{ left: "220px", top: "50%", transform: "translateY(-50%)" }}>
    <button className="btn text-white" onClick={toggleSidebar} aria-label="Toggle sidebar">
      <FiMenu size={24} />
    </button>
  </div>
)}

          </div>
        </div>
      </nav>

      {/* Mobile Backdrop */}
      {isSidebarOpen && isMobile && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-white bg-opacity-50"
          style={{ zIndex: 1040 }}
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div className={`sidebar bg-white ${isSidebarOpen ? "sidebar-open" : "sidebar-closed"} ${isMobile ? "sidebar-mobile" : ""}`}>
        <ul className="list-unstyled px-3 mt-5">
          <li className="py-2"><Link to="/admin/admindashboard" className="text-decoration-none" 
          // onClick={() => {setIsSidebarOpen(false)}}
           onClick={() => {
    console.log("Navigating to sections");
    setIsSidebarOpen(false);
  }}>Home</Link></li>
          <li className="py-2"><Link to="/admin/admindashboard/sections" className="text-decoration-none" onClick={() => setIsSidebarOpen(false)}>Sections</Link></li>
          <li className="py-2"><Link to="/admin/admindashboard/team" className="text-decoration-none" onClick={() => setIsSidebarOpen(false)}>Team</Link></li>
          <li className="py-2"><Link to="/admin/admindashboard/events" className="text-decoration-none" onClick={() => setIsSidebarOpen(false)}>Events</Link></li>
        </ul>
      </div>

      {/* Page Content */}
      <div className={`content-container ${isSidebarOpen && !isMobile ? "content-expanded" : ""}`}>
        <Outlet  context={{ isSidebarOpen }}/>
      </div>
    </div>
  );
};

export default AdminLayout;
