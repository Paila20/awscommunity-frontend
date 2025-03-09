// // import React from 'react';
// // import Navbar from './Navbar';

// // const Learning = () => {
// //   return (
// //     <>
// //       <Navbar/>
// //       <section id="learning" class="contact section-show">


// //         <div class="container">
// //             <div class="section-title">

// //                 <h2>Learning</h2>
// //                 <p>AWS KNOWLEDGE SHARING</p>
// //             </div>
// //             <div class="row">
// //                 <div class="col-lg-12 pt-4 pt-lg-0 content aos-init aos-animate" data-aos="fade-left">
// //                     <div style="margin-bottom: 20px; margin-top: 20px;">
// // <h3 class="resume-title"><strong><span style="color: rgb(0, 0, 0);">Unlock the Power of AWS Learning</span></strong></h3>
// // </div>
// // <div style="padding-left: 20px;">
// // <p><span style="color: rgb(0, 0, 0);">Welcome to our AWS Knowledge Sharing Sessions, where the power of collective wisdom converges to illuminate the pathways of cloud innovation. These sessions are more than just discussions; they are vibrant forums where AWS enthusiasts, professionals, and learners come together to exchange insights, experiences, and foster a culture of continuous learning.</span></p>
// // <h3 class="resume-title" style="margin-bottom: 20px; margin-top: 20px;"><strong>What to Expect:</strong></h3>
// // <div class="resume-item pb-0">
// // <ul>
// // <li>
// // <h5 style="margin-bottom: 10px; margin-top: 10px;"><strong><span style="font-size: 12pt;"><span style="color: rgb(1, 58, 137);">DIVERSE TOPICS, IN-DEPTH DISCUSSIONS</span></span></strong></h5>
// // Our Knowledge Sharing Sessions cover a spectrum of AWS topics, ranging from foundational concepts to advanced use cases. Each session is crafted to provide in-depth insights, ensuring participants gain a comprehensive understanding of the subject matter.</li>
// // <li>
// // <h5 style="margin-bottom: 10px; margin-top: 10px;"><strong><span style="font-size: 12pt;"><span style="color: rgb(1, 58, 137);">EXPAND YOUR KNOWLEDGE BASE</span></span></strong></h5>
// // Acquire comprehensive knowledge of AWS services, architectures, and best practices. Our sessions cater to all skill levels, making them suitable for beginners and experienced professionals alike.</li>
// // <li>
// // <h5 style="margin-bottom: 10px; margin-top: 10px;"><strong><span style="font-size: 12pt;"><span style="color: rgb(1, 58, 137);">NETWORKING OPPORTUNITIES</span></span></strong></h5>
// // Connect with a diverse community of AWS enthusiasts. Share experiences, exchange ideas, and build valuable professional connections within the ever-growing AWS ecosystem.</li>
// // <li>
// // <h5 style="margin-bottom: 10px; margin-top: 10px;"><strong><span style="font-size: 12pt;"><span style="color: rgb(1, 58, 137);">CAREER ADVANCEMENT</span></span></strong></h5>
// // Stay relevant in the rapidly evolving tech landscape. The insights gained from our sessions can contribute to your professional development and enhance your career prospects.</li>
// // <li>
// // <h5 style="margin-bottom: 10px; margin-top: 10px;"><strong><span style="font-size: 12pt;"><span style="color: rgb(1, 58, 137);">CONTRIBUTE TO THE COMMUNITY</span></span></strong></h5>
// // Consider presenting in future sessions and share your own experiences. AWS Knowledge Sharing Sessions are not just about learning; they are also about contributing to the collective growth of the community.</li>
// // </ul>
// // </div>
// // <div class="resume-item pb-0" style="padding-botton: 20px;">
// // <h3 class="resume-title" style="margin-bottom: 20px; margin-top: 20px;"><strong>How to Participate:</strong></h3>
// // <ul>
// // <li>
// // <h5 style="margin-bottom: 10px; margin-top: 10px;"><strong><span style="font-size: 12pt;"><span style="color: rgb(1, 58, 137);">EVENT CALENDAR</span></span></strong></h5>
// // Check our social media posts on LinkedIn, Meetup App, Facebook regularly for upcoming Knowledge Sharing Sessions. We host sessions on a variety of topics, ensuring there's something for everyone, from beginners to seasoned professionals.</li>
// // <li>
// // <h5 style="margin-bottom: 10px; margin-top: 10px;"><strong><span style="font-size: 12pt;"><span style="color: rgb(1, 58, 137);">REGISTRATION</span></span></strong></h5>
// // We encourage you to register for the sessions via Meetup App or LinkedIn and secure your spot early as possible.</li>
// // <li>
// // <h5 style="margin-bottom: 10px; margin-top: 10px;"><strong><span style="font-size: 12pt;"><span style="color: rgb(1, 58, 137);">ACCESSING SESSIONS</span></span></strong></h5>
// // Sessions are typically conducted In-Person, making it convenient for participants to discuss, share knowledge, ask questions and do networking. In case if it is virtual then access details and links will be provided upon registration.</li>
// // <li>
// // <h5 style="margin-bottom: 10px; margin-top: 10px;"><strong><span style="font-size: 12pt;"><span style="color: rgb(1, 58, 137);">COMMUNITY ENGAGEMENT</span></span></strong></h5>
// // Join our community forums and social media groups to stay connected between sessions. Share your thoughts, ask questions, and connect with fellow participants and speakers.</li>
// // </ul>
// // </div>
// // <div class="resume-item pb-0">
// // <h3 class="resume-title" style="margin-bottom: 20px; margin-top: 20px;"><strong>Stay tuned:</strong></h3>
// // <p style="margin-top: 20px;">Join us in the spirit of exploration, collaboration, and knowledge-sharing. Together, let's illuminate the cloud landscape and empower each other to reach new heights in AWS expertise. Stay tuned for our upcoming sessions, and let the journey of continuous learning begin!</p>
// // </div>
// // </div>
// //                 </div>

