
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSection } from "../context/SectionContext";
import Navbar from "./Navbar";
import DOMPurify from "dompurify";
import { useBlog } from "../context/BlogContext";

const SectionDetailsPage = () => {
  const { id } = useParams();
  const { sections } = useSection();
  const { submitContactForm, loading, message } = useBlog();
  const [section, setSection] = useState(null);
  const role = localStorage.getItem("role")

  useEffect(() => {
    const selectedSection = sections.find((sec) => sec._id === id);
    setSection(selectedSection);
       // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, sections]);

  // ✅ Ensure useState hooks are always called
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNo: "",
    city: "",
    interestedIn: "",
    WorkingAs: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Invalid email format";
    if (!/^\d{10}$/.test(formData.phoneNo))
      newErrors.phoneNo = "Phone number must be 10 digits";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.interestedIn) newErrors.interestedIn = "Please select an option";
    if (!formData.WorkingAs) newErrors.WorkingAs = "Please select an option";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    await submitContactForm(formData);
    setFormData({
      name: "",
      email: "",
      phoneNo: "",
      city: "",
      interestedIn: "",
      WorkingAs: "",
      message: "",
    });
  };

  return (
    <>{role === "admin" ?(
    
      < div id="about" className="contact section-show admin">
        <div className="container">
          <div className="section-title">
            <h2>{section?.name || "Loading..."}</h2>
            <div className="d-flex justify-content-between">
              <p>{section?.title || ""}</p>
            </div>
          </div>

          {section ? (
            <>
              <div
                className="content"
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(section.description) }}
              />
              {section.attachForm && (
                 <form onSubmit={handleSubmit} className="contact-form mt-4 px-4">
                 <div className="row">
                   <div className="col-md-6 form-group">
                     <input
                       type="text"
                
                       className={`form-control ${errors.name ? "border-danger" : ""}`}
                       name="name"
                       placeholder="Your Name"
                       maxLength="50"
                       value={formData.name}
                       onChange={handleChange}
                       
                     />
                       {errors.name && <small className="text-danger">{errors.name}</small>}
                   </div>
                   <div className="col-md-6 form-group mt-3 mt-md-0">
                     <input
                       type="email"
                       className={`form-control ${errors.email ? "border-danger" : ""}`}
                       name="email"
                       placeholder="Your Email"
                       maxLength="50"
                       value={formData.email}
                       onChange={handleChange}
                       
                     />
                 {errors.email && <small className="text-danger">{errors.email}</small>}
                   </div>
                 </div>
   
                 <div className="row mt-3">
                   <div className="col-md-6 form-group">
                     <input
                       type="tel"
                       className={`form-control ${errors.phoneNo ? "border-danger" : ""}`}
                       name="phoneNo"
                       placeholder="Your Phone No."
                       maxLength="10"
                       pattern="[0-9]{10}"
                       value={formData.phoneNo}
                       onChange={handleChange}
                       
                     />
                       {errors.phoneNo && <small className="text-danger">{errors.phoneNo}</small>}
                   </div>
                   <div className="col-md-6 form-group mt-3 mt-md-0">
                     <input
                       type="text"
                       className={`form-control ${errors.city ? "border-danger" : ""}`}
                       name="city"
                       placeholder="Your City"
                       maxLength="50"
                       value={formData.city}
                       onChange={handleChange}
                       
                     />
             {errors.city && <small className="text-danger">{errors.city}</small>}
                   </div>
                 </div>
   
                 <div className="row mt-3">
                   <div className="col-md-6 form-group">
                     <select
                         className={`form-control ${errors.interestedIn ? "border-danger" : ""}`}
                       name="interestedIn"
                       value={formData.interestedIn}
                       onChange={handleChange}
                       
                     >
                       <option value="">-- Interested In --</option>
                       <option value="Volunteer">Volunteer</option>
                       <option value="Speaker">Speaker</option>
                       <option value="Free Consultation">Free Consultation</option>
                       <option value="Other">Other</option>
                     </select>
                     {errors.interestedIn && <small className="text-danger">{errors.interestedIn}</small>}
                   </div>
                   <div className="col-md-6 form-group">
                     <select
                        className={`form-control ${errors.WorkingAs ? "border-danger" : ""}`}
                       name="WorkingAs"
                       value={formData.WorkingAs}
                       onChange={handleChange}
                       
                     >
                       <option value="">-- Working As --</option>
                       <option value="Student">Student</option>
                       <option value="IT">IT</option>
                       <option value="Faculty">Faculty</option>
                       <option value="Others">Others</option>
                     </select>
                     {errors.WorkingAs && <small className="text-danger">{errors.WorkingAs}</small>}
                   </div>
                 </div>
   
                 <div className="form-group mt-3">
                   <textarea
                       className={`form-control ${errors.message ? "border-danger" : ""}`}
                     rows="5"
                     name="message"
                     placeholder="Your message here"
                     maxLength="500"
                     value={formData.message}
                     onChange={handleChange}
                     
                   ></textarea>
                     {errors.message && <small className="text-danger">{errors.message}</small>}
                 </div>
   
                 <div className="text-center mt-3">
                   <button type="submit" className="btn btn-primary">
                     Submit
                   </button>
                 </div>
                 
               </form>
              )}
            </>
          ) : (
            <p>Loading section details...</p>
          )}
        </div>
      </div>
    ):
      (
        <>
        <Navbar />
        <section id="about" className="contact section-show">
          <div className="container">
            <div className="section-title">
              <h2>{section?.name || "Loading..."}</h2>
              <div className="d-flex justify-content-between">
                <p>{section?.title || ""}</p>
              </div>
            </div>
  
            {section ? (
              <>
                <div
                  className="content"
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(section.description) }}
                />
                {section.attachForm && (
                   <form onSubmit={handleSubmit} className="contact-form mt-4 px-4">
                   <div className="row">
                     <div className="col-md-6 form-group">
                       <input
                         type="text"
                  
                         className={`form-control ${errors.name ? "border-danger" : ""}`}
                         name="name"
                         placeholder="Your Name"
                         maxLength="50"
                         value={formData.name}
                         onChange={handleChange}
                         
                       />
                         {errors.name && <small className="text-danger">{errors.name}</small>}
                     </div>
                     <div className="col-md-6 form-group mt-3 mt-md-0">
                       <input
                         type="email"
                         className={`form-control ${errors.email ? "border-danger" : ""}`}
                         name="email"
                         placeholder="Your Email"
                         maxLength="50"
                         value={formData.email}
                         onChange={handleChange}
                         
                       />
                   {errors.email && <small className="text-danger">{errors.email}</small>}
                     </div>
                   </div>
     
                   <div className="row mt-3">
                     <div className="col-md-6 form-group">
                       <input
                         type="tel"
                         className={`form-control ${errors.phoneNo ? "border-danger" : ""}`}
                         name="phoneNo"
                         placeholder="Your Phone No."
                         maxLength="10"
                         pattern="[0-9]{10}"
                         value={formData.phoneNo}
                         onChange={handleChange}
                         
                       />
                         {errors.phoneNo && <small className="text-danger">{errors.phoneNo}</small>}
                     </div>
                     <div className="col-md-6 form-group mt-3 mt-md-0">
                       <input
                         type="text"
                         className={`form-control ${errors.city ? "border-danger" : ""}`}
                         name="city"
                         placeholder="Your City"
                         maxLength="50"
                         value={formData.city}
                         onChange={handleChange}
                         
                       />
               {errors.city && <small className="text-danger">{errors.city}</small>}
                     </div>
                   </div>
     
                   <div className="row mt-3">
                     <div className="col-md-6 form-group">
                       <select
                           className={`form-control ${errors.interestedIn ? "border-danger" : ""}`}
                         name="interestedIn"
                         value={formData.interestedIn}
                         onChange={handleChange}
                         
                       >
                         <option value="">-- Interested In --</option>
                         <option value="Volunteer">Volunteer</option>
                         <option value="Speaker">Speaker</option>
                         <option value="Free Consultation">Free Consultation</option>
                         <option value="Other">Other</option>
                       </select>
                       {errors.interestedIn && <small className="text-danger">{errors.interestedIn}</small>}
                     </div>
                     <div className="col-md-6 form-group">
                       <select
                          className={`form-control ${errors.WorkingAs ? "border-danger" : ""}`}
                         name="WorkingAs"
                         value={formData.WorkingAs}
                         onChange={handleChange}
                         
                       >
                         <option value="">-- Working As --</option>
                         <option value="Student">Student</option>
                         <option value="IT">IT</option>
                         <option value="Faculty">Faculty</option>
                         <option value="Others">Others</option>
                       </select>
                       {errors.WorkingAs && <small className="text-danger">{errors.WorkingAs}</small>}
                     </div>
                   </div>
     
                   <div className="form-group mt-3">
                     <textarea
                         className={`form-control ${errors.message ? "border-danger" : ""}`}
                       rows="5"
                       name="message"
                       placeholder="Your message here"
                       maxLength="500"
                       value={formData.message}
                       onChange={handleChange}
                       
                     ></textarea>
                       {errors.message && <small className="text-danger">{errors.message}</small>}
                   </div>
     
                   <div className="text-center mt-3">
                     <button type="submit" className="btn btn-primary">
                       Submit
                     </button>
                   </div>
                   
                 </form>
                )}
              </>
            ) : (
              <p>Loading section details...</p>
            )}
          </div>
        </section>
        </>
    )}
     
    </>
  );
};

export default SectionDetailsPage;
