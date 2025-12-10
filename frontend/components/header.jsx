"use client"

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function Header({ onAddTask }) {
  return (
    <header className="mb-12">
      <div className="flex items-end justify-between gap-4 mb-2">
        <div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            TaskFlow
          </h1>
          <p className="text-muted-foreground mt-2 text-base">Organize your work, maximize your productivity</p>
        </div>
      </div>

      <div className="flex gap-3 mt-6">
        <Button
          onClick={onAddTask}
          className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all"
        >
          <Plus className="w-5 h-5" />
          Add New Task
        </Button>
      </div>
    </header>
  )
}
