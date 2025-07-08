



import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useBlog } from "../context/BlogContext";

const EmailTemplate = ({ contact }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [deleteId, setDeleteId] =useState(false);
 const {deleteEntry} = useBlog();

  const openModal = () => setShowDeleteModal(true);
  const closeModal = () => setShowDeleteModal(false);

  const confirmDelete = async () => {
    try{
        deleteEntry(contact._id)
      closeModal();
     
    }
    catch(error){
      console.error("Failed to delete Request", error)
    }
    
  };

  return (
    <div
      style={{
        fontFamily: "'Arial', sans-serif",
        maxWidth: "600px",
        margin: "auto",
        backgroundColor: "#fff",
        border: "1px solid #ddd",
        borderRadius: "8px",
        boxShadow: "0px 2px 10px rgba(0,0,0,0.1)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Header */}
      <div
        className="d-flex justify-content-between align-items-center"
        style={{ backgroundColor: "#007bff", padding: "15px 20px" }}
      >
        <p
          style={{
            color: "#fff",
            fontSize: "18px",
            fontWeight: "bold",
            margin: 0,
          }}
        >
          📩 Membership Request
        </p>
        <button
          onClick={openModal}
          style={{
            border: "none",
            backgroundColor: "transparent",
            cursor: "pointer",
            fontSize: "18px",
            color: "#dc3545",
          }}
          title="Delete Request"
        >
          <FaTrash />
        </button>
      </div>

      {/* Email Content */}
      <div style={{ padding: "20px", lineHeight: "1.6", color: "#333" }}>
        <p>
          <strong>Name:</strong> {contact?.name}
        </p>
        <p>
          <strong>Email:</strong>{" "}
          <a
            href={`mailto:${contact?.email}`}
            style={{ color: "#007bff", textDecoration: "none" }}
          >
            {contact?.email}
          </a>
        </p>
        <p>
          <strong>Phone:</strong> {contact?.phoneNo}
        </p>
        <p>
          <strong>Interested In:</strong> {contact?.interestedIn}
        </p>
        <p>
          <strong>Working As:</strong> {contact?.WorkingAs}
        </p>
        <p>
          <strong>Message:</strong>
        </p>
        <blockquote
          style={{
            backgroundColor: "#f8f9fa",
            padding: "10px",
            borderLeft: "5px solid #007bff",
            fontStyle: "italic",
            margin: "10px 0",
          }}
        >
          {contact?.message}
        </blockquote>
        <p>
          <strong>Date:</strong>{" "}
          {new Date(contact?.createdAt).toLocaleString()}
        </p>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <>
          <div className="modal fade show d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Confirm Delete</h5>
                  <button
                    type="button"
                    className="close border-0"
                    onClick={closeModal}
                  >
                    <span>&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <p>Are you sure you want to delete this request?</p>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={confirmDelete}
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Backdrop */}
          <div
            className="modal-backdrop fade show"
            onClick={closeModal}
          ></div>
        </>
      )}
    </div>
  );
};

export default EmailTemplate;
