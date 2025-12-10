"use client"

import { Trash2, Edit2, Check } from "lucide-react"
import { format } from "date-fns"

const priorityColors = {
  low: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  medium: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
  high: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
}

export default function TaskCard({ task, onEdit, onDelete, onToggleComplete }) {
  const formatDate = (dateString) => {
    if (!dateString) return "No due date"
    try {
      return format(new Date(dateString), "MMM dd, yyyy")
    } catch {
      return "Invalid date"
    }
  }

  return (
    <div
      className={`p-5 rounded-lg border transition-all ${
        task.completed
          ? "glass opacity-60"
          : "glass hover:border-primary/50 hover:shadow-md"
      }`}
    >
      <div className="flex items-start gap-4">
        <button
          onClick={() => onToggleComplete(task.id)}
          className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
            task.completed
              ? "bg-primary border-primary text-primary-foreground"
              : "border-muted-foreground hover:border-primary"
          }`}
        >
          {task.completed && <Check size={16} />}
        </button>

        <div className="flex-1">
          <h3
            className={`text-lg font-semibold mb-1 ${
              task.completed ? "line-through text-muted-foreground" : "text-foreground"
            }`}
          >
            {task.title}
          </h3>
          {task.description && <p className="text-muted-foreground text-sm mb-3">{task.description}</p>}

          <div className="flex items-center gap-3 flex-wrap">
            <span className={`text-xs px-3 py-1 rounded-full font-medium ${priorityColors[task.priority]}`}>
              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
            </span>
            <span className="text-xs text-muted-foreground">Due: {formatDate(task.dueDate)}</span>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onEdit(task)}
            className="interactive-soft p-2 hover:bg-muted rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            title="Edit task"
          >
            <Edit2 size={18} />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="interactive-soft p-2 hover:bg-red-100 dark:hover:bg-red-900 rounded-lg text-destructive focus:outline-none focus:ring-2 focus:ring-destructive"
            title="Delete task"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}
