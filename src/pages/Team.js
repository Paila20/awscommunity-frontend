

// import React, { useState, useEffect } from "react";
// import Navbar from "./Navbar";
// import { useTeam } from "../context/TeamContext";


// const Team = () => {
//   const { team, fetchTeam, addTeamMember, updateTeamMember, deleteTeamMember } = useTeam();
//   const [showForm, setShowForm] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editingId, setEditingId] = useState(null);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [deleteId, setDeleteId] = useState(null);
//   const [formData, setFormData] = useState({
//     name: "",
//     role: "",
//     designation: "",
//     image: null, // Store File object
//   });
//   const [imagePreview, setImagePreview] = useState(""); // Store image URL

//   const role = localStorage.getItem("role");

//   useEffect(() => {
//     fetchTeam();
//        // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);
  
//   const handleAddNew = () => {
//     setFormData({ name: "", role: "", designation: "", image: null });
//     setImagePreview("");
//     setIsEditing(false);
//     setShowForm(true);
//   };

//   const handleEdit = (member) => {
//     setFormData({
//       name: member.name,
//       role: member.role,
//       designation: member.designation,
//       image: null, // Clear file input
//     });
//     setImagePreview(member.image); // Keep existing image
//     setIsEditing(true);
//     setEditingId(member._id);
//     setShowForm(true);
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setFormData({ ...formData, image: file });
//       setImagePreview(URL.createObjectURL(file)); // Show preview
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formDataToSend = new FormData();
//     formDataToSend.append("name", formData.name);
//     formDataToSend.append("role", formData.role);
//     formDataToSend.append("designation", formData.designation);
//     if (formData.image) {
//       formDataToSend.append("image", formData.image); // Send only if updated
//     }

//     if (isEditing && editingId) {
//       await updateTeamMember(editingId, formDataToSend);
//     } else {
//       await addTeamMember(formDataToSend);
//     }

//     setShowForm(false);
//     setIsEditing(false);
//     setFormData({ name: "", role: "", designation: "", image: null });
//     setImagePreview("");
//   };

//   const handleDeleteClick = (id) => {
//     setDeleteId(id);
//     setShowDeleteModal(true);
//   };

//   const confirmDelete = async () => {
//     await deleteTeamMember(deleteId);
//     setShowDeleteModal(false);
//     setDeleteId(null);
//   };

//   return (
//     <>
    

//      { role === "admin"?(
//        <div id="services" className="services admin section-show bg-transparent">
//        <div className="container">
        
          
//              <button onClick={handleAddNew} style={{  marginBottom: "10px",
//   padding: "5px 7px",
//   background: "#FFC107",
//   color: "black",
//   borderRadius: "5px",
//   border: "none",
//   cursor: "pointer", }}>
//               Create
//              </button>
           
         

//          <div className="row">
//            {team.length > 0 ? (
//              team.map((member) => (
//                <div key={member._id} className="col-lg-4 col-md-6 d-flex align-items-stretch" style={{position:"relative"}}>
//                  <div className="icon-box">
                 
                    
                  
//                    <div className="icon">
//                      <img src={member.image} alt={member.name} />
//                    </div>
//                    <h4>
//                      {member.name}
//                    </h4>
//                    <p><b>{member.role}</b></p>
//                    <p>{member.designation}</p>
//                    <div className="">
//                        <button onClick={() => handleEdit(member)} style={{  
//                                                                               padding: "5px 7px",
//                                                                               background: "#013a89",
//                                                                               color: "white",
//                                                                               borderRadius: "5px",
//                                                                               border: "none",
//                                                                               cursor: "pointer", }}>
//                          Edit
//                        </button>
//                        <button onClick={() => handleDeleteClick(member._id)} style={{ 
//                                                                               padding: "5px 7px",
//                                                                               background: "red",
//                                                                               color: "white",
//                                                                               borderRadius: "5px",
//                                                                               marginLeft:"5px",
//                                                                               border: "none",
//                                                                               cursor: "pointer", }}>
//                          Delete
//                        </button>
//                      </div>
//                  </div>
//                </div>
//              ))
//            ) : (
//              <p className="text-center">No Team Members Available</p>
//            )}
//          </div>
//        </div>

       
//      </div>
//      ):(
//       <>
//       <Navbar />
//       <section id="services" className="services section-show bg-transparent">
//       <div className="container">
//         <div className="section-title d-flex justify-content-between">
//           <h2>Organizing Team</h2>
         
//         </div>

//         <div className="row">
//           {team.length > 0 ? (
//             team.map((member) => (
//               <div key={member._id} className="col-lg-4 col-md-6 d-flex align-items-stretch" style={{position:"relative"}}>
//                 <div className="icon-box">
                