// //             </div>
// //         </div>
// //     </section>
// //     </>
// //   )
// // }

// // export default Learning


// import React, { useState,useEffect} from "react";
// import Navbar from "./Navbar";
// import { useLearning } from "../context/LearningContext";
// import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";

// const Learning = () => {

//    const { expect, saveExpectContent, deleteExpectContent,fetchExpectContent ,participate, saveParticipateContent, deleteParticipateContent,fetchParticipateContent} = useLearning();
//     const [expectshowForm, setExpectShowForm] = useState(false);
//     const [isExpectEditing, setIsExpectEditing] = useState(false);
//     const [editingExpectId, setEditingExpectId] = useState(null);
//     const [showExpectDeleteModal, setShowExpectDeleteModal] = useState(false);
//     const [deleteExpectId, setDeleteExpectId] = useState(null);
//     const [expectformData, setExpectFormData] = useState({ title: "", description: "" });
//     const [participateshowForm, setParticipateShowForm] = useState(false);
//     const [isParticipateEditing, setIsParticipateEditing] = useState(false);
//     const [editingParticipateId, setEditingParticipateId] = useState(null);
//     const [showParticipateDeleteModal, setShowParticipateDeleteModal] = useState(false);
//     const [deleteParticipateId, setDeleteParticipateId] = useState(null);
//     const [participateformData, setParticipateFormData] = useState({ title: "", description: "" });
//     const role = localStorage.getItem("role")
//     useEffect(() => {
//       fetchExpectContent();  
//       fetchParticipateContent();  
//     }, [])
  
  
//     const handleAddNewExpect = () => {
//       console.log("Plus button clicked!"); 
//       setExpectFormData({ title: "", description: "" });
      
//       setIsExpectEditing(false);
//       setExpectShowForm(true);
//       console.log("showForm state after click:", expectshowForm);
//     };
    
    
  
    
//   const handleEditExpect = (item) => {
//     setExpectFormData({ title: item.title, description: item.description }); 
//     setIsExpectEditing(true);
//     setExpectShowForm(true);
//     setEditingExpectId(item._id); 
//   };
  
  
//     const handleSubmitExpect = async (e) => {
//       e.preventDefault();
//       if (isExpectEditing && editingExpectId) {
//         await saveExpectContent(expectformData, editingExpectId);
//       } else {
//         await saveExpectContent(expectformData);
//       }
  
//       setExpectShowForm(false);
//       setIsExpectEditing(false);
//       setExpectFormData({ title: "", description: "" });
//     };
//     const handleDeleteClickExpect = (id) => {
//       setDeleteExpectId(id);
//       setShowExpectDeleteModal(true);
//     };
  
//     const confirmDeleteExpect = async () => {
//       await deleteExpectContent(deleteExpectId);
//       setShowExpectDeleteModal(false);
//       setDeleteExpectId(null);
//     };

//     const handleAddNewParticipate = () => {
//       console.log("Plus button clicked!"); 
//       setParticipateFormData({ title: "", description: "" });
      
