import { useState } from "react";
import { createTask } from "../api/tasksApi";

function AddTaskForm({ onTaskAdded }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "medium",
    dueDate: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createTask(form);
    onTaskAdded(); // Notify parent to reload tasks
    setForm({ title: "", description: "", priority: "medium", dueDate: "" });
  };

  return (
    <div className="mb-8 p-4 bg-card border border-border rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
          className="p-2 border border-input rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Task title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        required
      />

      <textarea
        className="p-2 border border-input rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary"
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />

      <select
        className="p-2 border border-input rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary"
        value={form.priority}
        onChange={(e) => setForm({ ...form, priority: e.target.value })}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <input
        type="date"
        className="p-2 border border-input rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary"
        value={form.dueDate}
        onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
      />

      <button type="submit" className="bg-primary text-primary-foreground p-2 rounded-md hover:bg-primary/90">Add Task</button>
    </form>
    </div>
  );
}

export default AddTaskForm;
