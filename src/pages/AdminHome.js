

import React from "react";


import { useHome } from "../context/HomeContext";
import { useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";
 



const Home = () => {
  const navigate = useNavigate();
 
  const { homeData, loading } = useHome();
  
  if (loading) return <p>Loading...</p>;

  return (
    <div className="position-relative"  style={{
      backgroundImage: `url(${homeData.banner})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      minHeight: "100vh",
    }}>
    
      {/* Header Section */}
      <header className="header " >
   
        <div className="container">
        <button style={{  marginBottom: "10px",
  padding: "5px 15px",
  background: "#FFC107",
  color: "black",
  borderRadius: "5px",
  border: "none",
  cursor: "pointer", }}   onClick={() => navigate("/admin/admindashboard/home/edit")}>Edit</button>
          <h1 className="mt-5">
            <img src={homeData.logo} alt="logo" />
          </h1>
         

        

          {/* Navbar */}
          
          
           
            {/* {homeData.description} */}
             <div
                            
                            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(homeData.description) }}
                          />

          
          
         
        </div>
      </header>

    </div>
  );
};

export default Home;
