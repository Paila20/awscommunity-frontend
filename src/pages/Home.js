

import React, { useState,useEffect } from "react";

import { useSection } from "../context/SectionContext"; 
import { FiMenu, FiX } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { useHome } from "../context/HomeContext";
import DOMPurify from "dompurify";


const Home = () => {
    const { homeData } = useHome();
  const [isToggled, setIsToggled] = useState(false);


  const { sections, fetchSections, loading } = useSection(); 
 

   useEffect(() => {
      fetchSections();
          // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

  

  const toggleNavbar = () => {
    setIsToggled(!isToggled);
  };

  //  if (loading || !homeData) return (
  //   <div  className="d-flex justify-content-center align-items-center"
  //     style={{ height: "100vh"   , width: "100vw" }}>
  //     <p className="">Loading...</p> 
  //   </div>
     
 
  // )

if (loading || !homeData) {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh", width: "100vw" }} // Sky blue
    >
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}


  return (
    <div
    className="position-relative w-100 vh-100  d-flex align-items-center justify-content-center d-md-block"
    style={{
      backgroundImage: `url(${homeData?.banner})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
    
    
    >
      {/* Header Section */}
      <header className="header text-center text-lg-start gap-3">
        <div className="container">
          <div className="mx-auto d-flex flex-column align-items-sm-center justify-content-sm-center  align-items-lg-start justify-content-lg-start">
          <h1>
            <img src={homeData?.logo}  loading="lazy" alt="logo" />
          </h1>
          <h2>
          <p className="pt-2 fs-5 text-start  " dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(homeData?.description) }}
                          />
                          </h2>
          </div>
         

          {/* Toggle Button (Visible Only on Small Screens) */}
          <button
            className="d-lg-none position-absolute bg-transparent text-white border-0"
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
