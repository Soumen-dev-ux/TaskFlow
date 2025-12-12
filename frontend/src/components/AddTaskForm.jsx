import { useState } from "react"
import { toast } from "sonner"
import { Plus, Loader2, ChevronDown } from "lucide-react"
import { createTask } from "../api/tasksApi"

function AddTaskForm({ onTaskAdded, onCancel }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "medium",
    dueDate: "",
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.title.trim()) return
    setLoading(true)
    try {
      await createTask(form)
      toast.success("Task added")
      onTaskAdded && onTaskAdded()
      setForm({ title: "", description: "", priority: "medium", dueDate: "" })
    } catch {
      toast.error("Failed to add task")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mb-8 p-4 bg-card border border-border rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="space-y-2">
          <label className="text-sm text-foreground">Title</label>
          <input
            className="p-2 border border-input rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Task title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-foreground">Description</label>
          <textarea
            className="p-2 border border-input rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm text-foreground">Priority</label>
            <div className="relative">
              <select
                className="p-2 pr-8 border border-input rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary appearance-none"
                value={form.priority}
                onChange={(e) => setForm({ ...form, priority: e.target.value })}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-foreground">Due Date</label>
            <input
              type="date"
              className="p-2 border border-input rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary"
              value={form.dueDate}
              onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
            />
          </div>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="bg-primary text-primary-foreground p-2 rounded-md hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center gap-2"
          >
            {loading ? <Loader2 className="size-4 animate-spin" /> : <Plus className="size-4" />}
            {loading ? "Adding..." : "Add Task"}
          </button>
          {onCancel && (
            <button type="button" onClick={onCancel} className="border border-input p-2 rounded-md hover:bg-muted">
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

export default AddTaskForm
