


import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { handleSuccess, handleError } from '../utils';


const BlogContext = createContext();

export const useBlog = () => {
    return useContext(BlogContext);
};

export const BlogProvider = ({ children }) => {
  
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [entries, setEntries] = useState([]); 
    const API_BASE_URL = 'https://awscommunity-backend.onrender.com/api'; 
    // const API_BASE_URL = 'http://localhost:5000';
    // const token = localStorage.getItem('token');
  
const submitContactForm = async (formData) => {
    setLoading(true);
    try {
        const response = await axios.post(`${API_BASE_URL}/join-us`, formData, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.log("Contact Form Submitted:", response.data);
        setMessage(response.data.message); // Update state with success message
        handleSuccess("Form Submitted Successfully")
    } catch (error) {
        console.error("Contact Form Error:", error);
        setMessage("Failed to submit form"); // Update state with error message
    } finally {
        setLoading(false);
    }
};

 // ✅ Fetch All "Join Us" Form Entries (Admin Only)
 const fetchAllEntries = async () => {
    const token = localStorage.getItem("token"); // Get the token inside the function

    if (!token) {
        console.error("No token found");
        handleError("Unauthorized: No token found");
        setLoading(false);
        return;
    }
    setLoading(true);
    try {
        const response = await axios.get(`${API_BASE_URL}/join-us/all`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Fetched Entries:", response.data);
        setEntries(response.data);
        handleSuccess("Entries fetched successfully");
    } catch (error) {
        console.error("Fetch Entries Error:", error);
        handleError("Failed to fetch entries");
    } finally {
        setLoading(false);
    }
};

// ✅ Delete a "Join Us" Form Entry by ID (Admin Only)
const deleteEntry = async (entryId) => {
    setLoading(true);
    const token = localStorage.getItem("token"); // Get the token inside the function

    if (!token) {
        console.error("No token found");
        handleError("Unauthorized: No token found");
        setLoading(false);
        return;
    }
    try {
        await axios.delete(`${API_BASE_URL}/join-us/${entryId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        setEntries(entries.filter(entry => entry._id !== entryId)); // Update UI
        handleSuccess("Entry deleted successfully");
    } catch (error) {
        console.error("Delete Entry Error:", error);
        handleError("Failed to delete entry");
    } finally {
        setLoading(false);
    }
};

    
    return (
        <BlogContext.Provider
            value={{
                loading,
                submitContactForm,
                message,
                entries,
                fetchAllEntries,
                deleteEntry,
            }} 
        >
            {children}
        </BlogContext.Provider>
    );
};
