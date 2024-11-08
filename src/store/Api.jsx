// src/services/api.js
import axios from "axios";

const API_URL = "http://localhost:5000"; // Replace with your backend URL

// Authentication
export const login = (username, password) =>
  axios.post(`${API_URL}/login`, { username, password });

export const signup = (username, password) =>
  axios.post(`${API_URL}/signup`, { username, password });

// Tasks CRUD
export const fetchTasks = () => axios.get(`${API_URL}/tasks`);
export const addTask = (task) => axios.post(`${API_URL}/tasks`, task);
export const editTask = (id, updatedTask) =>
  axios.put(`${API_URL}/tasks/${id}`, updatedTask);
export const deleteTask = (id) => axios.delete(`${API_URL}/tasks/${id}`);
