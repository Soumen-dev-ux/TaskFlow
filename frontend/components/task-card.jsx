"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Trash2, Edit2, Calendar, AlertCircle, Flag } from "lucide-react"

const priorityConfig = {
  low: {
    bg: "bg-blue-50 dark:bg-blue-950/40",
    text: "text-blue-700 dark:text-blue-300",
    badge: "bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200",
  },
  medium: {
    bg: "bg-amber-50 dark:bg-amber-950/40",
    text: "text-amber-700 dark:text-amber-300",
    badge: "bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-200",
  },
  high: {
    bg: "bg-red-50 dark:bg-red-950/40",
    text: "text-red-700 dark:text-red-300",
    badge: "bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-200",
  },
}

export default function TaskCard({ task, onEdit, onDelete, onToggleComplete }) {
  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.completed
  const config = priorityConfig[task.priority]

  return (
    <Card
      className={`p-4 border transition-all ${
        task.completed
          ? "bg-muted/40 border-border/50 opacity-75"
          : `${config.bg} border-border hover:border-primary/30 hover:shadow-md`
      }`}
    >
      <div className="flex items-start gap-4">
        <Checkbox checked={task.completed} onCheckedChange={() => onToggleComplete(task.id)} className="mt-1.5" />

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div className="flex-1">
              <h3
                className={`text-lg font-semibold leading-snug ${
                  task.completed ? "line-through text-muted-foreground" : "text-foreground"
                }`}
              >
                {task.title}
              </h3>
              {task.description && (
                <p
                  className={`text-sm mt-1.5 leading-relaxed ${
                    task.completed ? "text-muted-foreground" : "text-muted-foreground"
                  }`}
                >
                  {task.description}
                </p>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Flag className={`w-4 h-4 ${config.text}`} />
              <span className={`px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${config.badge}`}>
                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 mt-4 text-sm">
            {task.dueDate && (
              <div
                className={`flex items-center gap-1.5 font-medium ${
                  isOverdue ? "text-destructive" : "text-muted-foreground"
                }`}
              >
                {isOverdue && <AlertCircle className="w-4 h-4" />}
                <Calendar className="w-4 h-4" />
                <span>{new Date(task.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => onEdit(task)}
            className="text-primary hover:text-primary hover:bg-primary/10 border-border/50"
          >
            <Edit2 className="w-4 h-4" />
            <span className="sr-only">Edit task</span>
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => onDelete(task.id)}
            className="text-destructive hover:text-destructive hover:bg-destructive/10 border-border/50"
          >
            <Trash2 className="w-4 h-4" />
            <span className="sr-only">Delete task</span>
          </Button>
        </div>
      </div>
    </Card>
  )
}
