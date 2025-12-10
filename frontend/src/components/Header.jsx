"use client"

import { Plus } from "lucide-react"

export default function Header({ onAddTask }) {
  return (
    <header className="mb-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent mb-2">
            TaskFlow
          </h1>
          <p className="text-muted-foreground">Organize your tasks and boost your productivity</p>
        </div>
        <button
          onClick={onAddTask}
          className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-semibold shadow-lg hover:shadow-xl"
        >
          <Plus size={20} />
          Add Task
        </button>
      </div>
    </header>
  )
}