//                   <div className="icon">
//                     <img src={member.image} alt={member.name} />
//                   </div>
//                   <h4>
//                     {member.name}
//                   </h4>
//                   <p><b>{member.role}</b></p>
//                   <p>{member.designation}</p>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p className="text-center">No Team Members Available</p>
//           )}
//         </div>
//       </div>

      
//     </section>
//     </>
//      )}
//       {showForm && role === "admin" && (
//           <div className="d-flex flex-column align-items-center justify-content-center">
//             <form onSubmit={handleSubmit} className="about-form">
//               <h4 style={{ color: "#013a89" }}>{isEditing ? "Update Member" : "Add Member"}</h4>
//               <div className="form-group mt-3">
//                 <input
//                   type="text"
//                   className="form-control"
//                   placeholder="Name"
//                   value={formData.name}
//                   onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                   required
//                 />
//               </div>
//               <div className="form-group mt-3">
//                 <input
//                   type="text"
//                   className="form-control"
//                   placeholder="Role"
//                   value={formData.role}
//                   onChange={(e) => setFormData({ ...formData, role: e.target.value })}
//                   required
//                 />
//               </div>
//               <div className="form-group mt-3">
//                 <input
//                   type="text"
//                   className="form-control"
//                   placeholder="Designation"
//                   value={formData.designation}
//                   onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
//                   required
//                 />
//               </div>
//               <div className="form-group mt-3">
//                 <input type="file" style={{color:"black"}} onChange={handleFileChange} />
//               </div>
//               {imagePreview && <img src={imagePreview} alt="Preview" className="mt-3" width="100" />}
//               <div className="d-flex mt-5">
//                 <button type="submit" className="btn btn-primary w-100 me-5">
//                   {isEditing ? "Update" : "Add"}
//                 </button>
//                 <button type="button" className="btn btn-danger w-100" onClick={() => setShowForm(false)}>
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         )}
//             {/* Delete Confirmation Modal */}
//      {showDeleteModal && (
//         <div className="modal fade show d-block" tabIndex="-1" role="dialog">
//           <div className="modal-dialog modal-dialog-centered" role="document">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title">Confirm Delete</h5>
//                 <button type="button" className="close" onClick={() => setShowDeleteModal(false)}>
//                   <span>&times;</span>
//                 </button>
//               </div>
//               <div className="modal-body">
//                 <p>Are you sure you want to delete this member?</p>
//               </div>
//               <div className="modal-footer">
//                 <button type="button" className="btn btn-danger" onClick={confirmDelete}>
//                   Delete
//                 </button>
//                 <button type="button" className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//      {/* Overlay to close modal when clicking outside */}
//      {showDeleteModal && <div className="modal-backdrop fade show"></div>} 
//     </>
//   );
// };

// export default Team;



import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { useTeam } from "../context/TeamContext";


const Team = () => {
  const { team, fetchTeam, deleteTeamMember } = useTeam();
  
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  
   const navigate = useNavigate()

  const role = localStorage.getItem("role");

  useEffect(() => {
    fetchTeam();
       // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const handleAddNew = () => {
   
    navigate("/admin/admindashboard/team/new");
  };

  const handleEdit = (member) => {
    navigate(`/admin/admindashboard/team/edit/${member._id}`);
   
  };

  

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    await deleteTeamMember(deleteId);
    setShowDeleteModal(false);
    setDeleteId(null);
  };

  return (
    <>
    

     { role === "admin"?(
       <div id="services" className="services admin section-show bg-transparent">
       <div className="container">
        
          
             <button onClick={handleAddNew} style={{  marginBottom: "10px",
  padding: "5px 7px",
  background: "#FFC107",
  color: "black",
  borderRadius: "5px",
  border: "none",
  cursor: "pointer", }}>
              Create
             </button>
           
         

         <div className="row">
           {team.length > 0 ? (
             team
             .slice()
             .reverse().map((member) => (
               <div key={member._id} className="col-lg-4 col-md-6 d-flex align-items-stretch" style={{position:"relative"}}>
                 <div className="icon-box">
                 
                    
                  
                   <div className="icon">
                     <img src={member.image} alt={member.name} />
                   </div>
                   <h4>
                     {member.name}
                   </h4>
                   <p><b>{member.role}</b></p>
                   <p>{member.designation}</p>
                   <div className="">
                       <button onClick={() => handleEdit(member)} style={{  
                                                                              padding: "5px 7px",
                                                                              background: "#013a89",
                                                                              color: "white",
                                                                              borderRadius: "5px",
                                                                              border: "none",
                                                                              cursor: "pointer", }}>
                         Edit
                       </button>
                       <button onClick={() => handleDeleteClick(member._id)} style={{ 
                                                                              padding: "5px 7px",
                                                                              background: "red",
                                                                              color: "white",
                                                                              borderRadius: "5px",
                                                                              marginLeft:"5px",
                                                                              border: "none",
                                                                              cursor: "pointer", }}>
                         Delete
                       </button>
                     </div>
                 </div>
               </div>
             ))
           ) : (
             <p className="text-center">No Team Members Available</p>
           )}
         </div>
       </div>

       
     </div>
     ):(
      <>
      <Navbar />
      <section id="services" className="services section-show bg-transparent">
      <div className="container">
        <div className="section-title d-flex justify-content-between">
          <h2>Organizing Team</h2>
         
        </div>

        <div className="row">
          {team.length > 0 ? (
            team 
            .slice() 
            .reverse().map((member) => (
              <div key={member._id} className="col-lg-4 col-md-6 d-flex align-items-stretch" style={{position:"relative"}}>
                <div className="icon-box">
                
                  <div className="icon">
                    <img src={member.image} alt={member.name} />
                  </div>
                  <h4>
                    {member.name}
                  </h4>
                  <p><b>{member.role}</b></p>
                  <p>{member.designation}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">No Team Members Available</p>
          )}
        </div>
      </div>

      
    </section>
    </>
     )}
     
            {/* Delete Confirmation Modal */}
     {showDeleteModal && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button type="button" className="close border-0" onClick={() => setShowDeleteModal(false)}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this member?</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-danger" onClick={confirmDelete}>
                  Delete
                </button>
                <button type="button" className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

     {/* Overlay to close modal when clicking outside */}
     {showDeleteModal && <div className="modal-backdrop fade show"></div>} 
    </>
  );
};

export default Team;



