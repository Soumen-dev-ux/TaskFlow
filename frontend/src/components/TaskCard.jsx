import { useMemo, useState } from "react"
import { format } from "date-fns"
import { toast } from "sonner"
import EditModal from "./EditModal"
import { Pencil, Trash2 } from "lucide-react"
import { deleteTask, updateTask, toggleComplete } from "../api/tasksApi"

function TaskCard({ task, onTaskChanged }) {
  const [editing, setEditing] = useState(false)
  const [confirmingDelete, setConfirmingDelete] = useState(false)
  const isOverdue = useMemo(() => {
    if (!task.dueDate || task.completed) return false
    const due = new Date(task.dueDate)
    const now = new Date()
    return due.getTime() < now.getTime()
  }, [task.dueDate, task.completed])

  const handleComplete = async () => {
    try {
      await toggleComplete(task._id, !task.completed)
      toast.success(!task.completed ? "Task completed" : "Marked as pending")
      onTaskChanged && onTaskChanged()
    } catch {
      toast.error("Failed to update task")
    }
  }

  const handleDelete = async () => {
    try {
      await deleteTask(task._id)
      toast.success("Task deleted")
      onTaskChanged && onTaskChanged()
    } catch {
      toast.error("Failed to delete task")
    }
  }

  const handleEditSave = async (updated) => {
    try {
      await updateTask(task._id, {
        title: updated.title,
        description: updated.description,
        priority: updated.priority,
        dueDate: updated.dueDate,
      })
      toast.success("Task updated")
      setEditing(false)
      onTaskChanged && onTaskChanged()
    } catch {
      toast.error("Failed to update task")
    }
  }

  return (
    <div className="interactive flex items-start gap-3 p-4 bg-card border border-border rounded-lg shadow-sm hover:shadow-md transition-all duration-200 ease-in-out">
      <input
        type="checkbox"
        className="size-5 mt-1 accent-primary cursor-pointer"
        checked={task.completed}
        onChange={handleComplete}
      />

      <div className={`flex-1 ${task.completed ? "opacity-75" : ""}`}>
        <div className="flex items-start justify-between">
          <h3 className={`text-lg font-semibold text-foreground mb-1 ${task.completed ? "line-through" : ""}`}>{task.title}</h3>
          <span
            className={`text-xs px-2 py-1 rounded-full border ${
              task.priority === "high"
                ? "bg-destructive text-destructive-foreground border-destructive"
                : task.priority === "medium"
                ? "bg-secondary text-secondary-foreground border-secondary"
                : "bg-muted text-foreground border-input"
            }`}
          >
            {task.priority}
          </span>
        </div>
        {task.description && <p className="text-muted-foreground text-sm mb-2">{task.description}</p>}
        <div className="flex items-center gap-2">
          <small className={`text-xs ${isOverdue ? "text-destructive font-medium" : "text-gray-500"}`}>
            Due: {task.dueDate ? format(new Date(task.dueDate), "MMM d, yyyy") : "—"}
          </small>
          {isOverdue && <span className="text-[10px] px-2 py-0.5 rounded-full bg-destructive text-destructive-foreground">Overdue</span>}
        </div>
      </div>

      <div className="flex gap-2">
        <button aria-label="Edit task" onClick={() => setEditing(true)} className="interactive-soft px-3 py-1 text-sm bg-accent text-accent-foreground rounded-md hover:bg-accent/90 flex items-center gap-1.5">
          <Pencil className="size-4" />
          Edit
        </button>
        <button aria-label="Delete task" onClick={() => setConfirmingDelete(true)} className="interactive-soft px-3 py-1 text-sm bg-destructive text-destructive-foreground rounded-md hover:bg-destructive/90 flex items-center gap-1.5">
          <Trash2 className="size-4" />
          Delete
        </button>
      </div>

      {editing && (
        <EditModal
          task={{
            title: task.title || "",
            description: task.description || "",
            priority: task.priority || "medium",
            dueDate: task.dueDate || "",
          }}
          onSave={handleEditSave}
          onClose={() => setEditing(false)}
        />
      )}

      {confirmingDelete && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
          <div className="glass rounded-xl max-w-sm w-full p-6">
            <h4 className="text-lg font-semibold mb-2">Delete task?</h4>
            <p className="text-sm text-muted-foreground mb-4">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button
                className="interactive flex-1 px-4 py-2 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 font-semibold"
                onClick={() => {
                  setConfirmingDelete(false)
                  handleDelete()
                }}
              >
                Delete
              </button>
              <button
                className="interactive flex-1 px-4 py-2 border border-input rounded-lg hover:bg-muted font-semibold"
                onClick={() => setConfirmingDelete(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskCard
