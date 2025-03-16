



import React, { useState, useEffect } from "react";
import { useSection } from "../context/SectionContext";
import { useParams, useNavigate } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";

const SectionForm = () => {
  const { addSection, updateSection, fetchSectionByMenu } = useSection();
  const { sectionId } = useParams(); // Get section ID from URL
  const navigate = useNavigate();

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    description: "",
    sectionMenu: "",
    attachForm: false,
  });

  const [loading, setLoading] = useState(!!sectionId);

  

  useEffect(() => {
    if (sectionId) {
      setLoading(true);
      const fetchSection = async () => {
        try {
          console.log("Fetching section for ID:", sectionId); // Debugging
          const section = await fetchSectionByMenu(sectionId);
          console.log("Fetched Section Data:", section); // Debugging
          if (section) {
            setFormData({
              name: section.name || "",
              title: section.title || "",
              description: section.description || "",
              sectionMenu: section.sectionMenu || "",
              attachForm: section.attachForm || false,
            });
          }
        } catch (error) {
          console.error("Error fetching section:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchSection();
    }
        // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionId]);
  

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (sectionId) {
      await updateSection(sectionId, formData);
    } else {
      await addSection(formData);
    }
    navigate("/admin/admindashboard/sections"); // Redirect after submission
  };

  if (loading) {
    return <p>Loading form...</p>;
  }

  return (
    <div style={formContainerStyle}>
      <h2 style={{ textAlign: "center",borderBottom:"1px solid gray" }}>{sectionId ? "Edit Custom Section" : "Create Custom Section"}</h2>
      <form onSubmit={handleSubmit} style={formStyle}>
        <label>Section Name</label>
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required style={inputStyle} />
        <label>Section Title</label>
        <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required style={inputStyle} />
        <label>Section Description</label>
         <Editor
          apiKey="cdkybh72b806yb8kb8ye2g3x72km1gswc3ceh8yisls29vx9" // Replace with your TinyMCE API key if needed
          value={formData.description}
         
          init={{
            height: 260,
        plugins: [
          "codesample",
          // Core editing features
          'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'image', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount',
         
          'checklist', 'mediaembed', 'casechange', 'export', 'formatpainter', 'pageembed', 'a11ychecker', 'tinymcespellchecker', 'permanentpen', 'powerpaste', 'advtable', 'advcode', 'editimage', 'advtemplate', 'ai', 'mentions', 'tinycomments', 'tableofcontents', 'footnotes', 'mergetags', 'autocorrect', 'typography', 'inlinecss', 'markdown','importword', 'exportword', 'exportpdf'
        ],
        toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
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
       <label>Menu</label>
        <input type="text" name="sectionMenu" placeholder="Menu" value={formData.sectionMenu} onChange={handleChange} style={inputStyle} />
        <label style={checkboxLabelStyle}>
          <input type="checkbox" name="attachForm" checked={formData.attachForm} onChange={handleChange} style={checkboxStyle} />
          Attach Form
        </label>
        <div>
        <button type="submit" style={buttonStyle}>Save</button>
        <button type ="button"  style={backbuttonStyle} className="ms-1" onClick={() => navigate("/admin/admindashboard/sections")}>Back</button>
        </div>
      </form>
    </div>
  );
};

// Styles
const formContainerStyle = {  margin: "auto", padding: "15px", backgroundColor: "#f9f9f9", borderRadius: "8px" };
const formStyle = { display: "flex", flexDirection: "column" };
const inputStyle = { width: "100%", padding: "5px", marginBottom: "10px", border: "1px solid #ccc", borderRadius: "4px" };

const checkboxLabelStyle = { display: "flex", alignItems: "center", marginBottom: "10px" };
const checkboxStyle = { marginRight: "10px" };
const buttonStyle = {  padding: "5px", backgroundColor: "green", color: "white", border: "none", borderRadius: "4px" };
const backbuttonStyle = {  padding: "5px 7px", backgroundColor: "gray", color: "white", border: "none", borderRadius: "4px" };

export default SectionForm;
