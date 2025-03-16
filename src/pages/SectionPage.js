

// import React, { useEffect } from "react";
// import { useSection } from "../context/SectionContext";
// import { useNavigate } from "react-router-dom";

// const SectionsPage = () => {
//   const { sections, loading, deleteSection, fetchSections } = useSection();
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchSections();
//        // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   if (loading) return <p className="mt-5">Loading sections...</p>;
//   console.log("Fetched sections:", sections);
//   return (
//     <div style={{ padding: "20px", maxWidth: "1200px", margin: "auto" }}>
//       <h1 style={{ textAlign: "center" }}>Custom Sections</h1>

//       {/* Create Section Button */}
//       <button
//         onClick={() => navigate("/admin/admindashboard/sections/section-form")}
//         style={buttonStyle}
//       >
//         Create New 
//       </button>

//       {/* Table of Sections */}
//       <div style={{ overflowX: "auto" }}>
//         <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "600px" }}>
//           <thead>
//             <tr style={{ backgroundColor: "#f2f2f2" }}>
//               <th style={tableHeaderStyle}>Name</th>
//               <th style={tableHeaderStyle}> Menu</th>
//               <th style={tableHeaderStyle}>Attach Form</th>
//               <th style={tableHeaderStyle}>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {Array.isArray(sections) && sections.length > 0 ? (
//               sections.map((section, index) => (
//                 <tr
//                   key={section?._id || index}
//                   style={{ textAlign: "center", borderBottom: "1px solid #ddd" }}
//                 >
//                   <td style={tableCellStyle}>{section?.name || "N/A"}</td>
//                   <td style={tableCellStyle}>{section?.sectionMenu || "N/A"}</td>
//                   <td style={tableCellStyle}>
//                     <input type="checkbox" checked={section?.attachForm || false} readOnly />
//                   </td>
//                   <td style={tableCellStyle}>
//                     <button
//                       onClick={() =>
//                         navigate(`/admin/admindashboard/sections/section-form/${section?._id}`)
//                       }
//                       style={editButtonStyle}
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() =>
//                         navigate(`/admin/admindashboard/sections/details/${section?._id}`)
//                       }
//                       style={detailsButtonStyle}
//                     >
//                       Details
//                     </button>
//                     <button
//                       onClick={() => deleteSection(section?._id)}
//                       style={deleteButtonStyle}
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="4" style={{ textAlign: "center", padding: "20px" }}>
//                   No sections available.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//       {showDeleteModal && (
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
//     </div>
    
//   );
// };

// // Button Styles
// const buttonStyle = {
//   marginBottom: "10px",
//   padding: "5px 7px",
//   background: "#FFC107",
//   color: "black",
//   borderRadius: "5px",
//   border: "none",
//   cursor: "pointer",
// };

// // Table styles
// const tableHeaderStyle = {
//   padding: "12px",
//   textAlign: "center",
//   borderBottom: "2px solid #ddd",
// };

// const tableCellStyle = {
//   padding: "10px",
//   textAlign: "center",
// };

// const editButtonStyle = {
//   background: "#2196F3",
//   color: "white",
//   padding: "5px 10px",
//   margin: "5px",
//   border: "none",
//   cursor: "pointer",
// };

// const detailsButtonStyle = {
//   background: "",
//   color: "black",
//   padding: "5px 10px",
//   margin: "5px",
//   border: "none",
//   cursor: "pointer",
// };

// const deleteButtonStyle = {
//   background: "#F44336",
//   color: "white",
//   padding: "5px 10px",
//   margin: "5px",
//   border: "none",
//   cursor: "pointer",
// };

// export default SectionsPage;


import React, { useEffect, useState } from "react";
import { useSection } from "../context/SectionContext";
import { useNavigate } from "react-router-dom";

