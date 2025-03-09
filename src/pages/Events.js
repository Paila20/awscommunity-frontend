




import { useState, useEffect } from "react";
import { useEvent } from "../context/EventContext";
import Navbar from "./Navbar";

import { FaEdit,FaTrash,FaPlus,FaTimes } from "react-icons/fa";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Captions from "yet-another-react-lightbox/plugins/captions";




const EventsPage = () => {
  const { events, fetchEvents, createEvent, updateEvent, deleteEvent, loading } = useEvent();
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ id: null, title: "", category: "", image: null });
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [allCategories, setAllCategories] = useState(["All"]); 

  const role = localStorage.getItem("role");
  // Fetch events when the selected category changes
  useEffect(() => {
    fetchEvents(selectedCategory === "All" ? "" : selectedCategory);
  }, [selectedCategory]);
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = events.map(event => ({
    src: event.image,
    description: event.title,
  }));
  


  
  
  useEffect(() => {
    if (events.length > 0) {
      const uniqueCategories = ["All", ...new Set(events.map((event) => event.category))];
      setAllCategories(uniqueCategories);
    }
       // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [events]); // Now it runs whenever `events` change
  

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      await updateEvent(formData.id, formData);
    } else {
      await createEvent(formData);
    }
    if (!allCategories.includes(formData.category)) {
      setAllCategories((prevCategories) => [...prevCategories, formData.category]);
    }
  
    resetForm();
    
  };

  const handleEdit = (event) => {
    setIsEditing(true);
    setShowForm(true);
    setFormData({
      id: event._id,
      title: event.title,
      category: event.category,
      image: event.image || null,
    });
    setImagePreview(event.image instanceof File ? URL.createObjectURL(event.image) : event.image);
  };

  const handleDelete = async (id) => {
    await deleteEvent(id);
  };

  const resetForm = () => {
    setShowForm(false);
    setIsEditing(false);
    setFormData({ id: null, title: "", category: "", image: null });
    setImagePreview(null);
  };

  return (
    <>
      <Navbar />
      <section className="section-show">
        <div className="container">
          <div className="section-title">
            <h2>Events</h2>
            <div className="d-flex justify-content-between">
              <p>Our Events</p>
              {role === "admin" && (
                <button className="btn btn-primary mb-3" onClick={() => setShowForm(true)}>Add Event</button>
              )}
            </div>
          </div>

          {/* Category Filter Buttons */}
          <div className="row">
            <div className="col-lg-12 d-flex justify-content-center mb-3">
              {allCategories.map((category) => (
                <button
                  key={category}
                  className={`btn btn-outline-primary me-2 portfolio-filters ${selectedCategory === category ? "active" : ""}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Event Form */}
          {showForm && role === "admin" && (
            <div className="d-flex flex-column align-items-center justify-content-center">
              <form onSubmit={handleSubmit} className="about-form">
                <h4 style={{ color: "#013a89" }}>{isEditing ? "Update Event" : "Add Event"}</h4>
                <div className="form-group mt-3">
                  <input type="text" className="form-control" placeholder="Title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
                </div>
                <div className="form-group mt-3">
                  <input type="text" className="form-control" placeholder="Category" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} required />
                </div>
                <div className="form-group mt-3">
                  <input type="file" style={{ color: "black" }} onChange={handleFileChange} />
                </div>
                {imagePreview && <img src={imagePreview} alt="Preview" className="mt-3" width="100" />}
                <div className="d-flex mt-5">
                  <button type="submit" className="btn btn-primary w-100 me-5">{isEditing ? "Update" : "Add"}</button>
                  <button type="button" className="btn btn-danger w-100" onClick={resetForm}>Cancel</button>
                </div>
              </form>
            </div>
          )}

  
          {/* <div className="row mt-4">
            {loading ? (
              <p>Loading events...</p>
            ) : (
              events.map((event) => (
                <div key={event._id} className="col-lg-4 col-md-6 mb-4">
                  <div className="card">
                    {event.image && <img src={event.image} alt={event.title} className="card-img-top" />}
                    <div className="card-body">
                      <h5 className="card-title">{event.title}</h5>
                      {role === "admin" && (
                        <div className="d-flex">
                          <button className="btn btn-warning me-2" onClick={() => handleEdit(event)}>Edit</button>
                          <button className="btn btn-danger" onClick={() => handleDelete(event._id)}>Delete</button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div> */}


      <div className="row mt-4">
  {loading ? (
    <p>Loading events...</p>
  ) : (
  
      
        events.map((event, index) => (
        <div key={event._id} className="col-lg-4 col-md-6 mb-4">
          <div className="card">
          <img
            src={event.image}
            alt={event.title}
            className="cursor-pointer "
            onClick={() => {
              console.log("Clicked index:", index); // Debugging

              setCurrentIndex(index); // Make sure setCurrentIndex is defined
              setOpen(true);
            }
          }
          />
          </div>
        </div>
      ))
    // </div>
  )}
</div>
{console.log("Lightbox Open:", open)}
{console.log("Current Index Before Rendering Lightbox:", currentIndex)}
{open && (
  // <Lightbox
  //   slides={slides}
  //   open={open}
  //   close={() => setOpen(false)}
  //   index={currentIndex}
  //   controller={{ closeOnBackdropClick: true }}
  //   plugins={[Captions]}
  //   render={{
  //     slide: ({ slide }) => {
  //       console.log("✅ render.description is executing!");
  //       console.log("Slide Data:", slide);
  //       console.log("Events Array:", events);
  //       console.log("Current Index:", currentIndex);
  //       console.log("Events Array:", events);
  //       console.log("Current Index:", currentIndex);
        
    
  //       const currentEvent = events.find(event => event.title === slide.description);
        
  //       console.log("Current Event:", currentEvent);

  //       if (!currentEvent) return null;

  //       return (
          
  //         <div className="absolute bottom-5 left-5 bg-black bg-opacity-50 text-white p-3 rounded">
             
  //           <h5 className="text-lg font-semibold">{slide.description}</h5>
  //           {role === "admin" && (
  //             <div className="flex space-x-3 mt-2">
  //               <button
  //                 className="text-yellow-400 bg-white p-2 rounded z-50 position-absolute"
  //                 onClick={() => {
  //                   setOpen(false);
  //                   handleEdit(currentEvent);
  //                 }}
  //               >
  //                 <FaEdit size={20} />
  //               </button>
  //               <button
  //                 className="text-red-500 bg-white p-2 rounded z-50 position-absolute"
  //                 onClick={() => {
  //                   setOpen(false);
  //                   handleDelete(currentEvent._id);
  //                 }}
  //               >
  //                 <FaTrash size={20} />
  //               </button>
  //             </div>
  //           )}
           
  //         </div>
  //       );
  //     },
  //   }}
  // />
  <Lightbox
  slides={slides}
  open={open}
  close={() => setOpen(false)}
  index={currentIndex}
  controller={{ closeOnBackdropClick: true }}
  plugins={[Captions]}
  render={{
    slide: ({ slide }) => {
      const currentEvent = events.find(event => event.image === slide.src);
      console.log("Current Event:", currentEvent);  // Debugging

      if (!currentEvent) return null;

      return (
        // <div className=" container-fluid d-flex flex-column align-items-center justify-content-center  vh-100 w-50 w-md-75 w-sm-100 position-relative">
        
        //   <img src={slide.src} alt={slide.descript} className="w-100 h-md-50 h-sm-25 object-fit-cover" />
          
        //   <div className="w-100 fw-bold text-dark bg-white">{slide.description}</div>

        //   {role === "admin" && (
        //     <div className="position-absolute top-0 end-0 d-flex align-items-center gap-3  ">
        //       <button
        //         className="bg-transparent"
        //         onClick={() => {
        //           console.log("Edit Clicked for:", currentEvent);
        //           setOpen(false);
        //           handleEdit(currentEvent);
        //         }}
        //       >
        //         <FaEdit size={22} />
        //       </button>

        //       <button
        //         className="bg-transparent"
        //         onClick={() => {
        //           console.log("Delete Clicked for ID:", currentEvent._id);
        //           setOpen(false);
        //           handleDelete(currentEvent._id);
        //         }}
        //       >
        //         <FaTrash size={22} />
        //       </button>
            
        //     </div>
        //   )}
        // </div>

        <div className="container-fluid d-flex flex-column align-items-center justify-content-center position-relative">
  
  {/* Admin Buttons - Positioned Outside the Image (Top-Right) */}
  {role === "admin" && (
    <div className="position-absolute top-0 end-0 d-flex align-items-center gap-3 ">
      <button
        className="bg-transparent border-0"
        onClick={() => {
          console.log("Edit Clicked for:", currentEvent);
          setOpen(false);
          handleEdit(currentEvent);
        }}
      >
        <FaEdit size={22} />
      </button>

      <button
        className="bg-transparent border-0"
        onClick={() => {
          console.log("Delete Clicked for ID:", currentEvent._id);
          setOpen(false);
          handleDelete(currentEvent._id);
        }}
      >
        <FaTrash size={22} />
      </button>
    </div>
  )}

  {/* Image & Description Wrapper */}
  <div className=" d-flex flex-column align-items-center  justify-content-center vh-100  w-md-100 w-75 ">
    {/* Image */}
    <img 
      src={slide.src} 
      alt={slide.description} 
      className="w-100 h-md-50 h-sm-25 object-fit-cover"
    />

    {/* Description */}
    <div className="w-100 fw-bold text-dark bg-white text-center p-2">
      {slide.description}
    </div>
  </div>

</div>

      );
    },
  }}
/>

)}

       
        
        </div>
      </section>
    </>
  );
};

export default EventsPage;