//       setIsParticipateEditing(false);
//       setParticipateShowForm(true);
//       console.log("showForm state after click:", participateshowForm);
//     };
    
    
  
    
//   const handleEditParticipate = (item) => {
//     setParticipateFormData({ title: item.title, description: item.description }); 
//     setIsParticipateEditing(true);
//     setParticipateShowForm(true);
//     setEditingParticipateId(item._id); 
//   };
  
  
//     const handleSubmitParticipate = async (e) => {
//       e.preventDefault();
//       if (isParticipateEditing && editingParticipateId) {
//         await saveParticipateContent(participateformData, editingParticipateId);
//       } else {
//         await saveParticipateContent(participateformData);
//       }
  
//       setParticipateShowForm(false);
//       setIsParticipateEditing(false);
//       setParticipateFormData({ title: "", description: "" });
//     };
//     const handleDeleteClickParticipate = (id) => {
//       setDeleteParticipateId(id);
//       setShowParticipateDeleteModal(true);
//     };
  
//     const confirmDeleteParticipate = async () => {
//       await deleteParticipateContent(deleteParticipateId);
//       setShowParticipateDeleteModal(false);
//       setDeleteParticipateId(null);
//     };


//   return (
//     <>
//       <Navbar />
//       <section id="learning" className="contact section-show">
//         <div className="container">
//           <div className="section-title">
//             <h2>Learning</h2>
//             <p>AWS KNOWLEDGE SHARING</p>
//           </div>

//           <div className="row">
//             <div className="col-lg-12 pt-4 pt-lg-0 content" data-aos="fade-left">
//               <div style={{ marginBottom: "20px", marginTop: "20px" }}>
//                 <h3 className="resume-title">
//                   <strong style={{ color: "black" }}>Unlock the Power of AWS Learning</strong>
//                 </h3>
//               </div>

//               <div style={{ paddingLeft: "20px" }}>
//                 <p style={{ color: "black" }}>
//                   Welcome to our AWS Knowledge Sharing Sessions, where the power of collective wisdom
//                   converges to illuminate the pathways of cloud innovation. These sessions are more than
//                   just discussions; they are vibrant forums where AWS enthusiasts, professionals, and
//                   learners come together to exchange insights, experiences, and foster a culture of
//                   continuous learning.
//                 </p>
//                 <div className="d-flex justify-content-between">
//                 <h3 className="resume-title" style={{ margin: "20px 0" }}>
//                   <strong>What to Expect:</strong>
//                 </h3>
//                  {role === "admin" && (
//                               <button onClick={handleAddNewExpect} style={{color:"#013a89"}} size={50}><FaPlus/></button>
//                             )}
//                 </div>

//                 <div className="resume-item pb-0">
//                   <ul>
//                     {
//                     expect.map((item, index) => (
//                       <li key={item._id}>
//                         <div className="d-flex justify-content-between">
//                         <h5 style={{ margin: "10px 0", fontSize: "12pt", color: "#013a89" }}>
//                           <strong>{item.title}</strong>
//                         </h5>
//                                   {role === "admin" && (
//                                     <div>
//                                       <button onClick={() => handleEditExpect(item)} style={{ color: "#013a89" }}><FaEdit /></button>
//                                       <button onClick={() => handleDeleteClickExpect(item._id)} style={{ color: "#013a89" }}><FaTrash /></button>
//                                     </div>
//                                   )}
//                                 </div>
                       
//                         <p>{item.description}</p>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>

//                 <div className="resume-item pb-0" style={{ paddingBottom: "20px" }}>
//                   <div className="d-flex justify-content-between">
//                   <h3 className="resume-title" style={{ margin: "20px 0" }}>
//                     <strong>How to Participate:</strong>
//                   </h3>
//                   {role === "admin" && (
//                               <button onClick={handleAddNewParticipate} style={{color:"#013a89"}} size={50}><FaPlus/></button>
//                             )}
//                    </div>
//                   <ul>
//                   {
//                     participate.map((item, index) => (
//                       <li key={item._id}>
//                         <div className="d-flex justify-content-between">
//                         <h5 style={{ margin: "10px 0", fontSize: "12pt", color: "#013a89" }}>
//                           <strong>{item.title}</strong>
//                         </h5>
//                                   {role === "admin" && (
//                                     <div>
//                                       <button onClick={() => handleEditParticipate(item)} style={{ color: "#013a89" }}><FaEdit /></button>
//                                       <button onClick={() => handleDeleteClickParticipate(item._id)} style={{ color: "#013a89" }}><FaTrash /></button>
//                                     </div>
//                                   )}
//                                 </div>
                       
//                         <p>{item.description}</p>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>

