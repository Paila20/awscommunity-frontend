



import React, { useEffect } from "react";
import { useBlog } from "../context/BlogContext";
import EmailTemplate from "../components/EmailTemplate";
import { handleSuccess, handleError } from '../utils';
import Navbar from "./Navbar";
import axios from "axios";

const Dashboard = () => {
    const { entries, fetchAllEntries, loading } = useBlog();

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

    return (
        <>
            <Navbar />

            <section className="contact section-show">
                <div className="container">
                    <div className="section-title">
                        <h2>DASHBOARD</h2>
                        <p>WELCOME TO CONTACT US MESSAGES</p>
                    </div>
                    <div className="admin-dashboard mt-5">
                        {loading ? (
                            <p>Loading...</p>
                        ) : entries.length > 0 ? (
                            <div className="row g-4">
                                {entries.map((user) => (
                                    <div key={user._id} className="col-md-6  align-items-stretch">
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

export default Dashboard;
