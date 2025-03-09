import { createContext, useContext, useState } from "react";
import axios from "axios";

const SectionContext = createContext();

export const SectionProvider = ({ children }) => {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(false);
  const API_BASE_URL = 'https://awscommunity-backend.onrender.com/api';
  const token = localStorage.getItem('token');

  // Fetch Sections
  const fetchSections = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/sections`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(res.data)
      // setSections(res.data);
      setSections(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Error fetching sections:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSectionByMenu = async (id) => { 
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/sections/${id}`, { 
        headers: { Authorization: `Bearer ${token}` },
      });
     
      return res.data;
    } catch (error) {
      console.error("Error fetching sections:", error);
    } finally {
      setLoading(false);
    }
  };
  

  // Add Section
  const addSection = async (formData) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/sections`, formData, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      });
      // setSections([res.data.section, ...sections]);
      setSections((prev) => [...prev, res.data]);
    } catch (error) {
      console.error("Error adding section:", error);
    }
  };

  // Update Section
  const updateSection = async (id, formData) => {
    try {
      const res = await axios.put(`${API_BASE_URL}/sections/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      });
      setSections(sections.map(section => (section._id === id ? res.data.section : section)));
    } catch (error) {
      console.error("Error updating section:", error);
    }
  };

  // Delete Section
  const deleteSection = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/sections/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSections(sections.filter(section => section._id !== id));
    } catch (error) {
      console.error("Error deleting section:", error);
    }
  };

  return (
    <SectionContext.Provider value={{ sections, loading, fetchSections, addSection, updateSection, deleteSection,fetchSectionByMenu }}>
      {children}
    </SectionContext.Provider>
  );
};

export const useSection = () => useContext(SectionContext);
