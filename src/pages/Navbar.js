



import React, { useState, useEffect } from "react";

import { FiMenu, FiX } from "react-icons/fi";
import { NavLink} from "react-router-dom";
import { useSection } from "../context/SectionContext"; 

import logo from "../assets/awscommunitylogo.png";

const Navbar = () => {
  const [isToggled, setIsToggled] = useState(false);
  

  const { sections, fetchSections } = useSection(); 

  useEffect(() => {
    fetchSections();
        // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

 
  const handleNavLinkClick = () => {
    if (window.innerWidth < 992) setIsToggled(false);
  };
  
  const toggleNavbar = () => {
    setIsToggled(!isToggled);
  };

  return (
    <nav className={`navbar navbar-expand-lg px-5  ${isToggled ? "mobile-navbar1" : "header-top"}`}>
      <div className="container-fluid mx-sm-4 mx-5 px-5 text-white">
        <p className="fs-4 cursor-pointer hover:text-purple-500 transition-colors duration-300" >
          <img src={logo} alt="logo" className="w-50" />
        </p>

        <button className="d-lg-none mb-2" type="button" onClick={toggleNavbar}>
          {isToggled ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

        <div className={`collapse navbar-collapse ${isToggled ? "show" : ""}`} id="navbarNav">
          <ul className="navbar-nav ms-lg-auto align-items-center">
            <li className="nav-item cursor-pointer me-lg-3">
               <NavLink
                                    to="/home"
                                    className="nav-link text-white fs-6 px-0 me-2"
                                    onClick={handleNavLinkClick}
                                  >
                                    Home
                                  </NavLink>
            </li>

          
            {sections?.slice(0, 2).map((section) => (
    <li key={section._id} className="nav-item cursor-pointer">
      <NavLink
                             to={`/sections/details/${section._id}`}
                             className="nav-link text-white fs-6 px-0 mx-3"
                             onClick={handleNavLinkClick}
                           >
                             {section.name}
                           </NavLink>
    </li>
  ))}


            {/* Static Links - Team, Events, Join Us */}
            <li className="nav-item mx-lg-3 cursor-pointer">
               <NavLink
                                   to="/team"
                                   className="nav-link text-white fs-6 px-0 me-2"
                                   onClick={handleNavLinkClick}
                                 >
                                   Team
                                 </NavLink>
            </li>
            <li className="nav-item mx-lg-3 cursor-pointer">
                <NavLink
                                   to="/events"
                                   className="nav-link text-white fs-6 px-0 me-2"
                                   onClick={handleNavLinkClick}
                                 >
                                   Events
                                 </NavLink>
            </li>
            
            {sections?.slice(2).map((section) => (
    <li key={section._id} className="nav-item cursor-pointer">
     <NavLink
                             to={`/sections/details/${section._id}`}
                             className="nav-link text-white fs-6 px-0 me-2"
                             onClick={handleNavLinkClick}
                           >
                             {section.name}
                           </NavLink>
    </li>
  ))}

          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

