



import  { useState} from "react";
import { FaTrash } from "react-icons/fa";


const EmailTemplate = ({ contact, onDelete }) => {
    const [showModal, setShowModal] = useState(false);
  
 
    const handleDelete = () => {
        onDelete(contact._id);
        setShowModal(false);
    };

    return (
        <div style={{
            fontFamily: "'Arial', sans-serif",
            maxWidth: "500px",
            margin: "auto",
            backgroundColor: "#fff",
            border: "1px solid #ddd",
            borderRadius: "8px",
            boxShadow: "0px 2px 10px rgba(0,0,0,0.1)",
            overflow: "hidden",
            position: "relative",
        }}>
            {/* Header Section */}
            <div className="d-flex justify-content-between align-items-center" 
                style={{ backgroundColor: "#007bff", padding: "15px 20px" }}>
                <p style={{ color: "#fff", fontSize: "18px", fontWeight: "bold", margin: 0 }}>
                    📩 Membership Request
                </p>

                {/* Delete Button */}
                <button 
                    onClick={() => setShowModal(true)} 
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
                <p><strong>Name:</strong> {contact?.name}</p>
                <p><strong>Email:</strong> <a href={`mailto:${contact?.email}`} style={{ color: "#007bff", textDecoration: "none" }}>{contact?.email}</a></p>
                <p><strong>Phone:</strong> {contact?.phoneNo}</p>
                <p><strong>Interested In:</strong> {contact?.interestedIn}</p>
                <p><strong>Working As:</strong> {contact?.WorkingAs}</p>
                <p><strong>Message:</strong></p>
                <blockquote style={{
                    backgroundColor: "#f8f9fa",
                    padding: "10px",
                    borderLeft: "5px solid #007bff",
                    fontStyle: "italic",
                    margin: "10px 0"
                }}>
                    {contact?.message}
                </blockquote>
                <p><strong>Date:</strong> {new Date(contact?.createdAt).toLocaleString()}</p>
            </div>

            {/* Footer */}
           

            {/* Delete Confirmation Modal */}
            {showModal && (
                <div style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0,0,0,0.5)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <div style={{
                        backgroundColor: "#fff",
                        padding: "20px",
                        borderRadius: "8px",
                        width: "300px",
                        textAlign: "center",
                        boxShadow: "0px 2px 10px rgba(0,0,0,0.2)"
                    }}>
                        <p style={{ fontSize: "16px", fontWeight: "bold" }}>Are you sure you want to delete?</p>
                        <div style={{ display: "flex", justifyContent: "space-around", marginTop: "15px" }}>
                            <button 
                                onClick={() => setShowModal(false)} 
                                style={{
                                    backgroundColor: "#6c757d",
                                    color: "#fff",
                                    border: "none",
                                    padding: "8px 16px",
                                    borderRadius: "5px",
                                    cursor: "pointer"
                                }}
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={handleDelete} 
                                style={{
                                    backgroundColor: "#dc3545",
                                    color: "#fff",
                                    border: "none",
                                    padding: "8px 16px",
                                    borderRadius: "5px",
                                    cursor: "pointer"
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EmailTemplate;
