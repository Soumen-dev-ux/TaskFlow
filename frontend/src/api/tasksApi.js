import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",  // Make sure it's spelled correctly
});


// Fetch all tasks
export const getTasks = () => API.get("/tasks");
export const fetchTasks = () => API.get("/tasks"); // <-- Added to fix error

// Create a new task
export const createTask = (task) => API.post("/tasks", task);

// Update an existing task
export const updateTask = (id, updates) => API.put(`/tasks/${id}`, updates);

// Delete a task
export const deleteTask = (id) => API.delete(`/tasks/${id}`);

// Toggle task completed status
export const toggleComplete = (id, completed) =>
  API.put(`/tasks/${id}`, { completed });
