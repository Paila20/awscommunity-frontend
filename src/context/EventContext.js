

import React, { createContext, useContext, useState } from "react";
import axios from "axios";

const EventContext = createContext();
export const useEvent = () => useContext(EventContext);

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const API_BASE_URL = "https://awscommunity-backend.onrender.com/api/events";

  // ✅ Get Auth Token from Local Storage
  const getToken = () => localStorage.getItem("token");

  // ✅ Fetch All Events (or by category)
  const fetchEvents = async (category = "") => {

  console.log("fetchEvents function is being called");
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE_URL}${category ? `?category=${category}` : ""}`);
      console.log("Fetched events:", res.data);
      setEvents(res.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Create New Event
  const createEvent = async (formData) => {
    setLoading(true);
    try {
      const res = await axios.post(API_BASE_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getToken()}`,
        },
      });
      setEvents([...events, res.data.event]);
    } catch (error) {
      console.error("Error creating event:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Update Event
  const updateEvent = async (id, formData) => {
    setLoading(true);
    try {
      const res = await axios.put(`${API_BASE_URL}/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getToken()}`,
        },
      });
      setEvents(events.map((event) => (event._id === id ? res.data.event : event)));
    } catch (error) {
      console.error("Error updating event:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete Event
  const deleteEvent = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`${API_BASE_URL}/${id}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setEvents(events.filter((event) => event._id !== id));
    } catch (error) {
      console.error("Error deleting event:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <EventContext.Provider value={{ events, fetchEvents, createEvent, updateEvent, deleteEvent, loading }}>
      {children}
    </EventContext.Provider>
  );
};
