"use client"

import TaskCard from "@/components/task-card"

export default function TaskList({ tasks, onEdit, onDelete, onToggleComplete }) {
  if (tasks.length === 0) {
    return null
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} onEdit={onEdit} onDelete={onDelete} onToggleComplete={onToggleComplete} />
      ))}
    </div>
  )
}
