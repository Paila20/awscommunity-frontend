import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEvent } from "../context/EventContext";

const EventsForm = () => {
  const { events, createEvent, updateEvent } = useEvent();
  const navigate = useNavigate();
  const { id } = useParams(); // if present, we're editing

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
   
    description: "",
    category: "",
    image: null,
  });
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    if (id) {
      setIsEditing(true);
      const event = events.find((e) => e._id === id);
      if (event) {
        setFormData({
          title: event.title,
         
          description: event.description,
          category: event.category,
          image: null,
        });
        setImagePreview(event.image);
      }
    }
  }, [id, events]);

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
    dataToSend.append("title", formData.title);
   

    dataToSend.append("description", formData.description);
    dataToSend.append("category", formData.category);
    if (formData.image) {
      dataToSend.append("image", formData.image);
    }

    if (isEditing && id) {
      await updateEvent(id, dataToSend);
    } else {
      await createEvent(dataToSend);
    }

    navigate("/admin/admindashboard/events");
  };

  return (
    <div className="container">
      <h1 style={{ color: "#013a89", marginTop: "50px" }} className="pt-5">
        {isEditing ? "Edit Event" : "Create Event"}
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="mt-3">
          <label>Title</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Event Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </div>
       
       
        <div className="mt-3">
          <label>Description</label>
          <textarea
            className="form-control"
            placeholder="Enter Event Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
          ></textarea>
        </div>
        <div className="mt-3">
          <label>Category</label>
          <textarea
            className="form-control"
            placeholder="Enter Event Category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            required
          ></textarea>
        </div>
        <label>Image</label>
        <div className="mt-3 w-100">
          <input type="file" style={{ color: "black" }} onChange={handleFileChange} />
        </div>
        <div className="d-flex align-items-center flex-column">
          {imagePreview && (
            <img src={imagePreview} alt="Preview" className="mt-3 w-50 h-100" width="100" height="100" />
          )}
          <div className="d-flex mt-5">
            <button type="submit" style={buttonStyle}>
              Submit
            </button>
            <button
              type="button"
              style={backbuttonStyle}
              className="ms-1"
              onClick={() => navigate("/admin/admindashboard/events")}
            >
              Back
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EventsForm;

const buttonStyle = { padding: "5px", backgroundColor: "green", color: "white", border: "none", borderRadius: "4px" };
const backbuttonStyle = { padding: "5px 7px", backgroundColor: "gray", color: "white", border: "none", borderRadius: "4px" };
