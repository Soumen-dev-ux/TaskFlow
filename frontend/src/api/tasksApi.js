import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const getTasks = () => API.get("/tasks");
export const createTask = (task) => API.post("/tasks", task);
export const updateTask = (id, updates) => API.put(`/tasks/${id}`, updates);
export const deleteTask = (id) => API.delete(`/tasks/${id}`);
export const toggleComplete = (id, completed) =>
  API.put(`/tasks/${id}`, { completed });
