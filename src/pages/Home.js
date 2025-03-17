

import React, { useState,useEffect } from "react";

import { useSection } from "../context/SectionContext"; 
import { FiMenu, FiX } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { useHome } from "../context/HomeContext";
import DOMPurify from "dompurify";


const Home = () => {
    const { homeData={} } = useHome();
  const [isToggled, setIsToggled] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const { sections=[], fetchSections } = useSection(); 
  // const role = localStorage.getItem("role")
  useEffect(() => {
    if (homeData?.logo) {
      const img = new Image();
      img.src = homeData.logo;
      img.onload = () => setIsLoaded(true);
    }
  }, [homeData]);

   useEffect(() => {
      fetchSections();
          // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

  

  const toggleNavbar = () => {
    setIsToggled(!isToggled);
  };

  if (!isLoaded) return null;

  return (
    <div className="position-relative" >
      {/* Header Section */}
      <header className="header">
        <div className="container">
          <div>
          <h1>
            <img src={homeData?.logo} alt="logo" />
          </h1>
          <h2 className="pt-0" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(homeData?.description) }}
                          />
          </div>
         

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

 

              <nav className={`navbar navbar-expand-lg   ${isToggled ? "mobile-navbar" : ""}`}>
            <div className="container-fluid text-white">
              <div className={`collapse navbar-collapse ${isToggled ? "show" : ""}`} id="navbarNav">
                <ul className="navbar-nav me-lg-auto align-items-center">
                  <li className="nav-item cursor-pointer me-lg-3 ">
                    {/* <span className="nav-link text-white fs-6 px-0 me-2" onClick={() => navigate("/home")}>
                      Home
                    </span> */}
                    <NavLink
                      to="/home"
                      className="nav-link text-white fs-6 px-0 me-2"
                      onClick={toggleNavbar}
                    >
                      Home
                    </NavLink>
                  </li>
             
                  

                  {sections?.slice(0, 2).map((section) => (
    <li key={section._id} className="nav-item cursor-pointer">
      {/* <span
        className="nav-link text-white fs-6 px-0 mx-3"
        onClick={() => navigate(`/sections/details/${section._id}`)}
      >
        {section.name}
      </span> */}
       <NavLink
                        to={`/sections/details/${section._id}`}
                        className="nav-link text-white fs-6 px-0 mx-3"
                        onClick={toggleNavbar}
                      >
                        {section.name}
                      </NavLink>
    </li>
  ))}
                 
                  {/* User Profile */}
                  <li className="nav-item mx-lg-3 cursor-pointer">
                  <NavLink
                      to="/team"
                      className="nav-link text-white fs-6 px-0 me-2"
                      onClick={toggleNavbar}
                    >
                      Team
                    </NavLink>
                  </li>
                  <li className="nav-item mx-lg-3 cursor-pointer">
                  <NavLink
                      to="/events"
                      className="nav-link text-white fs-6 px-0 me-2"
                      onClick={toggleNavbar}
                    >
                      Events
                    </NavLink>
                  </li>

                  {sections?.slice(2).map((section) => (
    <li key={section._id} className="nav-item cursor-pointer">
      <NavLink
                        to={`/sections/details/${section._id}`}
                        className="nav-link text-white fs-6 px-0 me-2"
                        onClick={toggleNavbar}
                      >
                        {section.name}
                      </NavLink>
    </li>
  ))}
                  
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
