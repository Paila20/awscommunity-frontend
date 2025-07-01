import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useHome } from "../context/HomeContext";
import { Editor } from "@tinymce/tinymce-react";

const HomeEdit = () => {
  const { homeData,updateHomeData } = useHome();
  const navigate = useNavigate();
  useEffect(() => {
    setFormData({
      logo: homeData?.logo || "",
      description: homeData?.description || "",
      banner: homeData?.banner || "",
    });
  }, [homeData]);
  // State for form data
  const [formData, setFormData] = useState({
    logo: homeData?.logo||"",
    description: homeData?.description||"",
    banner: homeData?.banner||"",
  });
  // Handle input changes
//   const handleChange = (e) => {
//     const { name, value, files } = e.target;

//     if (name === "banner" || name === "logo") {
//       const file = files[0];
//       setFormData({ ...formData, [name]: URL.createObjectURL(file) });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
  
    if (files && files[0]) {
      const file = files[0];
      setFormData((prev) => ({
        ...prev,
        [name]: file, // Store file for FormData
        [`${name}Preview`]: URL.createObjectURL(file), // Store preview URL for display
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  
  // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setHomeData(formData); // Update context data
//     navigate("/admin/admindashboard"); // Redirect back to Home page
//   };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();

    formDataToSend.append("description", formData.description);
    if (formData.logo instanceof File) formDataToSend.append("logo", formData.logo);
    if (formData.banner instanceof File) formDataToSend.append("banner", formData.banner);

    try {
      await updateHomeData(homeData._id, formDataToSend);
      navigate("/admin/admindashboard"); // Redirect back to admin dashboard
    } catch (err) {
      console.error("Failed to update home data:", err);
    }
  };

  return (
    <div className=" mt-5 pt-5 w-75 ps-5 align-items-start">

      <form onSubmit={handleSubmit} className="pt-3">

        {/* Logo Upload */}
        <div className="d-flex flex-column "> 
        <label>Banner Image:</label>
        <input type="file" name="banner" onChange={handleChange} className="border"/>
        <div  className="d-flex flex-column justify-content-center align-items-center">
            <p>Selected image is showing below</p>
        <img src={formData.bannerPreview || homeData?.banner}
        // src={formData?.banner} 
        alt="Banner Preview" width="200" />
        </div>
        </div>
        <div className="d-flex flex-column "> 
        <label>Logo Image:</label>
        <input type="file" name="logo" onChange={handleChange} className="w-100 border"/>
        <div  className="d-flex flex-column justify-content-center align-items-center">
        <p>Selected image is showing below</p>
        <img src={formData.logoPreview || homeData?.logo}
        // src={formData?.logo}
         alt="Logo Preview" width="150" height="75"/>
        </div>
        </div>

        {/* Description */}
        <div className="d-flex flex-column ">
        <label>Title:</label>
         <Editor
                  apiKey="cdkybh72b806yb8kb8ye2g3x72km1gswc3ceh8yisls29vx9" // Replace with your TinyMCE API key if needed
                  value={formData.description}
                 
                  init={{
                    height: 260,
                    plugins: [
                        "lists", "link", "image", "media", "table", "code", "codesample", "emoticons", "charmap", "searchreplace", "wordcount"
                      ],
                      toolbar: "undo redo | formatselect | bold italic underline | alignleft aligncenter alignright | bullist numlist outdent indent | link image media | codesample | code | emoticons charmap | removeformat",
                codesample_languages: [
                  { text: "JavaScript", value: "javascript" },
                  { text: "HTML", value: "html" },
                  { text: "CSS", value: "css" },
                  { text: "Python", value: "python" },
                ],
                tinycomments_mode: 'embedded',
                tinycomments_author: 'Author name',
                mergetags_list: [
                  { value: 'First.Name', title: 'First Name' },
                  { value: 'Email', title: 'Email' },
                ],
                ai_request: (request, respondWith) => respondWith.string(() => Promise.reject('See docs to implement AI Assistant')),
              }}
                  onEditorChange={(content) =>
                    handleChange({ target: { name: "description", value: content } })
                  }
                />
      
        </div>

    
       

        <br />
        <div className="d-flex align-items-center justify-content-center">
        <button type="submit" style={buttonStyle}>
          Submit
        </button>
        <button type="button" style={backbuttonStyle} onClick={()=>{  navigate("/admin/admindashboard"); }}>
          Back
        </button>
        </div>
      </form>
    </div>
  );
};

export default HomeEdit;

const buttonStyle = {  padding: "5px", backgroundColor: "green", color: "white", border: "none", borderRadius: "4px" };
const backbuttonStyle = {  padding: "5px 7px", backgroundColor: "gray", color: "white", border: "none", borderRadius: "4px" ,marginLeft:"5px"};