

import React, { useEffect } from "react";
import { useSection } from "../context/SectionContext";
import { useNavigate } from "react-router-dom";

const SectionsPage = () => {
  const { sections, loading, deleteSection, fetchSections } = useSection();
  const navigate = useNavigate();

  useEffect(() => {
    fetchSections();
       // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <p>Loading sections...</p>;
  console.log("Fetched sections:", sections);
  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "auto" }}>
      <h1 style={{ textAlign: "center" }}>Manage Sections</h1>

      {/* Create Section Button */}
      <button
        onClick={() => navigate("/admin/admindashboard/sections/section-form")}
        style={buttonStyle}
      >
        Create New Section
      </button>

      {/* Table of Sections */}
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "600px" }}>
          <thead>
            <tr style={{ backgroundColor: "#f2f2f2" }}>
              <th style={tableHeaderStyle}>Section Name</th>
              <th style={tableHeaderStyle}>Section Menu</th>
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
                      onClick={() => deleteSection(section?._id)}
                      style={deleteButtonStyle}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: "center", padding: "20px" }}>
                  No sections available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Button Styles
const buttonStyle = {
  marginBottom: "10px",
  padding: "10px",
  background: "#4CAF50",
  color: "white",
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
  background: "#FFC107",
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
