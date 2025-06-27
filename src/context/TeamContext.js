import { createContext, useContext, useState} from "react";
import axios from "axios";

const TeamContext = createContext();

export const TeamProvider = ({ children }) => {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(false);
  const API_BASE_URL = 'https://awscommunity-backend.onrender.com/api'; 
//   const token = localStorage.getItem('token')
  // const token = localStorage.getItem('token');
  const getToken = () => localStorage.getItem("token");

  // Fetch Team Members
  const fetchTeam = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/team`);
      setTeam(res.data);
    } catch (error) {
      console.error("Error fetching team:", error);
    } finally {
      setLoading(false);
    }
  };

  // Add Team Member
  const addTeamMember = async (formData) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/team`, formData, {
        headers: { Authorization: `Bearer ${getToken()}`, "Content-Type": "multipart/form-data" },
      });
      setTeam([...team, res.data.member]);
    } catch (error) {
      console.error("Error adding team member:", error);
    }
  };

  // Update Team Member
  const updateTeamMember = async (id, formData) => {
    try {
      const res = await axios.put(`${API_BASE_URL}/team/${id}`, formData, {
        headers: { Authorization: `Bearer ${getToken()}`, "Content-Type": "multipart/form-data" },
      });
      setTeam(team.map(member => (member._id === id ? res.data.member : member)));
    } catch (error) {
      console.error("Error updating team member:", error);
    }
  };

  // Delete Team Member
  const deleteTeamMember = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/team/${id}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setTeam(team.filter(member => member._id !== id));
    } catch (error) {
      console.error("Error deleting team member:", error);
    }
  };



  return (
    <TeamContext.Provider value={{ team, loading, fetchTeam,addTeamMember, updateTeamMember, deleteTeamMember }}>
      {children}
    </TeamContext.Provider>
  );
};

export const useTeam = () => useContext(TeamContext);
