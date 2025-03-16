// TeamForm.js
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTeam } from "../context/TeamContext";

const TeamForm = () => {
  const { team, addTeamMember, updateTeamMember } = useTeam();
  const navigate = useNavigate();
  const { id } = useParams(); // if present, we're editing

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    designation: "",
    image: null, // file object
  });
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    if (id) {
      // Editing: pre-fill the form with the team member's data
      setIsEditing(true);
      const member = team.find((m) => m._id === id);
      if (member) {
        setFormData({
          name: member.name,
          role: member.role,
          designation: member.designation,
          image: null, // file input will be blank initially
        });
        setImagePreview(member.image);
      }
    }
  }, [id, team]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = new FormData();
    dataToSend.append("name", formData.name);
    dataToSend.append("role", formData.role);
    dataToSend.append("designation", formData.designation);
    if (formData.image) {
      dataToSend.append("image", formData.image);
    }

    if (isEditing && id) {
      await updateTeamMember(id, dataToSend);
    } else {
      await addTeamMember(dataToSend);
    }

    // After submission, navigate back to the team page
    navigate("/admin/admindashboard/team");
  };

  return (
    <>
    <div className="container">
      <h1 style={{ color: "#013a89" ,marginTop:"50px"}} className="pt-5">
        {isEditing ? "Edit " : "Create"}
      </h1>
      <form onSubmit={handleSubmit} className="">
        <div className=" mt-3">
            <label>Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Name"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            required
          />
        </div>
        <div className=" mt-3">
            <label>Designation</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Designation"
            value={formData.role}
            onChange={(e) =>
              setFormData({ ...formData, role: e.target.value })
            }
            required
          />
        </div>
        <div className=" mt-3">
            <label>Description</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Description"
            value={formData.designation}
            onChange={(e) =>
              setFormData({ ...formData, designation: e.target.value })
            }
            required
          />
        </div>
        <label>Image</label>
        <div className=" mt-3 w-100">
           
          <input type="file" style={{ color: "black" }} onChange={handleFileChange} />
        </div>
        <div className="d-flex align-items-center flex-column">
        {imagePreview && (
          <img src={imagePreview} alt="Preview" className="mt-3 w-50 h-100 text-center" width="100" height="100" />
        )}
        <div className="d-flex mt-5">
          <button type="submit" style={buttonStyle}>
            Submit
          </button>
          <button
            type="button"
            style={backbuttonStyle}
            className="ms-1"
            onClick={() => navigate("/admin/admindashboard/team")}
          >
            Back
          </button>
        </div>
        </div>
      </form>
    </div>
    </>
  );
};

export default TeamForm;
const buttonStyle = {  padding: "5px", backgroundColor: "green", color: "white", border: "none", borderRadius: "4px" };
const backbuttonStyle = {  padding: "5px 7px", backgroundColor: "gray", color: "white", border: "none", borderRadius: "4px" };
