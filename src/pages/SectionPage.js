



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

       <div className="table-responsive">
  <table className="table table-bordered table-striped table-hover text-center">
    <thead className="table-light text-center align-middle">
      <tr>
        <th>Name</th>
        <th>Menu</th>
        <th className="">Attach Form</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody  className='text-center align-middle'>
      {sections.length > 0 ? (
        sections.map((section, index) => (
          <tr key={section?._id || index}>
            <td>{section?.name || "N/A"}</td>
            <td>{section?.sectionMenu || "N/A"}</td>
            <td className=" d-md-table-cell">
              <input type="checkbox" checked={section?.attachForm || false} readOnly />
            </td>
            <td>
              <div className="d-flex flex-wrap justify-content-center gap-1">
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => navigate(`/admin/admindashboard/sections/section-form/${section?._id}`)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-outline-dark"
                  onClick={() => navigate(`/admin/admindashboard/sections/details/${section?._id}`)}
                >
                  Details
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDeleteClick(section?._id)}
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        ))
      ) : (
      
          <div  className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh", width: "100vw" }}>
      <p className="">Loading...</p> 
    </div>
        
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

export default SectionsPage;
