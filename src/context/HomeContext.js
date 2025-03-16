import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

// Create Context
const HomeContext = createContext();

// Custom Hook for easier consumption
export const useHome = () => useContext(HomeContext);

export const HomeProvider = ({ children }) => {
  const [homeData, setHomeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const API_BASE_URL = 'https://awscommunity-backend.onrender.com/api'; 
  const token = localStorage.getItem("token")

  // Fetch home data
  const fetchHomeData = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${API_BASE_URL}/home`);
      setHomeData(data);
      setError("");
    } catch (err) {
      setError("Failed to fetch home data");
    } finally {
      setLoading(false);
    }
  };

  // Create new home data
  const createHomeData = async (formData) => {
    try {
      const { data } = await axios.post(`${API_BASE_URL}/home`, formData);
      setHomeData(data);
      setError("");
    } catch (err) {
      setError("Failed to create home data");
    }
  };

  // Update existing home data
  const updateHomeData = async (id, formData) => {
    try {
      const { data } = await axios.put(`${API_BASE_URL}/home/${id}`, formData,{
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },});
      setHomeData(data);
      setError("");
    } catch (err) {
      setError("Failed to update home data");
    }
  };

  // Fetch data initially
  useEffect(() => {
    fetchHomeData();
  }, []);

  return (
    <HomeContext.Provider
      value={{
        homeData,
        setHomeData,
        loading,
        error,
        createHomeData,
        updateHomeData,
        fetchHomeData,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};
