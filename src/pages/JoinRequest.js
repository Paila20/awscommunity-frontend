



import React, { useEffect } from "react";
import { useBlog } from "../context/BlogContext";
import EmailTemplate from "../components/EmailTemplate";
import { handleSuccess, handleError } from '../utils';
import { useOutletContext } from "react-router-dom";
import axios from "axios";

const JoinRequest = () => {
    const { entries, fetchAllEntries, loading } = useBlog();
     const { isSidebarOpen = false } = useOutletContext() || {};
    useEffect(() => {
        fetchAllEntries();
           // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleDelete = async (id) => {
   
            try {
                await axios.delete(`http://localhost:5000/api/join-us/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                handleSuccess("Request deleted successfully!");
                fetchAllEntries(); // Refresh the list after deletion
            } catch (error) {
                console.error("Delete failed:", error);
                handleError("Failed to delete request.");
            }
        
    };
    
   if (loading) return (
    <div  className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh"   , width: isSidebarOpen ? "calc(100vw - 250px)" : "100vw", }}>
      <p className="">Loading...</p> 
    </div>
   )

    return (
        <>
         

            <section className="section-show py-0"  style={{ height: "100vh"   , width: isSidebarOpen ? "calc(100vw - 250px)" : "100vw", }}>
                <div className="container">
                    <div className="section-title">
                        <h2>DASHBOARD</h2>
                        <p className="fs-3 fs-md-2">WELCOME TO CONTACT US MESSAGES</p>
                    </div>
                    <div className="admin-dashboard">
                        {loading ? (
                            <p>Loading...</p>
                        ) : entries.length > 0 ? (
                            <div className="row g-4">
                                {entries.map((user) => (
                                    <div key={user._id} className="col-lg-4 col-md-6  align-items-stretch ">
                                        <EmailTemplate contact={user} onDelete={handleDelete} />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-center">No contact messages found.</p>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
};

export default JoinRequest;
