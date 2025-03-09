



import React, { useState,useEffect } from "react";
import Navbar from "./Navbar";
import { useBlog } from "../context/BlogContext";
import { ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import { handleSuccess } from "../utils";

const JoinUS = () => {
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

  const { submitContactForm ,loading,message} = useBlog();

  const validate = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = "Invalid email format";
    if (!formData.phoneNo.match(/^\d{10}$/)) newErrors.phoneNo = "Phone number must be 10 digits";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.interestedIn) newErrors.interestedIn = "Please select an option";
    if (!formData.WorkingAs) newErrors.WorkingAs = "Please select an option";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // setErrors({ ...errors, [e.target.name]: "" });
    
  };

  

  


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    console.log("Submitting form...", formData);
    await submitContactForm(formData);
    console.log("Form submitted");
    setFormData({
      name: "",
      email: "",
      phoneNo: "",
      city: "",
      interestedIn: "",
      WorkingAs: "",
      message: "",
    });
    // setErrors({});
  };
  
  return (
    <>
      <Navbar />
      <section className="contact section-show">
        <div className="container">
          <div className="section-title">
            <h2>JOIN US</h2>
            <p>BY THE COMMUNITY, FOR THE COMMUNITY</p>
          </div>

          <div className="row">
            <div className="col-lg-12 pt-4 content aos-init aos-animate" data-aos="fade-left">
              <div className="row">
                <div className="col-md-6 mt-4 d-flex align-items-stretch">
                  <div className="info-box">
                    <h3>
                      <span style={{ color: "rgb(1, 58, 137)" }}>Volunteer</span>
                    </h3>
                    <p>
                    You can help us in managing the event in your college or city. We encourage you to become a part of this community where you will meet new people, get knowledge in cloud computing, and enhance your career in the cloud.
                    </p>
                  </div>
                </div>
                <div className="col-md-6 mt-4 d-flex align-items-stretch">
                  <div className="info-box">
                    <h3>
                      <span style={{ color: "rgb(1, 58, 137)" }}>Speaker</span>
                    </h3>
                    <p>
                    As a community speaker, you play a pivotal role in shaping the knowledge landscape of our vibrant community. Your expertise and insights are the guiding beacons that illuminate the path for all the members.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="row">
            <div className="subtitle-text text-center mt-4 col-lg-12">
              <h3>Are you interested in being a part of this community?</h3>
            </div>
            <div className="subtitle-text  col-lg-12 text-center">
              <h3>Please submit your interest, and we will connect with you.</h3>
            </div>

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
          </div>
        </div>
      </section>
      <ToastContainer/>
    </>
  );
};

export default JoinUS;

