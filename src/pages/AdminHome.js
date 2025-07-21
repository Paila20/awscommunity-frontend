

import React from "react";


import { useHome } from "../context/HomeContext";
import { useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";
import { useOutletContext } from "react-router-dom";
 



const Home = () => {
  const navigate = useNavigate();
 const { isSidebarOpen } = useOutletContext();
  const { homeData, loading } = useHome();
  
  if (loading) return (
    <div  className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh"   , width: isSidebarOpen ? "calc(100vw - 250px)" : "100vw", }}>
      <p className="">Loading...</p> 
    </div>
     
 
  )
 

  return (
    <div className=" container-fluid "  style={{
      backgroundImage: `url(${homeData.banner})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
        // backgroundPosition: "center",
      // backgroundAttachment: "fixed",
      height: "100vh",
      // height: isSidebarOpen ? "calc(100vh - 250px)" : "100vh",
      width: isSidebarOpen ? "calc(100vw - 250px)" : "100vw",
      // width: "100vw",
      transition: "width 0.3s ease",
      overflow: "hidden" ,
      // paddingBottom: "70px" 
    
    }}>
    
      {/* Header Section */}
      <header className="header ps-md-5 ps-2  " >
   
        <div className="" >
        <button style={{  marginBottom: "10px",
  padding: "5px 15px",
  background: "#FFC107",
  color: "black",
  borderRadius: "5px",
  border: "none",
  cursor: "pointer", }}   onClick={() => navigate("/admin/admindashboard/home/edit")}>Edit</button>
          <h1 className="">
            <img src={homeData?.logo} alt="logo"  className=""
             style={{
      maxHeight: "100px",
      // width: "100%",
      maxWidth: "200px",
      height: "auto",
      objectFit: "contain"
    }}/>
          </h1>
         

        

          {/* Navbar */}
          
          
           
            {/* {homeData.description} */}
             <h2 className="fs-4 fs-md-3"
                            
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(homeData?.description) }}
                          />

          
          
         
        </div>
      </header>

    </div>
  );
};

export default Home;
