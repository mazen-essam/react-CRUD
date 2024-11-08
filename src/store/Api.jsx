// src/services/api.js
import axios from "axios";

const API_URL = "http://localhost:5000"; // Replace with your backend URL

// Authentication
export const loginApi = (username, password) =>
  axios.post(`${API_URL}/login`, { username, password });

export const signupApi = (username, password) =>
  axios.post(`${API_URL}/signup`, { username, password });

// Tasks CRUD
export const fetchTasksApi = () => axios.get(`${API_URL}/tasks`);
export const addTaskApi = (task) => axios.post(`${API_URL}/tasks`, task);
export const editTaskApi = (id, updatedTask) =>
  axios.put(`${API_URL}/tasks/${id}`, updatedTask);
export const deleteTaskApi = (id) => axios.delete(`${API_URL}/tasks/${id}`);