//                 <div className="resume-item pb-0">
//                   <h3 className="resume-title" style={{ margin: "20px 0" }}>
//                     <strong>Stay tuned:</strong>
//                   </h3>
//                   <p style={{ marginTop: "20px" }}>
//                     Join us in the spirit of exploration, collaboration, and knowledge-sharing. Together,
//                     let's illuminate the cloud landscape and empower each other to reach new heights in AWS
//                     expertise. Stay tuned for our upcoming sessions, and let the journey of continuous
//                     learning begin!
//                   </p>
//                 </div>
//               </div>
//             </div>
//             {expectshowForm && role === "admin" && (
//             <div className="d-flex flex-column align-items-center justify-content-center">

//               <form onSubmit={handleSubmitExpect}  className="about-form">
//               {isExpectEditing ? (<h4 style={{ color: "#013a89" }} >Update</h4>):(<h4  style={{ color: "#013a89" }}>Create</h4>)}
//                 <div className="form-group mt-3">
//                 <input
//                   type="text"
//                   className="form-control"
//                   placeholder="Title"
//                   value={expectformData.title}
//                   onChange={(e) => setExpectFormData({ ...expectformData, title: e.target.value })}
//                   required
//                 />
//                 </div>
//                 <textarea
//                   placeholder="Description"
//                   className="form-control"
//                   value={expectformData.description}
//                   onChange={(e) => setExpectFormData({ ...expectformData, description: e.target.value })}
//                   required
//                 />
//                 <div className="d-flex mt-5">
//                 <button type="submit" className="btn btn-primary w-100  me-5 ">{isExpectEditing ? "Update" : "Add"}</button>
//                 <button type="button"  className="btn btn-danger w-100 " onClick={() => setExpectShowForm(false)}>Cancel</button>
//                 </div>
//               </form>
//             </div>
//           )}
//            {showExpectDeleteModal && (
//         <div className="modal fade show d-block" tabIndex="-1" role="dialog">
//           <div className="modal-dialog modal-dialog-centered" role="document">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title">Confirm Delete</h5>
//                 <button type="button" className="close" onClick={() => setShowExpectDeleteModal(false)}>
//                   <span>&times;</span>
//                 </button>
//               </div>
//               <div className="modal-body">
//                 <p>Are you sure you want to delete this item?</p>
//               </div>
//               <div className="modal-footer">
//                 <button type="button" className="btn btn-danger" onClick={confirmDeleteExpect}>
//                   Delete
//                 </button>
//                 <button type="button" className="btn btn-secondary" onClick={() => setShowExpectDeleteModal(false)}>
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Overlay to close modal when clicking outside */}
//       {showExpectDeleteModal && <div className="modal-backdrop fade show"></div>}

//       {participateshowForm && role === "admin" && (
//             <div className="d-flex flex-column align-items-center justify-content-center">

//               <form onSubmit={handleSubmitParticipate}  className="about-form">
//               {isParticipateEditing ? (<h4 style={{ color: "#013a89" }} >Update</h4>):(<h4  style={{ color: "#013a89" }}>Create</h4>)}
//                 <div className="form-group mt-3">
//                 <input
//                   type="text"
//                   className="form-control"
//                   placeholder="Title"
//                   value={participateformData.title}
//                   onChange={(e) => setParticipateFormData({ ...participateformData, title: e.target.value })}
//                   required
//                 />
//                 </div>
//                 <textarea
//                   placeholder="Description"
//                   className="form-control"
//                   value={participateformData.description}
//                   onChange={(e) => setParticipateFormData({ ...participateformData, description: e.target.value })}
//                   required
//                 />
//                 <div className="d-flex mt-5">
//                 <button type="submit" className="btn btn-primary w-100  me-5 ">{isParticipateEditing ? "Update" : "Add"}</button>
//                 <button type="button"  className="btn btn-danger w-100 " onClick={() => setParticipateShowForm(false)}>Cancel</button>
//                 </div>
//               </form>
//             </div>
//           )}
//            {showParticipateDeleteModal && (
//         <div className="modal fade show d-block" tabIndex="-1" role="dialog">
//           <div className="modal-dialog modal-dialog-centered" role="document">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title">Confirm Delete</h5>
//                 <button type="button" className="close" onClick={() => setShowParticipateDeleteModal(false)}>
//                   <span>&times;</span>
//                 </button>
//               </div>
//               <div className="modal-body">
//                 <p>Are you sure you want to delete this item?</p>
//               </div>
//               <div className="modal-footer">
//                 <button type="button" className="btn btn-danger" onClick={confirmDeleteParticipate}>
//                   Delete
//                 </button>
//                 <button type="button" className="btn btn-secondary" onClick={() => setShowParticipateDeleteModal(false)}>
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Overlay to close modal when clicking outside */}
//       {showParticipateDeleteModal && <div className="modal-backdrop fade show"></div>}
//           </div>
//         </div>
//       </section>
     
           
//     </>
//   );
// };

// export default Learning;
