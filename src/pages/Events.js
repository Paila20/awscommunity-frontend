

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useEvent } from "../context/EventContext";
import Navbar from "./Navbar";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Captions from "yet-another-react-lightbox/plugins/captions";




const EventsPage = () => {
  const { events,setEvents,fetchEvents, deleteEvent, loading } = useEvent();
 
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [allCategories, setAllCategories] = useState(["All"]); 
  const [allEvents, setAllEvents] = useState([]); // Store all events initially
  const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  


useEffect(() => {
  const loadEvents = async () => {
    const fetchedEvents = await fetchEvents("");

    if (fetchedEvents.length > 0) {
      setAllEvents(fetchedEvents);
      setEvents(fetchedEvents);

      const uniqueCategories = ["All", ...new Set(fetchedEvents.map((e) => e.category))];
      setAllCategories(uniqueCategories);
    } else {
      console.warn('No events found');
      setAllEvents([]);
      setEvents([]);
    }
  };

  loadEvents();
         // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

  

  // Handle category filter locally
  useEffect(() => {
    const filteredEvents =
      selectedCategory === "All"
        ? allEvents
        : allEvents.filter((event) => event.category === selectedCategory);

    setEvents(filteredEvents);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory, allEvents]);


  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = events.map(event => ({
    src: event.image,
    description: event.title,
  }));
  
  const handleAddNew = () => {
   
    navigate("/admin/admindashboard/event/new");
  };

  const handleEdit = (event) => {
    navigate(`/admin/admindashboard/event/edit/${event._id}`);

  }

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteEvent(deleteId);
      setEvents((prevEvents) => prevEvents.filter((event) => event._id !== deleteId));
      setAllEvents((prevAllEvents) => prevAllEvents.filter((event) => event._id !== deleteId));
      setShowDeleteModal(false);
      setDeleteId(null);
    } catch (error) {
      console.error("Failed to delete event:", error);
    }
  };
  

  // const confirmDelete = async () => {
  //   await deleteEvent(deleteId);
  //   setShowDeleteModal(false);
  //   setDeleteId(null);
  // };
  


  

  return (
    <>
    {role === "admin"?(
        
        <div className="section-show">
          <div className="container">
            <div className="section-title">
              <h2>Events</h2>
              <div className="">
                <p>Our Events</p>
                
                  <button className="btn btn-primary mb-3" onClick={() => handleAddNew()}>Create</button>
              
              </div>
            </div>
  
            {/* Category Filter Buttons */}
            <div className="row">
              <div className="col-lg-12 d-flex justify-content-center mb-3">
                 <button
      key="All"
      className={`btn btn-outline-primary me-2 portfolio-filters ${
        selectedCategory === "All" ? "active" : ""
      }`}
      onClick={() => setSelectedCategory("All")}
    >
      All
    </button>
                {allCategories  
                .filter((category) => category !== "All")
                 .slice()
                 .reverse().map((category) => (
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
  
        
  
        <div className="row mt-4">
    {loading ? (
      <p>Loading events...</p>
    ) : (
    
        
          events?.map((event, index) => (
          <div key={event?._id} className="col-lg-4 col-md-6 mb-4">
            <div className="card">
            <img
              src={event?.image}
              alt={event?.title}
              className="cursor-pointer "
              onClick={() => {
                console.log("Clicked index:", index); // Debugging
  
                setCurrentIndex(index); // Make sure setCurrentIndex is defined
                setOpen(true);
              }
            }
            />
            <p>{event?.title}</p>
            <p>{event?.description}</p>
            <p>{event?.category}</p>

             <div className="">
        <button
          className="bg-transparent border-0"
          onClick={() => {
            console.log("Edit Clicked for:", event._id);
            setOpen(false);
            handleEdit(event);
          }}
        >
          Edit
        </button>
  
        <button
          className="bg-transparent border-0"
          onClick={() => {
            console.log("Delete Clicked for ID:", event._id);
            setOpen(false);
            handleDeleteClick(event?._id);
          }}
        >
          Delete
        </button>
      </div>
            </div>
          </div>
        ))
      // </div>
    )}
  </div>
  {console.log("Lightbox Open:", open)}
  {console.log("Current Index Before Rendering Lightbox:", currentIndex)}
  {open && (
    
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
          
          <div className="container-fluid d-flex flex-column align-items-center justify-content-center position-relative">
    

   
     
  
  
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
        </div>
    ):(
      <>
        <Navbar />
        <section className="section-show">
          <div className="container">
            <div className="section-title">
              <h2>Events</h2>
              <div className="d-flex justify-content-between">
                <p>Our Events</p>
              
              </div>
            </div>
  
            {/* Category Filter Buttons */}
            <div className="row">
              <div className="col-lg-12 d-flex justify-content-center mb-3">
                <ul>
                {allCategories.map((category) => (

                  <li
                    key={category}
                    className={`btn btn-outline-primary me-2 portfolio-filters ${selectedCategory === category ? "active" : ""}`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </li>
                ))}
                </ul>
              </div>
            </div>
  
           
    
          
  
  
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
          
          <div className="container-fluid d-flex flex-column align-items-center justify-content-center position-relative">
    
    {/* Admin Buttons - Positioned Outside the Image (Top-Right) */}
  
     
  
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

export default EventsPage;