const SectionsPage = () => {
  const { sections, loading, deleteSection, fetchSections } = useSection();
  const navigate = useNavigate();

  // State for delete modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedSectionId, setSelectedSectionId] = useState(null);

  useEffect(() => {
    fetchSections();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <p className="mt-5" style={{marginTop:"800px"}}>Loading sections...</p>;
  console.log("Fetched sections:", sections);

  // Open delete modal
  const handleDeleteClick = (sectionId) => {
    setSelectedSectionId(sectionId);
    setShowDeleteModal(true);
  };

  // Confirm delete
  const confirmDelete = () => {
    if (selectedSectionId) {
      deleteSection(selectedSectionId);
    }
    closeModal();
  };

  // Close modal
  const closeModal = () => {
    setShowDeleteModal(false);
    setSelectedSectionId(null);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "auto" }}>
      <h1 style={{ textAlign: "center" }}>Custom Sections</h1>

      {/* Create Section Button */}
      <button
        onClick={() => navigate("/admin/admindashboard/sections/section-form")}
        style={buttonStyle}
      >
        Create New
      </button>

      {/* Table of Sections */}
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "600px" }}>
          <thead>
            <tr style={{ backgroundColor: "#f2f2f2" }}>
              <th style={tableHeaderStyle}>Name</th>
              <th style={tableHeaderStyle}>Menu</th>
              <th style={tableHeaderStyle}>Attach Form</th>
              <th style={tableHeaderStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(sections) && sections.length > 0 ? (
              sections.map((section, index) => (
                <tr
                  key={section?._id || index}
                  style={{ textAlign: "center", borderBottom: "1px solid #ddd" }}
                >
                  <td style={tableCellStyle}>{section?.name || "N/A"}</td>
                  <td style={tableCellStyle}>{section?.sectionMenu || "N/A"}</td>
                  <td style={tableCellStyle}>
                    <input type="checkbox" checked={section?.attachForm || false} readOnly />
                  </td>
                  <td style={tableCellStyle}>
                    <button
                      onClick={() =>
                        navigate(`/admin/admindashboard/sections/section-form/${section?._id}`)
                      }
                      style={editButtonStyle}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() =>
                        navigate(`/admin/admindashboard/sections/details/${section?._id}`)
                      }
                      style={detailsButtonStyle}
                    >
                      Details
                    </button>
                    <button
                      onClick={() => handleDeleteClick(section?._id)}
                      style={deleteButtonStyle}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: "center", paddingTop: "20px" ,marginTop:"250px"}}>
                  Loading....
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <>
          <div className="modal fade show d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Confirm Delete</h5>
                  <button type="button" className="close border-0 " onClick={closeModal}>
                    <span>&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <p>Are you sure you want to delete this section?</p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-danger" onClick={confirmDelete}>
                    Delete
                  </button>
                  <button type="button" className="btn btn-secondary" onClick={closeModal}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Overlay to close modal when clicking outside */}
          <div className="modal-backdrop fade show" onClick={closeModal}></div>
        </>
      )}
    </div>
  );
};

// Button Styles
const buttonStyle = {
  marginBottom: "10px",
  padding: "5px 7px",
  background: "#FFC107",
  color: "black",
  borderRadius: "5px",
  border: "none",
  cursor: "pointer",
};

// Table styles
const tableHeaderStyle = {
  padding: "12px",
  textAlign: "center",
  borderBottom: "2px solid #ddd",
};

const tableCellStyle = {
  padding: "10px",
  textAlign: "center",
};

const editButtonStyle = {
  background: "#2196F3",
  color: "white",
  padding: "5px 10px",
  margin: "5px",
  border: "none",
  cursor: "pointer",
};

const detailsButtonStyle = {
  background: "",
  color: "black",
  padding: "5px 10px",
  margin: "5px",
  border: "none",
  cursor: "pointer",
};

const deleteButtonStyle = {
  background: "#F44336",
  color: "white",
  padding: "5px 10px",
  margin: "5px",
  border: "none",
  cursor: "pointer",
};

export default SectionsPage;
